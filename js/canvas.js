// Configura o canvas e retorna elemento com contexto
export function setupCanvas() {
  const canvas = document.getElementById("gameCanvas");
  const context = canvas.getContext("2d");
  canvas.width = 1024;
  canvas.height = 576;
  return { canvas, context };
}

export function drawBackground(context, canvas, backgroundImage, shop) {
  context.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);
  shop.updateSprite(context);
  context.fillStyle = "rgba(255, 255, 255, 0.1)";
  context.fillRect(0, 0, canvas.width, canvas.height);
}
