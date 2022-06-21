const palabras = [
  "html",
  "css",
  "javascript",
  "lenguaje",
  "navegador",
  "pagina",
  "programa",
  "dinamico",
  "java",
  "moviles",
  "computadora",
  "teclado",
  "mouse",
  "auricular",
  "musica",
  "calculadora",
  "algoritmo",
  "psudocodigo",
  "codigo",
  "impresora",
];

const agregar = document.getElementById("agregar");
const titulo = document.getElementById("titulo");

let cuadro;
let btnGuardar;
let btnCancelar;

const agregarPalabra = () => {
  contenedorLetrasUsadas.style.display = "none";
  mensaje.style.display = "none";
  btnInicio.style.display = "none";
  btnAgregar.style.display = "none";
  crearCuadroTexto();
  btnGuardar = agregarBoton("Guardar y Jugar", "guardar");
  btnCancelar = agregarBoton("Cancelar", "cancelar");
  btnGuardar.addEventListener("click", ingresarPalabra);
  btnCancelar.addEventListener("click", volverInicio);
};

const crearCuadroTexto = () => {
  cuadro = document.createElement("input");
  cuadro.type = "text";
  cuadro.id = "palabraAgregar";
  cuadro.placeholder = "Ingrese palabra";
  cuadro.classList.add("textoAgregado");
  contenedorPalabra.appendChild(cuadro);
};

const ingresarPalabra = () => {
  let palabra = cuadro.value.toLowerCase();
  if (!palabras.includes(palabra) && !(palabra === "")) {
    palabras.push(palabra);
    quitarElementos();
    iniciarJuego();
  } else {
    alert("La palabra ingresada ya ha sido ingresada");
    cuadro.value = "";
  }
};

const quitarElementos = () => {
  contenedorPalabra.removeChild(cuadro);
  quitarBoton(guardar);
  quitarBoton(cancelar);
  contenedorLetrasUsadas.style.display = "block";
  mensaje.style.display = "block";
};

agregar.addEventListener("click", agregarPalabra);
