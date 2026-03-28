import 'dotenv/config'
import express from 'express'
import Anthropic from '@anthropic-ai/sdk'

const app = express()
app.use(express.json())

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })

const SYSTEM_PROMPT =
  'You are CasaSegura Assistant, an expert on Michigan tenant law and rental housing. ' +
  'You help renters understand their rights, identify scam listings, and review lease clauses. ' +
  'You know about CasaSegura\'s two main features: Scan a Listing (detects rental scams) and ' +
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

const PORT = process.env.PORT || 3001
app.listen(PORT, () => console.log(`CasaSegura API running on port ${PORT}`))
