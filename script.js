// Definición de las 12 tarjetas de comandos con su texto y color correspondiente en Scratch
const listaComandos = [
    { texto: "mover 10 pasos", clase: "movimiento" },
    { texto: "girar a la derecha", clase: "movimiento" },
    { texto: "ir a posición aleatoria", clase: "movimiento" },
    { texto: "decir hola", clase: "apariencia" },
    { texto: "cambiar disfraz", clase: "apariencia" },
    { texto: "esconder", clase: "apariencia" },
    { texto: "iniciar sonido", clase: "sonido" },
    { texto: "al hacer clic en bandera", clase: "eventos" },
    { texto: "al presionar tecla", clase: "eventos" },
    { texto: "por siempre", clase: "control" },
    { texto: "esperar 1 segundo", clase: "control" },
    { texto: "si... entonces", clase: "control" }
];

// Duplicamos el arreglo para crear pares exactos (Total: 24 tarjetas)
let cartasJuego = [...listaComandos, ...listaComandos];

let tarjetasVolteadas = [];
let parejasEncontradas = 0;
let conteoIntentos = 0;
let bloqueandoTablero = false;

const tablero = document.getElementById('tablero');
const contadorIntentos = document.getElementById('intentos');
const mensajeVictoria = document.getElementById('mensajeVictoria');

function barajar(array) {
    // Clonamos y mezclamos usando un orden aleatorio confiable
    return [...array].sort(() => Math.random() - 0.5);
}

function inicializarJuego() {
    tablero.innerHTML = '';
    tarjetasVolteadas = [];
    parejasEncontradas = 0;
    conteoIntentos = 0;
    bloqueandoTablero = false;
    contadorIntentos.innerText = conteoIntentos;
    mensajeVictoria.style.display = 'none';

    const cartasBarajadas = barajar(cartasJuego);

    cartasBarajadas.forEach((comando, indice) => {
        // Guardamos el texto en el dataset para validar las parejas de forma unívoca
        const tarjetaHtml = `
            <div class="tarjeta" data-comando="${comando.texto}" onclick="voltearTarjeta(this)">
                <div class="cara reverso">🐱</div>
                <div class="cara frente">
                    <span class="bloque-texto ${comando.clase}">${comando.texto}</span>
                </div>
            </div>
        `;
        tablero.innerHTML += tarjetaHtml;
    });
}

function voltearTarjeta(tarjetaSeleccionada) {
    if (bloqueandoTablero) return;
    if (tarjetaSeleccionada.classList.contains('volteada')) return;

    tarjetaSeleccionada.classList.add('volteada');
    tarjetasVolteadas.push(tarjetaSeleccionada);

    if (tarjetasVolteadas.length === 2) {
        conteoIntentos++;
        contadorIntentos.innerText = conteoIntentos;
        verificarPareja();
    }
}

function verificarPareja() {
    const [tarjeta1, tarjeta2] = tarjetasVolteadas;
    const coincide = tarjeta1.dataset.comando === tarjeta2.dataset.comando;

    if (coincide) {
        tarjetasVolteadas = [];
        parejasEncontradas++;

        if (parejasEncontradas === listaComandos.length) {
            setTimeout(() => {
                mensajeVictoria.style.display = 'block';
            }, 500);
        }
    } else {
        bloqueandoTablero = true;
        setTimeout(() => {
            tarjeta1.classList.remove('volteada');
            tarjeta2.classList.remove('volteada');
            tarjetasVolteadas = [];
            bloqueandoTablero = false;
        }, 1200); // 1.2 segundos para dar un poco más de tiempo de lectura antes de voltear
    }
}

// Arranca el juego al cargar la página
inicializarJuego();
