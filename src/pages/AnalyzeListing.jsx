import { useState } from 'react'
import Layout from '../components/Layout'

const flagColors = {
  red: { bg: 'bg-red-50', border: 'border-red-200', dot: 'bg-danger', label: 'High Risk' },
  yellow: { bg: 'bg-yellow-50', border: 'border-yellow-200', dot: 'bg-caution', label: 'Caution' },
  green: { bg: 'bg-green-50', border: 'border-green-200', dot: 'bg-safe', label: 'OK' },
}

function ScoreBar({ score }) {
  const color = score > 70 ? 'bg-safe' : score >= 40 ? 'bg-caution' : 'bg-danger'
  const label = score > 70 ? 'Looks Legitimate' : score >= 40 ? 'Proceed with Caution' : 'High Scam Risk'
  const textColor = score > 70 ? 'text-safe' : score >= 40 ? 'text-caution' : 'text-danger'

  return (
    <div className="mb-6">
      <div className="flex items-end justify-between mb-2">
        <span className="text-sm font-medium text-gray-600">Trust Score</span>
        <div className="text-right">
          <span className={`text-3xl font-bold ${textColor}`}>{score}</span>
          <span className="text-gray-400 text-lg">/100</span>
        </div>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
        <div
          className={`h-4 rounded-full transition-all duration-700 ${color}`}
          style={{ width: `${score}%` }}
        />
      </div>
      <p className={`mt-2 font-semibold text-sm ${textColor}`}>{label}</p>
    </div>
  )
}

export default function AnalyzeListing() {
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

  const recommendationStyle = result
    ? result.score > 70
      ? { bg: 'bg-green-50 border-green-200', title: 'text-green-700', body: 'text-green-800' }
      : result.score >= 40
      ? { bg: 'bg-yellow-50 border-yellow-200', title: 'text-yellow-700', body: 'text-yellow-800' }
      : { bg: 'bg-red-50 border-red-200', title: 'text-red-700', body: 'text-red-800' }
    : null

  return (
    <Layout>
      <div className="max-w-3xl mx-auto px-4 py-10">
        <h1 className="text-2xl font-bold text-primary mb-1">Analyze a Rental Listing</h1>
        <p className="text-gray-500 mb-6 text-sm">
          Paste the listing text from Craigslist, Facebook Marketplace, Zillow, or any other platform.
        </p>

        <textarea
          className="w-full border border-gray-300 rounded-xl p-4 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-primary resize-none"
          rows={10}
          placeholder="Paste the listing text here... e.g. '2BR apartment $450/mo, owner currently abroad, contact via email only...'"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />

        <button
          onClick={analyze}
          disabled={!text.trim() || loading}
          className="mt-4 w-full sm:w-auto bg-primary text-white font-bold px-8 py-3 rounded-lg hover:bg-blue-900 transition disabled:opacity-40 disabled:cursor-not-allowed"
        >
          {loading ? 'Analyzing...' : 'Analyze Listing'}
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
          <div className="mt-8 space-y-6">
            <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
              <ScoreBar score={result.score} />
            </div>

            <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
              <h2 className="font-bold text-gray-800 mb-4">
                Flags Found ({result.flags?.length ?? 0})
              </h2>
              <ul className="space-y-3">
                {result.flags?.map((flag, i) => {
                  const c = flagColors[flag.level] ?? flagColors.yellow
                  return (
                    <li
                      key={i}
                      className={`flex items-start gap-3 rounded-lg border px-4 py-3 ${c.bg} ${c.border}`}
                    >
                      <span className={`mt-1 w-3 h-3 rounded-full flex-shrink-0 ${c.dot}`} />
                      <div>
                        <span className="text-xs font-semibold uppercase tracking-wide text-gray-500 block mb-0.5">
                          {c.label}
                        </span>
                        <span className="text-sm text-gray-800">{flag.text}</span>
                      </div>
                    </li>
                  )
                })}
              </ul>
            </div>

            {result.recommendation && (
              <div className={`border rounded-xl p-6 ${recommendationStyle.bg}`}>
                <h2 className={`font-bold mb-2 ${recommendationStyle.title}`}>Recommendation</h2>
                <p className={`text-sm leading-relaxed ${recommendationStyle.body}`}>
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
