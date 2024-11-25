let keys = {};

window.addEventListener("keydown", (event) => {
  keys[event.key] = true;
});

window.addEventListener("keyup", (event) => {
  keys[event.key] = false;
});

// Controla os jogadores com base nas teclas pressionadas
export function handleInput(player1, player2, canvas, isGameActive) {
  if (isGameActive) {
    // Movimento do player1
    if (keys["a"]) player1.move("left", canvas.width);
    if (keys["d"]) player1.move("right", canvas.width);
    if (keys["w"]) player1.move("up", canvas.width);

    // Ataque do player1
    player1.isAttacking = keys["s"];

    // Movimento do player2
    if (keys["ArrowLeft"]) player2.move("left", canvas.width);
    if (keys["ArrowRight"]) player2.move("right", canvas.width);
    if (keys["ArrowUp"]) player2.move("up", canvas.width);

    // Ataque do player2
    player2.isAttacking = keys["ArrowDown"];
  }
}
