// Configura o canvas e retorna elemento com contexto
export function setupCanvas() {
  const canvas = document.getElementById("gameCanvas");
  const context = canvas.getContext("2d");
  return { canvas, context };
}

// Ajusta o tamanho do canvas mantendo a proporção 16:9
export function resizeCanvas(canvas) {
  const height = window.innerHeight * 0.85;
  const width = height * (16 / 9);
  canvas.width = width;
  canvas.height = height;

  // Ajusta a largura do menu superior e do botão
  const nav = document.getElementById("nav");
  nav.style.width = `${width}px`;
  const floter = document.getElementById("floter");
  floter.style.width = `${width}px`;
}

// Desenha o fundo do jogo
export function drawBackground(context, canvas) {
  context.fillStyle = "#555";
  context.fillRect(0, 0, canvas.width, canvas.height);
  context.fillStyle = "#1a1a1a";
  context.fillRect(0, canvas.height * 0.75, canvas.width, canvas.height * 0.25);
}
