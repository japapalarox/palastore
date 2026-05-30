# Palas System — Loja

Site de vendas com integração PerfectPay + Supabase + E-mail + WhatsApp.

## Estrutura

```
pages/
  index.js          ← Página principal com os produtos
  api/
    webhook.js      ← Recebe webhook do PerfectPay após pagamento

lib/
  produtos.js       ← Configuração dos produtos e preços
  supabase.js       ← Gera e insere keys no banco
  email.js          ← Envia e-mail via Resend
  whatsapp.js       ← Envia WhatsApp via Z-API
```

## Deploy no Vercel

1. Crie conta em https://vercel.com
2. Instale a CLI: `npm i -g vercel`
3. Na pasta do projeto: `vercel`
4. Configure as variáveis de ambiente no dashboard do Vercel

## Variáveis de ambiente necessárias

| Variável | Onde conseguir |
|---|---|
| SUPABASE_URL | Supabase → Project Settings → API |
| SUPABASE_SERVICE_KEY | Supabase → Project Settings → API → service_role |
| RESEND_API_KEY | resend.com → API Keys (grátis até 3000 e-mails/mês) |
| EMAIL_DOMAIN | Seu domínio verificado no Resend |
| ZAPI_INSTANCE_ID | z-api.io → Sua instância |
| ZAPI_TOKEN | z-api.io → Token da instância |

## Configurar produtos

Edite `lib/produtos.js` e preencha:
- `preco` — Preço exibido no site
- `expiraDias` — Quantos dias a key vai durar
- `perfectpay_code` — Código do produto no PerfectPay

## Configurar Webhook no PerfectPay

1. Acesse seu produto no PerfectPay
2. Vá em Configurações → Webhook
3. Cole a URL: `https://seu-projeto.vercel.app/api/webhook`
4. Selecione o evento: "Venda Aprovada"

## Serviços gratuitos usados

- **Vercel** — hospedagem grátis (100k req/mês)
- **Resend** — e-mail grátis (3000/mês)
- **Z-API** — WhatsApp (trial grátis, depois ~R$15/mês)
- **Supabase** — banco já configurado
