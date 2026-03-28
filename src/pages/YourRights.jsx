import { useState } from 'react'
import Layout from '../components/Layout'

const SITUATIONS = [
  {
    id: 'deposito',
    label: "They won't return my security deposit",
    icon: '💰',
    law: {
      title: 'MCL 554.602 — Security Deposits',
      text: 'In Michigan, your landlord has exactly 30 days after you move out to either return your deposit or send you a written itemized list of deductions with amounts and reasons. If they miss this deadline, they lose the right to keep any part of the deposit. You can sue in Small Claims Court for double the deposit amount.',
    },
    steps: [
      'Document the apartment condition with photos and videos on your move-out day. Email them to your landlord immediately.',
      'Request the deposit in writing (email or certified letter with return receipt). Keep a copy and note the date.',
      'If you receive no deposit and no itemized deductions list within 30 days, the landlord has forfeited the right to keep it.',
      'Send a final demand letter giving an additional 7 days to pay.',
      'If no response, file a claim in Small Claims Court (max. $6,500). You can claim double the deposit plus court costs.',
    ],
    resources: [
      { label: 'Michigan Legal Help — Security Deposits', url: 'https://michiganlegalhelp.org/resource/security-deposits' },
      { label: 'Small Claims Court — Washtenaw County', url: 'https://www.washtenaw.org/1025/Small-Claims' },
      { label: 'Legal Aid & Defender (Ann Arbor): (734) 971-6053', url: 'https://legalaidanddefender.org' },
      { label: 'Student Legal Services U-M: (734) 763-9920', url: 'https://studentlegalservices.umich.edu' },
    ],
    cta: { label: 'Analyze my lease with CasaSegura', href: '/contrato' },
  },
  {
    id: 'reparaciones',
    label: "My landlord won't fix anything",
    icon: '🔧',
    law: {
      title: 'MCL 554.139 — Implied Warranty of Habitability',
      text: 'Michigan law requires landlords to keep your home habitable: working hot and cold water, functioning heat, safe structure, no pest infestations, and working doors and windows. This obligation cannot be waived in the lease. If your landlord fails to comply, you have the right to withhold rent (by depositing it with the court) or terminate the lease.',
    },
    steps: [
      'Report the problem in writing (email or letter) including the date. Always follow up phone calls with a written record.',
      'Your landlord has a reasonable timeframe: 24–48 hours for emergencies (no heat, water leak), 7–14 days for non-urgent issues.',
      'If they do not act, request an official inspection from the City of Ann Arbor Building & Rental Inspection: (734) 794-6000.',
      'With the inspection report in hand, contact Legal Aid to begin the rent escrow process (depositing rent with the court).',
      'As a last resort, and with legal advice, you may be able to break the lease without penalty if the property is uninhabitable.',
    ],
    resources: [
      { label: 'Michigan Legal Help — Habitability', url: 'https://michiganlegalhelp.org/resource/landlord-duties-to-repair' },
      { label: 'Ann Arbor Building & Rental Inspection: (734) 794-6000', url: 'https://www.a2gov.org/departments/building/Pages/default.aspx' },
      { label: 'Legal Aid & Defender (free): (734) 971-6053', url: 'https://legalaidanddefender.org' },
      { label: 'Student Legal Services U-M: (734) 763-9920', url: 'https://studentlegalservices.umich.edu' },
    ],
    cta: { label: 'Request an inspection — a2gov.org', href: 'https://www.a2gov.org/departments/building/Pages/default.aspx' },
  },
  {
    id: 'desahucio',
    label: "They're trying to evict me without notice",
    icon: '🚪',
    law: {
      title: 'MCL 600.5714 — Summary Proceedings to Recover Possession',
      text: 'No one can remove you from your home without following a legal process. Your landlord must first give you written notice (7 days for non-payment of rent, 30 days if the lease has ended or is month-to-month). They must then file a lawsuit, you receive a court summons, and you have the right to defend yourself at the hearing. Until a judge signs an eviction order, you cannot be removed. Changing your locks or cutting off utilities without a court order is illegal.',
    },
    steps: [
      "If you receive a written notice, don't ignore it. Read the date and the reason. You have the right to respond.",
      'If the issue is unpaid rent and you can pay, do so within the 7-day notice period to stop the process.',
      'If your locks are changed or water/electricity is cut off without a court order, call 911 — this is an illegal eviction.',
      "If you receive a court summons, attend the hearing. If you don't show up, the judge will automatically rule against you.",
      'Contact Legal Aid immediately to get representation or advice before the hearing.',
    ],
    resources: [
      { label: 'Michigan Legal Help — Eviction', url: 'https://michiganlegalhelp.org/resource/eviction' },
      { label: 'Legal Aid & Defender (urgent): (734) 971-6053', url: 'https://legalaidanddefender.org' },
      { label: 'Housing Crisis Hotline 211 (24h)', url: 'https://www.211.org' },
      { label: 'Avalon Housing (emergency help): (734) 961-1999', url: 'https://avalonhousing.org' },
    ],
    cta: { label: 'Call Legal Aid now — (734) 971-6053', href: 'tel:7349716053' },
  },
  {
    id: 'discriminacion',
    label: 'I think there is discrimination',
    icon: '⚖️',
    law: {
      title: 'Elliott-Larsen Civil Rights Act / Fair Housing Act',
      text: 'It is illegal to reject, overcharge, or treat you differently as a tenant based on race, color, religion, national origin, sex, familial status, or disability (federal law). Michigan adds protection for marital status and age. Ann Arbor also protects sexual orientation and gender identity. You can file a complaint with the state or with HUD — it is completely free and you do not need a lawyer.',
    },
    steps: [
      'Document everything from the start: save listings, emails, text messages, and notes with dates and witnesses.',
      'Write down exactly what was said or done, when it happened, and who was present.',
      'File a complaint with the Michigan Dept. of Civil Rights (MDCR) — deadline: 180 days from the incident.',
      'You can also file with HUD at the same time — deadline: 1 year from the incident. Call 1-800-669-9777.',
      'Consult Legal Aid or Student Legal Services to assess whether you also have a civil lawsuit.',
    ],
    resources: [
      { label: 'Michigan Dept. of Civil Rights — mdcr.michigan.gov', url: 'https://www.michigan.gov/mdcr' },
      { label: 'HUD Fair Housing — hud.gov', url: 'https://www.hud.gov/fairhousing' },
      { label: 'HUD Free Hotline: 1-800-669-9777', url: 'tel:18006699777' },
      { label: 'Legal Aid & Defender: (734) 971-6053', url: 'https://legalaidanddefender.org' },
    ],
    cta: { label: 'File a complaint with HUD', href: 'https://www.hud.gov/fairhousing/fileacomplaint' },
  },
  {
    id: 'contrato',
    label: "I don't understand my lease",
    icon: '📄',
    law: {
      title: 'Your right to understand what you sign',
      text: 'There is no law requiring leases to be in your language, but you have the right to ask for time to review any document before signing. Abusive clauses — eliminating your legal rights, hidden fees, deposit waiver clauses — may be unenforceable even if they appear in the lease. In Michigan, no contract can strip away the minimum rights guaranteed by law.',
    },
    steps: [
      "Never sign under pressure. Ask for at least 24–48 hours to review the lease carefully.",
      'Use CasaSegura to analyze the main clauses and spot potential issues.',
      'Pay close attention to: lease duration, deposit policy, who pays utilities, automatic renewal clauses, and early termination penalties.',
      "If anything is unclear, ask your landlord to explain it in writing (email).",
      'Student Legal Services at U-M will review leases for free for students before signing.',
    ],
    resources: [
      { label: 'Michigan Legal Help — Rental Agreements', url: 'https://michiganlegalhelp.org/resource/rental-agreements' },
      { label: 'Student Legal Services U-M: (734) 763-9920', url: 'https://studentlegalservices.umich.edu' },
      { label: 'Analyze my lease with CasaSegura', url: '/contrato' },
    ],
    cta: { label: 'Analyze my lease with AI', href: '/contrato' },
  },
  {
    id: 'entrada',
    label: 'My landlord enters without permission',
    icon: '🔑',
    law: {
      title: 'MCL 554.134 — Right of Entry',
      text: 'In Michigan, your landlord must give you reasonable advance notice (generally 24 hours) before entering your apartment, except in genuine emergencies (fire, flood). Entering without notice or consent violates your right to quiet enjoyment and peaceful possession, and may constitute trespassing. You have the right to break the lease if unauthorized entries are frequent.',
    },
    steps: [
      'Record every unauthorized entry: date, time, and stated reason. Take photos if there is evidence.',
      'Notify your landlord in writing (email) reminding them of the 24-hour notice requirement.',
      'If entries continue, send a formal warning letter stating that you are considering terminating the lease.',
      'Install a security camera inside your home (legal if you live there).',
      'If the problem persists, consult Legal Aid about terminating the lease without penalty or seeking a court order.',
    ],
    resources: [
      { label: "Michigan Legal Help — Tenant's Right to Privacy", url: 'https://michiganlegalhelp.org/resource/tenants-right-to-privacy' },
      { label: 'Student Legal Services U-M: (734) 763-9920', url: 'https://studentlegalservices.umich.edu' },
      { label: 'Legal Aid & Defender: (734) 971-6053', url: 'https://legalaidanddefender.org' },
      { label: 'Ann Arbor Police (if urgent): (734) 794-6920', url: 'tel:7347946920' },
    ],
    cta: { label: 'Get a free consultation with Legal Aid', href: 'https://legalaidanddefender.org' },
  },
  {
    id: 'ruptura',
    label: 'I want to break my lease',
    icon: '📝',
    law: {
      title: 'MCL 554.601b — Early Lease Termination',
      text: 'Breaking a lease early can have costs, but Michigan law allows you to leave without penalty in specific situations: if the property is uninhabitable, if you are a victim of domestic violence or sexual harassment (with documentation), if you are joining the military (Servicemembers Civil Relief Act), or if the landlord has seriously violated the lease (e.g., repeated unauthorized entry).',
    },
    steps: [
      'Read your lease: find the early termination clause, the required notice period, and any penalties.',
      'Evaluate whether your situation qualifies for a legal exception (uninhabitable, domestic violence, military service).',
      'Notify your landlord in writing with the notice period stated in your lease (usually 30–60 days).',
      'Actively look for a subtenant to minimize the landlord\'s losses — in Michigan you have a duty to "mitigate damages."',
      'Consult Student Legal Services or Legal Aid before paying any penalty.',
    ],
    resources: [
      { label: 'Michigan Legal Help — Breaking Your Lease', url: 'https://michiganlegalhelp.org/resource/breaking-your-lease' },
      { label: 'Student Legal Services U-M: (734) 763-9920', url: 'https://studentlegalservices.umich.edu' },
      { label: 'Legal Aid & Defender: (734) 971-6053', url: 'https://legalaidanddefender.org' },
      { label: 'Analyze my lease with CasaSegura', url: '/contrato' },
    ],
    cta: { label: 'Analyze my lease clauses', href: '/contrato' },
  },
  {
    id: 'companeros',
    label: 'Problems with roommates',
    icon: '🏠',
    law: {
      title: 'Joint and several liability in shared leases',
      text: 'If all roommates signed the same lease ("joint tenancy"), each person is 100% responsible for the full rent to the landlord — if one person does not pay, the others must cover it. If you have an individual lease for your room, your responsibility is limited to your share. Michigan does not have a specific co-tenancy law, but courts can resolve disputes over verbal or written agreements between roommates.',
    },
    steps: [
      'Always sign a written roommate agreement covering rent, shared expenses, house rules, and what happens if someone leaves.',
      'If there is a rent dispute, communicate in writing (email or text) to keep a record.',
      'If a roommate wants to leave, review the lease — everyone must agree if they all signed together.',
      'To add or remove a roommate from the lease, you need written approval from the landlord.',
      'If the conflict is serious, the free mediation service at the Washtenaw Dispute Resolution Center can help before going to court.',
    ],
    resources: [
      { label: 'Michigan Legal Help — Roommates', url: 'https://michiganlegalhelp.org/resource/roommates' },
      { label: 'Dispute Resolution Center (free mediation): (734) 794-6600', url: 'https://www.washtenaw.org/738/Dispute-Resolution-Center' },
      { label: 'Student Legal Services U-M: (734) 763-9920', url: 'https://studentlegalservices.umich.edu' },
      { label: 'Legal Aid & Defender: (734) 971-6053', url: 'https://legalaidanddefender.org' },
    ],
    cta: { label: 'Request free mediation', href: 'https://www.washtenaw.org/738/Dispute-Resolution-Center' },
  },
]

