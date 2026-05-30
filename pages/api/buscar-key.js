// pages/api/buscar-key.js
// Busca a key mais recente de um e-mail no Supabase

const SUPABASE_URL = process.env.SUPABASE_URL
const SERVICE_KEY  = process.env.SUPABASE_SERVICE_KEY

export default async function handler(req, res) {
  const { email } = req.query
  if (!email) return res.status(400).json({ error: 'Email obrigatório' })

  try {
    // Busca a key mais recente vinculada a esse e-mail
    // O campo hw_ver é usado para guardar o e-mail do comprador
    const r = await fetch(
      `${SUPABASE_URL}/rest/v1/keys?hw_ver=eq.${encodeURIComponent(email)}&order=id.desc&limit=1&select=key,type,expiry`,
      {
        headers: {
          apikey: SERVICE_KEY,
          Authorization: `Bearer ${SERVICE_KEY}`,
        }
      }
    )
    const data = await r.json()

    if (!Array.isArray(data) || data.length === 0) {
      return res.status(404).json({ error: 'Key não encontrada' })
    }

    const k = data[0]
    return res.json({
      key: k.key,
      produto: k.type,
      expiry: k.expiry,
      download: process.env.DOWNLOAD_URL || null,
    })
  } catch (err) {
    return res.status(500).json({ error: err.message })
  }
}
