// lib/produtos.js — Configure seus produtos aqui

export const PRODUTOS = [
  {
    id:         'palas-mensal',
    nome:       'Palas Plus',
    subtitulo:  'Acesso mensal completo',
    preco:      'R$ 29,90',
    periodo:    '30 dias',
    tipo:       'palas',
    prefixo:    'PALAS',
    expiraDias: 30,
    cor:        '#a4d007',
    icone:      '⚡',
    descricao:  'Acesso a todos os jogos da plataforma Palas por 30 dias.',
    perfectpay_code: 'PPPBCRLK',
    checkout_url:    'https://go.perfectpay.com.br/PPU38CQ6O22',
  },
  {
    id:         'plus-mensal',
    nome:       'WarLock Plus',
    subtitulo:  'Acesso mensal Plus',
    preco:      'R$ 34,90',
    periodo:    '30 dias',
    tipo:       'plus',
    prefixo:    'PLUS',
    expiraDias: 30,
    cor:        '#66c0f4',
    icone:      '🎮',
    descricao:  'Acesso ao WarLock Plus por 30 dias.',
    perfectpay_code: 'PPPBEK0T',
    checkout_url:    'https://go.perfectpay.com.br/PPU38CQB16T',
  },
  {
    id:         'premium-mensal',
    nome:       'WarLock Premium',
    subtitulo:  'Acesso mensal Premium',
    preco:      'R$ 49,90',
    periodo:    '30 dias',
    tipo:       'Sheet4',
    prefixo:    'PREMIUM',
    expiraDias: 30,
    cor:        '#ffd700',
    icone:      '👑',
    descricao:  'Acesso ao WarLock Premium por 30 dias.',
    perfectpay_code: 'PPPBEK1I',
    checkout_url:    'https://go.perfectpay.com.br/PPU38CQB16U',
  },
  {
    id:         'nintendo-mensal',
    nome:       'Nintendo',
    subtitulo:  'Acesso mensal Nintendo',
    preco:      'R$ 29,90',
    periodo:    '30 dias',
    tipo:       'switzao',
    prefixo:    'NINTENDO',
    expiraDias: 30,
    cor:        '#e60012',
    icone:      '🎮',
    descricao:  'Acesso ao dashboard Nintendo por 30 dias.',
    perfectpay_code: 'PPPBE3FG',
    checkout_url:    'https://go.perfectpay.com.br/PPU38CQ6OG7',
  },
  {
    id:         'playdock-mensal',
    nome:       'PlayDock',
    subtitulo:  'Acesso mensal PlayDock',
    preco:      'R$ 24,90',
    periodo:    '30 dias',
    tipo:       'PS4',
    prefixo:    'PLAYDOCK',
    expiraDias: 30,
    cor:        '#003791',
    icone:      '🎮',
    descricao:  'Acesso ao PlayDock por 30 dias.',
    perfectpay_code: 'PPPBDTLS',
    checkout_url:    'https://go.perfectpay.com.br/PPU38CQ6OFK',
  },
]

export function getProduto(id) {
  return PRODUTOS.find(p => p.id === id)
}

export function getProdutoPorCodigo(perfectpay_code) {
  return PRODUTOS.find(p => p.perfectpay_code === perfectpay_code)
}

export function calcularExpiry(dias) {
  const d = new Date()
  d.setDate(d.getDate() + dias)
  return d.toISOString().split('T')[0]
}
