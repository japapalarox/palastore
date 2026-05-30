// pages/api/webhook.js
import { gerarKeyUnica, inserirKey } from '../../lib/supabase'
import { enviarEmail } from '../../lib/email'
import { enviarWhatsApp } from '../../lib/whatsapp'
import { getProdutoPorCodigo, calcularExpiry } from '../../lib/produtos'

const SUPABASE_URL = process.env.SUPABASE_URL
const SERVICE_KEY  = process.env.SUPABASE_SERVICE_KEY

async function salvarEmailNaKey(key, email) {
  try {
    await fetch(`${SUPABASE_URL}/rest/v1/keys?key=eq.${key}`, {
      method: 'PATCH',
      headers: {
        apikey: SERVICE_KEY,
        Authorization: `Bearer ${SERVICE_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ hw_ver: email }),
    })
  } catch(e) {
    console.error('Erro ao salvar email na key:', e)
  }
}

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end()

  try {
    const payload = req.body
    console.log('[Webhook]', JSON.stringify(payload, null, 2))

    const status = payload?.sale?.status || payload?.status || ''
    if (!['approved', 'paid', 'complete', 'APPROVED', 'PAID'].includes(status)) {
      return res.status(200).json({ ok: true, msg: 'Ignorado: ' + status })
    }

    const cliente   = payload?.customer || payload?.buyer || {}
    const nomeCliente = cliente.name || cliente.full_name || 'Cliente'
    const email     = cliente.email || ''
    const telefone  = cliente.phone || cliente.cel || ''

    const productCode = payload?.product?.code || payload?.product_code || ''
    const produto = getProdutoPorCodigo(productCode)

    if (!produto) {
      console.error('[Webhook] Produto não mapeado:', productCode)
      return res.status(200).json({ ok: false, msg: 'Produto não mapeado: ' + productCode })
    }

    const expiry = calcularExpiry(produto.expiraDias)
    const key    = await gerarKeyUnica(produto.prefixo)
    await inserirKey(key, produto.tipo, expiry)

    // Salva o e-mail do comprador no campo hw_ver para busca posterior
    if (email) await salvarEmailNaKey(key, email)

    console.log(`[Webhook] Key gerada: ${key} | ${produto.tipo} | ${expiry}`)

    if (email) await enviarEmail(email, nomeCliente, produto.nome, key, expiry)
    if (telefone) await enviarWhatsApp(telefone, nomeCliente, produto.nome, key)

    // URL da página de obrigado
    const baseUrl = process.env.NEXT_PUBLIC_URL || 'https://palastore.vercel.app'
    const thankYouUrl = `${baseUrl}/obrigado?email=${encodeURIComponent(email)}`

    return res.status(200).json({ ok: true, key, thankYouUrl })
  } catch (err) {
    console.error('[Webhook] Erro:', err)
    return res.status(500).json({ error: err.message })
  }
}
