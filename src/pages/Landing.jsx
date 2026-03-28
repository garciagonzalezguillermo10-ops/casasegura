import { Link } from 'react-router-dom'
import Layout from '../components/Layout'

const HERO_IMAGE = 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1600'
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
        <div className="absolute inset-0" style={{ backgroundColor: 'rgba(0,0,0,0.55)' }} />
        <div className="relative z-10 text-center text-white px-4 max-w-3xl mx-auto">
          <h1
            className="text-white leading-tight tracking-tight mb-4"
            style={{ fontSize: '3.5rem', fontWeight: 800 }}
          >
            CasaSegura
          </h1>
          <p className="text-gray-200 text-xl mb-10 max-w-xl mx-auto">
            Don't sign anything until CasaSegura checks it first
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/listing"
              className="px-8 py-4 bg-white text-gray-900 font-semibold text-base hover:bg-gray-100 transition"
              style={{ borderRadius: '6px' }}
            >
              Scan a Listing
            </Link>
            <Link
              to="/lease"
              className="px-8 py-4 font-semibold text-base text-white border-2 border-white hover:bg-white hover:text-gray-900 transition"
              style={{ borderRadius: '6px' }}
            >
              Analyze my Lease
            </Link>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section style={{ backgroundColor: '#f3f4f6' }} className="py-12 px-4">
        <div className="max-w-4xl mx-auto grid grid-cols-3 gap-8 text-center">
          {stats.map(({ value, label }) => (
            <div key={label}>
              <p className="text-3xl font-extrabold" style={{ color: '#1a365d' }}>{value}</p>
              <p className="text-gray-500 text-sm mt-1">{label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="bg-white py-16 px-4">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row gap-12 items-center">
          <div className="md:w-1/2">
            <img
              src={HOW_IMAGE}
              alt="Person reviewing documents"
              className="w-full h-80 object-cover"
              style={{ borderRadius: '6px', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}
            />
          </div>
          <div className="md:w-1/2">
            <h2 className="text-2xl font-bold mb-2" style={{ color: '#1a365d' }}>How it works</h2>
            <p className="text-gray-500 mb-8">Three steps to protect yourself</p>
            <div className="flex flex-col gap-6">
              {steps.map(({ step, title, desc }) => (
                <div key={step} className="flex gap-4 items-start">
                  <div
                    className="flex-shrink-0 w-10 h-10 flex items-center justify-center text-white font-bold text-sm"
                    style={{ backgroundColor: '#1a365d', borderRadius: '6px' }}
                  >
                    {step}
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">{title}</h3>
                    <p className="text-gray-500 text-sm mt-1">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* KNOW YOUR RIGHTS */}
      <section className="px-4 py-16" style={{ backgroundColor: '#f3f4f6' }} id="rights">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
            <div>
              <h2 className="text-2xl font-bold" style={{ color: '#1a365d' }}>Know Your Rights</h2>
              <p className="text-gray-500 mt-1">Michigan laws that protect you as a tenant</p>
            </div>
            <Link
              to="/rights"
              className="text-sm font-semibold border px-4 py-2 transition hover:bg-gray-800 hover:text-white hover:border-gray-800"
              style={{ color: '#1a365d', borderColor: '#1a365d', borderRadius: '6px' }}
            >
              Full rights guide →
            </Link>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {rights.map(({ icon, title, desc }) => (
              <div
                key={title}
                className="bg-white p-5 border border-gray-100 hover:shadow-md transition"
                style={{ borderRadius: '6px', boxShadow: '0 1px 3px rgba(0,0,0,0.06)' }}
              >
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
