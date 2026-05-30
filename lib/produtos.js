// lib/produtos.js — Configure seus produtos aqui

export const PRODUTOS = [
  {
    id:       'palas-mensal',
    nome:     'Palas Plus',
    subtitulo:'Acesso mensal completo',
    preco:    'R$ 29,90',
    periodo:  '30 dias',
    tipo:     'palas',
    prefixo:  'PALAS',
    expiraDias: 30,
    cor:      '#a4d007',
    icone:    '⚡',
    descricao: 'Acesso a todos os jogos da plataforma Palas por 30 dias.',
    perfectpay_code: 'PPPBCRLK',
  },
  {
    id:       'knight-mensal',
    nome:     'Knight',
    subtitulo:'Acesso mensal Knight',
    preco:    'R$ 39,90',
    periodo:  '30 dias',
    tipo:     'knight',
    prefixo:  'KNIGHT',
    expiraDias: 30,
    cor:      '#cc3333',
    icone:    '⚔️',
    descricao: 'Acesso à plataforma Knight por 30 dias.',
    perfectpay_code: 'SEU_CODIGO_PRODUTO_PERFECTPAY_AQUI',
  },
  {
    id:       'plus-mensal',
    nome:     'WarLock Plus',
    subtitulo:'Acesso mensal Plus',
    preco:    'R$ 34,90',
    periodo:  '30 dias',
    tipo:     'plus',
    prefixo:  'PLUS',
    expiraDias: 30,
    cor:      '#66c0f4',
    icone:    '🎮',
    descricao: 'Acesso ao WarLock Plus por 30 dias.',
    perfectpay_code: 'SEU_CODIGO_PRODUTO_PERFECTPAY_AQUI',
  },
  {
    id:       'premium-mensal',
    nome:     'WarLock Premium',
    subtitulo:'Acesso mensal Premium',
    preco:    'R$ 49,90',
    periodo:  '30 dias',
    tipo:     'Sheet4',
    prefixo:  'PREMIUM',
    expiraDias: 30,
    cor:      '#ffd700',
    icone:    '👑',
    descricao: 'Acesso ao WarLock Premium por 30 dias.',
    perfectpay_code: 'SEU_CODIGO_PRODUTO_PERFECTPAY_AQUI',
  },
  {
    id:       'nintendo-mensal',
    nome:     'Nintendo',
    subtitulo:'Acesso mensal Nintendo',
    preco:    'R$ 29,90',
    periodo:  '30 dias',
    tipo:     'switzao',
    prefixo:  'NINTENDO',
    expiraDias: 30,
    cor:      '#e60012',
    icone:    '🎮',
    descricao: 'Acesso ao dashboard Nintendo por 30 dias.',
    perfectpay_code: 'SEU_CODIGO_PRODUTO_PERFECTPAY_AQUI',
  },
  {
    id:       'ps4-mensal',
    nome:     'PS4 System',
    subtitulo:'Acesso mensal PS4',
    preco:    'R$ 24,90',
    periodo:  '30 dias',
    tipo:     'PS4',
    prefixo:  'PS4',
    expiraDias: 30,
    cor:      '#003791',
    icone:    '🎮',
    descricao: 'Acesso ao PS4 System por 30 dias.',
    perfectpay_code: 'SEU_CODIGO_PRODUTO_PERFECTPAY_AQUI',
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
