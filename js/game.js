export function updateGame(player1, player2, context) {
  // Constantes do jogo
  const gravity = 0.5;
  const groundLevel = 300;

  // Aplica a gravidade e desenha os jogadores
  player1.applyGravity(gravity, groundLevel);
  player2.applyGravity(gravity, groundLevel);
  player1.draw(context);
  player2.draw(context);

  // Checa colisão da caixa de ataque do player1 com o player2
  if (player1.isAttacking && checkAttackCollision(player1, player2)) {
    console.log("player1 acertou um golpe!");
  }

  // Checa colisão da caixa de ataque do player2 com o player1
  if (player2.isAttacking && checkAttackCollision(player2, player1)) {
    console.log("player2 acertou um golpe!");
  }
}

// Função para verificar colisão entre a caixa de ataque e o oponente
function checkAttackCollision(attacker, target) {
  const attackBox = {
    x:
      attacker.orientation === "right"
        ? attacker.position.x + attacker.width // Frente do atacante
        : attacker.position.x - attacker.attackBox.width, // Atrás do atacante
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
