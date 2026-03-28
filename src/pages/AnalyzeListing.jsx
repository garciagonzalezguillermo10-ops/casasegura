import { useState } from 'react'
import Layout from '../components/Layout'

const MOCK_RESULT = {
  score: 28,
  flags: [
    { level: 'red', text: 'Precio muy por debajo del mercado ($400/mes) — la media en Ann Arbor es $900+' },
    { level: 'red', text: 'El propietario dice estar en el extranjero y no puede mostrar la propiedad en persona' },
    { level: 'red', text: 'Solicita depósito por Zelle o Western Union antes de firmar ningún contrato' },
    { level: 'red', text: 'Presión para decidir "hoy mismo" — hay muchos interesados' },
    { level: 'yellow', text: 'Solo contacto por email, sin número de teléfono ni nombre completo' },
    { level: 'yellow', text: 'Fotos genéricas que podrían no ser de la propiedad real' },
  ],
  recommendation:
    'Este listing tiene múltiples señales de estafa graves. La combinación de precio muy bajo, propietario ausente y solicitud de pago anticipado son los patrones más comunes de fraude de vivienda. No envíes dinero. Reporta el anuncio y busca otra opción.',
}

const flagColors = {
  red: { bg: 'bg-red-50', border: 'border-red-200', dot: 'bg-danger', label: 'Alerta grave' },
  yellow: { bg: 'bg-yellow-50', border: 'border-yellow-200', dot: 'bg-caution', label: 'Precaución' },
  green: { bg: 'bg-green-50', border: 'border-green-200', dot: 'bg-safe', label: 'OK' },
}

function ScoreBar({ score }) {
  const color = score > 70 ? 'bg-safe' : score >= 40 ? 'bg-caution' : 'bg-danger'
  const label = score > 70 ? 'Parece legítimo' : score >= 40 ? 'Procede con cautela' : 'Alto riesgo de estafa'
  const textColor = score > 70 ? 'text-safe' : score >= 40 ? 'text-caution' : 'text-danger'

  return (
    <div className="mb-6">
      <div className="flex items-end justify-between mb-2">
        <span className="text-sm font-medium text-gray-600">Score de confianza</span>
        <div className="text-right">
          <span className={`text-3xl font-bold ${textColor}`}>{score}</span>
          <span className="text-gray-400 text-lg">/100</span>
        </div>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
        <div
          className={`h-4 rounded-full transition-all duration-700 ${color}`}
          style={{ width: `${score}%` }}
        />
      </div>
      <p className={`mt-2 font-semibold text-sm ${textColor}`}>{label}</p>
    </div>
  )
}

export default function AnalyzeListing() {
  const [text, setText] = useState('')
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)

  function analyze() {
    if (!text.trim()) return
    setLoading(true)
    setResult(null)
    setTimeout(() => {
      setResult(MOCK_RESULT)
      setLoading(false)
    }, 1200)
  }

  return (
    <Layout>
      <div className="max-w-3xl mx-auto px-4 py-10">
        <h1 className="text-2xl font-bold text-primary mb-1">Analizar un Listing</h1>
        <p className="text-gray-500 mb-6 text-sm">
          Pega el texto del anuncio de Craigslist, Facebook Marketplace, Zillow u otra plataforma.
        </p>

        <textarea
          className="w-full border border-gray-300 rounded-xl p-4 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-primary resize-none"
          rows={10}
          placeholder="Pega aquí el texto del listing... Por ejemplo: '2BR apartment $450/mo, owner abroad, contact via email only...'"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />

        <button
          onClick={analyze}
          disabled={!text.trim() || loading}
          className="mt-4 w-full sm:w-auto bg-primary text-white font-bold px-8 py-3 rounded-lg hover:bg-blue-900 transition disabled:opacity-40 disabled:cursor-not-allowed"
        >
          {loading ? 'Analizando...' : 'Analizar'}
        </button>

        {loading && (
          <div className="mt-8 text-center text-gray-400 text-sm animate-pulse">
            Buscando red flags...
          </div>
        )}

        {result && (
          <div className="mt-8 space-y-6">
            {/* Score */}
            <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
              <ScoreBar score={result.score} />
            </div>

            {/* Red flags */}
            <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
              <h2 className="font-bold text-gray-800 mb-4">
                Señales detectadas ({result.flags.length})
              </h2>
              <ul className="space-y-3">
                {result.flags.map((flag, i) => {
                  const c = flagColors[flag.level]
                  return (
                    <li
                      key={i}
                      className={`flex items-start gap-3 rounded-lg border px-4 py-3 ${c.bg} ${c.border}`}
                    >
                      <span className={`mt-1 w-3 h-3 rounded-full flex-shrink-0 ${c.dot}`} />
                      <div>
                        <span className="text-xs font-semibold uppercase tracking-wide text-gray-500 block mb-0.5">
                          {c.label}
                        </span>
                        <span className="text-sm text-gray-800">{flag.text}</span>
                      </div>
                    </li>
                  )
                })}
              </ul>
            </div>

            {/* Recommendation */}
            <div className="bg-red-50 border border-red-200 rounded-xl p-6">
              <h2 className="font-bold text-red-700 mb-2">Recomendación</h2>
              <p className="text-sm text-red-800 leading-relaxed">{result.recommendation}</p>
            </div>
          </div>
        )}
      </div>
    </Layout>
  )
}
