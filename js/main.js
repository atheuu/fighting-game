import {
  setupCanvas,
  drawBackground,
  resizeCanvas
} from "./canvas.js";
import { Player } from "./player.js";
import { handleInput } from "./input.js";
import { updateGame } from "./game.js";
import { formatTime, showMessage } from "./utils.js";

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
const gameState = {
  isGameActive: true,
  timeLeft: 9, // Tempo total da luta em segundos
};

// Função principal de animação
function gameLoop() {
  drawBackground(context, canvas);
  handleInput(player1, player2, canvas, gameState.isGameActive);
  updateGame(player1, player2, canvas, context, gameState);
  requestAnimationFrame(gameLoop);
}

// Inicializa o loop do jogo
gameLoop();

// Atualiza o cronômetro a cada segundo
const timerInterval = setInterval(() => {
  if (gameState.timeLeft > 0 && gameState.isGameActive) {
    gameState.timeLeft--;
    document.getElementById("timer").textContent = formatTime(
      gameState.timeLeft
    );
  } else {
    clearInterval(timerInterval);
    gameState.isGameActive = false;
  }
}, 1000);
