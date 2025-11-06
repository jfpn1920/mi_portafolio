//------------------------------------//
//--|funcionalidad_menu_hamburguesa|--//
//------------------------------------//
const menuBtn = document.getElementById('menu-btn');
const menu = document.getElementById('menu');
menuBtn.addEventListener('click', () => {
    menu.style.display = menu.style.display === 'block' ? 'none' : 'block';
});
//------------------------------------//
//--|funcionalidad_agregar_carrusel|--//
//------------------------------------//
document.addEventListener("DOMContentLoaded", () => {
    console.log("✅ Script del carrusel cargado correctamente.");
    const botonCrear = document.querySelector(".crear");
    const inputPagina = document.querySelector(".campo input");
    const contenedorBlanco = document.querySelector(".contenedor-blanco");
    botonCrear.addEventListener("click", () => {
        const nombreCarrusel = inputPagina.value.trim();
        if (nombreCarrusel === "") {
            alert("⚠️ No hay carrusel creado");
            inputPagina.focus();
            return;
        }
        const carruseles = JSON.parse(localStorage.getItem("carruselesCreados")) || [];
        const nuevoCarrusel = { nombre: nombreCarrusel, imagenes: [] };
        carruseles.push(nuevoCarrusel);
        localStorage.setItem("carruselesCreados", JSON.stringify(carruseles));
        contenedorBlanco.textContent = nombreCarrusel;

        alert(`✅ El carrusel "${nombreCarrusel}" ha sido creado`);
        inputPagina.value = "";
    });
});
//----------------------------------//
//--|funcionalidad_agregar_imagen|--//
//----------------------------------//
document.addEventListener("DOMContentLoaded", () => {
    console.log("✅ Script de agregar imagen cargado correctamente.");
    const imagenBox = document.querySelector(".imagen-box");
    const botonAgregar = document.querySelector(".imagen-btn");
    const inputImagen = document.createElement("input");
    inputImagen.type = "file";
    inputImagen.accept = "image/*";
    inputImagen.multiple = true;
    inputImagen.style.display = "none";
    document.body.appendChild(inputImagen);
    let imagenesSeleccionadas = [];
    imagenBox.addEventListener("click", () => {
        inputImagen.click();
    });
    inputImagen.addEventListener("change", (e) => {
        const archivos = Array.from(e.target.files);
        if (archivos.length === 0) return;
        imagenesSeleccionadas = [];
        imagenBox.innerHTML = "";
        archivos.forEach((archivo) => {
            const lector = new FileReader();
            lector.onload = (evento) => {
                imagenesSeleccionadas.push(evento.target.result);
                const img = document.createElement("img");
                img.src = evento.target.result;
                img.style.width = "100px";
                img.style.height = "100px";
                img.style.objectFit = "cover";
                img.style.margin = "5px";
                img.style.borderRadius = "5px";
                imagenBox.appendChild(img);
            };
            lector.readAsDataURL(archivo);
        });
    });
    botonAgregar.addEventListener("click", () => {
        if (imagenesSeleccionadas.length === 0) {
            alert("⚠️ No hay imágenes seleccionadas.");
            return;
        }
        localStorage.setItem("imagenesCarrusel", JSON.stringify(imagenesSeleccionadas));
        alert(`✅ Se han agregado ${imagenesSeleccionadas.length} imágenes con éxito.`);
        imagenBox.innerHTML = `<i class="fa-regular fa-image"></i>`;
        inputImagen.value = "";
        imagenesSeleccionadas = [];
    });
});
//---------------------------------------------//
//--|funcionalidad_seleccionar_controladores|--//
//---------------------------------------------//
document.addEventListener("DOMContentLoaded", () => {
    console.log("✅ Script de controladores cargado correctamente.");
    const btnAgregarControl = document.querySelector(".controladores-btn");
    const selectTiempo = document.querySelector(".controladores-select select");
    const checkboxes = document.querySelectorAll(".controladores-opciones input[type='checkbox']");
    btnAgregarControl.addEventListener("click", () => {
        console.log("🟢 Botón 'añadir control' presionado.");
    });
    selectTiempo.addEventListener("change", (e) => {
        const tiempoSeleccionado = e.target.value;
        console.log(`⏱️ Tiempo seleccionado: ${tiempoSeleccionado}`);
    });
    checkboxes.forEach((checkbox) => {
        checkbox.addEventListener("change", (e) => {
            const estado = e.target.checked ? "activado" : "desactivado";
            console.log(`🔘 ${e.target.nextSibling.textContent.trim()} ${estado}`);
        });
    });
});
//---------------------------------------------//
//--|funcionalidad_vista_previa_del_carrusel|--//
//---------------------------------------------//
document.addEventListener("DOMContentLoaded", () => {
    console.log("✅ Script de vista previa del carrusel cargado correctamente.");

    const btnIzquierda = document.querySelector(".btn-lateral.izquierda");
    const btnDerecha = document.querySelector(".btn-lateral.derecha");
    const btnCentro = document.querySelector(".btn-centro");
    const btnEnviar = document.querySelector(".btn-enviar");
    const contenedorBlanco = document.querySelector(".contenedor-blanco");
    const carruselBlanco = document.querySelector(".carrusel-blanco");

    // Recuperar carrusel guardado
    const carruseles = JSON.parse(localStorage.getItem("carruselesCreados")) || [];
    if (carruseles.length > 0) {
        const ultimoCarrusel = carruseles[carruseles.length - 1];
        contenedorBlanco.textContent = ultimoCarrusel.nombre;
    }

    // Recuperar imágenes guardadas
    const imagenesGuardadas = JSON.parse(localStorage.getItem("imagenesCarrusel")) || [];
    let indiceActual = 0;

    // Mostrar imagen actual en el carrusel
    const mostrarImagen = () => {
        carruselBlanco.innerHTML = "";
        if (imagenesGuardadas.length === 0) {
            carruselBlanco.innerHTML = `<p style="text-align:center;">No hay imágenes cargadas.</p>`;
            return;
        }
        const img = document.createElement("img");
        img.src = imagenesGuardadas[indiceActual];
        carruselBlanco.appendChild(img); // ✅ El tamaño ahora lo controla el CSS
    };

    mostrarImagen();

    // Navegación con botones laterales
    btnIzquierda.addEventListener("click", () => {
        if (imagenesGuardadas.length > 0) {
            indiceActual = (indiceActual - 1 + imagenesGuardadas.length) % imagenesGuardadas.length;
            mostrarImagen();
        }
    });

    btnDerecha.addEventListener("click", () => {
        if (imagenesGuardadas.length > 0) {
            indiceActual = (indiceActual + 1) % imagenesGuardadas.length;
            mostrarImagen();
        }
    });

    btnCentro.addEventListener("click", () => {
        console.log(`⏺️ Imagen actual: ${indiceActual + 1} / ${imagenesGuardadas.length}`);
    });

    btnEnviar.addEventListener("click", () => {
        console.log("🚀 Despliegue del carrusel iniciado");
    });

    //---------------------------------------------//
    //--|Bloque para lectura y vista previa local|--//
    //---------------------------------------------//
    // Este bloque es útil cuando el usuario agrega imágenes al carrusel
    const imagenesSeleccionadas = [];
    const imagenBox = document.querySelector(".imagen-box"); // ajusta el selector si tu HTML lo tiene

    const lector = new FileReader();
    lector.onload = (evento) => {
        // Guardar la imagen codificada en Base64
        imagenesSeleccionadas.push(evento.target.result);

        // Crear la miniatura de la imagen
        const img = document.createElement("img");
        img.src = evento.target.result;

        // ✅ Sin estilos inline, todo se controla por CSS
        img.classList.add("miniatura-carrusel");

        // Mostrar miniatura
        if (imagenBox) imagenBox.appendChild(img);
    };
});