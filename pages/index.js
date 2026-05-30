import Head from 'next/head'
import { PRODUTOS } from '../lib/produtos'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <>
      <Head>
        <title>Palas System — Loja</title>
        <meta name="description" content="Adquira sua licença Palas System" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        {/* Header */}
        <header className={styles.header}>
          <div className={styles.logo}>⚡ Palas System</div>
          <p className={styles.tagline}>Escolha seu plano e ative agora</p>
        </header>

        {/* Grid de produtos */}
        <section className={styles.grid}>
          {PRODUTOS.map(produto => (
            <div key={produto.id} className={styles.card} style={{'--cor': produto.cor}}>
              <div className={styles.cardIcon}>{produto.icone}</div>
              <h2 className={styles.cardNome}>{produto.nome}</h2>
              <p className={styles.cardSub}>{produto.subtitulo}</p>
              <p className={styles.cardDesc}>{produto.descricao}</p>
              <div className={styles.cardPreco}>
                <span className={styles.preco}>{produto.preco}</span>
                <span className={styles.periodo}>/ {produto.periodo}</span>
              </div>
              <a
                href={`https://pay.perfectpay.com.br/pay/${produto.perfectpay_code}`}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.btnComprar}
              >
                Comprar agora
              </a>
            </div>
          ))}
        </section>

        {/* Rodapé */}
        <footer className={styles.footer}>
          <p>🔒 Pagamento seguro via PerfectPay · Key enviada automaticamente após aprovação</p>
          <p style={{marginTop: 8, fontSize: 12, color: '#8f98a0'}}>
            A key será entregue por e-mail e WhatsApp em até 5 minutos após o pagamento.
          </p>
        </footer>
      </main>
    </>
  )
}
