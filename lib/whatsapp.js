// lib/whatsapp.js — Envio via Z-API (gratuito no trial)
// Cadastre em: https://z-api.io
// Alternativa grátis: Evolution API (self-hosted)

export async function enviarWhatsApp(telefone, nomeCliente, produto, key) {
  const ZAPI_INSTANCE = process.env.ZAPI_INSTANCE_ID
  const ZAPI_TOKEN    = process.env.ZAPI_TOKEN
  if (!ZAPI_INSTANCE || !ZAPI_TOKEN) { console.warn('Z-API não configurado'); return }

  // Formata telefone: remove não-numéricos, garante DDI 55
  const tel = telefone.replace(/\D/g, '').replace(/^(?!55)/, '55')

  const mensagem = `⚡ *Palas System* — Compra Aprovada!\n\nOlá *${nomeCliente}*! 🎮\n\nSua key *${produto}*:\n\`\`\`${key}\`\`\`\n\nCole essa key no campo de ativação do programa.\n\n⚠️ Ela será vinculada ao seu PC na primeira ativação.\nDúvidas? Responda aqui!`

  const r = await fetch(
    `https://api.z-api.io/instances/${ZAPI_INSTANCE}/token/${ZAPI_TOKEN}/send-text`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ phone: tel, message: mensagem }),
    }
  )
  if (!r.ok) console.error('Z-API erro:', await r.text())
  else console.log('WhatsApp enviado para', tel)
}
