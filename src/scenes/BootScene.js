/* =========================================================
   CENA DE INICIALIZAÇÃO — gera toda a arte e abre o menu.
   ========================================================= */

class BootScene extends Phaser.Scene {
  constructor() { super('Boot'); }

  create() {
    ArtFactory.generateAll(this);
    document.body.classList.add('ready');
    this.scene.start('Menu', { view: 'titulo' });
  }
}
