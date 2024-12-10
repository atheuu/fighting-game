import { gameState } from "./main.js";
import { resetGame } from "./game.js";

const music = new Audio("../assets/the-synth-wars.mp3");
music.loop = true;

// Controle de play/pause
const toggleMusicButton = document.getElementById("toggleMusic");
let isPlaying = false;

// Função para alternar reprodução/pausa
function toggleMusic() {
  if (isPlaying) {
    music.pause();
    console.log("Música pausada");
  } else {
    music.play();
    console.log("Música tocando");
  }
  isPlaying = !isPlaying;
}

document.addEventListener("keydown", (event) => {
  if (event.key.toLowerCase() === "m") {
    toggleMusic();
  }
});

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
    if (keys["s"]) player1.attack();
    if (keys["ArrowDown"]) player2.attack();
  }

  document.addEventListener("keydown", (event) => {
    if (event.key.toLowerCase() === "r") {
      if (!gameState.isGameActive) {
        resetGame(player1, player2);
      }
    }
  });
}
