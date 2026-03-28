import { useState } from 'react'
import Layout from '../components/Layout'

const SITUATIONS = [
  {
    id: 'deposito',
    label: 'No me devuelven el depósito',
    icon: '💰',
    steps: [
      'En Michigan tienes derecho a recibir tu depósito en un plazo de 30 días tras mudarte.',
      'Si hay descuentos, el arrendador debe enviarte una lista detallada por escrito dentro de ese plazo.',
      'Envía una carta certificada (con acuse de recibo) exigiendo la devolución. Guarda copia.',
      'Si no responde en 7 días adicionales, puedes demandar en Small Claims Court por hasta el doble del depósito.',
      'Documenta siempre el estado del apartamento con fotos y vídeos el día que te vayas.',
    ],
    resources: [
      { label: 'Michigan Legal Help', url: 'https://michiganlegalhelp.org' },
      { label: 'Formulario carta certificada (plantilla)', url: null },
      { label: 'Small Claims Court — coste: $30–$70', url: null },
    ],
    law: 'MCL 554.602 — Security Deposits',
  },
  {
    id: 'reparaciones',
    label: 'No arreglan nada',
    icon: '🔧',
    steps: [
      'El arrendador tiene la obligación legal de mantener la propiedad habitable (agua caliente, calefacción, estructura segura).',
      'Notifica el problema por escrito (email o carta) y guarda el registro con fecha.',
      'El arrendador debe repararlo en un plazo razonable — generalmente 7–14 días para problemas no urgentes.',
      'Si no actúa, puedes retener la renta pagándola al tribunal (escrow) mientras se resuelve.',
      'Contacta a la ciudad o condado para pedir una inspección oficial de la vivienda.',
    ],
    resources: [
      { label: 'Michigan Legal Help — habitabilidad', url: 'https://michiganlegalhelp.org' },
      { label: 'Departamento de Inspecciones de tu ciudad', url: null },
      { label: 'Student Legal Services (si eres universitario)', url: null },
    ],
    law: 'MCL 554.139 — Implied warranty of habitability',
  },
  {
    id: 'desahucio',
    label: 'Me quieren echar sin aviso',
    icon: '🚪',
    steps: [
      'En Michigan, el arrendador DEBE darte aviso escrito antes de iniciar un desahucio.',
      'Aviso mínimo según causa: 7 días por impago, 30 días por fin de contrato, 30 días si es mes a mes.',
      'Hasta que un juez no emita una orden, nadie puede sacarte ni cambiar la cerradura ilegalmente.',
      'Si te cambian la cerradura o cortan servicios sin orden judicial, es un desahucio ilegal — llama a la policía.',
      'Acude a la audiencia en el tribunal si recibes una citación. Tienes derecho a defenderte.',
    ],
    resources: [
      { label: 'Michigan Legal Help — Eviction', url: 'https://michiganlegalhelp.org' },
      { label: 'Línea de urgencias de vivienda: 211', url: null },
      { label: 'Asistencia legal gratuita: Legal Aid & Defender', url: null },
    ],
    law: 'MCL 600.5714 — Summary proceedings to recover possession',
  },
  {
    id: 'discriminacion',
    label: 'Discriminación',
    icon: '⚖️',
    steps: [
      'Es ilegal rechazarte como inquilino por raza, color, religión, origen nacional, sexo, familia o discapacidad.',
      'Michigan también protege por estado civil y edad (Elliott-Larsen Civil Rights Act).',
      'Documenta todo: guarda los anuncios, correos, mensajes y cualquier comunicación.',
      'Presenta una queja ante la Michigan Department of Civil Rights (MDCR) — es gratuito.',
      'También puedes presentar queja ante el HUD (Housing and Urban Development) federal.',
    ],
    resources: [
      { label: 'Michigan Dept. of Civil Rights — mdcr.michigan.gov', url: 'https://www.michigan.gov/mdcr' },
      { label: 'HUD Fair Housing — hud.gov', url: 'https://www.hud.gov/fairhousing' },
      { label: 'Línea gratuita HUD: 1-800-669-9777', url: null },
    ],
    law: 'Elliott-Larsen Civil Rights Act / Fair Housing Act',
  },
  {
    id: 'contrato',
    label: 'No entiendo mi contrato',
    icon: '📄',
    steps: [
      'Nunca firmes algo que no entiendes — pide tiempo para leerlo con calma.',
      'Usa CasaSegura para analizar las cláusulas principales (sección "Analizar Contrato").',
      'Muchas universidades ofrecen Student Legal Services gratuitos para revisar contratos.',
      'Michigan Legal Help tiene guías en español sobre qué buscar en un contrato de alquiler.',
      'Puedes pedir al arrendador que te explique cualquier cláusula antes de firmar.',
    ],
    resources: [
      { label: 'Michigan Legal Help', url: 'https://michiganlegalhelp.org' },
      { label: 'Student Legal Services (consulta tu universidad)', url: null },
      { label: 'Analizar mi contrato con CasaSegura', url: '/contrato' },
    ],
    law: 'Tienes derecho a entender lo que firmas.',
  },
]

export default function YourRights() {
  const [active, setActive] = useState(null)

  const situation = SITUATIONS.find((s) => s.id === active)

  return (
    <Layout>
      <div className="max-w-3xl mx-auto px-4 py-10">
        <h1 className="text-2xl font-bold text-primary mb-1">Tus Derechos como Inquilino</h1>
        <p className="text-gray-500 mb-8 text-sm">Selecciona tu situación para ver los pasos a seguir.</p>

        <div className="grid sm:grid-cols-2 gap-3 mb-8">
          {SITUATIONS.map((s) => (
            <button
              key={s.id}
              onClick={() => setActive(active === s.id ? null : s.id)}
              className={`flex items-center gap-3 px-4 py-4 rounded-xl border-2 text-left font-medium transition ${
                active === s.id
                  ? 'border-primary bg-primary text-white'
                  : 'border-gray-200 bg-white text-gray-800 hover:border-primary hover:bg-blue-50'
              }`}
            >
              <span className="text-2xl">{s.icon}</span>
              <span className="text-sm">{s.label}</span>
            </button>
          ))}
        </div>

        {situation && (
          <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
            <div className="bg-primary text-white px-6 py-4">
              <div className="flex items-center gap-3">
                <span className="text-2xl">{situation.icon}</span>
                <div>
                  <h2 className="font-bold text-lg">{situation.label}</h2>
                  <p className="text-blue-200 text-xs mt-0.5">Ley: {situation.law}</p>
                </div>
              </div>
            </div>

            <div className="p-6">
              <h3 className="font-bold text-gray-800 mb-4">Pasos a seguir</h3>
              <ol className="space-y-3 mb-6">
                {situation.steps.map((step, i) => (
                  <li key={i} className="flex gap-3">
                    <span className="w-6 h-6 rounded-full bg-primary text-white text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
                      {i + 1}
                    </span>
                    <p className="text-sm text-gray-700 leading-relaxed">{step}</p>
                  </li>
                ))}
              </ol>

              <div className="border-t border-gray-100 pt-5">
                <h3 className="font-bold text-gray-800 mb-3">Recursos útiles</h3>
                <ul className="space-y-2">
                  {situation.resources.map((r, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
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
              </div>
            </div>
          </div>
        )}

        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-xl p-5 text-sm text-blue-800">
          <strong>Recuerda:</strong> Esta información es orientativa y se basa en la ley de Michigan. Para casos específicos, consulta con un abogado o con Student Legal Services de tu universidad.
        </div>
      </div>
    </Layout>
  )
}
