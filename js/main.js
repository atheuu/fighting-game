import { setupCanvas, resizeCanvas, drawBackground } from "./canvas.js";
import { Sprite } from "./sprite.js";
import { Player } from "./player.js";
import { handleInput } from "./input.js";
import { updateGame } from "./game.js";
import { formatTime, checkWinner } from "./utils.js";
import { openModal } from "./modal.js";

const { canvas, context } = setupCanvas();
let scaleFactor = resizeCanvas(canvas);

export const gameState = {
  timeLeft: 90,
  isGameActive: true,
  isPaused: false,
};

const shop = new Sprite({
  position: { x: 625, y: 122 },
  states: {
    idle: {
      imageSrc: "../assets/scenario/shop.png",
      maxFrames: 5,
      frameRetention: 5,
    },
  },
  offset: { x: 0, y: 0 },
  scale: 2.8,
});

const player1 = new Player({
  position: { x: canvas.width * 0.2, y: 140 },
  states: {
    idle: {
      imageSrc: "../assets/samuraiMack/idle.png",
      maxFrames: 8,
      frameRetention: 5,
    },
    run: {
      imageSrc: "../assets/samuraiMack/run.png",
      maxFrames: 8,
      frameRetention: 5,
    },
    jump: {
      imageSrc: "../assets/samuraiMack/jump.png",
      maxFrames: 2,
      frameRetention: 5,
    },
    fall: {
      imageSrc: "../assets/samuraiMack/fall.png",
      maxFrames: 2,
      frameRetention: 5,
    },
    attack: {
      imageSrc: "../assets/samuraiMack/attack.png",
      maxFrames: 6,
      attackFrame: 5,
      frameRetention: 5,
    },
    takeHit: {
      imageSrc: "../assets/samuraiMack/takeHit.png",
      maxFrames: 4,
      frameRetention: 5,
    },
    death: {
      imageSrc: "../assets/samuraiMack/death.png",
      maxFrames: 6,
      frameRetention: 5,
    },
  },
  offset: { x: 262, y: 230 },
  scale: 3,
  width: 77,
  height: 135,
  orientation: "right",
  velocity: { x: 0, y: 0 },
  attackBox: { width: 228, height: 75 },
  health: 100,
});

const player2 = new Player({
  position: { x: canvas.width * 0.8, y: 140 },
  states: {
    idle: {
      imageSrc: "../assets/kenji/idle.png",
      maxFrames: 4,
      frameRetention: 5,
    },
    run: {
      imageSrc: "../assets/kenji/run.png",
      maxFrames: 8,
      frameRetention: 5,
    },
    jump: {
      imageSrc: "../assets/kenji/jump.png",
      maxFrames: 2,
      frameRetention: 5,
    },
    fall: {
      imageSrc: "../assets/kenji/fall.png",
      maxFrames: 2,
      frameRetention: 5,
    },
    attack: {
      imageSrc: "../assets/kenji/attack.png",
      maxFrames: 4,
      attackFrame: 3,
      frameRetention: 5,
    },
    takeHit: {
      imageSrc: "../assets/kenji/takeHit.png",
      maxFrames: 3,
      frameRetention: 5,
    },
    death: {
      imageSrc: "../assets/kenji/death.png",
      maxFrames: 7,
      frameRetention: 5,
    },
  },
  offset: { x: 282, y: 234 },
  scale: 3,
  width: 60,
  height: 150,
  orientation: "left",
  velocity: { x: 0, y: 0 },
  attackBox: { width: 198, height: 100 },
  health: 100,
});

openModal();
gameLoop();

function gameLoop() {
  context.clearRect(0, 0, canvas.width, canvas.height);
  drawBackground(context, canvas, shop);
  if (!gameState.isPaused) {
    handleInput(player1, player2, canvas);
    updateGame(player1, player2, canvas, context);
  }
  requestAnimationFrame(gameLoop);
}

setInterval(() => {
  if (gameState.timeLeft > 0 && gameState.isGameActive && !gameState.isPaused) {
    gameState.timeLeft--;
    document.getElementById("timer").textContent = formatTime(
      gameState.timeLeft
    );
  } else checkWinner(player1, player2);
}, 1000);
