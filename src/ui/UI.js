/* =========================================================
   INTERFACE — caixas de diálogo, quiz, cartões, HUD, menus.
   Feita em HTML/CSS por cima do jogo (texto sempre nítido).
   Todas as funções que "esperam" o jogador retornam Promises,
   assim os roteiros podem usar  await UI.dialog.say(...)
   ========================================================= */

const UI = {
  $(sel) { return document.querySelector(sel); },

  heart(cls = '') {
    return `<svg class="px-heart ${cls}" viewBox="0 0 7 6" shape-rendering="crispEdges" aria-hidden="true">
      <rect x="1" y="0" width="2" height="1"/><rect x="4" y="0" width="2" height="1"/>
      <rect x="0" y="1" width="7" height="2"/><rect x="1" y="3" width="5" height="1"/>
      <rect x="2" y="4" width="3" height="1"/><rect x="3" y="5" width="1" height="1"/></svg>`;
  },

  esc(s) {
    return String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  },

  /** Espera o jogador tocar na tela / apertar A. */
  waitTap(ignoreSelector) {
    return new Promise((resolve) => {
      const done = () => {
        Controls.off('action', done);
        window.removeEventListener('pointerdown', onPtr, true);
        resolve();
      };
      const onPtr = (e) => {
        if (e.target.closest('#btn-a, #hud button')) return;
        if (ignoreSelector && e.target.closest(ignoreSelector)) return;
        done();
      };
      // pequeno atraso evita que o mesmo toque avance duas vezes
      setTimeout(() => {
        Controls.on('action', done);
        window.addEventListener('pointerdown', onPtr, true);
      }, 120);
    });
  },

  wait(ms) { return new Promise((r) => setTimeout(r, ms)); },

  /* ------------------------------------------------------ */
  dialog: {
    typing: null,

    open(quem, rosto) {
      const el = UI.$('#dialog');
      const p = PERSONAGENS[quem] || { nome: quem };
      el.hidden = false;
      el.classList.toggle('narrator', !!p.narrador || !p.visual);
      el.querySelector('.dlg-name').innerHTML = p.nome ? `${UI.esc(p.nome)} ${UI.heart()}` : '';
      el.querySelector('.dlg-name').hidden = !p.nome;
      const img = el.querySelector('.dlg-portrait img');
      const urls = ArtFactory.portraitsFor(quem);
      if (urls) img.src = urls[rosto] || urls.normal;
      return el;
    },

    /** Escreve o texto letra por letra. Resolve quando termina. */
    type(texto) {
      const el = UI.$('#dialog');
      const box = el.querySelector('.dlg-text');
      el.classList.remove('ready');
      box.textContent = '';
      return new Promise((resolve) => {
        let i = 0;
        const full = String(texto);
        const finish = () => {
          clearInterval(this.typing);
          this.typing = null;
          box.textContent = full;
          el.classList.add('ready');
          Controls.off('action', skip);
          window.removeEventListener('pointerdown', skipPtr, true);
          resolve();
        };
        const skip = () => finish();
        const skipPtr = (e) => { if (!e.target.closest('#quiz, #hud button')) finish(); };
        Controls.on('action', skip);
        setTimeout(() => window.addEventListener('pointerdown', skipPtr, true), 120);
        this.typing = setInterval(() => {
          i++;
          box.textContent = full.slice(0, i);
          if (full[i - 1] && full[i - 1] !== ' ') AudioSystem.play('blip');
          if (i >= full.length) finish();
        }, CONFIG.velocidadeTexto);
      });
    },

    /** Mostra uma fala e espera o jogador avançar. */
    async say(quem, texto, rosto) {
      this.open(quem, rosto);
      await this.type(texto);
      await UI.waitTap('#quiz');
      AudioSystem.play('select');
    },

    hide() {
      UI.$('#dialog').hidden = true;
    },
  },

  /* ------------------------------------------------------ */
  quiz: {
    /** Mostra as alternativas e resolve com o índice escolhido. */
    choose(opcoes) {
      const box = UI.$('#quiz');
      const list = box.querySelector('.quiz-opts');
      list.innerHTML = '';
      let sel = 0;
      const btns = opcoes.map((txt, i) => {
        const b = document.createElement('button');
        b.className = 'quiz-opt';
        b.innerHTML = `<span class="arrow">▶</span><span>${UI.esc(txt)}</span>`;
        list.appendChild(b);
        return b;
      });
      const mark = () => btns.forEach((b, i) => b.classList.toggle('selected', i === sel));
      mark();
      box.hidden = false;
      return new Promise((resolve) => {
        const pickIt = (i) => {
          Controls.off('action', onAct);
          Controls.off('nav', onNav);
          btns.forEach((b) => (b.disabled = true));
          btns[i].classList.add('chosen');
          setTimeout(() => { box.hidden = true; resolve(i); }, 260);
        };
        const onAct = () => pickIt(sel);
        const onNav = (d) => {
          if (d === 'up') sel = (sel + btns.length - 1) % btns.length;
          if (d === 'down') sel = (sel + 1) % btns.length;
          AudioSystem.play('select');
          mark();
        };
        btns.forEach((b, i) => b.addEventListener('click', () => { sel = i; mark(); pickIt(i); }));
        setTimeout(() => { Controls.on('action', onAct); Controls.on('nav', onNav); }, 150);
      });
    },

    progress(done, total) {
      const el = UI.$('#quiz-progress');
      if (total == null) { el.hidden = true; return; }
      el.hidden = false;
      el.innerHTML = Array.from({ length: total }, (_, i) => UI.heart(i < done ? 'on' : 'off')).join('');
    },

    /** Roda um quiz inteiro (várias perguntas). Só termina quando acertar todas. */
    async run(quiz) {
      const host = quiz.quem || 'ele';
      const total = quiz.perguntas.length;
      for (let qi = 0; qi < total; qi++) {
        const q = quiz.perguntas[qi];
        UI.quiz.progress(qi, total);
        let erros = 0;
        // embaralha as alternativas, guardando qual é a certa
        let ordem = q.opcoes.map((_, i) => i);
        if (quiz.embaralhar !== false) ordem = ordem.sort(() => Math.random() - 0.5);
        for (;;) {
          UI.dialog.open(host, 'normal');
          await UI.dialog.type(q.pergunta);
          const escolhido = ordem[await UI.quiz.choose(ordem.map((i) => q.opcoes[i]))];
          if (escolhido === q.correta) {
            AudioSystem.play('correct');
            UI.quiz.progress(qi + 1, total);
            await UI.dialog.say(host, q.acerto || 'Isso mesmo! ♥', 'feliz');
            break;
          }
          AudioSystem.play('wrong');
          UI.$('#dialog').classList.remove('shake'); void UI.$('#dialog').offsetWidth; UI.$('#dialog').classList.add('shake');
          const msgs = q.erro || quiz.erro || ['Hmm... não foi bem assim! Tenta de novo ♥'];
          await UI.dialog.say(host, msgs[erros % msgs.length], 'surpreso');
          erros++;
        }
      }
      UI.quiz.progress(null);
    },
  },

  /* ------------------------------------------------------ */
  /** Janela central genérica. Resolve quando o botão é tocado. */
  modal(html, { botao = 'Continuar', classe = '' } = {}) {
    const m = UI.$('#modal');
    m.className = classe;
    m.innerHTML = `<div class="panel">${html}${botao ? `<button class="btn primary modal-ok">${UI.esc(botao)}</button>` : ''}</div>`;
    m.hidden = false;
    return new Promise((resolve) => {
      const close = () => {
        Controls.off('action', close);
        m.hidden = true;
        m.innerHTML = '';
        AudioSystem.play('confirm');
        resolve();
      };
      const ok = m.querySelector('.modal-ok');
      if (ok) ok.addEventListener('click', close);
      setTimeout(() => Controls.on('action', close), 300);
    });
  },

  /** Pergunta sim/não dentro do jogo. Resolve com true ou false. */
  confirm(titulo, texto, sim = 'Sim', nao = 'Cancelar') {
    const m = UI.$('#modal');
    m.className = '';
    m.innerHTML = `<div class="panel"><h2>${UI.esc(titulo)}</h2><p>${UI.esc(texto)}</p>
      <button class="btn primary" data-r="1">${UI.esc(sim)}</button>
      <button class="btn" data-r="0">${UI.esc(nao)}</button></div>`;
    m.hidden = false;
    return new Promise((resolve) => {
      m.onclick = (e) => {
        const b = e.target.closest('[data-r]');
        if (!b) return;
        m.onclick = null;
        m.hidden = true;
        m.innerHTML = '';
        AudioSystem.play('confirm');
        resolve(b.dataset.r === '1');
      };
    });
  },

  item(key, texto, titulo) {
    AudioSystem.play('item');
    return UI.modal(`
      <div class="item-shine"><img class="px item-img" src="${ArtFactory.icons[key]}" alt=""></div>
      ${titulo ? `<h2>${UI.esc(titulo)}</h2>` : ''}
      <p>${UI.esc(texto)}</p>`, { classe: 'item' });
  },

  memory(id) {
    const b = BONUS[id];
    if (!b) return Promise.resolve();
    AudioSystem.play('star');
    return UI.modal(`
      <div class="memory-tag">${UI.heart()} Memória bônus ${UI.heart()}</div>
      <h2>${UI.esc(b.titulo)}</h2>
      ${b.foto ? `<img class="memory-photo" src="${UI.esc(b.foto)}" alt="">` : ''}
      <p>${UI.esc(b.texto)}</p>`, { classe: 'memory', botao: 'Guardar no coração ♥' });
  },

  card(titulo, texto, botao = 'Continuar') {
    return UI.modal(`<h2>${UI.esc(titulo)}</h2><p>${UI.esc(texto)}</p>`, { botao });
  },

  async phaseIntro(fase) {
    const el = UI.$('#phase-intro');
    el.innerHTML = `
      <div class="pi-num">${fase.boss ? 'Fase final' : 'Fase ' + fase.id}</div>
      <div class="pi-title">${UI.heart()} ${UI.esc(fase.nome)} ${UI.heart()}</div>
      <div class="pi-sub">${UI.esc([fase.local, fase.data].filter(Boolean).join(' • '))}</div>`;
    el.hidden = false;
    el.classList.remove('out');
    AudioSystem.play('heart');
    await Promise.race([UI.wait(2800), UI.waitTap()]);
    el.classList.add('out');
    await UI.wait(450);
    el.hidden = true;
  },

  /** Tela rápida de "passagem de tempo" (ex.: "Alguns minutos depois..."). */
  async timeskip(texto) {
    const el = UI.$('#phase-intro');
    el.innerHTML = `<div class="pi-sub timeskip">${UI.esc(texto)}</div>`;
    el.hidden = false;
    el.classList.remove('out');
    await UI.wait(2200);
    el.classList.add('out');
    await UI.wait(450);
    el.hidden = true;
  },

  /** Tela do beijo: coração grande pulsando. */
  async kiss(texto) {
    const el = UI.$('#phase-intro');
    el.innerHTML = `<div class="kiss-heart">${UI.heart()}</div><div class="pi-title">${UI.esc(texto)}</div>`;
    el.classList.add('kiss');
    el.hidden = false;
    el.classList.remove('out');
    await Promise.race([UI.wait(3600), UI.wait(1200).then(() => UI.waitTap())]);
    el.classList.add('out');
    await UI.wait(450);
    el.hidden = true;
    el.classList.remove('kiss');
  },

  toast(msg) {
    const t = UI.$('#toast');
    t.innerHTML = msg;
    t.classList.add('show');
    clearTimeout(this._toastT);
    this._toastT = setTimeout(() => t.classList.remove('show'), 2200);
  },

  fade(out) {
    const f = UI.$('#fade');
    f.classList.toggle('on', out);
    return UI.wait(380);
  },

  /* ------------------------------------------------------ */
  hud: {
    show(faseId) {
      UI.$('#hud').hidden = false;
      UI.$('#hud-phase').innerHTML = `Fase ${faseId}/${FASES.length} ${UI.heart()}`;
    },
    hide() { UI.$('#hud').hidden = true; UI.hud.goal(null); },

    /** Mostra o objetivo atual (dica de para onde ir). */
    goal(texto) {
      const el = UI.$('#hud-goal');
      if (texto === UI.hud._goal) return;
      UI.hud._goal = texto;
      el.hidden = !texto;
      if (texto) el.innerHTML = `<span class="goal-tag">Objetivo:</span>${UI.esc(texto)}`;
    },
  },

  /** Tela cheia (menus). Use data-action nos botões. */
  screen(html, onAction) {
    const s = UI.$('#screen');
    s.innerHTML = html;
    s.hidden = false;
    s.onclick = (e) => {
      const b = e.target.closest('[data-action]');
      if (!b || b.disabled) return;
      AudioSystem.unlock();
      AudioSystem.play('confirm');
      onAction(b.dataset.action, b.dataset);
    };
  },

  hideScreen() {
    const s = UI.$('#screen');
    s.hidden = true;
    s.innerHTML = '';
    s.onclick = null;
  },
};
