import { setupCanvas, drawBackground } from "./canvas.js";
import { Player } from "./player.js";
import { handleInput } from "./input.js";
import { updateGame } from "./game.js";

const canvas = setupCanvas(); // Configura o canvas e o contexto
const context = canvas.getContext("2d");

// Criar os jogadores
const player1 = new Player({ x: 100, y: canvas.height - 450 }, "right", "red");

const player2 = new Player(
  { x: canvas.width - 150, y: canvas.height - 450 },
  "left",
  "blue"
);

// Função principal de animação
function gameLoop() {
  drawBackground(context, canvas);
  handleInput(player1, player2, canvas);
  updateGame(player1, player2, context);
  requestAnimationFrame(gameLoop);
}

// Inicializa o loop do jogo
gameLoop();
