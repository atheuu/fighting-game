import { gameState } from "./main.js";
import {
  checkAttackCollision,
  checkWinner,
  showMessage,
  hiddenMessage,
} from "./utils.js";

export function updateGame(player1, player2, canvas, context) {
  const groundLevel = canvas.height * 0.8333;
  const gravity = 0.5;

  player1.updatePlayer(context, gravity, groundLevel);
  player2.updatePlayer(context, gravity, groundLevel);

  if (player1.isAttacking && checkAttackCollision(player1, player2)) {
    player2.health -= 2; 
    player2.updateState("takeHit");
  }

  if (player2.isAttacking && checkAttackCollision(player2, player1)) {
    player1.health -= 2;
    player1.updateState("takeHit");
  }

  const player1HealthBar = document.getElementById("player1-health");
  player1HealthBar.style.width = `${player1.health}%`;

  const player2HealthBar = document.getElementById("player2-health");
  player2HealthBar.style.width = `${player2.health}%`;

  const winnerCheck = checkWinner(player1, player2);
  if (!winnerCheck.isGameActive) {
    gameState.isGameActive = false;
    showMessage(winnerCheck.result);
  }
}

export function resetGame(player1, player2) {
  gameState.timeLeft = 90;
  gameState.isGameActive = true;
  gameState.isPaused = false;

  player1.resetPlayer({ position: { x: 204, y: 140 }, orientation: "right" });
  player2.resetPlayer({ position: { x: 764, y: 140 }, orientation: "left" });

  hiddenMessage();
  document.getElementById("timer").textContent = "01:30";
}
