/* =========================================================
   CONTROLES — junta teclado (computador) e toque (celular).

   Celular:  direcional à esquerda, botão A à direita.
   Teclado:  setas ou WASD para andar; Espaço/Enter/Z para interagir.
   ========================================================= */

const Controls = {
  dir: null,            // 'up' | 'down' | 'left' | 'right' | null
  keysDown: [],         // ordem das teclas de direção pressionadas
  touchDir: null,
  actionPending: false,
  listeners: { action: [], nav: [] },

  KEYMAP: {
    ArrowUp: 'up', KeyW: 'up', ArrowDown: 'down', KeyS: 'down',
    ArrowLeft: 'left', KeyA: 'left', ArrowRight: 'right', KeyD: 'right',
  },
  ACTION_KEYS: ['Space', 'Enter', 'KeyZ', 'KeyE', 'NumpadEnter'],

  init() {
    window.addEventListener('keydown', (e) => {
      const d = this.KEYMAP[e.code];
      if (d) {
        e.preventDefault();
        if (!this.keysDown.includes(d)) this.keysDown.push(d);
        if (!e.repeat) this.emit('nav', d);
      } else if (this.ACTION_KEYS.includes(e.code)) {
        e.preventDefault();
        if (!e.repeat) this.fireAction();
      }
    });
    window.addEventListener('keyup', (e) => {
      const d = this.KEYMAP[e.code];
      if (d) this.keysDown = this.keysDown.filter((k) => k !== d);
    });
    window.addEventListener('blur', () => { this.keysDown = []; this.touchDir = null; });

    // ----- direcional de toque -----
    const pad = document.getElementById('dpad');
    let padPointer = null;
    const updatePad = (e) => {
      const r = pad.getBoundingClientRect();
      const dx = e.clientX - (r.left + r.width / 2);
      const dy = e.clientY - (r.top + r.height / 2);
      const dead = r.width * 0.12;
      let d = null;
      if (Math.hypot(dx, dy) > dead) d = Math.abs(dx) > Math.abs(dy) ? (dx > 0 ? 'right' : 'left') : (dy > 0 ? 'down' : 'up');
      if (d !== this.touchDir && d) this.emit('nav', d);
      this.touchDir = d;
      pad.dataset.dir = d || '';
    };
    pad.addEventListener('pointerdown', (e) => {
      e.preventDefault();
      padPointer = e.pointerId;
      pad.setPointerCapture(e.pointerId);
      updatePad(e);
    });
    pad.addEventListener('pointermove', (e) => { if (e.pointerId === padPointer) updatePad(e); });
    const endPad = (e) => {
      if (e.pointerId !== padPointer) return;
      padPointer = null;
      this.touchDir = null;
      pad.dataset.dir = '';
    };
    pad.addEventListener('pointerup', endPad);
    pad.addEventListener('pointercancel', endPad);

    // ----- botão A -----
    const a = document.getElementById('btn-a');
    a.addEventListener('pointerdown', (e) => {
      e.preventDefault();
      a.classList.add('pressed');
      this.fireAction();
    });
    const up = () => a.classList.remove('pressed');
    a.addEventListener('pointerup', up);
    a.addEventListener('pointercancel', up);
    a.addEventListener('pointerleave', up);
  },

  fireAction() {
    // Se algum menu/diálogo estiver ouvindo, ele usa o botão.
    const ls = this.listeners.action;
    if (ls.length) { ls[ls.length - 1](); return; }
    this.actionPending = true;
  },

  /** Usado pelo mapa: retorna true uma vez por toque no botão A. */
  consumeAction() {
    const v = this.actionPending;
    this.actionPending = false;
    return v;
  },

  /** Direção atual (a última tecla pressionada tem prioridade). */
  getDir() {
    if (this.touchDir) return this.touchDir;
    return this.keysDown.length ? this.keysDown[this.keysDown.length - 1] : null;
  },

  on(evt, fn) { this.listeners[evt].push(fn); },
  off(evt, fn) { this.listeners[evt] = this.listeners[evt].filter((f) => f !== fn); },
  emit(evt, arg) {
    if (evt === 'nav') { const ls = this.listeners.nav; if (ls.length) ls[ls.length - 1](arg); }
  },

  setVisible(v) {
    document.body.classList.toggle('show-controls', v);
  },
};
