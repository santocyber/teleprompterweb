// Variáveis globais
let positionY = window.innerHeight;
let paused = true;
let velocidade = 20; // Tempo entre frames (ms)
const passo = 2; // Quantidade de pixels que o texto se move a cada frame

// Função para animar o texto
function animarTexto() {
    const conteudoTexto = document.getElementById('conteudo-texto');
    if (!paused) {
        conteudoTexto.style.top = `${positionY}px`;
        positionY -= passo;

        // Verifica se o texto ainda está visível na tela
        if (positionY + conteudoTexto.offsetHeight > 0) {
            setTimeout(animarTexto, velocidade);
        } else {
            positionY = window.innerHeight; // Reinicia a posição
            animarTexto();
        }
    }
}

// Função para iniciar o texto flutuante
function iniciarTextoFlutuante() {
    const conteudoTexto = document.getElementById('conteudo-texto');
    const inputTexto = document.getElementById('input-texto');

    // Atualiza o texto e reinicia a posição
    conteudoTexto.textContent = inputTexto.value || "Texto padrão flutuante!";
    conteudoTexto.style.position = 'absolute';
    conteudoTexto.style.top = '100%';
    conteudoTexto.style.left = '50%';
    conteudoTexto.style.transform = 'translateX(-50%)';

    positionY = window.innerHeight; // Reinicia posição
    paused = false;
    animarTexto();
}

// Ajustar largura do parágrafo
function ajustarLarguraParagrafo() {
    const conteudoTexto = document.getElementById('conteudo-texto');
    const larguraInput = document.getElementById('largura-paragrafo');

    // Define a largura e aplica estilos para ajuste automático do texto
    conteudoTexto.style.width = `${larguraInput.value}px`;
    conteudoTexto.style.whiteSpace = 'normal'; // Permite quebra de linha
    conteudoTexto.style.wordWrap = 'break-word'; // Quebra palavras longas
}

// Configurações e eventos ao carregar o DOM
document.addEventListener('DOMContentLoaded', () => {
    const iniciar = document.getElementById('iniciar');
    const pausar = document.getElementById('pausar');
    const parar = document.getElementById('parar');
    const resetar = document.getElementById('resetar');
    const velocidadeInput = document.getElementById('velocidade');
    const tamanhoInput = document.getElementById('tamanho');
    const opacidadeInput = document.getElementById('opacidade');
    const larguraInput = document.getElementById('largura-paragrafo');
    const darkModeButton = document.getElementById('dark-mode');

    // Eventos
    iniciar.addEventListener('click', iniciarTextoFlutuante);
    pausar.addEventListener('click', () => {
        paused = !paused;
        pausar.textContent = paused ? 'Continuar' : 'Pausar';
        if (!paused) animarTexto();
    });
    parar.addEventListener('click', () => {
        paused = true;
        positionY = window.innerHeight;
        document.getElementById('conteudo-texto').style.top = `${positionY}px`;
    });
    resetar.addEventListener('click', () => {
        document.getElementById('input-texto').value = '';
        document.getElementById('conteudo-texto').textContent = '';
        positionY = window.innerHeight;
        paused = true;
    });
    velocidadeInput.addEventListener('input', () => {
        const valor = parseInt(velocidadeInput.value, 10);
        velocidade = valor > 0 ? 2000 / valor : 20;
    });
    tamanhoInput.addEventListener('input', () => {
        document.getElementById('conteudo-texto').style.fontSize = `${tamanhoInput.value}px`;
    });
    opacidadeInput.addEventListener('input', () => {
        document.getElementById('conteudo-texto').style.opacity = opacidadeInput.value;
    });
    larguraInput.addEventListener('input', ajustarLarguraParagrafo);

    // Alternância de modo escuro/claro
    darkModeButton.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        darkModeButton.textContent = document.body.classList.contains('dark-mode')
            ? 'Modo Claro'
            : 'Modo Escuro';
    });
});
