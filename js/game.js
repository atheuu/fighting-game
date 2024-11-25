export function updateGame(player1, player2, canvas, context) {
  // Constantes do jogo
  const gravity = 0.5;
  const groundLevel = canvas.height * 0.75 - player1.height;

  // Aplica a gravidade e desenha os jogadores
  player1.applyGravity(gravity, groundLevel);
  player2.applyGravity(gravity, groundLevel);
  player1.draw(context);
  player2.draw(context);

  // Checa colisão da caixa de ataque do player1 com o player2
  if (player1.isAttacking && checkAttackCollision(player1, player2)) {
    player2.takeDamage(10);
    player1.isAttacking = false;
  }

  // Checa colisão da caixa de ataque do player2 com o player1
  if (player2.isAttacking && checkAttackCollision(player2, player1)) {
    player1.takeDamage(10);
    player2.isAttacking = false;
  }

  // Atualiza a barra de vida do Player 1
  const player1HealthBar = document.getElementById("player1-health");
  player1HealthBar.style.width = `${player1.health}%`;

  // Atualiza a barra de vida do Player 2
  const player2HealthBar = document.getElementById("player2-health");
  player2HealthBar.style.width = `${player2.health}%`;
}

// Função para verificar colisão entre a caixa de ataque e o oponente
function checkAttackCollision(attacker, target) {
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
