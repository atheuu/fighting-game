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

  // Ajusta a largura do menu superior
  const nav = document.getElementById("nav");
  nav.style.width = `${width}px`;
}

// Carregamento da imagem de fundo fora da função para evitar carregá-la repetidamente
const backgroundImage = new Image();
backgroundImage.src = "../img/background.png";

// Função para desenhar a imagem
export function drawBackground(context, canvas) {
  // Certifique-se de desenhar a imagem somente após carregá-la
  backgroundImage.onload = () => {
    context.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);
  };

  // Se a imagem já estiver carregada (cache), desenhe imediatamente
  if (backgroundImage.complete) {
    context.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);
  }
}
