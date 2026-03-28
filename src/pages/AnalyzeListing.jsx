import { useState } from 'react'
import Layout from '../components/Layout'

const MOCK_RESULT = {
  score: 28,
  flags: [
    { level: 'red', text: 'Price far below market ($400/mo) — Ann Arbor average is $900+' },
    { level: 'red', text: 'Owner claims to be abroad and cannot show the property in person' },
    { level: 'red', text: 'Requests deposit via Zelle or Western Union before signing any contract' },
    { level: 'red', text: 'Pressure to decide "today" — claims many interested parties' },
    { level: 'yellow', text: 'Email-only contact — no phone number or full name provided' },
    { level: 'yellow', text: 'Generic photos that may not be of the actual property' },
  ],
  recommendation:
    'This listing has multiple serious scam indicators. The combination of a very low price, absent owner, and upfront payment request are the most common patterns in housing fraud. Do not send any money. Report the listing and look for another option.',
}

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
        className="w-36 h-36 rounded-full flex items-center justify-center shadow-lg mb-4 animate-fade-in"
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
  const [text, setText] = useState('')
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)

  function analyze() {
    if (!text.trim()) return
    setLoading(true)
    setResult(null)
    setTimeout(() => {
      setResult(MOCK_RESULT)
      setLoading(false)
    }, 1200)
  }

  return (
    <Layout>
      <div className="max-w-3xl mx-auto px-4 py-10">
        <h1 className="text-2xl font-bold text-primary mb-1">Scan a Listing</h1>
        <p className="text-gray-500 mb-6 text-sm">
          Paste the text from a Craigslist, Facebook Marketplace, Zillow, or other listing.
        </p>

        <textarea
          className="w-full border border-gray-300 rounded-xl p-4 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-primary resize-none bg-white"
          rows={10}
          placeholder="Paste the listing text here... e.g. '2BR apartment $450/mo, owner abroad, contact via email only...'"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />

        <button
          onClick={analyze}
          disabled={!text.trim() || loading}
          className="mt-4 w-full sm:w-auto bg-primary text-white font-bold px-8 py-3 rounded-lg hover:bg-blue-900 transition disabled:opacity-40 disabled:cursor-not-allowed"
        >
          {loading ? 'Scanning...' : 'Scan Listing'}
        </button>

        {loading && (
          <div className="mt-8 text-center text-gray-400 text-sm animate-pulse">
            Checking for red flags...
          </div>
        )}

        {result && (
          <div className="mt-8 space-y-6 animate-fade-in">
            {/* Score circle */}
            <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm text-center">
              <ScoreCircle score={result.score} />
            </div>

            {/* Flags */}
            <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
              <h2 className="font-bold text-gray-800 mb-4">
                Signals detected ({result.flags.length})
              </h2>
              <ul className="space-y-3">
                {result.flags.map((flag, i) => {
                  const c = flagConfig[flag.level]
                  return (
                    <li
                      key={i}
                      className={`rounded-lg px-4 py-3 border border-gray-100 border-l-4 ${c.bg} animate-fade-in`}
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
            <div
              className="rounded-2xl p-6 border-l-4 animate-fade-in"
              style={{ backgroundColor: '#fff5f5', borderLeftColor: '#e53e3e', borderWidth: '1px', borderLeftWidth: '4px', borderColor: '#fed7d7' }}
            >
              <h2 className="font-bold text-red-700 mb-2">Our Recommendation</h2>
              <p className="text-sm text-red-800 leading-relaxed">{result.recommendation}</p>
            </div>
          </div>
        )}
      </div>
    </Layout>
  )
}
