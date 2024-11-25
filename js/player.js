export class Player {
  constructor(position, orientation, color) {
    this.position = { x: position.x, y: position.y };
    this.orientation = orientation;
    this.isOnGround = false;
    this.velocity = { x: 0, y: 0 };
    this.width = 50;
    this.height = 150;
    this.attackBox = { width: 75, height: 50 };
    this.isAttacking = false;
    this.color = color;
    this.health = 100;
  }

  // Desenha o jogador no canvas
  draw(context) {
    context.fillStyle = this.color;
    context.fillRect(this.position.x, this.position.y, this.width, this.height);

    // Desenha a caixa de ataque com base na orientação
    if (this.isAttacking) {
      if (this.orientation === "right") {
        context.fillRect(
          this.position.x + this.width,
          this.position.y,
          this.attackBox.width,
          this.attackBox.height
        );
      } else {
        context.fillRect(
          this.position.x - this.attackBox.width,
          this.position.y,
          this.attackBox.width,
          this.attackBox.height
        );
      }
    }
  }

  // Aplica a gravidade ao jogador
  applyGravity(gravity, groundLevel) {
    // Aplica a gravidade se o jogador estiver no ar
    if (!this.isOnGround) {
      this.velocity.y += gravity;
    }

    // Atualiza a posição com a velocidade vertical
    this.position.y += this.velocity.y;

    // Verifica se o jogador atingiu o chão
    if (this.position.y >= groundLevel) {
      this.position.y = groundLevel;
      this.velocity.y = 0;
      this.isOnGround = true;
    } else {
      this.isOnGround = false;
    }
  }

  // Movimenta o jogador com limite de bordas
  move(direction, canvasWidth) {
    if (direction === "left" && this.position.x > 0) {
      this.velocity.x = -7;
      this.orientation = "left";
    }
    if (direction === "right" && this.position.x + this.width < canvasWidth) {
      this.velocity.x = 7;
      this.orientation = "right";
    }
    if (direction === "up" && this.isOnGround) {
      this.velocity.y = -14;
      this.isOnGround = false;
    }

    // Atualiza a posição horizontal com a velocidade
    this.position.x += this.velocity.x;

    // Impede que o jogador ultrapasse os limites da tela
    if (this.position.x < 0) {
      this.position.x = 0; // Limite esquerdo
    } else if (this.position.x + this.width > canvasWidth) {
      this.position.x = canvasWidth - this.width; // Limite direito
    }

    // A velocidade horizontal deve ser resetada ao final de cada movimento
    this.velocity.x = 0;
  }

  takeDamage(amount) {
    this.health -= amount;
    if (this.health < 0) this.health = 0;
  }
}
