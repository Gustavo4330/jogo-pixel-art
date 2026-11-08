/* =========================================================
   ÁUDIO — efeitos sonoros e uma musiquinha 8-bit gerados
   pelo próprio navegador (Web Audio). Não precisa de arquivos.

   Para usar uma música sua (mp3), coloque o arquivo em
   assets/audio/ e preencha MUSICA_ARQUIVO abaixo.
   ========================================================= */

const MUSICA_ARQUIVO = ''; // ex.: 'assets/audio/nossa-musica.mp3'

const AudioSystem = {
  ctx: null,
  master: null,
  musicGain: null,
  musicTimer: null,
  musicEl: null,
  lastBlip: 0,

  unlock() {
    if (!this.ctx) {
      const AC = window.AudioContext || window.webkitAudioContext;
      if (!AC) return;
      this.ctx = new AC();
      this.master = this.ctx.createGain();
      this.master.gain.value = 0.5;
      this.master.connect(this.ctx.destination);
      this.musicGain = this.ctx.createGain();
      this.musicGain.gain.value = 0.28;
      this.musicGain.connect(this.master);
    }
    if (this.ctx.state === 'suspended') this.ctx.resume();
    if (SaveSystem.data.musica) this.startMusic();
  },

  tone(freq, dur, { type = 'square', vol = 0.12, when = 0, slide = 0, dest = null } = {}) {
    if (!this.ctx) return;
    const t = this.ctx.currentTime + when;
    const o = this.ctx.createOscillator();
    const g = this.ctx.createGain();
    o.type = type;
    o.frequency.setValueAtTime(freq, t);
    if (slide) o.frequency.linearRampToValueAtTime(freq + slide, t + dur);
    g.gain.setValueAtTime(0.0001, t);
    g.gain.linearRampToValueAtTime(vol, t + 0.01);
    g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    o.connect(g);
    g.connect(dest || this.master);
    o.start(t);
    o.stop(t + dur + 0.02);
  },

  play(name) {
    if (!this.ctx || !SaveSystem.data.som) return;
    const s = {
      blip: () => {
        const now = performance.now();
        if (now - this.lastBlip < 55) return;
        this.lastBlip = now;
        this.tone(660 + Math.random() * 60, 0.04, { vol: 0.04 });
      },
      select: () => this.tone(880, 0.06, { vol: 0.06 }),
      confirm: () => { this.tone(660, 0.06, { vol: 0.07 }); this.tone(990, 0.09, { vol: 0.07, when: 0.06 }); },
      wrong: () => { this.tone(220, 0.15, { type: 'sawtooth', vol: 0.06 }); this.tone(165, 0.22, { type: 'sawtooth', vol: 0.06, when: 0.13 }); },
      correct: () => [523, 659, 784, 1047].forEach((f, i) => this.tone(f, 0.14, { vol: 0.07, when: i * 0.08, type: 'triangle' })),
      door: () => { this.tone(300, 0.08, { vol: 0.06, type: 'triangle' }); this.tone(200, 0.12, { vol: 0.06, type: 'triangle', when: 0.08 }); },
      star: () => [988, 1319, 1568, 1976].forEach((f, i) => this.tone(f, 0.1, { vol: 0.05, when: i * 0.05 })),
      heart: () => { this.tone(784, 0.1, { vol: 0.06, type: 'triangle' }); this.tone(1175, 0.18, { vol: 0.06, type: 'triangle', when: 0.09 }); },
      item: () => [659, 784, 988, 1319].forEach((f, i) => this.tone(f, 0.12, { vol: 0.06, when: i * 0.07, type: 'triangle' })),
      victory: () => {
        const notes = [523, 659, 784, 1047, 784, 1047, 1319];
        notes.forEach((f, i) => this.tone(f, 0.22, { vol: 0.07, when: i * 0.12, type: 'triangle' }));
      },
    };
    if (s[name]) s[name]();
  },

  /* ---- música de fundo ---- */
  startMusic() {
    if (!this.ctx || this.musicTimer || this.musicEl) return;
    if (MUSICA_ARQUIVO) {
      this.musicEl = new Audio(MUSICA_ARQUIVO);
      this.musicEl.loop = true;
      this.musicEl.volume = 0.4;
      this.musicEl.play().catch(() => {});
      return;
    }
    // Progressão romântica simples: C - Am - F - G
    const chords = [[262, 330, 392], [220, 262, 330], [175, 220, 262], [196, 247, 294]];
    const melody = [659, 0, 784, 659, 587, 0, 523, 587, 659, 0, 523, 440, 392, 0, 440, 494,
                    523, 0, 659, 587, 523, 0, 440, 523, 494, 0, 392, 440, 494, 523, 587, 0];
    const beat = 0.32;
    let step = 0;
    let next = this.ctx.currentTime + 0.1;
    const schedule = () => {
      while (next < this.ctx.currentTime + 0.6) {
        const when = next - this.ctx.currentTime;
        const bar = Math.floor(step / 8) % 4;
        if (step % 8 === 0) chords[bar].forEach((f) => this.tone(f, beat * 7.5, { type: 'triangle', vol: 0.035, when, dest: this.musicGain }));
        if (step % 2 === 0) this.tone(chords[bar][0] / 2, beat * 1.6, { type: 'triangle', vol: 0.05, when, dest: this.musicGain });
        const m = melody[step % melody.length];
        if (m) this.tone(m, beat * 0.9, { type: 'square', vol: 0.025, when, dest: this.musicGain });
        step++;
        next += beat;
      }
    };
    schedule();
    this.musicTimer = setInterval(schedule, 150);
  },

  stopMusic() {
    if (this.musicTimer) { clearInterval(this.musicTimer); this.musicTimer = null; }
    if (this.musicEl) { this.musicEl.pause(); this.musicEl = null; }
  },

  setMusic(on) {
    SaveSystem.setOption('musica', on);
    if (on) this.startMusic(); else this.stopMusic();
  },

  setSound(on) {
    SaveSystem.setOption('som', on);
  },
};