function SituationDetail({ situation, onClose }) {
  return (
    <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden mt-2">
      {/* Header */}
      <div className="bg-primary text-white px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-2xl">{situation.icon}</span>
          <h2 className="font-bold text-lg leading-tight">{situation.label}</h2>
        </div>
        <button
          onClick={onClose}
          className="text-blue-200 hover:text-white transition text-xl font-bold leading-none"
          aria-label="Close"
        >
          ✕
        </button>
      </div>

      <div className="p-6 space-y-6">
        {/* Section A: What the law says */}
        <section>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-base">📖</span>
            <h3 className="font-bold text-gray-800">What the law says</h3>
          </div>
          <div className="bg-blue-50 border border-blue-100 rounded-xl p-4">
            <p className="text-xs font-semibold text-primary mb-2">{situation.law.title}</p>
            <p className="text-sm text-gray-700 leading-relaxed">{situation.law.text}</p>
          </div>
        </section>

        {/* Section B: Step by step */}
        <section>
          <div className="flex items-center gap-2 mb-3">
            <span className="text-base">🪜</span>
            <h3 className="font-bold text-gray-800">What to do step by step</h3>
          </div>
          <ol className="space-y-3">
            {situation.steps.map((step, i) => (
              <li key={i} className="flex gap-3">
                <span className="w-6 h-6 rounded-full bg-primary text-white text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
                  {i + 1}
                </span>
                <p className="text-sm text-gray-700 leading-relaxed">{step}</p>
              </li>
            ))}
          </ol>
        </section>

        {/* Section C: Resources in Ann Arbor */}
        <section>
          <div className="flex items-center gap-2 mb-3">
            <span className="text-base">📍</span>
            <h3 className="font-bold text-gray-800">Resources in Ann Arbor</h3>
          </div>
          <ul className="space-y-2">
            {situation.resources.map((r, i) => (
              <li key={i} className="flex items-start gap-2 text-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0 mt-2" />
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
        </section>

        {/* Section D: CTA button */}
        <div className="pt-2">
          <a
            href={situation.cta.href}
            target={situation.cta.href.startsWith('http') ? '_blank' : undefined}
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-primary text-white text-sm font-semibold px-5 py-3 rounded-xl hover:bg-blue-700 transition"
          >
            {situation.cta.label} →
          </a>
        </div>
      </div>
    </div>
  )
}

export default function YourRights() {
  const [activeId, setActiveId] = useState(null)
  const activeSituation = SITUATIONS.find((s) => s.id === activeId)

  function toggle(id) {
    setActiveId((prev) => (prev === id ? null : id))
  }

  return (
    <Layout>
      <div className="max-w-3xl mx-auto px-4 py-10">
        <h1 className="text-2xl font-bold text-primary mb-1">Your Rights as a Tenant</h1>
        <p className="text-gray-500 mb-8 text-sm">
          Select your situation to see your rights, the steps to take, and resources in Ann Arbor.
        </p>

        {/* Card grid */}
        <div className="grid sm:grid-cols-2 gap-3 mb-4">
          {SITUATIONS.map((s) => {
            const isActive = activeId === s.id
            return (
              <button
                key={s.id}
                onClick={() => toggle(s.id)}
                className={`flex items-center gap-3 px-4 py-4 rounded-xl border-2 text-left font-medium transition ${
                  isActive
                    ? 'border-primary bg-primary text-white'
                    : 'border-gray-200 bg-white text-gray-800 hover:border-primary hover:bg-blue-50'
                }`}
              >
                <span className="text-2xl">{s.icon}</span>
                <span className="text-sm leading-snug">{s.label}</span>
                <span className={`ml-auto text-lg leading-none ${isActive ? 'text-white' : 'text-gray-300'}`}>
                  {isActive ? '▲' : '▼'}
                </span>
              </button>
            )
          })}
        </div>

        {/* Expanded detail */}
        {activeSituation && (
          <SituationDetail situation={activeSituation} onClose={() => setActiveId(null)} />
        )}

        {/* Disclaimer */}
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-xl p-5 text-sm text-blue-800">
          <strong>Remember:</strong> This information is for guidance only and is based on Michigan law. For your specific situation, consult{' '}
          <a
            href="https://legalaidanddefender.org"
            target="_blank"
            rel="noopener noreferrer"
            className="underline font-medium"
          >
            Legal Aid &amp; Defender
          </a>{' '}
          or{' '}
          <a
            href="https://studentlegalservices.umich.edu"
            target="_blank"
            rel="noopener noreferrer"
            className="underline font-medium"
          >
            Student Legal Services
          </a>
          .
        </div>
      </div>
    </Layout>
  )
}