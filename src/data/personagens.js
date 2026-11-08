/* =========================================================
   PERSONAGENS — aparência (cores) e nomes.

   A arte de cada personagem é gerada automaticamente a partir
   destas cores, então para mudar a cor da blusa, do cabelo ou
   da pele, basta trocar o código da cor aqui.

   Estilos de cabelo disponíveis:  'longo' | 'curto' | 'rabo'
   Estilos de roupa disponíveis:   'regata' | 'polo' | 'camiseta'
   ========================================================= */

const PERSONAGENS = {
  // A personagem que ela controla
  ela: {
    nome: CONFIG.nomeDela,
    visual: {
      pele: '#c88a62',
      cabelo: '#3a231d',
      cabeloBrilho: '#634033',
      estiloCabelo: 'longo',
      roupa: '#7b4a33',      // blusa marrom
      estiloRoupa: 'regata',
      calca: '#83a9d8',      // jeans claro
      tenis: '#f6f2f6',
      bochecha: '#e0727f',
    },
  },

  // Você!
  ele: {
    nome: CONFIG.nomeDele,
    visual: {
      pele: '#e6b590',
      cabelo: '#2e1f1a',
      cabeloBrilho: '#523a30',
      estiloCabelo: 'curto',
      roupa: '#f1ebdf',      // polo clara
      gola: '#ffffff',
      estiloRoupa: 'polo',
      calca: '#7aa2d4',
      tenis: '#f6f2f6',
      bochecha: '#e8a0a0',
    },
  },

  // A amiga dela (Fase 1)
  amiga: {
    nome: 'Amiga',
    visual: {
      pele: '#e9c09c',
      cabelo: '#6b3f2a',
      estiloCabelo: 'rabo',
      laco: '#ff6fae',
      roupa: '#f49ac1',
      estiloRoupa: 'camiseta',
      calca: '#5a5f8a',
      tenis: '#f6f2f6',
      bochecha: '#ee9aa4',
    },
  },

  // Colegas de escola (figurantes)
  aluno1: {
    nome: 'Colega',
    visual: { pele: '#d9a47c', cabelo: '#1f1714', estiloCabelo: 'curto', roupa: '#ffffff', estiloRoupa: 'camiseta', calca: '#6f95c9', tenis: '#f6f2f6' },
  },
  aluno2: {
    nome: 'Colega',
    visual: { pele: '#b97c58', cabelo: '#271a16', estiloCabelo: 'curto', roupa: '#ffffff', estiloRoupa: 'camiseta', calca: '#4f6fa3', tenis: '#3a3550' },
  },
  aluna1: {
    nome: 'Colega',
    visual: { pele: '#f0c8a8', cabelo: '#4a2c20', estiloCabelo: 'longo', roupa: '#ffffff', estiloRoupa: 'camiseta', calca: '#6f95c9', tenis: '#f6f2f6' },
  },
  aluna2: {
    nome: 'Colega',
    visual: { pele: '#a8714e', cabelo: '#17110f', estiloCabelo: 'rabo', laco: '#ffd86b', roupa: '#ffffff', estiloRoupa: 'camiseta', calca: '#6f95c9', tenis: '#f6f2f6' },
  },

  // Narrador (sem retrato)
  narrador: { nome: '', narrador: true },
};
