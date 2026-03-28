import { useState } from 'react'
import Layout from '../components/Layout'

const MOCK_CLAUSES = [
  {
    status: 'green',
    title: 'Lease Duration',
    text: '12 months, August 1, 2026 to July 31, 2027.',
    explanation: 'Standard duration for university rentals in Michigan. No issues.',
    verdict: 'Normal',
  },
  {
    status: 'green',
    title: 'Monthly Rent',
    text: '$875/mo, due on the 1st of each month.',
    explanation: 'Reasonable market price for the area. No hidden fees mentioned.',
    verdict: 'Normal',
  },
  {
    status: 'yellow',
    title: 'Security Deposit',
    text: '$1,750 (2 months rent).',
    explanation:
      'In Michigan, the legal maximum deposit is 1.5 months rent. This deposit exceeds that limit — ask them to correct it before signing.',
    verdict: 'Problematic',
  },
  {
    status: 'yellow',
    title: 'Late Payment Fee',
    text: '$80 if payment arrives after the 5th.',
    explanation:
      'Late fees are allowed in Michigan, but $80 is high. Try to negotiate it down to $25–$50.',
    verdict: 'Negotiable',
  },
  {
    status: 'green',
    title: 'Repair Responsibility',
    text: 'Landlord is responsible for maintaining the property in habitable condition.',
    explanation:
      'Correct. Michigan law requires landlords to maintain minimum habitability standards.',
    verdict: 'Normal',
  },
  {
    status: 'red',
    title: 'Entry Without Notice',
    text: 'The landlord may enter the property at any time without prior notification.',
    explanation:
      'Illegal in Michigan. The law (MCL 554.139) requires at least 24 hours notice except in emergencies. This clause is void even if you sign it.',
    verdict: 'Illegal',
  },
  {
    status: 'red',
    title: 'Waiver of Habitability Rights',
    text: 'Tenant waives any claim related to the condition of the premises.',
    explanation:
      'Invalid clause under Michigan law. You cannot waive basic habitability rights — even if you sign it, it has no legal effect.',
    verdict: 'Illegal',
  },
  {
    status: 'green',
    title: 'Pet Policy',
    text: 'No pets allowed without written authorization from the landlord.',
    explanation: 'Common and completely legal restriction. Request written permission if you have a pet.',
    verdict: 'Normal',
  },
]

const statusConfig = {
  green:  { borderColor: '#38a169', badge: 'bg-green-100 text-green-800', dot: 'bg-safe' },
  yellow: { borderColor: '#d69e2e', badge: 'bg-yellow-100 text-yellow-800', dot: 'bg-caution' },
  red:    { borderColor: '#e53e3e', badge: 'bg-red-100 text-red-800', dot: 'bg-danger' },
}

function Summary({ clauses }) {
  const counts = { green: 0, yellow: 0, red: 0 }
  clauses.forEach((c) => counts[c.status]++)
  return (
    <div className="flex gap-4 flex-wrap mb-6">
      {[
        { key: 'green',  label: 'Normal',     color: 'text-safe',    bg: 'bg-green-50',  border: '#38a169' },
        { key: 'yellow', label: 'Caution',    color: 'text-caution', bg: 'bg-yellow-50', border: '#d69e2e' },
        { key: 'red',    label: 'Alert',      color: 'text-danger',  bg: 'bg-red-50',    border: '#e53e3e' },
      ].map(({ key, label, color, bg, border }) => (
        <div
          key={key}
          className={`${bg} px-5 py-4 text-center min-w-[100px] border-l-4 shadow-sm`}
          style={{ borderLeftColor: border, borderWidth: '1px', borderLeftWidth: '4px', borderColor: '#e2e8f0' }}
        >
          <div className={`text-3xl font-black ${color}`}>{counts[key]}</div>
          <div className="text-xs text-gray-500 mt-0.5 font-medium">{label}</div>
        </div>
      ))}
    </div>
  )
}

export default function AnalyzeLease() {
  const [text, setText] = useState('')
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)

  function analyze() {
    if (!text.trim()) return
    setLoading(true)
    setResult(null)
    setTimeout(() => {
      setResult(MOCK_CLAUSES)
      setLoading(false)
    }, 1400)
  }

  return (
    <Layout>
      <div className="max-w-3xl mx-auto px-4 py-10">
        <h1 className="text-2xl font-bold text-primary mb-1">Analyze my Lease</h1>
        <p className="text-gray-500 mb-6 text-sm">
          Paste your lease text. We analyze each key clause against Michigan law.
        </p>

        <textarea
          className="w-full border border-gray-300 p-4 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-primary resize-none bg-white"
          rows={10}
          placeholder="Paste your rental lease text here..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />

        <button
          onClick={analyze}
          disabled={!text.trim() || loading}
          className="mt-4 w-full sm:w-auto bg-primary text-white font-bold px-8 py-3 hover:bg-blue-900 transition disabled:opacity-40 disabled:cursor-not-allowed"
        >
          {loading ? 'Analyzing...' : 'Analyze Lease'}
        </button>

        {loading && (
          <div className="mt-8 text-center text-gray-400 text-sm animate-pulse">
            Reviewing clauses...
          </div>
        )}

        {result && (
          <div className="mt-8 animate-fade-in">
            <h2 className="font-bold text-gray-800 mb-4">Lease Summary</h2>
            <Summary clauses={result} />

            <div className="space-y-3">
              {result.map((clause, i) => {
                const c = statusConfig[clause.status]
                return (
                  <div
                    key={i}
                    className="bg-white border border-gray-200 border-l-4 p-5 shadow-sm animate-fade-in"
                    style={{ borderLeftColor: c.borderColor, animationDelay: `${i * 60}ms` }}
                  >
                    <div className="flex items-start justify-between gap-3 mb-2">
                      <div className="flex items-center gap-2">
                        <span className={`w-2.5 h-2.5 rounded-full flex-shrink-0 mt-0.5 ${c.dot}`} />
                        <h3 className="font-semibold text-gray-800 text-sm">{clause.title}</h3>
                      </div>
                      <span className={`text-xs font-semibold px-2 py-0.5 flex-shrink-0 ${c.badge}`}>
                        {clause.verdict}
                      </span>
                    </div>
                    <p className="text-xs text-gray-500 italic mb-2 pl-4">"{clause.text}"</p>
                    <p className="text-sm text-gray-700 pl-4">{clause.explanation}</p>
                  </div>
                )
              })}
            </div>

            <div className="mt-6 bg-blue-50 border border-blue-200 p-5 text-sm text-blue-800 animate-fade-in">
              <strong>Next steps:</strong> This lease has 2 illegal clauses. Before signing, request in writing
              that they be removed or corrected. If the landlord refuses, contact Student Legal Services or
              Michigan Legal Help.
            </div>
          </div>
        )}
      </div>
    </Layout>
  )
}
