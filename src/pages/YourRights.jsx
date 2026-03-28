import { useState, useEffect, useRef } from 'react'
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
    letterBody: (fields) =>
      `I am writing to formally demand the return of my security deposit in the amount owed to me following my vacating of the above-referenced property.\n\nUnder Michigan law (MCL 554.602), you are required to return my security deposit or provide a written itemized statement of deductions within 30 days of my move-out date. As of the date of this letter, I have not received either the deposit or a proper itemized statement as required by law.\n\nSpecific issue: ${fields.description}\n\nFailure to comply within the 30-day statutory period results in forfeiture of your right to withhold any portion of the deposit. Under MCL 554.609, I am entitled to recover double the amount of the security deposit if you have wrongfully withheld it.\n\nI hereby demand the full return of my security deposit within 7 days of receiving this letter. If I do not receive payment by that date, I will pursue this matter in Washtenaw County Small Claims Court without further notice.`,
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
    letterBody: (fields) =>
      `I am writing to formally notify you of an unresolved repair issue at the above-referenced property and to request immediate corrective action.\n\nUnder Michigan law (MCL 554.139), you are legally obligated to maintain the rental property in reasonable repair and in a condition fit for habitation. This duty cannot be waived or modified by any lease agreement.\n\nDescription of the issue: ${fields.description}\n\nThis condition directly affects the habitability of my home. I have previously notified you of this problem and no corrective action has been taken within a reasonable timeframe.\n\nI hereby demand that you complete the necessary repairs within 14 days of receiving this letter. If repairs are not completed within this period, I reserve the right to pursue all available legal remedies, including rent withholding through the court escrow process, repair-and-deduct remedies, and lease termination, as provided under Michigan law.`,
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
    letterBody: (fields) =>
      `I am writing in response to what I believe to be an unlawful attempt to remove me from my residence at the above-referenced address.\n\nUnder Michigan law (MCL 600.5714), a landlord may not remove a tenant from a rental property without following proper legal eviction procedures. These procedures require: (1) written notice of the appropriate statutory period, (2) filing an eviction action in court, and (3) a court order signed by a judge. No landlord may resort to self-help measures such as changing locks, removing doors or windows, or shutting off utilities to force a tenant to vacate.\n\nSpecific circumstances: ${fields.description}\n\nI am formally notifying you that I am aware of my legal rights under Michigan law and intend to exercise them fully. Any attempt to remove me without a valid court order will constitute an illegal eviction, which may subject you to civil liability.\n\nI urge you to cease any unlawful eviction activity immediately. If you have a legitimate legal basis for eviction, I expect you to follow the proper statutory procedures.`,
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
    letterBody: (fields) =>
      `I am writing to formally object to what I believe constitutes unlawful housing discrimination in violation of federal and Michigan state law.\n\nThe federal Fair Housing Act (42 U.S.C. § 3604) and the Michigan Elliott-Larsen Civil Rights Act (MCL 37.2502) prohibit discrimination in housing based on race, color, religion, national origin, sex, familial status, disability, marital status, and age. The City of Ann Arbor additionally prohibits discrimination based on sexual orientation and gender identity.\n\nDescription of the discriminatory conduct: ${fields.description}\n\nThis conduct, if not immediately addressed, will be reported to the Michigan Department of Civil Rights (MDCR) and to the U.S. Department of Housing and Urban Development (HUD). Filing a complaint with these agencies is free of charge, and violations of fair housing laws can result in significant civil penalties.\n\nI request that you review this matter and respond in writing within 10 days confirming that this discriminatory conduct will cease immediately.`,
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
    letterBody: (fields) =>
      `I am writing to formally request clarification on specific clauses within my lease agreement for the above-referenced property before I proceed with signing.\n\nAs a prospective tenant, I have the right to fully understand any document I am asked to sign. I have reviewed the proposed lease and have identified provisions that I find unclear or potentially inconsistent with Michigan law. Under Michigan statutes, any lease clause that waives a tenant's statutory rights (such as habitability standards under MCL 554.139 or proper notice requirements under MCL 554.134) is unenforceable regardless of whether it is signed.\n\nSpecific clause or concern requiring clarification: ${fields.description}\n\nI respectfully request a written explanation of this provision, and if applicable, a revised version of the lease that complies with Michigan law. I am prepared to sign the agreement once I have received satisfactory clarification.\n\nThank you for your cooperation. I look forward to your written response within 5 business days.`,
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
    letterBody: (fields) =>
      `I am writing to formally notify you that your recent entry or entries into my rental unit at the above-referenced address have violated my legal rights under Michigan law and must cease immediately.\n\nUnder MCL 554.134 and the common law covenant of quiet enjoyment, a landlord may not enter a tenant's dwelling without providing reasonable advance notice — generally understood to be at least 24 hours — except in the case of a genuine emergency such as fire or flooding. Entering without notice or consent may constitute trespassing and a breach of the lease agreement.\n\nSpecific incidents: ${fields.description}\n\nI am formally demanding that you comply with the 24-hour advance notice requirement for all future entries. Please confirm in writing that you will respect this legal requirement going forward.\n\nIf unauthorized entries continue after this written notice, I reserve the right to pursue all available legal remedies, including termination of the lease without penalty, filing a complaint with local authorities, and seeking damages through the courts.`,
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
    letterBody: (fields) =>
      `I am writing to formally notify you of my intent to terminate my lease agreement for the above-referenced property prior to its scheduled end date.\n\nReason for early termination: ${fields.description}\n\nUnder Michigan law (MCL 554.601b), tenants may terminate a lease early without penalty under certain qualifying circumstances, including uninhabitable conditions, domestic violence, or serious landlord violations. Additionally, under the general duty to mitigate damages recognized by Michigan courts, I am actively seeking a qualified replacement tenant to minimize any financial impact on you.\n\nPursuant to my lease agreement and applicable Michigan law, I am providing the required advance written notice of my intention to vacate. I request that we work together in good faith to arrange a final inspection, the return of my security deposit per MCL 554.602, and an orderly transition.\n\nPlease respond in writing within 7 days to confirm receipt of this notice and to arrange next steps.`,
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
    letterBody: (fields) =>
      `I am writing regarding an ongoing dispute related to our co-tenancy at the above-referenced property that requires your attention and, if applicable, your formal involvement as the landlord.\n\nUnder our lease agreement, all co-tenants are jointly and severally liable for the terms of the tenancy. Michigan courts recognize both written and verbal agreements between co-tenants as legally binding, and disputes that cannot be resolved between tenants may be subject to civil court proceedings or mediation.\n\nDescription of the issue: ${fields.description}\n\nI am requesting your assistance in resolving this matter, including clarification of the lease obligations of each co-tenant and, if necessary, your written consent to any changes to the occupancy arrangement. I am also prepared to pursue free mediation through the Washtenaw County Dispute Resolution Center at (734) 794-6600 if all parties agree.\n\nPlease respond in writing within 7 days so we may work toward a fair and lawful resolution.`,
  },
]

