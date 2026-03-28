import { useState } from 'react'
import Layout from '../components/Layout'

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
