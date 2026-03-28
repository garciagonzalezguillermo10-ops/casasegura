import { useState } from 'react'
import Layout from '../components/Layout'

const flagConfig = {
  red:    { bg: 'bg-red-50',    borderColor: '#e53e3e', label: 'Critical Alert', labelColor: 'text-red-700' },
  yellow: { bg: 'bg-yellow-50', borderColor: '#d69e2e', label: 'Caution',        labelColor: 'text-yellow-700' },
  green:  { bg: 'bg-green-50',  borderColor: '#38a169', label: 'OK',             labelColor: 'text-green-700' },
}

function ScoreCircle({ score }) {
  const color  = score > 70 ? '#38a169' : score >= 40 ? '#d69e2e' : '#e53e3e'
  const label  = score > 70 ? 'Looks Legitimate' : score >= 40 ? 'Proceed with Caution' : 'High Scam Risk'
  const bgRing = score > 70 ? '#c6f6d5' : score >= 40 ? '#fefcbf' : '#fed7d7'
  return (
    <div className="flex flex-col items-center py-4">
      <div
        className="w-36 h-36 flex items-center justify-center shadow-lg mb-4 animate-fade-in"
        style={{ backgroundColor: bgRing, border: `6px solid ${color}` }}
      >
        <div className="text-center">
          <div className="text-5xl font-black leading-none" style={{ color }}>{score}</div>
          <div className="text-xs text-gray-500 font-semibold mt-1">/100</div>
        </div>
      </div>
      <p className="text-base font-bold" style={{ color }}>{label}</p>
      <p className="text-xs text-gray-400 mt-1">Trust Score</p>
    </div>
  )
}

export default function AnalyzeListing() {
  const [text, setText]     = useState('')
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError]   = useState(null)

  async function analyze() {
    if (!text.trim()) return
    setLoading(true)
    setResult(null)
    setError(null)
    try {
      const res = await fetch('/api/analyze-listing', {
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

  return (
    <Layout>
      <div className="max-w-3xl mx-auto px-4 py-10">
        <h1 className="text-2xl font-bold text-primary mb-1">Scan a Listing</h1>
        <p className="text-gray-500 mb-6 text-sm">
          Paste the text from a Craigslist, Facebook Marketplace, Zillow, or other listing.
        </p>

        <textarea
          className="w-full border border-gray-300 p-4 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-primary resize-none bg-white"
          rows={10}
          placeholder="Paste the listing text here... e.g. '2BR apartment $450/mo, owner abroad, contact via email only...'"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />

        <button
          onClick={analyze}
          disabled={!text.trim() || loading}
          className="mt-4 w-full sm:w-auto bg-primary text-white font-bold px-8 py-3 hover:bg-blue-900 transition disabled:opacity-40 disabled:cursor-not-allowed"
        >
          {loading ? 'Scanning...' : 'Scan Listing'}
        </button>

        {loading && (
          <div className="mt-8 text-center text-gray-400 text-sm animate-pulse">
            Claude is checking for red flags...
          </div>
        )}

        {error && (
          <div className="mt-6 bg-red-50 border border-red-200 rounded-xl p-4 text-sm text-red-700">
            {error}
          </div>
        )}

        {result && (
          <div className="mt-8 space-y-6 animate-fade-in">
            {/* Score circle */}
            <div className="bg-white border border-gray-200 p-6 shadow-sm text-center">
              <ScoreCircle score={result.score} />
            </div>

            {/* Flags */}
            <div className="bg-white border border-gray-200 p-6 shadow-sm">
              <h2 className="font-bold text-gray-800 mb-4">
                Signals detected ({result.flags?.length ?? 0})
              </h2>
              <ul className="space-y-3">
                {result.flags?.map((flag, i) => {
                  const c = flagConfig[flag.level] ?? flagConfig.yellow
                  return (
                    <li
                      key={i}
                      className={`px-4 py-3 border border-gray-100 border-l-4 ${c.bg} animate-fade-in`}
                      style={{ borderLeftColor: c.borderColor, animationDelay: `${i * 80}ms` }}
                    >
                      <span className={`text-xs font-semibold uppercase tracking-wide block mb-0.5 ${c.labelColor}`}>
                        {c.label}
                      </span>
                      <span className="text-sm text-gray-800">{flag.text}</span>
                    </li>
                  )
                })}
              </ul>
            </div>

            {/* Recommendation */}
            {result.recommendation && (
              <div
                className="rounded-2xl p-6 border-l-4 animate-fade-in"
                style={{
                  backgroundColor: result.score > 70 ? '#f0fff4' : result.score >= 40 ? '#fffff0' : '#fff5f5',
                  borderLeftColor: result.score > 70 ? '#38a169' : result.score >= 40 ? '#d69e2e' : '#e53e3e',
                  borderWidth: '1px',
                  borderLeftWidth: '4px',
                  borderColor: result.score > 70 ? '#c6f6d5' : result.score >= 40 ? '#fefcbf' : '#fed7d7',
                }}
              >
                <h2
                  className="font-bold mb-2"
                  style={{ color: result.score > 70 ? '#276749' : result.score >= 40 ? '#744210' : '#c53030' }}
                >
                  Our Recommendation
                </h2>
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: result.score > 70 ? '#22543d' : result.score >= 40 ? '#7b341e' : '#9b2c2c' }}
                >
                  {result.recommendation}
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </Layout>
  )
}