let numeroSecreto = 0;
let intentos = 0;
let listaNumerosSorteado = [];
let numeroMaximos = 10;

function asignarTextoElementoHtml(elemento, texto) {
    let elementoHtml = document.querySelector(elemento);
    elementoHtml.innerHTML = texto;
}

function verificarIntento() {
    let numeroUsuario = parseInt(document.getElementById("numeroUsuario").value);
    console.log (intentos)
    if (numeroSecreto == numeroUsuario) {
        asignarTextoElementoHtml("p", `Acertaste!! 🤩 el número secreto es  ${numeroSecreto}. Lo hiciste en ${intentos} ${(intentos == 1) ? "intento" : "intentos"}`);
        // Esta linea habilita el botón de reiniciar juego una vez que el jugador adivine el número
        document.getElementById("reiniciar").removeAttribute("disabled");
    } else {
        // El usuario no acertó
        if (numeroUsuario > numeroSecreto) {
            asignarTextoElementoHtml("p", "el número secreto es menor 🫥");
        } else {
            asignarTextoElementoHtml("p", "el número secreto es mayor 🤔");
        }
        intentos++;
        limpiarCaja()
    }
    return;
}

function limpiarCaja() {
    let caja = document.querySelector("#numeroUsuario");
    caja.value = "";
}

// Esta es una función recursiva (Se llama a si misma)
function generarNumeroSecreto() {
    let numeroGenerado = Math.floor(Math.random() * numeroMaximos)+1;

    console.log(listaNumerosSorteado);
    console.log(numeroGenerado);
    
    if(listaNumerosSorteado.length == numeroMaximos) {
        asignarTextoElementoHtml("p","Ya se sortearon todos los números posibles");
    } else {
        //Verifica si el array ya contiene el numeroGenerado para evitar repetirlo en la misma partida
        if(listaNumerosSorteado.includes(numeroGenerado)) {
            // si el número ya existe, genera uno nuevo
            return generarNumeroSecreto();
        } else {
            listaNumerosSorteado.push(numeroGenerado);
            return numeroGenerado;
        }
    }
}
function condicionesIniciales() {
    // Indica las condiciones con las que se inicializa el juego
    asignarTextoElementoHtml("h1", "Juego del número secreto!");
    asignarTextoElementoHtml("p", `Elige un número entre 1 y ${numeroMaximos}`);
    numeroSecreto = generarNumeroSecreto();
    intentos = 1;
}

function reiniciarJuego() {
    limpiarCaja();
    condicionesIniciales();
    // Esta linea desabilita el botón de reiniciar. El elemento setAttribute requiere dos parametros: nombre del atributo y valor a darle al mismo.
    document.querySelector("#reiniciar").setAttribute("disabled", "true");
}

condicionesIniciales()