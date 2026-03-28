import { useState, useRef } from 'react'
import Layout from '../components/Layout'
import * as pdfjsLib from 'pdfjs-dist'

pdfjsLib.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url
).toString()

const statusConfig = {
  green: { dot: 'bg-safe', badge: 'bg-green-100 text-green-800', border: 'border-l-safe' },
  yellow: { dot: 'bg-caution', badge: 'bg-yellow-100 text-yellow-800', border: 'border-l-caution' },
  red: { dot: 'bg-danger', badge: 'bg-red-100 text-red-800', border: 'border-l-danger' },
}

function Summary({ clauses }) {
  const counts = { green: 0, yellow: 0, red: 0 }
  clauses.forEach((c) => { if (counts[c.status] !== undefined) counts[c.status]++ })
  return (
    <div className="flex gap-4 flex-wrap mb-6">
      {[
        { key: 'green', label: 'No issues', color: 'text-safe' },
        { key: 'yellow', label: 'Caution', color: 'text-caution' },
        { key: 'red', label: 'Alert', color: 'text-danger' },
      ].map(({ key, label, color }) => (
        <div key={key} className="bg-white border border-gray-200 rounded-lg px-4 py-3 text-center min-w-[90px]">
          <div className={`text-2xl font-bold ${color}`}>{counts[key]}</div>
          <div className="text-xs text-gray-500 mt-0.5">{label}</div>
        </div>
      ))}
    </div>
  )
}

function PdfUploader({ onText }) {
  const [pdfState, setPdfState] = useState('idle') // idle | reading | done | error
  const [fileName, setFileName] = useState('')
  const [pdfError, setPdfError] = useState('')
  const [dragging, setDragging] = useState(false)
  const inputRef = useRef(null)

  async function readPdf(file) {
    if (!file || file.type !== 'application/pdf') {
      setPdfError('Please upload a valid PDF file.')
      setPdfState('error')
      return
    }
    setFileName(file.name)
    setPdfState('reading')
    setPdfError('')
    try {
      const buffer = await file.arrayBuffer()
      const pdf = await pdfjsLib.getDocument({ data: buffer }).promise
      const pages = []
      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i)
        const content = await page.getTextContent()
        pages.push(content.items.map((item) => item.str).join(' '))
      }
      const extracted = pages.join('\n\n').trim()
      if (!extracted) {
        setPdfError('Could not extract text from this PDF. It may be a scanned image — try copying the text manually.')
        setPdfState('error')
        return
      }
      onText(extracted)
      setPdfState('done')
    } catch {
      setPdfError('Failed to read the PDF. Please try again or paste the text manually.')
      setPdfState('error')
    }
  }

  function handleFile(file) { readPdf(file) }

  function handleDrop(e) {
    e.preventDefault()
    setDragging(false)
    const file = e.dataTransfer.files?.[0]
    if (file) handleFile(file)
  }

  return (
    <div className="mb-5">
      <div
        onDragOver={(e) => { e.preventDefault(); setDragging(true) }}
        onDragLeave={() => setDragging(false)}
        onDrop={handleDrop}
        className={`border-2 border-dashed rounded-xl px-6 py-7 text-center transition cursor-pointer ${
          dragging
            ? 'border-primary bg-blue-50'
            : pdfState === 'done'
            ? 'border-green-400 bg-green-50'
            : pdfState === 'error'
            ? 'border-red-300 bg-red-50'
            : 'border-gray-300 bg-white hover:border-primary hover:bg-blue-50'
        }`}
        onClick={() => pdfState !== 'reading' && inputRef.current.click()}
      >
        <input
          ref={inputRef}
          type="file"
          accept="application/pdf"
          className="hidden"
          onChange={(e) => { const f = e.target.files?.[0]; if (f) handleFile(f); e.target.value = '' }}
        />

        {pdfState === 'idle' && (
          <>
            <p className="text-3xl mb-2">📄</p>
            <p className="text-sm font-semibold text-gray-700">Drag & drop your PDF here</p>
            <p className="text-xs text-gray-400 mt-1">or</p>
            <button
              type="button"
              className="mt-2 bg-primary text-white text-xs font-semibold px-4 py-2 rounded-lg hover:bg-blue-700 transition"
              onClick={(e) => { e.stopPropagation(); inputRef.current.click() }}
            >
              Upload PDF
            </button>
            <p className="text-xs text-gray-400 mt-3">Your file is read locally — nothing is uploaded to any server.</p>
          </>
        )}

        {pdfState === 'reading' && (
          <>
            <p className="text-3xl mb-2 animate-pulse">⏳</p>
            <p className="text-sm font-semibold text-gray-600 animate-pulse">Reading PDF...</p>
            <p className="text-xs text-gray-400 mt-1">{fileName}</p>
          </>
        )}

        {pdfState === 'done' && (
          <>
            <p className="text-3xl mb-2">✅</p>
            <p className="text-sm font-semibold text-green-700">{fileName}</p>
            <p className="text-xs text-green-600 mt-1">Text extracted — ready to analyze</p>
            <button
              type="button"
              className="mt-3 text-xs text-gray-400 hover:text-gray-600 underline"
              onClick={(e) => { e.stopPropagation(); setPdfState('idle'); setFileName(''); onText('') }}
            >
              Remove file
            </button>
          </>
        )}

        {pdfState === 'error' && (
          <>
            <p className="text-3xl mb-2">❌</p>
            <p className="text-sm font-semibold text-red-600">Could not read the PDF</p>
            <p className="text-xs text-red-500 mt-1">{pdfError}</p>
            <button
              type="button"
              className="mt-3 text-xs text-primary hover:underline"
              onClick={(e) => { e.stopPropagation(); setPdfState('idle'); setFileName(''); setPdfError('') }}
            >
              Try again
            </button>
          </>
        )}
      </div>

      {pdfState === 'idle' && (
        <p className="text-xs text-gray-400 text-center mt-2">— or paste the text directly below —</p>
      )}
    </div>
  )
}

