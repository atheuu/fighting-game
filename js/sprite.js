export class Sprite {
  constructor({
    position = { x: 0, y: 0 },
    states = {},
    offset = { x: 0, y: 0 },
    scale = 1,
  }) {
    this.position = position;
    this.states = states;
    this.offset = offset;
    this.scale = scale;
    this.image = new Image();
    this.currentState = "";
    this.imageSrc = "";
    this.maxFrames = 0;
    this.frameRetention = 0;
    this.currentFrame = 0;
    this.framesElapsed = 0;
    this.attackFrame = 0;

    // Carrega as imagens dos estados do sprite
    for (const state in this.states) {
      states[state].image = new Image();
      states[state].image.src = states[state].imageSrc;
    }

    this.lockedState = false;
    this.updateState(Object.keys(this.states)[0]);
  }

  drawSprite(context, orientation = "right") {
    const frameWidth = this.image.width / this.maxFrames;
    const frameHeight = this.image.height;
    let adjustedX = this.position.x;

    context.save();

    if (orientation === "left") {
      context.scale(-1, 1);
      adjustedX = -this.position.x - this.width;
    }

    context.drawImage(
      this.image, // Imagem a ser desenhada
      frameWidth * this.currentFrame, // Começo da largura
      0, // Começo da altura
      frameWidth, // Largura do quadro
      frameHeight, // Altura do quadro
      adjustedX - this.offset.x, // Posição x corrigida
      this.position.y - this.offset.y, // Posição y corrigida
      frameWidth * this.scale, // Largura escalada
      frameHeight * this.scale // Altura escalada
    );

    context.restore();
  }

  animateSprite() {
    this.framesElapsed++;
    if (this.framesElapsed >= this.frameRetention) {
      this.framesElapsed = 0;
      this.currentFrame++;

      if (this.currentFrame >= this.maxFrames) {
        if (this.currentState === "death") {
          this.currentFrame = this.maxFrames - 1;
          return;
        }

        this.currentFrame = 0;
        
        if (this.currentState === "attackOne") {
          if (this.onAnimationEnd) this.onAnimationEnd();
          this.stamina -= 50;
        }

        if (this.currentState === "takeHit") {
          if (this.onAnimationEnd) this.onAnimationEnd();
        }
      }

      // Atualiza o estado de ataque
      this.isAttacking =
        this.currentState === "attackOne" &&
        this.currentFrame === this.attackFrame - 1;
    }
  }

  updateState(newState) {
    if (this.currentState === newState) return;

    if (newState === "death") {
      this.lockedState = true;
      this._setState(newState);
      return;
    }

    if (newState === "takeHit" && this.currentState === "attackOne") {
      this.lockedState = false;
      this.onAnimationEnd = null;
      this._setState(newState);
      return;
    }

    if (newState === "takeHit" || newState === "attackOne") {
      this.lockedState = true;
      this.onAnimationEnd = () => {
        this.lockedState = false;
        this.onAnimationEnd = null;
      };
      this._setState(newState);
      return;
    }

    if (!this.lockedState) {
      this._setState(newState);
    }
  }

  _setState(newState) {
    const stateConfig = this.states[newState];
    this.image.src = stateConfig.imageSrc;
    this.maxFrames = stateConfig.maxFrames;
    this.frameRetention = stateConfig.frameRetention;

    if (newState === "attackOne") {
      this.attackFrame = stateConfig.attackFrame;
    }
    
    this.currentState = newState;
    this.currentFrame = 0;
    this.framesElapsed = 0;
  }

  updateSprite(context, orientation = "right") {
    this.drawSprite(context, orientation);
    this.animateSprite();
  }
}
