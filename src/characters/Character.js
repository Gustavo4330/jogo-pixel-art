/* =========================================================
   PERSONAGEM — usado tanto pela jogadora quanto pelos NPCs.
   A posição (x, y) é a dos pés do personagem.
   ========================================================= */

const DIR_VEC = { up: [0, -1], down: [0, 1], left: [-1, 0], right: [1, 0] };

class Character {
  constructor(scene, x, y, id, { player = false } = {}) {
    this.scene = scene;
    this.id = id;
    this.dir = 'down';
    this.player = player;

    // a roupa depende da fase (veja "roupas" em src/data/fases.js)
    this.key = ArtFactory.ensureCharacter(scene, id, ArtFactory.currentFase);
    this.shadow = scene.add.image(x, y - 1, 'shadow');
    this.sprite = scene.physics.add.sprite(x, y, this.key, 0).setOrigin(0.5, 1);
    this.sprite.body.setSize(10, 6).setOffset(3, 17);
    this.sprite.setCollideWorldBounds(true);
    if (!player) this.sprite.body.setImmovable(true);
    this.sprite.character = this;
    this.sync();
  }

  get x() { return this.sprite.x; }
  get y() { return this.sprite.y; }

  face(dir) {
    if (!dir) return;
    this.dir = dir;
    this.sprite.anims.stop();
    this.sprite.setFrame(CharacterArt.frameIndex(dir, 0));
  }

  /** Vira o personagem na direção de um ponto. */
  faceTowards(x, y) {
    const dx = x - this.x, dy = y - this.y;
    this.face(Math.abs(dx) > Math.abs(dy) ? (dx > 0 ? 'right' : 'left') : (dy > 0 ? 'down' : 'up'));
  }

  move(dir, speed) {
    const [vx, vy] = DIR_VEC[dir];
    this.dir = dir;
    this.sprite.setVelocity(vx * speed, vy * speed);
    const key = `${this.key}-walk-${dir}`;
    if (this.sprite.anims.currentAnim?.key !== key || !this.sprite.anims.isPlaying) this.sprite.play(key);
  }

  stop() {
    this.sprite.setVelocity(0, 0);
    this.face(this.dir);
  }

  /** Mantém sombra e profundidade (quem está mais embaixo aparece na frente). */
  sync() {
    this.shadow.setPosition(this.sprite.x, this.sprite.y - 1);
    this.sprite.setDepth(this.sprite.y);
    this.shadow.setDepth(this.sprite.y - 0.5);
  }

  destroy() {
    this.sprite.destroy();
    this.shadow.destroy();
  }
}
