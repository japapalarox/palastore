// pages/api/webhook.js
// Recebe o webhook do PerfectPay após pagamento aprovado

import { gerarKeyUnica, inserirKey } from '../../lib/supabase'
import { enviarEmail } from '../../lib/email'
import { enviarWhatsApp } from '../../lib/whatsapp'
import { getProdutoPorCodigo, calcularExpiry } from '../../lib/produtos'

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end('Method Not Allowed')

  try {
    const payload = req.body
    console.log('[Webhook PerfectPay]', JSON.stringify(payload, null, 2))

    // ── Valida se o pagamento foi aprovado ──────────────────────
    // Status PerfectPay: 'approved', 'paid', 'complete'
    const status = payload?.sale?.status || payload?.status || ''
    if (!['approved', 'paid', 'complete', 'APPROVED', 'PAID'].includes(status)) {
      console.log('[Webhook] Status não aprovado:', status)
      return res.status(200).json({ ok: true, msg: 'Ignorado: status ' + status })
    }

    // ── Extrai dados do cliente ─────────────────────────────────
    const cliente = payload?.customer || payload?.buyer || {}
    const nomeCliente = cliente.name  || cliente.full_name || 'Cliente'
    const email       = cliente.email || ''
    const telefone    = cliente.phone || cliente.cel || ''

    // ── Identifica o produto ────────────────────────────────────
    const productCode = payload?.product?.code || payload?.product_code || ''
    const produto = getProdutoPorCodigo(productCode)

    if (!produto) {
      console.error('[Webhook] Produto não encontrado para código:', productCode)
      // Retorna 200 para o PerfectPay não ficar retentando
      return res.status(200).json({ ok: false, msg: 'Produto não mapeado: ' + productCode })
    }

    // ── Gera e insere a key ─────────────────────────────────────
    const expiry = calcularExpiry(produto.expiraDias)
    const key    = await gerarKeyUnica(produto.prefixo)
    await inserirKey(key, produto.tipo, expiry)

    console.log(`[Webhook] Key gerada: ${key} | Tipo: ${produto.tipo} | Expiry: ${expiry}`)

    // ── Envia e-mail ────────────────────────────────────────────
    if (email) {
      await enviarEmail(email, nomeCliente, produto.nome, key, expiry)
    }

    // ── Envia WhatsApp ──────────────────────────────────────────
    if (telefone) {
      await enviarWhatsApp(telefone, nomeCliente, produto.nome, key)
    }

    return res.status(200).json({ ok: true, key, produto: produto.nome })

  } catch (err) {
    console.error('[Webhook] Erro:', err)
    return res.status(500).json({ error: err.message })
  }
}
