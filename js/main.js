import { setupCanvas, drawBackground, resizeCanvas } from "./canvas.js";
import { Player } from "./player.js";
import { handleInput } from "./input.js";
import { updateGame } from "./game.js";

// Configura o canvas e contexto
const { canvas, context } = setupCanvas();
resizeCanvas(canvas); // Configura o tamanho inicial
window.addEventListener("resize", () => resizeCanvas(canvas));

// Criar os jogadores
const player1 = new Player({ x: 100, y: canvas.height - 450 }, "right", "#A7BAF2");
const player2 = new Player(
  { x: canvas.width - 150, y: canvas.height - 450 },
  "left",
  "#F2C46D"
);

let isGameActive = true; // Variável para controlar o estado do jogo
let timeLeft = 90; // Tempo total da luta em segundos

// Função principal de animação
function gameLoop() {
  drawBackground(context, canvas);
  handleInput(player1, player2, canvas, isGameActive);
  updateGame(player1, player2, canvas, context);
  requestAnimationFrame(gameLoop);
}

// Inicializa o loop do jogo
gameLoop();

// Função para formatar o tempo
function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes < 10 ? "0" : ""}${minutes}:${
    remainingSeconds < 10 ? "0" : ""
  }${remainingSeconds}`;
}

// Atualiza o cronômetro a cada segundo
const timerInterval = setInterval(() => {
  if (timeLeft > 0) {
    timeLeft--;
    document.getElementById("timer").textContent = formatTime(timeLeft);
  } else {
    clearInterval(timerInterval); // Para o cronômetro quando o tempo acabar
    isGameActive = false; // Encerra o jogo
    console.log("Fim da luta!");
  }
}, 1000);
