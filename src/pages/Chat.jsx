import { useState, useRef, useEffect } from 'react'
import Layout from '../components/Layout'

const AVATAR = '/manuel.jpg.png'

const WELCOME = {
  role: 'assistant',
  content:
    "Hi, I'm Manuel. I'm a real estate consultant specialized in Michigan tenant law. Ask me anything about rentals, your rights, or how to spot a scam listing — I'm here to help.",
}

function AvatarModal({ onClose }) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{ backgroundColor: 'rgba(0,0,0,0.75)' }}
      onClick={onClose}
    >
      <div className="relative" onClick={(e) => e.stopPropagation()}>
        <button
          onClick={onClose}
          className="absolute -top-3 -right-3 w-8 h-8 bg-white text-gray-800 font-bold text-sm flex items-center justify-center shadow-md hover:bg-gray-100 transition z-10"
          style={{ borderRadius: '50%' }}
        >
          ✕
        </button>
        <img
          src={AVATAR}
          alt="Manuel Pobes"
          className="object-cover shadow-2xl"
          style={{ width: 320, height: 320, borderRadius: '50%' }}
        />
      </div>
    </div>
  )
}

function ManuelAvatar({ size = 28, onClick }) {
  return (
    <img
      src={AVATAR}
      alt="Manuel Pobes"
      className="flex-shrink-0 object-cover self-end cursor-pointer hover:opacity-90 transition"
      style={{ width: size, height: size, borderRadius: '50%' }}
      onClick={onClick}
    />
  )
}

export default function Chat() {
  const [messages, setMessages] = useState([WELCOME])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const bottomRef = useRef(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  useEffect(() => {
    function onKey(e) {
      if (e.key === 'Escape') setShowModal(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  async function send() {
    const text = input.trim()
    if (!text || loading) return

    const userMsg = { role: 'user', content: text }
    const next = [...messages, userMsg]
    setMessages(next)
    setInput('')
    setLoading(true)

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: next
            .filter((m) => m.role !== 'assistant' || m !== WELCOME)
            .map((m) => ({ role: m.role, content: m.content })),
        }),
      })
      const data = await res.json()
      setMessages((prev) => [...prev, { role: 'assistant', content: data.content }])
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: 'Sorry, something went wrong. Please try again.' },
      ])
    } finally {
      setLoading(false)
    }
  }

  function handleKey(e) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      send()
    }
  }

  return (
    <Layout>
      {showModal && <AvatarModal onClose={() => setShowModal(false)} />}

      <div className="max-w-3xl mx-auto px-4 py-8 flex flex-col" style={{ height: 'calc(100vh - 130px)' }}>

        {/* Header */}
        <div className="flex items-center gap-3 mb-5 pb-4 border-b border-gray-200">
          <div className="relative flex-shrink-0">
            <img
              src={AVATAR}
              alt="Manuel Pobes"
              className="object-cover cursor-pointer hover:opacity-90 transition"
              style={{ width: 48, height: 48, borderRadius: '50%' }}
              onClick={() => setShowModal(true)}
            />
            <span
              className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 border-2 border-white"
              style={{ borderRadius: '50%' }}
            />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-base font-bold text-gray-900">Manuel Pobes</h1>
              <span className="w-2 h-2 bg-green-400 flex-shrink-0" style={{ borderRadius: '50%' }} />
            </div>
            <p className="text-xs text-gray-400">Real Estate Consultant · Michigan</p>
          </div>
        </div>

        {/* Message list */}
        <div className="flex-1 overflow-y-auto space-y-4 py-2 pr-1">
          {messages.map((msg, i) => (
            <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              {msg.role === 'assistant' && (
                <div className="mr-2">
                  <ManuelAvatar size={28} onClick={() => setShowModal(true)} />
                </div>
              )}
              <div
                className="max-w-[75%] px-4 py-3 text-sm leading-relaxed"
                style={{
                  backgroundColor: msg.role === 'user' ? '#1a365d' : '#f3f4f6',
                  color: msg.role === 'user' ? '#fff' : '#1f2937',
                  borderRadius: '0px',
                }}
              >
                {msg.content}
              </div>
            </div>
          ))}

          {loading && (
            <div className="flex justify-start">
              <div className="mr-2">
                <ManuelAvatar size={28} onClick={() => setShowModal(true)} />
              </div>
              <div className="px-4 py-3 text-sm text-gray-400" style={{ backgroundColor: '#f3f4f6' }}>
                <span className="animate-pulse">Thinking…</span>
              </div>
            </div>
          )}

          <div ref={bottomRef} />
        </div>

        {/* Input area */}
        <div className="mt-4 flex gap-2 border-t border-gray-200 pt-4">
          <textarea
            className="flex-1 border border-gray-300 p-3 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-primary resize-none bg-white"
            rows={2}
            placeholder="Ask about your rights, lease clauses, or a suspicious listing…"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKey}
          />
          <button
            onClick={send}
            disabled={!input.trim() || loading}
            className="px-6 py-2 bg-primary text-white font-semibold text-sm hover:bg-blue-900 transition disabled:opacity-40 disabled:cursor-not-allowed self-end"
          >
            Send
          </button>
        </div>
        <p className="text-xs text-gray-300 mt-2 text-center">
          Not a legal service. For serious matters consult a licensed attorney.
        </p>
      </div>
    </Layout>
  )
}
