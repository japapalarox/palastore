// lib/email.js — Envio de e-mail via Resend (gratuito até 3000/mês)
// Cadastre em: https://resend.com

export async function enviarEmail(destinatario, nomeCliente, produto, key, expiry) {
  const RESEND_KEY = process.env.RESEND_API_KEY
  if (!RESEND_KEY) { console.warn('RESEND_API_KEY não configurada'); return }

  const html = `
  <div style="font-family:sans-serif;max-width:600px;margin:auto;background:#1b2838;color:#c7d5e0;padding:32px;border-radius:12px">
    <h1 style="color:#a4d007;margin-bottom:4px">⚡ Palas System</h1>
    <p style="color:#8f98a0;margin-top:0">Sua compra foi aprovada!</p>
    <hr style="border-color:#2a3f5f;margin:24px 0"/>
    <p>Olá <strong>${nomeCliente}</strong>,</p>
    <p>Obrigado pela compra do <strong>${produto}</strong>!</p>
    <p>Aqui está sua key de ativação:</p>
    <div style="background:#0f1a24;border:2px solid #a4d007;border-radius:8px;padding:20px;margin:20px 0;text-align:center">
      <span style="font-family:monospace;font-size:22px;color:#a4d007;letter-spacing:2px">${key}</span>
    </div>
    <p style="color:#8f98a0;font-size:13px">Validade: <strong style="color:#66c0f4">${expiry}</strong></p>
    <hr style="border-color:#2a3f5f;margin:24px 0"/>
    <p style="font-size:12px;color:#8f98a0">
      ⚠️ Esta key é pessoal e intransferível. Ela será vinculada ao seu PC na primeira ativação.<br/>
      Em caso de dúvidas, entre em contato pelo WhatsApp.
    </p>
  </div>`

  const r = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${RESEND_KEY}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      from: `Palas System <noreply@${process.env.EMAIL_DOMAIN || 'palassystem.com'}>`,
      to:   [destinatario],
      subject: `⚡ Sua key ${produto} chegou!`,
      html,
    }),
  })
  if (!r.ok) console.error('Resend erro:', await r.text())
  else console.log('E-mail enviado para', destinatario)
}
