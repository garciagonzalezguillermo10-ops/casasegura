import { Link, useLocation } from 'react-router-dom'

const navLinks = [
  { to: '/listing', label: 'Analyze Listing' },
  { to: '/contrato', label: 'Analyze Lease' },
  { to: '/derechos', label: 'Your Rights' },
]

export default function Layout({ children }) {
  const { pathname } = useLocation()

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <header className="bg-primary text-white shadow-md">
        <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/" className="text-xl font-bold tracking-tight hover:opacity-80 transition">
            CasaSegura
          </Link>
          <nav className="hidden sm:flex gap-6 text-sm font-medium">
            {navLinks.map(({ to, label }) => (
              <Link
                key={to}
                to={to}
                className={`hover:text-blue-200 transition ${pathname === to ? 'text-blue-300 underline underline-offset-4' : ''}`}
              >
                {label}
              </Link>
            ))}
          </nav>
        </div>
        <div className="sm:hidden border-t border-blue-800 flex text-xs font-medium">
          {navLinks.map(({ to, label }) => (
            <Link
              key={to}
              to={to}
              className={`flex-1 text-center py-2 hover:bg-blue-800 transition ${pathname === to ? 'bg-blue-800' : ''}`}
            >
              {label}
            </Link>
          ))}
        </div>
      </header>

      <main className="flex-1">{children}</main>

      <footer className="bg-gray-100 border-t border-gray-200 text-center text-xs text-gray-500 px-4 py-5">
        CasaSegura is not a legal service. Always consult a lawyer for legal decisions.
      </footer>
    </div>
  )
}
