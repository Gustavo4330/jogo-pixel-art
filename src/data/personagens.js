/* =========================================================
   PERSONAGENS — aparência (cores) e nomes.

   A arte de cada personagem é gerada automaticamente a partir
   destas cores, então para mudar a cor da blusa, do cabelo ou
   da pele, basta trocar o código da cor aqui.

   Estilos de cabelo disponíveis:  'longo' | 'curto' | 'rabo'
   Estilos de roupa disponíveis:   'regata' | 'polo' | 'camiseta'
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

  // Para adicionar figurantes nas próximas fases, copie um personagem
  // acima e mude o id (ex.: 'irma', 'mae'), as cores e o nome.

  // Narrador (sem retrato)
  narrador: { nome: '', narrador: true },
};
