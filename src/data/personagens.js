/* =========================================================
   PERSONAGENS — aparência (cores) e nomes.

   A arte de cada personagem é gerada automaticamente a partir
   destas cores, então para mudar a cor da blusa, do cabelo ou
   da pele, basta trocar o código da cor aqui.

   Estilos de cabelo disponíveis:  'longo' | 'curto' | 'rabo' | 'ondulado' | 'coque'
   Estilos de roupa disponíveis:   'regata' | 'polo' | 'camiseta' | 'top' | 'vestido' | 'jaqueta'
   Extras: barriga: true (barriga de chopp), mascara: '#cor' (máscara no rosto)
   ========================================================= */

const PERSONAGENS = {
  // A Bia — a personagem que ela controla
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

  // O Gustavo (você!)
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

  // A Sofia, amiga dela (Fase 1)
  amiga: {
    nome: 'Sofia',
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

  // O Felipe, amigo de vocês (Fase 2)
  felipe: {
    nome: 'Felipe',
    visual: {
      pele: '#d7a27a',
      cabelo: '#6b4128',        // castanho
      cabeloBrilho: '#93603d',
      estiloCabelo: 'ondulado', // cabelo ondulado
      roupa: '#4a6fa8',
      estiloRoupa: 'camiseta',
      calca: '#3d3f52',
      tenis: '#f6f2f6',
    },
  },

  // A família da Bia (Fase 4): pai, mãe (Ana) e vó (Raquel)
  pai: {
    nome: 'Pai',
    visual: { pele: '#c48a62', cabelo: '#241914', estiloCabelo: 'curto', roupa: '#3b6e4f', estiloRoupa: 'camiseta', calca: '#c9b48a', estiloCalca: 'shorts', tenis: '#3a3550' },
  },
  mae: {
    nome: 'Ana',
    visual: { pele: '#c98f69', cabelo: '#3d241b', estiloCabelo: 'longo', roupa: '#e07a5f', estiloRoupa: 'camiseta', calca: '#3d4f8a', tenis: '#f6f2f6', bochecha: '#e0727f' },
  },
  vo: {
    nome: 'Vó Raquel',
    visual: { pele: '#d9a57e', cabelo: '#d6d2ce', cabeloBrilho: '#f2efec', estiloCabelo: 'coque', roupa: '#8e6aa6', estiloRoupa: 'vestido', calca: '#d9a57e', tenis: '#7a5a8a', bochecha: '#e8909a' },
  },

  // A família do Gustavo (Fase 5)
  paula: {
    nome: 'Paula',
    visual: { pele: '#f0c8a8', cabelo: '#e3c063', cabeloBrilho: '#fbe3a0', estiloCabelo: 'longo', roupa: '#3f9a4a', estiloRoupa: 'camiseta', calca: '#2f3d66', tenis: '#f6f2f6', bochecha: '#ee9aa4' },
  },
  gabriela: {
    nome: 'Gabriela',
    visual: { pele: '#efc4a0', cabelo: '#6b4128', estiloCabelo: 'longo', roupa: '#f49ac1', estiloRoupa: 'camiseta', calca: '#83a9d8', estiloCalca: 'shorts', tenis: '#f6f2f6', bochecha: '#ee9aa4' },
  },
  vo_dele: {
    nome: 'Vó',
    visual: { pele: '#e8bf9c', cabelo: '#d8d2cb', cabeloBrilho: '#8a6a52', estiloCabelo: 'curto', roupa: '#6a8fc9', estiloRoupa: 'camiseta', calca: '#4a4a5a', tenis: '#7a5a8a', bochecha: '#e8909a' },
  },
  everton: {
    nome: 'Everton',
    visual: { pele: '#e2b08a', cabelo: '#5a3a28', estiloCabelo: 'curto', roupa: '#c94f3c', estiloRoupa: 'camiseta', calca: '#c9b48a', estiloCalca: 'shorts', tenis: '#3a3550', barriga: true },
  },

  // A moça entregando doces no Halloween (Fase 5)
  moca: {
    nome: 'Moça dos doces',
    visual: { pele: '#d9a47c', cabelo: '#2b1d18', estiloCabelo: 'rabo', laco: '#ff8a2c', roupa: '#7a3fa0', estiloRoupa: 'camiseta', calca: '#2b2b33', tenis: '#f6f2f6' },
  },

  // Vozes do lado de fora (aparece só o nome, sem retrato)
  vozes: { nome: 'Vozes lá fora' },

  // Para adicionar figurantes nas próximas fases, copie um personagem
  // acima e mude o id (ex.: 'irma', 'mae'), as cores e o nome.

  // Narrador (sem retrato)
  narrador: { nome: '', narrador: true },
};
