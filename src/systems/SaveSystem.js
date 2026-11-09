/* =========================================================
   SAVE — guarda o progresso no próprio navegador (localStorage).
   Se ela fechar o jogo, continua de onde parou.
   ========================================================= */

const SaveSystem = {
  KEY: 'nossa-historia-save-v1',
  data: null,

  blank() {
    return { fasesConcluidas: [], bonus: [], flags: {}, som: true, musica: true };
  },

  load() {
    try {
      const raw = localStorage.getItem(this.KEY);
      this.data = Object.assign(this.blank(), raw ? JSON.parse(raw) : {});
    } catch (e) {
      this.data = this.blank();
    }
    return this.data;
  },

  save() {
    try { localStorage.setItem(this.KEY, JSON.stringify(this.data)); } catch (e) { /* modo privado */ }
  },

  reset() {
    const { som, musica, modoCriador } = this.data;
    this.data = Object.assign(this.blank(), { som, musica, modoCriador });
    this.save();
  },

  hasProgress() {
    return this.data.fasesConcluidas.length > 0 || Object.keys(this.data.flags).length > 0;
  },

  isCompleted(id) { return this.data.fasesConcluidas.includes(id); },

  /** Modo criador: todas as fases liberadas (ativado tocando 5x no título). */
  creatorMode() { return CONFIG.liberarTodasFases || !!this.data.modoCriador; },

  isUnlocked(id) { return id === 1 || this.creatorMode() || this.isCompleted(id - 1); },

  complete(id) {
    if (!this.isCompleted(id)) this.data.fasesConcluidas.push(id);
    this.save();
  },

  flag(name) { return !!this.data.flags[name]; },

  setFlag(name, value = true) {
    this.data.flags[name] = value;
    this.save();
  },

  hasBonus(id) { return this.data.bonus.includes(id); },

  collectBonus(id) {
    if (!this.hasBonus(id)) this.data.bonus.push(id);
    this.save();
  },

  setOption(name, value) {
    this.data[name] = value;
    this.save();
  },
};