function generateLetter(situation, fields) {
  const today = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
  const body = situation.letterBody(fields)

  return `${today}

${fields.tenantName}
${fields.address}

To: ${fields.landlordName} (Landlord)
Re: ${situation.label}
Property Address: ${fields.address}

Dear ${fields.landlordName},

${body}

I am sending this letter as a formal written record of my concerns. I strongly advise you to seek legal counsel if you are uncertain of your obligations under Michigan law.

Sincerely,

${fields.tenantName}

---
Note: This letter was generated with CasaSegura for informational purposes. It does not constitute legal advice. For your specific situation, contact Legal Aid & Defender at (734) 971-6053 or Student Legal Services at (734) 763-9920.`
}

function LetterModal({ situation, onClose }) {
  const [fields, setFields] = useState({ tenantName: '', landlordName: '', address: '', description: '' })
  const [letter, setLetter] = useState(null)
  const [copied, setCopied] = useState(false)
  const modalRef = useRef(null)

  useEffect(() => {
    function handleKey(e) { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', handleKey)
    return () => document.removeEventListener('keydown', handleKey)
  }, [onClose])

  function handleBackdrop(e) {
    if (modalRef.current && !modalRef.current.contains(e.target)) onClose()
  }

  function handleGenerate(e) {
    e.preventDefault()
    setLetter(generateLetter(situation, fields))
    setCopied(false)
  }

  function handleCopy() {
    navigator.clipboard.writeText(letter).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  function handleDownload() {
    const blob = new Blob([letter], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `letter-${situation.id}.txt`
    a.click()
    URL.revokeObjectURL(url)
  }

  const allFilled = fields.tenantName && fields.landlordName && fields.address && fields.description

  return (
    <div
      className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
      onMouseDown={handleBackdrop}
    >
      <div
        ref={modalRef}
        className="bg-white rounded-2xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
      >
        {/* Modal header */}
        <div className="bg-primary text-white px-6 py-4 flex items-center justify-between rounded-t-2xl">
          <div>
            <h2 className="font-bold text-lg">Generate Letter to My Landlord</h2>
            <p className="text-blue-200 text-xs mt-0.5">{situation.label}</p>
          </div>
          <button onClick={onClose} className="text-blue-200 hover:text-white text-xl font-bold leading-none">✕</button>
        </div>

        <div className="p-6">
          {!letter ? (
            <form onSubmit={handleGenerate} className="space-y-4">
              <p className="text-sm text-gray-500 mb-2">
                Fill in your details below. This letter will cite the relevant Michigan law for your situation. No data is stored or sent anywhere.
              </p>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Your full name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Maria Garcia"
                  value={fields.tenantName}
                  onChange={(e) => setFields({ ...fields, tenantName: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Landlord's name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. John Smith or ABC Property Management"
                  value={fields.landlordName}
                  onChange={(e) => setFields({ ...fields, landlordName: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Apartment address</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. 123 Main St, Apt 4B, Ann Arbor, MI 48104"
                  value={fields.address}
                  onChange={(e) => setFields({ ...fields, address: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Brief description of the problem</label>
                <textarea
                  required
                  rows={3}
                  placeholder="Describe what happened, when, and what you have already tried..."
                  value={fields.description}
                  onChange={(e) => setFields({ ...fields, description: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={!allFilled}
                className="w-full bg-primary text-white font-bold py-3 rounded-xl hover:bg-blue-700 transition disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Generate Letter →
              </button>
            </form>
          ) : (
            <div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-bold text-gray-800">Your Letter</h3>
                <button
                  onClick={() => setLetter(null)}
                  className="text-xs text-primary hover:underline"
                >
                  ← Edit details
                </button>
              </div>

              <pre className="bg-gray-50 border border-gray-200 rounded-xl p-4 text-xs text-gray-700 leading-relaxed whitespace-pre-wrap font-mono mb-4 max-h-80 overflow-y-auto">
                {letter}
              </pre>

              <div className="flex gap-3">
                <button
                  onClick={handleCopy}
                  className={`flex-1 py-2.5 rounded-xl text-sm font-semibold border-2 transition ${
                    copied
                      ? 'border-green-500 text-green-600 bg-green-50'
                      : 'border-primary text-primary hover:bg-blue-50'
                  }`}
                >
                  {copied ? '✓ Copied!' : 'Copy to Clipboard'}
                </button>
                <button
                  onClick={handleDownload}
                  className="flex-1 py-2.5 rounded-xl text-sm font-semibold bg-primary text-white hover:bg-blue-700 transition"
                >
                  Download as TXT
                </button>
              </div>

              <p className="text-xs text-gray-400 mt-3 text-center">
                No data has been stored or sent. This letter is generated entirely in your browser.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

function SituationDetail({ situation, onClose }) {
  const [showLetterModal, setShowLetterModal] = useState(false)

  return (
    <>
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

          {/* Section D: Generate Letter button */}
          <div className="pt-2">
            <button
              onClick={() => setShowLetterModal(true)}
              className="inline-flex items-center gap-2 bg-primary text-white text-sm font-semibold px-5 py-3 rounded-xl hover:bg-blue-700 transition"
            >
              ✉️ Generate Letter to My Landlord
            </button>
          </div>
        </div>
      </div>

      {showLetterModal && (
        <LetterModal situation={situation} onClose={() => setShowLetterModal(false)} />
      )}
    </>
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