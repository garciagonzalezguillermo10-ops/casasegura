import { Link } from 'react-router-dom'
import Layout from '../components/Layout'

const rights = [
  { icon: '🏠', title: 'Depósito de seguridad', desc: 'Máximo 1.5 meses de renta. Te lo deben devolver en 30 días.' },
  { icon: '🔧', title: 'Habitabilidad', desc: 'El arrendador debe mantener la propiedad en condiciones habitables.' },
  { icon: '🚪', title: 'Aviso de entrada', desc: 'El arrendador necesita darte 24h de aviso antes de entrar.' },
  { icon: '⚖️', title: 'Anti-discriminación', desc: 'Nadie puede negarte vivienda por raza, religión, origen, etc.' },
]

export default function Landing() {
  return (
    <Layout>
      {/* Hero */}
      <section className="bg-primary text-white px-4 py-20 text-center">
        <h1 className="text-3xl sm:text-5xl font-bold mb-4 leading-tight">CasaSegura</h1>
        <p className="text-blue-200 text-lg sm:text-xl mb-10 max-w-xl mx-auto">
          Tu copiloto para encontrar vivienda sin que te timen
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/listing"
            className="bg-white text-primary font-bold px-8 py-4 rounded-lg text-lg hover:bg-blue-50 transition shadow-lg"
          >
            Analizar un Listing
          </Link>
          <Link
            to="/contrato"
            className="bg-transparent border-2 border-white text-white font-bold px-8 py-4 rounded-lg text-lg hover:bg-white hover:text-primary transition"
          >
            Analizar mi Contrato
          </Link>
        </div>
      </section>

      {/* How it works */}
      <section className="max-w-5xl mx-auto px-4 py-16 text-center">
        <h2 className="text-2xl font-bold text-primary mb-2">¿Cómo funciona?</h2>
        <p className="text-gray-500 mb-10">Tres pasos para protegerte</p>
        <div className="grid sm:grid-cols-3 gap-8">
          {[
            { step: '1', title: 'Pega el texto', desc: 'Copia el anuncio de Craigslist, Facebook Marketplace o tu contrato.' },
            { step: '2', title: 'Analizamos', desc: 'Detectamos red flags, cláusulas abusivas y comparamos con la ley de Michigan.' },
            { step: '3', title: 'Actúa informado', desc: 'Recibe una recomendación clara y los pasos a seguir.' },
          ].map(({ step, title, desc }) => (
            <div key={step} className="flex flex-col items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center text-xl font-bold">
                {step}
              </div>
              <h3 className="font-semibold text-gray-800">{title}</h3>
              <p className="text-gray-500 text-sm">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Rights */}
      <section className="bg-gray-50 px-4 py-16" id="derechos">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
            <div>
              <h2 className="text-2xl font-bold text-primary">Conoce tus Derechos</h2>
              <p className="text-gray-500 mt-1">Leyes de Michigan que te protegen como inquilino</p>
            </div>
            <Link to="/derechos" className="text-sm font-semibold text-primary border border-primary px-4 py-2 rounded-lg hover:bg-primary hover:text-white transition">
              Ver guía completa →
            </Link>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {rights.map(({ icon, title, desc }) => (
              <div key={title} className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
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
