import { gameState } from "./main.js";
import { resetGame } from "./game.js";

let keys = {};

window.addEventListener("keydown", (event) => {
  const key = event.key.length === 1 ? event.key.toLowerCase() : event.key;
  keys[key] = true;
});

window.addEventListener("keyup", (event) => {
  const key = event.key.length === 1 ? event.key.toLowerCase() : event.key;
  keys[key] = false;
});

// Controla os jogadores com base nas teclas pressionadas
export function handleInput(player1, player2, canvas) {
  if (gameState.isGameActive) {
    // Captura as direções para cada jogador
    const player1Directions = [];
    if (keys["a"]) player1Directions.push("left");
    if (keys["d"]) player1Directions.push("right");
    if (keys["w"]) player1Directions.push("up");

    const player2Directions = [];
    if (keys["ArrowLeft"]) player2Directions.push("left");
    if (keys["ArrowRight"]) player2Directions.push("right");
    if (keys["ArrowUp"]) player2Directions.push("up");

    // Movimenta os jogadores
    player1.move(player1Directions, canvas.width);
    player2.move(player2Directions, canvas.width);

    // Ataques
    if (keys["s"]) player1.updateState("attack");
    if (keys["ArrowDown"]) player2.updateState("attack");
  }
  
  document.addEventListener("keydown", (event) => {
    if (event.key.toLowerCase() === "r") {
      if (!gameState.isGameActive) {
        resetGame(player1, player2);
      }
    }
  });
}
