// Configura o canvas e retorna elemento com contexto
export function setupCanvas() {
  const canvas = document.getElementById("gameCanvas");
  const context = canvas.getContext("2d");
  return { canvas, context };
}

// Ajusta o tamanho do canvas mantendo a proporção 16:9
export function resizeCanvas(canvas, virtualWidth = 1024, virtualHeight = 576) {
  const width = window.innerWidth * 0.8;
  const height = width * (9 / 16);
  canvas.width = width;
  canvas.height = height;

  // Ajustes de elementos da página
  const gameScreen = document.getElementById("game-screen");
  gameScreen.style.width = `${width}px`;
  gameScreen.style.height = `${height}px`;

  // Calcula e retorna o fator de escala
  return width / virtualWidth;
}

const backgroundImage = new Image();
backgroundImage.src = "../assets/scenario/background.png";

export function drawBackground(context, canvas, shop) {
  context.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);
  shop.updateSprite(context);
  context.fillStyle = "rgba(255, 255, 255, 0.1)";
  context.fillRect(0, 0, canvas.width, canvas.height);
}
