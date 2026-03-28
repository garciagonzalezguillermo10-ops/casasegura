import { Link, useLocation } from 'react-router-dom'

const navLinks = [
  { to: '/listing', label: 'Scan a Listing' },
  { to: '/lease', label: 'Analyze my Lease' },
  { to: '/rights', label: 'Your Rights' },
]

export default function Layout({ children }) {
  const { pathname } = useLocation()

  return (
    <div className="min-h-screen flex flex-col" style={{ fontFamily: 'Inter, system-ui, sans-serif', backgroundColor: '#f7fafc' }}>
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/" className="text-xl font-bold tracking-tight text-gray-900 hover:opacity-75 transition">
            CasaSegura
          </Link>
          <nav className="hidden sm:flex gap-6 text-sm font-medium">
            {navLinks.map(({ to, label }) => (
              <Link
                key={to}
                to={to}
                className={`transition ${
                  pathname === to
                    ? 'text-gray-900 font-semibold'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                {label}
              </Link>
            ))}
          </nav>
        </div>
        {/* Mobile nav */}
        <div className="sm:hidden border-t border-gray-100 flex text-xs font-medium">
          {navLinks.map(({ to, label }) => (
            <Link
              key={to}
              to={to}
              className={`flex-1 text-center py-2 transition ${
                pathname === to ? 'text-gray-900 bg-gray-50 font-semibold' : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              {label}
            </Link>
          ))}
        </div>
      </header>

      <main className="flex-1">{children}</main>

      <footer className="bg-white border-t border-gray-200 px-4 py-6 text-center">
        <p className="text-xs text-gray-400 max-w-2xl mx-auto leading-relaxed">
          CasaSegura is not a legal service. Information provided is for educational purposes only and
          based on Michigan law. Always consult a licensed attorney for legal decisions.
        </p>
        <p className="text-xs text-gray-300 mt-2">
          Built for CBC Hackathon 2026 @ UMich
        </p>
      </footer>
    </div>
  )
}
