// Vercel serverless function to proxy to OpenAI and return structured MCQs/cases.
// Security: if SIMPLE_API_KEY env var is set, the function requires the header 'x-api-key' to match.
import fetch from 'node-fetch';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const SIMPLE_KEY = process.env.SIMPLE_API_KEY || '';
  if (SIMPLE_KEY) {
    const clientKey = req.headers['x-api-key'] || req.headers['x-api_key'] || '';
    if (!clientKey || clientKey !== SIMPLE_KEY) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
  }

  const OPENAI_KEY = process.env.OPENAI_API_KEY;
  if (!OPENAI_KEY) return res.status(500).json({ error: 'Server not configured' });

  const { type = 'mcq', text = '', count = 5 } = req.body || {};
  if (!text) return res.status(400).json({ error: 'text required' });

  const system = 'You are a helpful medical educator that writes high-quality, clinically relevant multiple-choice questions and short clinical cases. Return JSON in the format { items: [...] } where each item is an object.';
  const userPrompt = `From the content below, generate ${count} ${type} items. Return JSON only. Content:\n\n${text}`;

  try {
    const r = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENAI_KEY}`
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [ { role: 'system', content: system }, { role: 'user', content: userPrompt } ],
        max_tokens: 900
      })
    });

    if (!r.ok) {
      const t = await r.text();
      return res.status(502).json({ error: 'LLM API error', detail: t });
    }

    const j = await r.json();
    const reply = j.choices?.[0]?.message?.content || j.choices?.[0]?.text || '';

    // Try to parse JSON from the reply; if parsing fails, return raw text under items[].raw
    try {
      const parsed = JSON.parse(reply);
      return res.json(parsed);
    } catch (e) {
      return res.json({ items: [{ raw: reply }] });
    }
  } catch (err) {
    return res.status(500).json({ error: 'Server error', detail: String(err) });
  }
}
