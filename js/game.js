import { gameState } from "./main.js";
import { checkAttackCollision, checkWinner, showMessage } from "./utils.js";

export function updateGame(player1, player2, canvas, context) {
  const gravity = 0.5;
  const groundLevel = canvas.height * 0.834 - player1.height;

  player1.applyGravity(gravity, groundLevel);
  player2.applyGravity(gravity, groundLevel);

  player1.draw(context);
  player2.draw(context);

  if (player1.isAttacking && checkAttackCollision(player1, player2)) {
    player2.takeDamage(10);
    player1.isAttacking = false;
  }

  if (player2.isAttacking && checkAttackCollision(player2, player1)) {
    player1.takeDamage(10);
    player2.isAttacking = false;
  }

  const player1HealthBar = document.getElementById("player1-health");
  player1HealthBar.style.width = `${player1.health}%`;

  const player2HealthBar = document.getElementById("player2-health");
  player2HealthBar.style.width = `${player2.health}%`;

  const winnerCheck = checkWinner(player1, player2, gameState.timeLeft);
  if (!winnerCheck.isGameActive) {
    gameState.isGameActive = false;
    showMessage(winnerCheck.result);
  }
}
