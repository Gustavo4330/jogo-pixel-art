/* =========================================================
   NOSSA HISTÓRIA — ponto de partida do jogo.
   ========================================================= */

window.addEventListener('load', () => {
  SaveSystem.load();
  Controls.init();

  // O navegador só libera som depois do primeiro toque.
  window.addEventListener('pointerdown', () => AudioSystem.unlock(), { once: true });
  window.addEventListener('keydown', () => AudioSystem.unlock(), { once: true });

  // HUD
  document.getElementById('hud-title').innerHTML = `${UI.heart()} ${UI.esc(CONFIG.titulo)}`;
  document.getElementById('dialog').querySelector('.dlg-next').innerHTML = UI.heart();
  document.getElementById('btn-menu').addEventListener('click', openPauseMenu);

  window.game = new Phaser.Game({
    type: Phaser.AUTO,
    parent: 'game',
    backgroundColor: '#1d1029',
    pixelArt: true,
    roundPixels: true,
    scale: {
      mode: Phaser.Scale.RESIZE,
      width: window.innerWidth,
      height: window.innerHeight,
    },
    physics: {
      default: 'arcade',
      arcade: { debug: CONFIG.debug },
    },
    scene: [BootScene, MenuScene, WorldScene],
  });
});

/** Menu de pausa (botão ☰ no canto da tela). */
async function openPauseMenu() {
  const world = window.game.scene.getScene('World');
  if (!world || !world.sys.isActive() || world.locked) return;
  world.locked = true;
  world.player.stop();
  Controls.setVisible(false);
  const d = SaveSystem.data;
  const m = document.getElementById('modal');
  m.className = 'pause';
  m.innerHTML = `
    <div class="panel">
      <h2>${UI.heart()} Pausa</h2>
      <button class="btn primary" data-a="voltar">▶ Continuar jogando</button>
      <button class="btn" data-a="som">Som: ${d.som ? 'ligado' : 'desligado'}</button>
      <button class="btn" data-a="musica">Música: ${d.musica ? 'ligada' : 'desligada'}</button>
      <button class="btn" data-a="mapa">Mapa das memórias</button>
    </div>`;
  m.hidden = false;
  m.onclick = async (e) => {
    const b = e.target.closest('[data-a]');
    if (!b) return;
    AudioSystem.play('confirm');
    const a = b.dataset.a;
    if (a === 'som') { AudioSystem.setSound(!SaveSystem.data.som); b.textContent = `Som: ${SaveSystem.data.som ? 'ligado' : 'desligado'}`; return; }
    if (a === 'musica') { AudioSystem.setMusic(!SaveSystem.data.musica); b.textContent = `Música: ${SaveSystem.data.musica ? 'ligada' : 'desligada'}`; return; }
    m.hidden = true;
    m.onclick = null;
    m.innerHTML = '';
    if (a === 'mapa') {
      world.leaving = true;
      await UI.fade(true);
      UI.hud.hide();
      world.scene.start('Menu', { view: 'fases' });
      return;
    }
    world.locked = false;
    Controls.consumeAction();
    Controls.setVisible(true);
  };
}
