// Função para verificar colisão entre a caixa de ataque e o oponente
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

// Função para formatar o tempo
export function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes < 10 ? "0" : ""}${minutes}:${
    remainingSeconds < 10 ? "0" : ""
  }${remainingSeconds}`;
}

// Função para chegar vencedor
export function checkWinner(player1, player2, timeLeft) {
  // Se ambos os jogadores têm 0 de vida, é um empate
  if (player1.health <= 0 && player2.health <= 0) {
    return { isGameActive: false, result: "Empate!" };
  }

  // Se o Player 1 venceu por vida do Player 2 zerada
  if (player1.health > 0 && player2.health <= 0) {
    return { isGameActive: false, result: "Samurai Mack venceu!" };
  }

  // Se o Player 2 venceu por vida do Player 1 zerada
  if (player2.health > 0 && player1.health <= 0) {
    return { isGameActive: false, result: "Kenji venceu!" };
  }

  // Se o tempo acabou, determinar o vencedor pela maior vida
  if (timeLeft <= 0) {
    if (player1.health > player2.health) {
      return { isGameActive: false, result: "Samurai Mack venceu!" };
    }
    if (player2.health > player1.health) {
      return { isGameActive: false, result: "Kenji venceu!" };
    }
    // Caso as vidas sejam iguais
    return { isGameActive: false, result: "Empate!" };
  }

  // Jogo continua se nenhuma das condições anteriores foi atendida
  return { isGameActive: true, result: null };
}

// Função para exibir mensagem de vitória/empate
export function showMessage(message) {
  const textContainer = document.getElementById("text-container");
  const mainText = document.getElementById("main-text");
  const shadowText = document.getElementById("shadow-text");

  textContainer.style.display = "flex";
  mainText.textContent = message;
  shadowText.textContent = message;
}
