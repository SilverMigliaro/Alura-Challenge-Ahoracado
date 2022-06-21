const contenedorPalabra = document.getElementById("contenedor_palabra");
const btnInicio = document.getElementById("iniciar");
const btnAgregar = document.getElementById("agregar");
const contenedorLetrasUsadas = document.getElementById("letras_usadas");
const botones = document.getElementById("botones");
const mensaje = document.getElementById("mensaje");
const tablero = document.getElementsByClassName("tablero");

const partesCuerpo = [
  [20, 5, 5, 350],
  [20, 0, 150, 5],
  [165, 5, 5, 50],
  [165, 90, 35, 0],
  [165, 125, 5, 100],
  [168, 145, 115, 195],
  [168, 145, 218, 195],
  [168, 225, 115, 275],
  [168, 225, 218, 275],
];

let btnDeNuevo;
let btnDesistir;
let palabra_elegida;
let letrasUsadas;
let errores;
let aciertos;

let canvas = document.getElementById("canvas");
let pincel = canvas.getContext("2d");
pincel.canvas.width = 0;
pincel.canvas.height = 0;

const iniciarJuego = () => {
  letrasUsadas = [];
  errores = 0;
  aciertos = 0;
  contenedorPalabra.innerHTML = "";
  contenedorLetrasUsadas.innerHTML = "";
  mensaje.innerHTML = "";
  btnInicio.style.display = "none";
  btnAgregar.style.display = "none";
  btnDeNuevo = agregarBoton("Jugar de Nuevo", "nuevo");
  btnDesistir = agregarBoton("Desistir", "desistir");
  btnDeNuevo.addEventListener("click", reiniciar);
  btnDesistir.addEventListener("click", volverInicio);
  dibujarHorca();
  elegirPalabra();
  pintarPalabra();
  document.addEventListener("keydown", eventoLetra);
};

const volverInicio = () => {
  window.location.reload();
};

const reiniciar = () => {
  quitarBoton(nuevo);
  quitarBoton(desistir);
  iniciarJuego();
};

const agregarBoton = (text, id) => {
  var boton = document.createElement("button");
  boton.id = id;
  boton.innerHTML = text;
  boton.classList.add("boton");
  botones.appendChild(boton);
  return boton;
};

const quitarBoton = (id) => {
  let boton = document.getElementById(id);
  botones.removeChild(id);
};

const agregarLetra = (letra) => {
  const elementoLetra = document.createElement("span");
  elementoLetra.innerHTML = letra;
  elementoLetra.classList.add("letraErrada");
  contenedorLetrasUsadas.appendChild(elementoLetra);
};

const dibujarParte = (parte) => {
  if ((parte >= 0 && parte <= 2) || parte === 4)
    pincel.fillRect(...partesCuerpo[parte]);
  if (parte === 3) dibujarCabeza(partesCuerpo[parte]);
  if (parte >= 5) dibujarExtremidades(partesCuerpo[parte]);
};

const dibujarCabeza = (datos) => {
  pincel.beginPath();
  pincel.strokeStyle = "#d95d39";
  pincel.lineWidth = 5;
  pincel.arc(datos[0], datos[1], datos[2], datos[3], 2 * Math.PI, false);
  pincel.fill();
  pincel.stroke();
};

const dibujarExtremidades = (datos) => {
  pincel.beginPath();
  pincel.fillStyle = "#d95d39";
  pincel.lineWidth = 5;
  pincel.moveTo(datos[0], datos[1]);
  pincel.lineTo(datos[2], datos[3]);
  pincel.stroke();
};

const letraErronea = () => {
  dibujarParte(errores);
  errores++;
  if (errores === partesCuerpo.length) finJuego();
};

const finJuego = () => {
  document.removeEventListener("keydown", eventoLetra);
  if (aciertos === palabra_elegida.length) {
    mensaje.style.color = "lightgreen";
    mensaje.innerHTML = "Ganaste,Felicidades!!!";
  } else {
    mensaje.style.color = "red";
    mensaje.innerHTML = "Fin del Juego";
  }
};

const letraCorrecta = (letra) => {
  const { children } = contenedorPalabra;
  for (let i = 0; i < children.length; i++) {
    if (children[i].innerHTML === letra) {
      children[i].classList.toggle("hidden");
      aciertos++;
    }
  }
  if (aciertos === palabra_elegida.length) finJuego();
};

const ingresarLetra = (letra) => {
  if (palabra_elegida.includes(letra)) {
    letraCorrecta(letra);
  } else {
    letraErronea();
  }
  agregarLetra(letra);
  letrasUsadas.push(letra);
};

const eventoLetra = (event) => {
  let nuevaLetra = event.key.toUpperCase();
  if (nuevaLetra.match(/^[a-zñ]$/i) && !letrasUsadas.includes(nuevaLetra)) {
    ingresarLetra(nuevaLetra);
  }
};

const pintarPalabra = () => {
  palabra_elegida.forEach((letra) => {
    const elementoLetra = document.createElement("span");
    elementoLetra.innerHTML = letra;
    elementoLetra.classList.add("letra");
    elementoLetra.classList.add("hidden");
    contenedorPalabra.appendChild(elementoLetra);
  });
};

const elegirPalabra = () => {
  let palabra =
    palabras[Math.floor(Math.random() * palabras.length)].toUpperCase();
  palabra_elegida = palabra.split("");
};

const dibujarHorca = () => {
  pincel.canvas.width = 250;
  pincel.canvas.height = 350;
  pincel.clearRect(0, 0, canvas.width, canvas.height);
  pincel.fillStyle = "#d95d39";
  pincel.fillRect(0, 345, 350, 5);
};

btnInicio.addEventListener("click", iniciarJuego);
