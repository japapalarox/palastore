const SUPABASE_URL = process.env.SUPABASE_URL
const SERVICE_KEY  = process.env.SUPABASE_SERVICE_KEY

function headers() {
  return {
    apikey:        SERVICE_KEY,
    Authorization: `Bearer ${SERVICE_KEY}`,
    'Content-Type': 'application/json',
    Prefer:        'return=minimal',
  }
}

function gerarKey(prefixo) {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
  const seg = () => Array.from({length:5}, () => chars[Math.floor(Math.random()*chars.length)]).join('')
  return `${prefixo}-${seg()}-${seg()}-${seg()}`
}

async function keyExiste(key) {
  const r = await fetch(`${SUPABASE_URL}/rest/v1/keys?key=eq.${key}&select=key`, { headers: headers() })
  const d = await r.json()
  return Array.isArray(d) && d.length > 0
}

export async function gerarKeyUnica(prefixo, tentativas = 10) {
  for (let i = 0; i < tentativas; i++) {
    const k = gerarKey(prefixo)
    if (!(await keyExiste(k))) return k
  }
  throw new Error('Não foi possível gerar key única')
}

export async function inserirKey(key, tipo, expiry) {
  const r = await fetch(`${SUPABASE_URL}/rest/v1/keys`, {
    method: 'POST',
    headers: headers(),
    body: JSON.stringify({ key, type: tipo, expiry, device_id:'', hw_ver:'', banned:'', resets:0 }),
  })
  if (!r.ok) throw new Error(`Supabase ${r.status}: ${await r.text()}`)
  return key
}
