const formProducto = document.getElementById("formProducto");
const nombreProducto = document.getElementById("nombreProducto");
const descripcionProducto = document.getElementById("descripcionProducto");
const categoriaProducto = document.getElementById("categoriaProducto");
const mensajeValidacion = document.getElementById("mensajeValidacion");
const listaProductos = document.getElementById("listaProductos");
const totalProductos = document.getElementById("totalProductos");
const mensajeListaVacia = document.getElementById("mensajeListaVacia");

let contadorProductos = 0;

formProducto.addEventListener("submit", function (evento) {
    evento.preventDefault();

    const nombre = nombreProducto.value.trim();
    const descripcion = descripcionProducto.value.trim();
    const categoria = categoriaProducto.value.trim();

    if (nombre === "" || descripcion === "" || categoria === "") {
        mostrarMensaje("Por favor, complete todos los campos.", "danger");
        return;
    }

    agregarProducto(nombre, descripcion, categoria);
    formProducto.reset();
    mostrarMensaje("Producto registrado correctamente.", "success");
});

function mostrarMensaje(texto, tipo) {
    mensajeValidacion.innerHTML = "";

    const alerta = document.createElement("div");
    alerta.className = `alert alert-${tipo}`;
    alerta.textContent = texto;

    mensajeValidacion.appendChild(alerta);

    setTimeout(function () {
        mensajeValidacion.innerHTML = "";
    }, 3000);
}

function agregarProducto(nombre, descripcion, categoria) {
    if (mensajeListaVacia) {
        mensajeListaVacia.style.display = "none";
    }

    const columna = document.createElement("div");
    columna.className = "col-md-6";

    const tarjeta = document.createElement("div");
    tarjeta.className = "card h-100 border";

    const cuerpo = document.createElement("div");
    cuerpo.className = "card-body";

    const titulo = document.createElement("h4");
    titulo.className = "card-title h5";
    titulo.textContent = nombre;

    const textoDescripcion = document.createElement("p");
    textoDescripcion.className = "card-text";
    textoDescripcion.textContent = descripcion;

    const etiquetaCategoria = document.createElement("span");
    etiquetaCategoria.className = "badge bg-success mb-3";
    etiquetaCategoria.textContent = categoria;

    const botonEliminar = document.createElement("button");
    botonEliminar.className = "btn btn-outline-danger btn-sm d-block";
    botonEliminar.textContent = "Eliminar";

    botonEliminar.addEventListener("click", function () {
        listaProductos.removeChild(columna);
        contadorProductos--;
        actualizarTotal();

        if (contadorProductos === 0 && mensajeListaVacia) {
            mensajeListaVacia.style.display = "block";
        }

        mostrarMensaje("Producto eliminado correctamente.", "warning");
    });

    cuerpo.appendChild(titulo);
    cuerpo.appendChild(textoDescripcion);
    cuerpo.appendChild(etiquetaCategoria);
    cuerpo.appendChild(botonEliminar);

    tarjeta.appendChild(cuerpo);
    columna.appendChild(tarjeta);

    listaProductos.appendChild(columna);

    contadorProductos++;
    actualizarTotal();
}

function actualizarTotal() {
    totalProductos.textContent = contadorProductos;
}