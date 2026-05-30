import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'

export default function Obrigado() {
  const router = useRouter()
  const { email, produto } = router.query
  const [dados, setDados] = useState(null)
  const [loading, setLoading] = useState(true)
  const [copiado, setCopiado] = useState(false)
  const [erro, setErro] = useState(false)

  useEffect(() => {
    if (!email) return
    fetch(`/api/buscar-key?email=${encodeURIComponent(email)}`)
      .then(r => r.json())
      .then(data => {
        if (data.key) setDados(data)
        else setErro(true)
        setLoading(false)
      })
      .catch(() => { setErro(true); setLoading(false) })
  }, [email])

  const copiar = () => {
    navigator.clipboard.writeText(dados.key)
    setCopiado(true)
    setTimeout(() => setCopiado(false), 2000)
  }

  return (
    <>
      <Head>
        <title>Palas System — Compra Aprovada!</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <div style={styles.page}>
        <div style={styles.card}>
          {loading && (
            <>
              <div style={styles.spinner}>⏳</div>
              <p style={styles.subtitulo}>Buscando sua key...</p>
            </>
          )}

          {!loading && erro && (
            <>
              <div style={{fontSize: 48}}>❌</div>
              <h1 style={styles.titulo}>Key não encontrada</h1>
              <p style={styles.subtitulo}>
                Aguarde alguns minutos e recarregue a página.<br/>
                Se o problema persistir, entre em contato no WhatsApp.
              </p>
              <button onClick={() => router.reload()} style={styles.btnSecundario}>
                🔄 Tentar novamente
              </button>
            </>
          )}

          {!loading && dados && (
            <>
              <div style={{fontSize: 56}}>🎉</div>
              <h1 style={styles.titulo}>Compra Aprovada!</h1>
              <p style={styles.subtitulo}>
                Sua key de ativação está pronta. Cole ela no campo de ativação do programa.
              </p>

              <div style={styles.keyBox}>
                <div style={styles.keyLabel}>🔑 Sua Key de Ativação</div>
                <div style={styles.keyText}>{dados.key}</div>
                <button onClick={copiar} style={styles.btnCopiar}>
                  {copiado ? '✅ Copiado!' : '📋 Copiar Key'}
                </button>
              </div>

              {dados.produto && (
                <div style={styles.infoBox}>
                  <span style={styles.infoLabel}>Produto:</span> {dados.produto}<br/>
                  <span style={styles.infoLabel}>Validade:</span> {dados.expiry}
                </div>
              )}

              {dados.download && (
                <a href={dados.download} style={styles.btnDownload} download>
                  ⬇️ Baixar o Programa
                </a>
              )}

              <div style={styles.aviso}>
                ⚠️ Esta key é pessoal e intransferível.<br/>
                Ela será vinculada ao seu PC na primeira ativação.<br/>
                A key também foi enviada para seu e-mail e WhatsApp.
              </div>
            </>
          )}

          <div style={styles.rodape}>
            <span>⚡ Palas System</span>
            <span style={{color: '#8f98a0', fontSize: 12}}>Dúvidas? Entre em contato pelo WhatsApp</span>
          </div>
        </div>
      </div>
    </>
  )
}

const styles = {
  page: {
    minHeight: '100vh',
    background: '#1b2838',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '24px 16px',
    fontFamily: "'Segoe UI', sans-serif",
  },
  card: {
    background: '#16202d',
    border: '1px solid #2a3f5f',
    borderRadius: 20,
    padding: '40px 32px',
    maxWidth: 520,
    width: '100%',
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    gap: 20,
  },
  spinner: { fontSize: 48, animation: 'spin 1s linear infinite' },
  titulo: { color: '#a4d007', fontSize: 28, fontWeight: 900, margin: 0 },
  subtitulo: { color: '#8f98a0', fontSize: 15, lineHeight: 1.6, margin: 0 },
  keyBox: {
    background: '#0f1a24',
    border: '2px solid #a4d007',
    borderRadius: 12,
    padding: '20px',
    display: 'flex',
    flexDirection: 'column',
    gap: 12,
  },
  keyLabel: { color: '#8f98a0', fontSize: 13, fontWeight: 600 },
  keyText: {
    color: '#a4d007',
    fontSize: 20,
    fontFamily: 'monospace',
    fontWeight: 900,
    letterSpacing: 2,
    wordBreak: 'break-all',
  },
  btnCopiar: {
    background: '#a4d007',
    color: '#1b2838',
    border: 'none',
    borderRadius: 8,
    padding: '12px 24px',
    fontSize: 15,
    fontWeight: 900,
    cursor: 'pointer',
  },
  btnDownload: {
    display: 'block',
    background: '#66c0f4',
    color: '#1b2838',
    textDecoration: 'none',
    borderRadius: 10,
    padding: '14px',
    fontSize: 16,
    fontWeight: 900,
  },
  btnSecundario: {
    background: '#2a3f5f',
    color: '#c7d5e0',
    border: 'none',
    borderRadius: 8,
    padding: '12px 24px',
    fontSize: 15,
    cursor: 'pointer',
  },
  infoBox: {
    background: '#0f1a24',
    borderRadius: 8,
    padding: '12px 16px',
    color: '#c7d5e0',
    fontSize: 14,
    textAlign: 'left',
    lineHeight: 1.8,
  },
  infoLabel: { color: '#8f98a0', fontWeight: 600 },
  aviso: {
    color: '#8f98a0',
    fontSize: 12,
    lineHeight: 1.7,
    background: '#0f1a24',
    borderRadius: 8,
    padding: '12px',
  },
  rodape: {
    borderTop: '1px solid #2a3f5f',
    paddingTop: 16,
    display: 'flex',
    flexDirection: 'column',
    gap: 4,
    color: '#a4d007',
    fontWeight: 900,
  },
}
