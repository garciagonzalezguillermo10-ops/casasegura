import { useState } from 'react'
import Layout from '../components/Layout'

const SITUATIONS = [
  {
    id: 'deposit',
    label: "They won't return my deposit",
    icon: '💰',
    steps: [
      'In Michigan you have the right to receive your deposit within 30 days of moving out.',
      'If deductions are made, the landlord must send you a detailed written list within that period.',
      'Send a certified letter (return receipt) demanding the return. Keep a copy.',
      'If no response within 7 additional days, you can sue in Small Claims Court for up to double the deposit.',
      'Always document the apartment condition with photos and videos on move-out day.',
    ],
    resources: [
      { label: 'Michigan Legal Help', url: 'https://michiganlegalhelp.org' },
      { label: 'Certified letter template', url: null },
      { label: 'Small Claims Court — cost: $30–$70', url: null },
    ],
    law: 'MCL 554.602 — Security Deposits',
  },
  {
    id: 'repairs',
    label: "Landlord won't make repairs",
    icon: '🔧',
    steps: [
      'Landlords are legally required to maintain the property in habitable condition (hot water, heat, safe structure).',
      'Notify the issue in writing (email or letter) and keep a dated record.',
      'Landlord must fix it in a reasonable time — usually 7–14 days for non-urgent issues.',
      'If they don\'t act, you may withhold rent by paying it into court escrow while the dispute is resolved.',
      'Contact the city or county to request an official housing inspection.',
    ],
    resources: [
      { label: 'Michigan Legal Help — habitability', url: 'https://michiganlegalhelp.org' },
      { label: 'Your city or county inspection department', url: null },
      { label: 'Student Legal Services (if you\'re a student)', url: null },
    ],
    law: 'MCL 554.139 — Implied warranty of habitability',
  },
  {
    id: 'eviction',
    label: 'Being evicted without notice',
    icon: '🚪',
    steps: [
      'In Michigan, landlords MUST give written notice before starting an eviction.',
      'Minimum notice: 7 days for non-payment, 30 days for end of lease, 30 days for month-to-month.',
      'Until a judge issues an order, no one can remove you or change the locks illegally.',
      'If your locks are changed or utilities cut without a court order, it\'s an illegal eviction — call police.',
      'Attend the court hearing if you receive a summons. You have the right to defend yourself.',
    ],
    resources: [
      { label: 'Michigan Legal Help — Eviction', url: 'https://michiganlegalhelp.org' },
      { label: 'Housing emergency line: 211', url: null },
      { label: 'Free legal aid: Legal Aid & Defender', url: null },
    ],
    law: 'MCL 600.5714 — Summary proceedings to recover possession',
  },
  {
    id: 'discrimination',
    label: 'Discrimination',
    icon: '⚖️',
    steps: [
      'It is illegal to reject you as a tenant based on race, color, religion, national origin, sex, family status, or disability.',
      'Michigan also protects based on marital status and age (Elliott-Larsen Civil Rights Act).',
      'Document everything: save listings, emails, texts, and any communication.',
      'File a complaint with the Michigan Department of Civil Rights (MDCR) — it\'s free.',
      'You can also file a complaint with HUD (Housing and Urban Development) federally.',
    ],
    resources: [
      { label: 'Michigan Dept. of Civil Rights — mdcr.michigan.gov', url: 'https://www.michigan.gov/mdcr' },
      { label: 'HUD Fair Housing — hud.gov', url: 'https://www.hud.gov/fairhousing' },
      { label: 'HUD free hotline: 1-800-669-9777', url: null },
    ],
    law: 'Elliott-Larsen Civil Rights Act / Fair Housing Act',
  },
  {
    id: 'contract',
    label: "I don't understand my lease",
    icon: '📄',
    steps: [
      "Never sign something you don't understand — ask for time to read it carefully.",
      'Use CasaSegura to analyze the main clauses (see "Analyze my Lease" section).',
      'Many universities offer free Student Legal Services to review leases.',
      'Michigan Legal Help has guides on what to look for in a rental lease.',
      'You can ask the landlord to explain any clause before signing.',
    ],
    resources: [
      { label: 'Michigan Legal Help', url: 'https://michiganlegalhelp.org' },
      { label: 'Student Legal Services (check your university)', url: null },
      { label: 'Analyze my lease with CasaSegura', url: '/lease' },
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
        <p className="text-gray-500 mb-8 text-sm">Select your situation to see the steps to take.</p>

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
          <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden animate-fade-in">
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
              <h3 className="font-bold text-gray-800 mb-4">Steps to take</h3>
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
                <h3 className="font-bold text-gray-800 mb-3">Useful resources</h3>
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
          <strong>Remember:</strong> This information is educational and based on Michigan law. For specific
          cases, consult an attorney or Student Legal Services at your university.
        </div>
      </div>
    </Layout>
  )
}
