import { Link } from 'react-router-dom'
import Layout from '../components/Layout'

const HERO_IMAGE = 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1600'
const HOW_IMAGE = 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800'

const stats = [
  { value: '2,300+', label: 'listings scanned' },
  { value: '94%', label: 'accuracy' },
  { value: 'Michigan', label: 'Law compliant' },
]

const rights = [
  { icon: '🏠', title: 'Security Deposit', desc: 'Max 1.5 months rent. Must be returned within 30 days of move-out.' },
  { icon: '🔧', title: 'Habitability', desc: 'Landlord must maintain heat, hot water, and safe living conditions.' },
  { icon: '🚪', title: 'Entry Notice', desc: 'Landlord must give at least 24h notice before entering your unit.' },
  { icon: '⚖️', title: 'Anti-Discrimination', desc: 'No one can deny you housing based on race, religion, origin, and more.' },
]

const steps = [
  { step: '1', title: 'Paste the text', desc: 'Copy a Craigslist ad, Facebook Marketplace listing, or your lease.' },
  { step: '2', title: 'We analyze', desc: 'We detect red flags, abusive clauses, and compare with Michigan law.' },
  { step: '3', title: 'Act informed', desc: 'Get a clear recommendation and the next steps to take.' },
]

export default function Landing() {
  return (
    <Layout>
      {/* HERO */}
      <section
        className="relative flex items-center justify-center"
        style={{
          minHeight: '90vh',
          backgroundImage: `url(${HERO_IMAGE})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0" style={{ backgroundColor: 'rgba(0,0,0,0.65)' }} />
        <div className="relative z-10 text-center text-white px-4 max-w-3xl mx-auto">
          <h1
            className="text-white leading-none mb-5"
            style={{ fontSize: '4rem', fontWeight: 900, letterSpacing: '-3px' }}
          >
            CasaSegura
          </h1>
          <p
            className="mb-10 max-w-lg mx-auto"
            style={{ fontSize: '1.1rem', color: 'rgba(255,255,255,0.85)' }}
          >
            Don't sign anything until CasaSegura checks it first
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/listing"
              className="px-8 py-4 bg-white text-gray-900 font-semibold text-sm hover:bg-gray-100 transition"
              style={{ borderRadius: '0px' }}
            >
              Scan a Listing
            </Link>
            <Link
              to="/lease"
              className="px-8 py-4 font-semibold text-sm text-white border border-white hover:bg-white hover:text-gray-900 transition"
              style={{ borderRadius: '0px', backgroundColor: 'transparent' }}
            >
              Analyze my Lease
            </Link>
          </div>
          <p className="mt-6 text-xs" style={{ color: 'rgba(255,255,255,0.6)' }}>
            Free · No account required · Built for Michigan renters
          </p>
        </div>
      </section>

      {/* STATS */}
      <section className="bg-white py-12 px-4" style={{ borderBottom: '1px solid #eee' }}>
        <div className="max-w-4xl mx-auto grid grid-cols-3 gap-8 text-center">
          {stats.map(({ value, label }) => (
            <div key={label}>
              <p className="text-3xl font-black text-gray-900" style={{ letterSpacing: '-1px' }}>{value}</p>
              <p className="text-gray-400 text-sm mt-1">{label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="bg-white py-20 px-4">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row gap-16 items-center">
          <div className="md:w-1/2">
            <img
              src={HOW_IMAGE}
              alt="Person reviewing documents"
              className="w-full h-80 object-cover"
              style={{ borderRadius: '0px', boxShadow: '0 2px 12px rgba(0,0,0,0.08)' }}
            />
          </div>
          <div className="md:w-1/2">
            <h2
              className="text-2xl font-bold text-gray-900 mb-2"
              style={{ letterSpacing: '-1px' }}
            >
              How it works
            </h2>
            <p className="text-gray-400 text-sm mb-10">Three steps to protect yourself</p>
            <div className="flex flex-col gap-8">
              {steps.map(({ step, title, desc }) => (
                <div key={step} className="flex gap-5 items-start relative">
                  <span
                    className="absolute -left-1 top-0 font-black select-none pointer-events-none leading-none"
                    style={{ fontSize: '4rem', color: '#f0f0f0', lineHeight: 1, zIndex: 0 }}
                  >
                    {step}
                  </span>
                  <div className="relative z-10 pl-12">
                    <h3 className="font-semibold text-gray-900 mb-1">{title}</h3>
                    <p className="text-gray-400 text-sm">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* KNOW YOUR RIGHTS */}
      <section className="px-4 py-16" style={{ backgroundColor: '#fafafa', borderTop: '1px solid #eee' }} id="rights">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
            <div>
              <h2
                className="text-2xl font-bold text-gray-900"
                style={{ letterSpacing: '-1px' }}
              >
                Know Your Rights
              </h2>
              <p className="text-gray-400 text-sm mt-1">Michigan laws that protect you as a tenant</p>
            </div>
            <Link
              to="/rights"
              className="text-sm font-semibold text-gray-700 border border-gray-300 px-4 py-2 transition hover:border-gray-700 hover:text-gray-900"
              style={{ borderRadius: '0px' }}
            >
              Full rights guide →
            </Link>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {rights.map(({ icon, title, desc }) => (
              <div
                key={title}
                className="bg-white p-5 border border-gray-100 hover:border-gray-200 hover:shadow-sm transition"
                style={{ borderRadius: '0px' }}
              >
                <div className="text-2xl mb-3">{icon}</div>
                <h3 className="font-semibold text-gray-900 text-sm mb-1">{title}</h3>
                <p className="text-gray-400 text-xs leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  )
}
