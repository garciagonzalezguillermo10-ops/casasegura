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

app.post('/api/analyze-listing', async (req, res) => {
  const { text } = req.body
  if (!text?.trim()) return res.status(400).json({ error: 'No text provided' })

  try {
    const response = await client.messages.create({
      model: 'claude-opus-4-6',
      max_tokens: 1024,
      system: 'You are a housing scam detection expert. Respond with ONLY valid JSON — no markdown, no code blocks, no explanation.',
      messages: [{
        role: 'user',
        content: `Analyze this rental listing for scam indicators and return ONLY a JSON object:

Listing:
${text}

Required JSON format:
{
  "score": <0-100, where 100 = definitely legit, 0 = definitely a scam>,
  "flags": [
    {"level": "<red|yellow|green>", "text": "<specific, actionable finding>"}
  ],
  "recommendation": "<clear advice in 2-3 sentences>"
}

Context: Michigan/USA housing market. Typical 1BR rent: $800-$1,400/month.
Red flags: price far below market, landlord abroad, payment via Zelle/wire before showing, high-pressure urgency.
Include 4-7 flags. Be specific.`
      }]
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
      messages: [{
        role: 'user',
        content: `Analyze this rental lease contract and return ONLY a JSON array of 6-10 key clauses:

Contract:
${text}

Required JSON format:
[
  {
    "status": "<green|yellow|red>",
    "title": "<short clause name>",
    "text": "<brief quote or summary, max 90 chars>",
    "explanation": "<plain English explanation for the tenant, 1-2 sentences>",
    "verdict": "<Normal|Negotiable|Problematic|Illegal>"
  }
]

Michigan law context:
- Security deposit max = 1.5 months rent (MCL 554.602)
- Landlord must give 24h notice before entering (MCL 554.139)
- Tenant cannot waive habitability rights
- Late fees must be reasonable

Status guide: green = normal/tenant-friendly, yellow = worth negotiating, red = illegal or very problematic.
Always include: rent, duration, deposit, entry rights, repairs, late fees.`
      }]
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
