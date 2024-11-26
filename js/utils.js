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

export function checkWinner(player1, player2, timeLeft) {

  if (player1.health <= 0 && player2.health <= 0) {
    return { isGameActive: false, result: "Empate!" };
  }

  if (player1.health > 0 && player2.health <= 0) {
    return { isGameActive: false, result: "Samurai Mack venceu!" };
  }

  if (player2.health > 0 && player1.health <= 0) {
    return { isGameActive: false, result: "Kenji venceu!" };
  }

  if (timeLeft <= 0) {
    if (player1.health > player2.health) {
      return { isGameActive: false, result: "Samurai Mack venceu!" };
    }

    if (player2.health > player1.health) {
      return { isGameActive: false, result: "Kenji venceu!" };
    }

    return { isGameActive: false, result: "Empate!" };
  }

  return { isGameActive: true, result: null };
}

export function showMessage(message) {
  const textContainer = document.getElementById("text-container");
  const mainText = document.getElementById("main-text");
  const shadowText = document.getElementById("shadow-text");

  textContainer.style.display = "flex";
  mainText.textContent = message;
  shadowText.textContent = message;
}
