import { Sprite } from "./sprite.js";

export class Player extends Sprite {
  constructor({
    position = { x: 0, y: 0 },
    states = {},
    offset = { x: 0, y: 0 },
    scale = 1,
    name = "",
    health = 100,
    width = 50,
    height = 150,
    orientation = "right",
    velocity = { x: 0, y: 0 },
    attackBox = { width: 75, height: 50 },
  }) {
    super({ position, states, offset, scale });
    this.name = name;
    this.health = health;
    this.width = width;
    this.height = height;
    this.orientation = orientation;
    this.velocity = velocity;
    this.speed = 7;
    this.jumpForce = -15;
    this.isOnGround = false;
    this.isAttacking = false;
    this.attackBox = attackBox;
  }

  updatePlayer(context, gravity, groundLevel) {
    this.applyGravity(gravity, groundLevel);

    // Atualiza animações de movimento
    if (!this.lockedState) {
      if (this.velocity.y < 0) {
        this.updateState("jump");
      } else if (this.velocity.y > 0) {
        this.updateState("fall");
      } else if (this.velocity.x !== 0) {
        this.updateState("run");
      } else if (this.velocity.x === 0) {
        this.updateState("idle");
      }
    }

    // Atualiza posição
    this.position.x += this.velocity.x;
    this.velocity.x = 0;

    // this.drawHitBox(context);
    this.updateSprite(context, this.orientation);
  }

  applyGravity(gravity, groundLevel) {
    if (!this.isOnGround) this.velocity.y += gravity;
    this.position.y += this.velocity.y;

    if (this.position.y + this.height >= groundLevel) {
      this.position.y = groundLevel - this.height;
      this.velocity.y = 0;
      this.isOnGround = true;
    } else {
      this.isOnGround = false;
    }
  }

  move(directions, canvasWidth) {
    if (directions.includes("left") && directions.includes("right")) {
      this.velocity.x = 0;
    } else if (directions.includes("left") && this.position.x > 0) {
      this.velocity.x = -this.speed;
      this.orientation = "left";
    } else if (
      directions.includes("right") &&
      this.position.x + this.width < canvasWidth
    ) {
      this.velocity.x = this.speed;
      this.orientation = "right";
    }
    if (directions.includes("up") && this.isOnGround) {
      this.velocity.y = this.jumpForce;
      this.isOnGround = false;
    }
  }

  drawHitBox(context) {
    // Hitbox do jogador
    context.fillStyle = "rgba(0, 255, 0, 0.5)";
    context.fillRect(this.position.x, this.position.y, this.width, this.height);

    // Caixa de ataque (se estiver atacando)
    if (this.isAttacking) {
      const attackX =
        this.orientation === "right"
          ? this.position.x + this.width
          : this.position.x - this.attackBox.width;

      context.fillStyle = "rgba(255, 0, 0, 0.5)";
      context.fillRect(
        attackX,
        this.position.y,
        this.attackBox.width,
        this.attackBox.height
      );
    }
  }

  resetPlayer({ position, orientation}) {
    this.position = position;
    this.orientation = orientation;
    this.health = 100;
    this.lockedState = false; 
  }
}
