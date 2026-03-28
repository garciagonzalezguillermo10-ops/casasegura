import Anthropic from '@anthropic-ai/sdk'
import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
dotenv.config()

const app = express()
app.use(cors())
app.use(express.json())

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })

function extractJson(text) {
  try { return JSON.parse(text) } catch {}
  const codeBlock = text.match(/```(?:json)?\s*([\s\S]*?)```/)
  if (codeBlock) { try { return JSON.parse(codeBlock[1]) } catch {} }
  const jsonMatch = text.match(/(\{[\s\S]*\}|\[[\s\S]*\])/)
  if (jsonMatch) { try { return JSON.parse(jsonMatch[1]) } catch {} }
  throw new Error('Could not parse JSON from response')
}

const SYSTEM_PROMPT =
  'You are CasaSegura Assistant, an expert on Michigan tenant law and rental housing. ' +
  'You help renters understand their rights, identify scam listings, and review lease clauses. ' +
  "You know about CasaSegura's two main features: Scan a Listing (detects rental scams) and " +
  'Analyze my Lease (flags illegal clauses under Michigan law). ' +
  'Always be helpful, clear, and remind users you are not a lawyer. Keep answers concise.'

app.post('/api/chat', async (req, res) => {
  const { messages } = req.body
  if (!messages || !Array.isArray(messages)) {
    return res.status(400).json({ error: 'messages array required' })
  }
  const response = await client.messages.create({
    model: 'claude-haiku-4-5-20251001',
    max_tokens: 1024,
    system: SYSTEM_PROMPT,
    messages,
  })
  res.json({ content: response.content[0].text })
})

app.post('/api/analyze-listing', async (req, res) => {
  const { text } = req.body
  if (!text?.trim()) return res.status(400).json({ error: 'No text provided' })
  try {
    const response = await client.messages.create({
      model: 'claude-opus-4-6',
      max_tokens: 1024,
      system: 'You are a housing scam detection expert. Respond with ONLY valid JSON — no markdown, no code blocks, no explanation.',
      messages: [{ role: 'user', content: `Analyze this rental listing for scam indicators and return ONLY a JSON object:\n\nListing: ${text}\n\nRequired JSON format:\n{\n  "score": <0-100, where 100 = definitely legit, 0 = definitely a scam>,\n  "flags": [\n    {"level": "<red|yellow|green>", "text": "<specific, actionable finding>"}\n  ],\n  "recommendation": "<clear advice in 2-3 sentences>"\n}\n\nContext: Michigan/USA housing market. Typical 1BR rent: $800-$1,400/month. Red flags: price far below market, landlord abroad, payment via Zelle/wire before showing, high-pressure urgency. Include 4-7 flags. Be specific.` }]
    })
    const result = extractJson(response.content[0].text)
    res.json(result)
  } catch (err) {
    console.error('Listing analysis error:', err.message)
    res.status(500).json({ error: 'Analysis failed. Check your API key and try again.' })
  }
})

app.post('/api/analyze-contract', async (req, res) => {
  const { text } = req.body
  if (!text?.trim()) return res.status(400).json({ error: 'No text provided' })
  try {
    const response = await client.messages.create({
      model: 'claude-opus-4-6',
      max_tokens: 2048,
      system: 'You are a tenant rights expert specializing in Michigan landlord-tenant law. Respond with ONLY a valid JSON array — no markdown, no code blocks, no explanation.',
      messages: [{ role: 'user', content: `Analyze this rental lease contract and return ONLY a JSON array of 6-10 key clauses:\n\nContract: ${text}\n\nRequired JSON format:\n[\n  {\n    "status": "<green|yellow|red>",\n    "title": "<short clause name>",\n    "text": "<brief quote or summary, max 90 chars>",\n    "explanation": "<plain English explanation for the tenant, 1-2 sentences>",\n    "verdict": "<Normal|Negotiable|Problematic|Illegal>"\n  }\n]\n\nMichigan law context:\n- Security deposit max = 1.5 months rent (MCL 554.602)\n- Landlord must give 24h notice before entering (MCL 554.139)\n- Tenant cannot waive habitability rights\n- Late fees must be reasonable\n\nStatus guide: green = normal/tenant-friendly, yellow = worth negotiating, red = illegal or very problematic.\nAlways include: rent, duration, deposit, entry rights, repairs, late fees.` }]
    })
    const result = extractJson(response.content[0].text)
    res.json(result)
  } catch (err) {
    console.error('Contract analysis error:', err.message)
    res.status(500).json({ error: 'Analysis failed. Check your API key and try again.' })
  }
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => console.log(`CasaSegura API running on http://localhost:${PORT}`))