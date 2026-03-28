import { Link } from 'react-router-dom'
import Layout from '../components/Layout'

const rights = [
  { icon: '🏠', title: 'Security Deposit', desc: 'Max 1.5 months rent. Must be returned within 30 days of move-out.' },
  { icon: '🔧', title: 'Habitability', desc: 'Landlord must maintain heat, hot water, and safe living conditions.' },
  { icon: '🚪', title: 'Entry Notice', desc: 'Landlord must give at least 24h notice before entering your unit.' },
  { icon: '⚖️', title: 'Anti-Discrimination', desc: 'No one can deny you housing based on race, religion, origin, and more.' },
]

function SearchIcon() {
  return (
    <svg className="w-10 h-10" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607z" />
    </svg>
  )
}

function DocumentIcon() {
  return (
    <svg className="w-10 h-10" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9z" />
    </svg>
  )
}

export default function Landing() {
  return (
    <Layout>
      {/* Hero */}
      <section className="bg-primary text-white px-4 py-20 text-center">
        <h1 className="text-4xl sm:text-6xl font-black mb-4 leading-tight tracking-tight">
          CasaSegura
        </h1>
        <p className="text-blue-200 text-lg sm:text-2xl mb-12 max-w-2xl mx-auto font-medium">
          Don't sign anything until CasaSegura checks it first
        </p>

        {/* Action cards */}
        <div className="flex flex-col sm:flex-row gap-6 justify-center max-w-2xl mx-auto">
          <Link
            to="/listing"
            className="flex-1 bg-white text-primary rounded-2xl p-8 shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-200 flex flex-col items-center gap-3 group"
          >
            <div className="text-primary group-hover:scale-110 transition-transform duration-200">
              <SearchIcon />
            </div>
            <span className="text-lg font-bold">Scan a Listing</span>
            <span className="text-sm text-gray-500 font-normal">Detect scams before you pay</span>
          </Link>

          <Link
            to="/lease"
            className="flex-1 bg-white text-primary rounded-2xl p-8 shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-200 flex flex-col items-center gap-3 group"
          >
            <div className="text-primary group-hover:scale-110 transition-transform duration-200">
              <DocumentIcon />
            </div>
            <span className="text-lg font-bold">Analyze my Lease</span>
            <span className="text-sm text-gray-500 font-normal">Flag illegal clauses instantly</span>
          </Link>
        </div>
      </section>

      {/* How it works */}
      <section className="max-w-5xl mx-auto px-4 py-16 text-center">
        <h2 className="text-2xl font-bold text-primary mb-2">How it works</h2>
        <p className="text-gray-500 mb-10">Three steps to protect yourself</p>
        <div className="grid sm:grid-cols-3 gap-8">
          {[
            { step: '1', title: 'Paste the text', desc: 'Copy a Craigslist ad, Facebook Marketplace listing, or your lease.' },
            { step: '2', title: 'We analyze', desc: 'We detect red flags, abusive clauses, and compare with Michigan law.' },
            { step: '3', title: 'Act informed', desc: 'Get a clear recommendation and the next steps to take.' },
          ].map(({ step, title, desc }) => (
            <div key={step} className="flex flex-col items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center text-xl font-bold shadow-md">
                {step}
              </div>
              <h3 className="font-semibold text-gray-800">{title}</h3>
              <p className="text-gray-500 text-sm">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Know Your Rights */}
      <section className="px-4 py-16" style={{ backgroundColor: '#edf2f7' }} id="rights">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
            <div>
              <h2 className="text-2xl font-bold text-primary">Know Your Rights</h2>
              <p className="text-gray-500 mt-1">Michigan laws that protect you as a tenant</p>
            </div>
            <Link
              to="/rights"
              className="text-sm font-semibold text-primary border border-primary px-4 py-2 rounded-lg hover:bg-primary hover:text-white transition"
            >
              Full rights guide →
            </Link>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {rights.map(({ icon, title, desc }) => (
              <div key={title} className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition">
                <div className="text-3xl mb-3">{icon}</div>
                <h3 className="font-semibold text-gray-800 mb-1">{title}</h3>
                <p className="text-gray-500 text-sm">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  )
}
