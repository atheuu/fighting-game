import { setupCanvas, drawBackground, resizeCanvas } from "./canvas.js";
import { Player } from "./player.js";
import { handleInput } from "./input.js";
import { updateGame } from "./game.js";
import { formatTime } from "./utils.js";
import { openModal } from "./modal.js";

// Configura o canvas e contexto
const { canvas, context } = setupCanvas();
resizeCanvas(canvas); // Configura o tamanho inicial
window.addEventListener("resize", () => resizeCanvas(canvas));

// Criar os jogadores
const player1 = new Player(
  { x: 100, y: canvas.height - 450 },
  "right",
  "yellow"
);
const player2 = new Player(
  { x: canvas.width - 150, y: canvas.height - 450 },
  "left",
  "green"
);

// Objeto para encapsular o estado do jogo
export const gameState = {
  timeLeft: 90,
  isGameActive: true,
  isPaused: false,
};

openModal(gameState);
gameLoop();

// Função principal de animação
function gameLoop() {
  drawBackground(context, canvas);
  if (!gameState.isPaused) {
    handleInput(player1, player2, canvas);
    updateGame(player1, player2, canvas, context);
  }
  requestAnimationFrame(gameLoop);
}

// Atualiza o cronômetro a cada segundo
const timerInterval = setInterval(() => {
  if (gameState.timeLeft > 0 && gameState.isGameActive && !gameState.isPaused) {
    gameState.timeLeft--;
    document.getElementById("timer").textContent = formatTime(
      gameState.timeLeft
    );
  }
}, 1000);