export default function AnalyzeContract() {
  const [text, setText] = useState('')
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  async function analyze() {
    if (!text.trim()) return
    setLoading(true)
    setResult(null)
    setError(null)
    try {
      const res = await fetch('/api/analyze-contract', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text }),
      })
      if (!res.ok) {
        const err = await res.json()
        throw new Error(err.error || 'Analysis failed')
      }
      setResult(await res.json())
    } catch (err) {
      setError(err.message || 'Something went wrong. Make sure the server is running with your API key.')
    } finally {
      setLoading(false)
    }
  }

  const redCount = result?.filter((c) => c.status === 'red').length ?? 0

  return (
    <Layout>
      <div className="max-w-3xl mx-auto px-4 py-10">
        <h1 className="text-2xl font-bold text-primary mb-1">Analyze Your Lease</h1>
        <p className="text-gray-500 mb-6 text-sm">
          Paste your lease text. We'll analyze each key clause against Michigan tenant law.
        </p>

        <PdfUploader onText={(t) => { setText(t); setResult(null) }} />

        <textarea
          className="w-full border border-gray-300 rounded-xl p-4 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-primary resize-none"
          rows={10}
          placeholder="Paste your rental lease text here..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />

        <button
          onClick={analyze}
          disabled={!text.trim() || loading}
          className="mt-4 w-full sm:w-auto bg-primary text-white font-bold px-8 py-3 rounded-lg hover:bg-blue-900 transition disabled:opacity-40 disabled:cursor-not-allowed"
        >
          {loading ? 'Analyzing...' : 'Analyze Lease'}
        </button>

        {loading && (
          <div className="mt-8 text-center text-gray-400 text-sm animate-pulse">
            Claude is reviewing your clauses...
          </div>
        )}

        {error && (
          <div className="mt-6 bg-red-50 border border-red-200 rounded-xl p-4 text-sm text-red-700">
            {error}
          </div>
        )}

        {result && (
          <div className="mt-8">
            <h2 className="font-bold text-gray-800 mb-4">Contract Summary</h2>
            <Summary clauses={result} />

            <div className="space-y-3">
              {result.map((clause, i) => {
                const c = statusConfig[clause.status] ?? statusConfig.yellow
                return (
                  <div
                    key={i}
                    className={`bg-white border border-gray-200 border-l-4 ${c.border} rounded-xl p-5 shadow-sm`}
                  >
                    <div className="flex items-start justify-between gap-3 mb-2">
                      <div className="flex items-center gap-2">
                        <span className={`w-2.5 h-2.5 rounded-full flex-shrink-0 mt-0.5 ${c.dot}`} />
                        <h3 className="font-semibold text-gray-800 text-sm">{clause.title}</h3>
                      </div>
                      <span className={`text-xs font-semibold px-2 py-0.5 rounded-full flex-shrink-0 ${c.badge}`}>
                        {clause.verdict}
                      </span>
                    </div>
                    <p className="text-xs text-gray-500 italic mb-2 pl-4">"{clause.text}"</p>
                    <p className="text-sm text-gray-700 pl-4">{clause.explanation}</p>
                  </div>
                )
              })}
            </div>

            {redCount > 0 && (
              <div className="mt-6 bg-blue-50 border border-blue-200 rounded-xl p-5 text-sm text-blue-800">
                <strong>Next steps:</strong> You have {redCount} illegal or highly problematic clause{redCount > 1 ? 's' : ''}. Before signing, ask the landlord in writing to remove or correct them. If they refuse, contact Student Legal Services or Michigan Legal Help.
              </div>
            )}

            {redCount === 0 && (
              <div className="mt-6 bg-green-50 border border-green-200 rounded-xl p-5 text-sm text-green-800">
                <strong>Looks good!</strong> No illegal clauses found. Review any yellow items and consider negotiating them before signing.
              </div>
            )}
          </div>
        )}
      </div>
    </Layout>
  )
}
