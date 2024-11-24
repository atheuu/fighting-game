let keys = {};

window.addEventListener('keydown', (e) => {
  keys[e.key] = true;
});

window.addEventListener('keyup', (e) => {
  keys[e.key] = false;
});

// Controla os jogadores com base nas teclas pressionadas
export function handleInput(player1, player2, canvas) {
  if (keys['a']) player1.move('left', canvas.width);
  if (keys['d']) player1.move('right', canvas.width);
  if (keys['w']) player1.move('up', canvas.width);

  if (keys['ArrowLeft']) player2.move('left', canvas.width);
  if (keys['ArrowRight']) player2.move('right', canvas.width);
  if (keys['ArrowUp']) player2.move('up', canvas.width);
}
