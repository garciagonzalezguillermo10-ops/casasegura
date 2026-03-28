import { useState } from 'react'
import Layout from '../components/Layout'

const MOCK_CLAUSES = [
  {
    status: 'green',
    title: 'Duración del contrato',
    text: '12 meses, del 1 de agosto 2026 al 31 de julio 2027.',
    explanation: 'Duración estándar para alquiler universitario en Michigan. Sin problema.',
    verdict: 'Normal',
  },
  {
    status: 'green',
    title: 'Renta mensual',
    text: '$875/mes, pagadero el día 1 de cada mes.',
    explanation: 'Precio de mercado razonable para la zona. Sin cargos ocultos mencionados.',
    verdict: 'Normal',
  },
  {
    status: 'yellow',
    title: 'Depósito de seguridad',
    text: '$1,750 (2 meses de renta).',
    explanation:
      'En Michigan, el depósito máximo legal es 1.5 meses de renta. Este depósito excede ese límite — pide que lo corrijan antes de firmar.',
    verdict: 'Problemático',
  },
  {
    status: 'yellow',
    title: 'Cargo por pago tardío',
    text: '$80 si el pago llega después del día 5.',
    explanation:
      'Los cargos por mora están permitidos en Michigan, pero $80 es elevado. Intenta negociarlo a $25–$50.',
    verdict: 'Negociable',
  },
  {
    status: 'green',
    title: 'Responsabilidad de reparaciones',
    text: 'El arrendador es responsable de mantener la propiedad en condiciones habitables.',
    explanation:
      'Correcto. Michigan obliga al arrendador a mantener estándares mínimos de habitabilidad.',
    verdict: 'Normal',
  },
  {
    status: 'red',
    title: 'Entrada sin previo aviso',
    text: 'El arrendador puede entrar a la propiedad en cualquier momento sin notificación previa.',
    explanation:
      'Ilegal en Michigan. La ley (MCL 554.139) exige al menos 24 horas de aviso salvo emergencia. Esta cláusula no es válida aunque la firmes.',
    verdict: 'Ilegal',
  },
  {
    status: 'red',
    title: 'Renuncia a derechos de habitabilidad',
    text: 'El inquilino renuncia a cualquier reclamación relacionada con las condiciones del inmueble.',
    explanation:
      'Cláusula inválida bajo la ley de Michigan. No puedes renunciar a derechos básicos de habitabilidad — aunque lo firmes, no tiene efecto legal.',
    verdict: 'Ilegal',
  },
  {
    status: 'green',
    title: 'Política de mascotas',
    text: 'No se permiten mascotas sin autorización escrita del arrendador.',
    explanation: 'Restricción habitual y completamente legal. Pide permiso por escrito si tienes mascota.',
    verdict: 'Normal',
  },
]

const statusConfig = {
  green: {
    dot: 'bg-safe',
    badge: 'bg-green-100 text-green-800',
    border: 'border-l-safe',
  },
  yellow: {
    dot: 'bg-caution',
    badge: 'bg-yellow-100 text-yellow-800',
    border: 'border-l-caution',
  },
  red: {
    dot: 'bg-danger',
    badge: 'bg-red-100 text-red-800',
    border: 'border-l-danger',
  },
}

const statusLabel = { green: 'Normal', yellow: 'Precaución', red: 'Alerta' }

function Summary({ clauses }) {
  const counts = { green: 0, yellow: 0, red: 0 }
  clauses.forEach((c) => counts[c.status]++)
  return (
    <div className="flex gap-4 flex-wrap mb-6">
      {[
        { key: 'green', label: 'Sin problema', color: 'text-safe' },
        { key: 'yellow', label: 'Precaución', color: 'text-caution' },
        { key: 'red', label: 'Alerta', color: 'text-danger' },
      ].map(({ key, label, color }) => (
        <div key={key} className="bg-white border border-gray-200 rounded-lg px-4 py-3 text-center min-w-[90px]">
          <div className={`text-2xl font-bold ${color}`}>{counts[key]}</div>
          <div className="text-xs text-gray-500 mt-0.5">{label}</div>
        </div>
      ))}
    </div>
  )
}

export default function AnalyzeContract() {
  const [text, setText] = useState('')
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)

  function analyze() {
    if (!text.trim()) return
    setLoading(true)
    setResult(null)
    setTimeout(() => {
      setResult(MOCK_CLAUSES)
      setLoading(false)
    }, 1400)
  }

  return (
    <Layout>
      <div className="max-w-3xl mx-auto px-4 py-10">
        <h1 className="text-2xl font-bold text-primary mb-1">Analizar Contrato de Alquiler</h1>
        <p className="text-gray-500 mb-6 text-sm">
          Pega el texto de tu contrato. Analizamos cada cláusula importante según la ley de Michigan.
        </p>

        <textarea
          className="w-full border border-gray-300 rounded-xl p-4 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-primary resize-none"
          rows={10}
          placeholder="Pega aquí el texto de tu contrato de alquiler..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />

        <button
          onClick={analyze}
          disabled={!text.trim() || loading}
          className="mt-4 w-full sm:w-auto bg-primary text-white font-bold px-8 py-3 rounded-lg hover:bg-blue-900 transition disabled:opacity-40 disabled:cursor-not-allowed"
        >
          {loading ? 'Analizando...' : 'Analizar Contrato'}
        </button>

        {loading && (
          <div className="mt-8 text-center text-gray-400 text-sm animate-pulse">
            Revisando cláusulas...
          </div>
        )}

        {result && (
          <div className="mt-8">
            <h2 className="font-bold text-gray-800 mb-4">Resumen del contrato</h2>
            <Summary clauses={result} />

            <div className="space-y-3">
              {result.map((clause, i) => {
                const c = statusConfig[clause.status]
                return (
                  <div
                    key={i}
                    className={`bg-white border border-gray-200 border-l-4 ${c.border} rounded-xl p-5 shadow-sm`}
                  >
                    <div className="flex items-start justify-between gap-3 mb-2">
                      <div className="flex items-center gap-2">
                        <span className={`w-2.5 h-2.5 rounded-full flex-shrink-0 mt-0.5 ${c.dot}`} />
                        <h3 className="font-semibold text-gray-800 text-sm">{clause.title}</h3>
                      </div>
                      <span className={`text-xs font-semibold px-2 py-0.5 rounded-full flex-shrink-0 ${c.badge}`}>
                        {clause.verdict}
                      </span>
                    </div>
                    <p className="text-xs text-gray-500 italic mb-2 pl-4">"{clause.text}"</p>
                    <p className="text-sm text-gray-700 pl-4">{clause.explanation}</p>
                  </div>
                )
              })}
            </div>

            <div className="mt-6 bg-blue-50 border border-blue-200 rounded-xl p-5 text-sm text-blue-800">
              <strong>Próximos pasos:</strong> Tienes 2 cláusulas ilegales. Antes de firmar, pide por escrito que las eliminen o corrijan. Si el arrendador se niega, consulta con Student Legal Services o Michigan Legal Help.
            </div>
          </div>
        )}
      </div>
    </Layout>
  )
}
