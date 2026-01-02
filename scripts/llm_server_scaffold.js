/**
 * Minimal scaffold for a server endpoint that accepts topic text and returns LLM-generated MCQs / cases.
 * This is a template: you must install dependencies and provide your own API key as an env var.
 *
 * Usage:
 *  npm install express body-parser axios
 *  node scripts/llm_server_scaffold.js
 *
 * POST /generate with JSON { type: 'mcq'|'case', text: '...', count: 5 }
 * Returns: { items: [...] }
 */

const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
app.use(bodyParser.json({ limit: '1mb' }));

const OPENAI_API_KEY = process.env.OPENAI_API_KEY || '';

app.post('/generate', async (req, res) => {
  const { type, text, count = 5 } = req.body || {};
  if (!type || !text) return res.status(400).json({ error: 'type and text required' });
  if (!OPENAI_API_KEY) return res.status(500).json({ error: 'OPENAI_API_KEY not configured on server' });

  try{
    // Example call to OpenAI Chat completions (update model and payload per your account)
    const prompt = `Generate ${count} ${type} items from the following medical content. Return JSON array named items with fields title/choices/answer or case/qs etc. Content:\n\n${text}`;
    const r = await axios.post('https://api.openai.com/v1/chat/completions', {
      model: 'gpt-4o-mini',
      messages: [{role:'system',content:'You are a helpful medical question writer.'},{role:'user',content:prompt}],
      max_tokens: 800
    }, { headers: { Authorization: `Bearer ${OPENAI_API_KEY}` } });

    const reply = r.data.choices?.[0]?.message?.content || '';
    // Try to parse JSON from reply
    let items = [];
    try{ const j = JSON.parse(reply); items = j.items || []; } catch(e){ items = [{ raw: reply }]; }
    res.json({ items });
  }catch(err){
    console.error(err.response?.data || err.message);
    res.status(500).json({ error: 'LLM request failed' });
  }
});

app.listen(3456, () => console.log('LLM scaffold server listening on http://localhost:3456'));
