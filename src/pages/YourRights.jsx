import { useState } from 'react'
import Layout from '../components/Layout'

const SITUATIONS = [
  {
    id: 'deposit',
    label: "Landlord won't return my deposit",
    icon: '💰',
    steps: [
      'In Michigan, your landlord has 30 days after you move out to return your deposit.',
      'If they make deductions, they must send you an itemized list in writing within that 30-day window.',
      'Send a certified letter (return receipt) demanding repayment. Keep a copy.',
      'If no response within 7 additional days, you can sue in Small Claims Court for up to double the deposit.',
      'Always document the apartment condition with photos/video on move-out day.',
    ],
    resources: [
      { label: 'Michigan Legal Help', url: 'https://michiganlegalhelp.org' },
      { label: 'Small Claims Court — filing fee: $30–$70', url: null },
      { label: 'Student Legal Services (check your university)', url: null },
    ],
    law: 'MCL 554.602 — Security Deposits',
  },
  {
    id: 'repairs',
    label: "Landlord won't make repairs",
    icon: '🔧',
    steps: [
      'Your landlord is legally required to keep the property habitable (hot water, heat, safe structure).',
      'Notify them of the problem in writing (email or letter) and keep the dated record.',
      'The landlord must fix it in a reasonable time — typically 7–14 days for non-urgent issues.',
      'If they don\'t act, you may be able to withhold rent by paying it into escrow through the court.',
      'Contact your city or county to request an official housing inspection.',
    ],
    resources: [
      { label: 'Michigan Legal Help — habitability', url: 'https://michiganlegalhelp.org' },
      { label: 'Your city\'s Building Inspection Department', url: null },
      { label: 'Student Legal Services (if enrolled at a university)', url: null },
    ],
    law: 'MCL 554.139 — Implied warranty of habitability',
  },
  {
    id: 'eviction',
    label: 'Being evicted without notice',
    icon: '🚪',
    steps: [
      'In Michigan, your landlord MUST give written notice before starting eviction proceedings.',
      'Minimum notice: 7 days for non-payment, 30 days for end of lease or month-to-month.',
      'Until a judge issues a court order, no one can remove you or change the locks illegally.',
      'If the landlord changes locks or cuts utilities without a court order, it\'s illegal — call the police.',
      'Attend any court hearing you receive a summons for. You have the right to defend yourself.',
    ],
    resources: [
      { label: 'Michigan Legal Help — Eviction', url: 'https://michiganlegalhelp.org' },
      { label: 'Housing emergency line: 2-1-1', url: null },
      { label: 'Free legal aid: Legal Aid & Defender', url: null },
    ],
    law: 'MCL 600.5714 — Summary proceedings to recover possession',
  },
  {
    id: 'discrimination',
    label: 'Discrimination',
    icon: '⚖️',
    steps: [
      'It is illegal to deny housing based on race, color, religion, national origin, sex, familial status, or disability.',
      'Michigan also protects against discrimination based on marital status and age (Elliott-Larsen Civil Rights Act).',
      'Document everything: save listings, emails, texts, and any communications.',
      'File a complaint with the Michigan Department of Civil Rights (MDCR) — it\'s free.',
      'You can also file with the federal HUD (Housing and Urban Development).',
    ],
    resources: [
      { label: 'Michigan Dept. of Civil Rights — michigan.gov/mdcr', url: 'https://www.michigan.gov/mdcr' },
      { label: 'HUD Fair Housing — hud.gov', url: 'https://www.hud.gov/fairhousing' },
      { label: 'Free HUD hotline: 1-800-669-9777', url: null },
    ],
    law: 'Elliott-Larsen Civil Rights Act / Fair Housing Act',
  },
  {
    id: 'contract',
    label: "I don't understand my lease",
    icon: '📄',
    steps: [
      'Never sign something you don\'t understand — ask for time to review it carefully.',
      'Use CasaSegura to analyze the key clauses (see "Analyze Lease" section).',
      'Many universities offer free Student Legal Services to review contracts.',
      'Michigan Legal Help has plain-English guides on what to look for in a lease.',
      'You can ask the landlord to explain any clause before you sign.',
    ],
    resources: [
      { label: 'Michigan Legal Help', url: 'https://michiganlegalhelp.org' },
      { label: 'Student Legal Services (check your university)', url: null },
      { label: 'Analyze my lease with CasaSegura', url: '/contrato' },
    ],
    law: 'You have the right to understand what you sign.',
  },
]

export default function YourRights() {
  const [active, setActive] = useState(null)

  const situation = SITUATIONS.find((s) => s.id === active)

  return (
    <Layout>
      <div className="max-w-3xl mx-auto px-4 py-10">
        <h1 className="text-2xl font-bold text-primary mb-1">Your Tenant Rights</h1>
        <p className="text-gray-500 mb-8 text-sm">Select your situation to see what steps to take.</p>

        <div className="grid sm:grid-cols-2 gap-3 mb-8">
          {SITUATIONS.map((s) => (
            <button
              key={s.id}
              onClick={() => setActive(active === s.id ? null : s.id)}
              className={`flex items-center gap-3 px-4 py-4 rounded-xl border-2 text-left font-medium transition ${
                active === s.id
                  ? 'border-primary bg-primary text-white'
                  : 'border-gray-200 bg-white text-gray-800 hover:border-primary hover:bg-blue-50'
              }`}
            >
              <span className="text-2xl">{s.icon}</span>
              <span className="text-sm">{s.label}</span>
            </button>
          ))}
        </div>

        {situation && (
          <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
            <div className="bg-primary text-white px-6 py-4">
              <div className="flex items-center gap-3">
                <span className="text-2xl">{situation.icon}</span>
                <div>
                  <h2 className="font-bold text-lg">{situation.label}</h2>
                  <p className="text-blue-200 text-xs mt-0.5">Law: {situation.law}</p>
                </div>
              </div>
            </div>

            <div className="p-6">
              <h3 className="font-bold text-gray-800 mb-4">Steps to Take</h3>
              <ol className="space-y-3 mb-6">
                {situation.steps.map((step, i) => (
                  <li key={i} className="flex gap-3">
                    <span className="w-6 h-6 rounded-full bg-primary text-white text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
                      {i + 1}
                    </span>
                    <p className="text-sm text-gray-700 leading-relaxed">{step}</p>
                  </li>
                ))}
              </ol>

              <div className="border-t border-gray-100 pt-5">
                <h3 className="font-bold text-gray-800 mb-3">Helpful Resources</h3>
                <ul className="space-y-2">
                  {situation.resources.map((r, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                      {r.url ? (
                        <a
                          href={r.url}
                          target={r.url.startsWith('http') ? '_blank' : undefined}
                          rel="noopener noreferrer"
                          className="text-primary font-medium hover:underline"
                        >
                          {r.label}
                        </a>
                      ) : (
                        <span className="text-gray-700">{r.label}</span>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}

        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-xl p-5 text-sm text-blue-800">
          <strong>Reminder:</strong> This information is based on Michigan law and is for general guidance only. For your specific situation, consult a lawyer or your university's Student Legal Services.
        </div>
      </div>
    </Layout>
  )
}
