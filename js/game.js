export function updateGame(player1, player2, context) {
  // Constantes do jogo
  const gravity = 0.5;
  const groundLevel = 300;

  // Aplica a gravidade e desenha os jogadores
  player1.applyGravity(gravity, groundLevel);
  player2.applyGravity(gravity, groundLevel);
  player1.draw(context);
  player2.draw(context);

  // Exemplo: Checa colisões entre os jogadores
  if (checkCollision(player1, player2)) {
    console.log('Colisão detectada!');
  }
}

// Checa se dois jogadores colidiram
function checkCollision(player1, player2) {
  return (
    player1.position.x < player2.position.x + player2.width &&
    player1.position.x + player1.width > player2.position.x &&
    player1.position.y < player2.position.y + player2.height &&
    player1.position.y + player1.height > player2.position.y
  );
}
