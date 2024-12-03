import { gameState } from "./main.js";

export function checkAttackCollision(attacker, target) {
  const attackBox = {
    x:
      attacker.orientation === "right"
        ? attacker.position.x + attacker.width
        : attacker.position.x - attacker.attackBox.width,
    y: attacker.position.y,
    width: attacker.attackBox.width,
    height: attacker.attackBox.height,
  };

  return (
    attackBox.x < target.position.x + target.width &&
    attackBox.x + attackBox.width > target.position.x &&
    attackBox.y < target.position.y + target.height &&
    attackBox.y + attackBox.height > target.position.y
  );
}

export function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes < 10 ? "0" : ""}${minutes}:${
    remainingSeconds < 10 ? "0" : ""
  }${remainingSeconds}`;
}

export function checkWinner(player1, player2) {
  const { health: health1 } = player1;
  const { health: health2 } = player2;

  if (health1 <= 0 && health2 <= 0) {
    return { isGameActive: false, result: "Empate!" };
  }

  if (health1 <= 0) {
    player1.updateState("death");
    return { isGameActive: false, result: "Kenji venceu!" };
  }

  if (health2 <= 0) {
    player2.updateState("death");
    return { isGameActive: false, result: "Samurai Mack venceu!" };
  }

  if (gameState.timeLeft <= 0) {
    if (health1 !== health2) {
      const loser = health1 > health2 ? player2 : player1;
      const result =
        health1 > health2 ? "Samurai Mack venceu!" : "Kenji venceu!";
      loser.updateState("death");
      return { isGameActive: false, result };
    }

    return { isGameActive: false, result: "Empate!" };
  }

  return { isGameActive: true, result: null };
}

const textContainer = document.getElementById("text-container");
const mainText = document.getElementById("main-text");
const shadowText = document.getElementById("shadow-text");

export function showMessage(message) {
  textContainer.style.display = "flex";
  mainText.textContent = message;
  shadowText.textContent = message;
}

export function hiddenMessage() {
  textContainer.style.display = "none";
}
