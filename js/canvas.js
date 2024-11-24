// Configura o canvas e retorna o elemento
export function setupCanvas() {
  const canvas = document.getElementById('gameCanvas');
  canvas.width = 800;
  canvas.height = 600;
  return canvas;
}

// Desenha o fundo do jogo
export function drawBackground(context, canvas) {
  context.fillStyle = '#555';
  context.fillRect(0, 0, canvas.width, canvas.height);
  context.fillStyle = '#1a1a1a';
  context.fillRect(0, canvas.height * 0.75, canvas.width, canvas.height * 0.25);
}

