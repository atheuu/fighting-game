import { setupCanvas, drawBackground } from "./canvas.js";
import { Sprite } from "./sprite.js";
import { Player } from "./player.js";
import { handleInput } from "./input.js";
import { updateGame } from "./game.js";
import { formatTime, checkWinner } from "./utils.js";
import { openModal } from "./modal.js";

const { canvas, context } = setupCanvas();
const backgroundImage = new Image();
backgroundImage.src = "../assets/scenario/background.png";

export const gameState = {
  timeLeft: 90,
  isGameActive: true,
  isPaused: false,
};

const shop = new Sprite({
  position: { x: 624, y: 121 },
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
  name: "Samurai Mack",
  position: { x: 204, y: 140 },
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
  offset: { x: 244, y: 221 },
  scale: 2.8,
  width: 64,
  height: 120,
  orientation: "right",
  velocity: { x: 0, y: 0 },
  attackBox: { width: 221, height: 75 },
  health: 100,
});

const player2 = new Player({
  name: "Kenji",
  position: { x: 764, y: 140 },
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
  offset: { x: 263, y: 218 },
  scale: 2.8,
  width: 56,
  height: 140,
  orientation: "left",
  velocity: { x: 0, y: 0 },
  attackBox: { width: 193, height: 100 },
  health: 100,
});

openModal();
gameLoop();

function gameLoop() {
  context.clearRect(0, 0, canvas.width, canvas.height);
  drawBackground(context, canvas, backgroundImage, shop);
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
