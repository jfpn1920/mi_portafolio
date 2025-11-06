//------------------------------------//
//--|funcionalidad_menu_hamburguesa|--//
//------------------------------------//
const menuBtn = document.getElementById('menu-btn');
const menu = document.getElementById('menu');
menuBtn.addEventListener('click', () => {
    menu.style.display = menu.style.display === 'block' ? 'none' : 'block';
});
//---------------------------------------------------//
//--|funcionalidad_edicion_predeterminada_carrusel|--//
//---------------------------------------------------//
function mostrarMensaje(texto, tipo = "info") {
    const estado = document.getElementById("estadoEdicion");
    if (!estado) return; 
    estado.innerHTML = "";
    const mensaje = document.createElement("div");
    mensaje.classList.add("mensaje", tipo);
    mensaje.textContent = texto;
    estado.appendChild(mensaje);
}
//------------------------------------//
//--|funcionalidad_agregar_carrusel|--//
//------------------------------------//
document.addEventListener("DOMContentLoaded", () => {
    console.log("✅ Script del carrusel cargado correctamente.");
    const botonCrear = document.querySelector(".crear");
    const inputPagina = document.querySelector(".campo input");
    const contenedorBlanco = document.querySelector(".contenedor-blanco");
    const estado = document.getElementById("estadoEdicion");
    function mostrarMensaje(texto, tipo = "info") {
        if (!estado) return;
        estado.innerHTML = "";
        const mensaje = document.createElement("div");
        mensaje.classList.add("mensaje", tipo);
        mensaje.textContent = texto;
        estado.appendChild(mensaje);
    }
    botonCrear.addEventListener("click", () => {
        const nombreCarrusel = inputPagina.value.trim();
        if (nombreCarrusel === "") {
            mostrarMensaje("No hay carrusel creado", "error");
            inputPagina.focus();
            return;
        }
        const carruseles = JSON.parse(localStorage.getItem("carruselesCreados")) || [];
        const nuevoCarrusel = { nombre: nombreCarrusel, imagenes: [] };
        carruseles.push(nuevoCarrusel);
        localStorage.setItem("carruselesCreados", JSON.stringify(carruseles));
        contenedorBlanco.textContent = nombreCarrusel;
        mostrarMensaje(`El carrusel ${nombreCarrusel} ha sido creado`, "exito");
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
    const estado = document.getElementById("estadoEdicion");
    inputImagen.type = "file";
    inputImagen.accept = "image/*";
    inputImagen.multiple = true;
    inputImagen.style.display = "none";
    document.body.appendChild(inputImagen);
    let imagenesSeleccionadas = [];
    function mostrarMensaje(texto, tipo = "info") {
        if (!estado) return;
        estado.innerHTML = "";
        const mensaje = document.createElement("div");
        mensaje.classList.add("mensaje", tipo);
        mensaje.textContent = texto;
        estado.appendChild(mensaje);
    }
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
        mostrarMensaje(`🖼️ ${archivos.length} imagen(es) seleccionada(s).`, "info");
    });
    botonAgregar.addEventListener("click", () => {
        if (imagenesSeleccionadas.length === 0) {
            mostrarMensaje("No hay imágenes seleccionadas.", "error");
            return;
        }
        localStorage.setItem("imagenesCarrusel", JSON.stringify(imagenesSeleccionadas));
        mostrarMensaje(`Se han agregado ${imagenesSeleccionadas.length} imágenes con éxito.`, "exito");
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
    const checkboxAutomatico = checkboxes[0];
    const checkboxIndicadores = checkboxes[1];
    const checkboxControladores = checkboxes[2];
    const estado = document.getElementById("estadoEdicion");
    function mostrarMensaje(texto, tipo = "info") {
        if (!estado) return;
        estado.innerHTML = "";
        const mensaje = document.createElement("div");
        mensaje.classList.add("mensaje", tipo);
        mensaje.textContent = texto;
        estado.appendChild(mensaje);
    }
    function actualizarConfiguracion() {
        const tiempoTexto = selectTiempo.value;
        let tiempoMs = 0;
        if (tiempoTexto.includes("5")) tiempoMs = 5000;
        else if (tiempoTexto.includes("10")) tiempoMs = 10000;
        else if (tiempoTexto.includes("15")) tiempoMs = 15000;
        const configuracion = {
            automatico: checkboxAutomatico.checked,
            indicadores: checkboxIndicadores.checked,
            controladores: checkboxControladores.checked,
            tiempo: tiempoMs
        };
        localStorage.setItem("configCarrusel", JSON.stringify(configuracion));
        console.log("⚙️ Configuración guardada:", configuracion);
        window.dispatchEvent(new Event("storage"));
        return configuracion;
    }
    selectTiempo.addEventListener("change", (e) => {
        const tiempoSeleccionado = e.target.value;
        mostrarMensaje(`⏱️ Tiempo seleccionado: ${tiempoSeleccionado}`, "info");
        actualizarConfiguracion();
    });
    checkboxAutomatico.addEventListener("change", (e) => {
        const estadoTexto = e.target.checked ? "activado" : "desactivado";
        mostrarMensaje(`🔘 Automático ${estadoTexto}`, "info");
        actualizarConfiguracion();
    });
    checkboxIndicadores.addEventListener("change", (e) => {
        const estadoTexto = e.target.checked ? "activados" : "desactivados";
        mostrarMensaje(`🔘 Indicadores ${estadoTexto}`, "info");
        actualizarConfiguracion();
        aplicarConfiguracion?.();
    });
    checkboxControladores.addEventListener("change", (e) => {
        const estadoTexto = e.target.checked ? "visibles" : "ocultos";
        mostrarMensaje(`🎮 Controladores ${estadoTexto}`, "info");
        actualizarConfiguracion();
    });
    checkboxes.forEach((checkbox, index) => {
        if (index < 3) return;
        checkbox.addEventListener("change", (e) => {
            const estadoTexto = e.target.checked ? "activado" : "desactivado";
            mostrarMensaje(`🔘 ${e.target.nextSibling.textContent.trim()} ${estadoTexto}`, "info");
        });
    });
    btnAgregarControl.addEventListener("click", () => {
        console.log("🟢 Botón 'añadir control' presionado.");
        const config = actualizarConfiguracion();
        const algoAñadido =
            config.automatico || config.indicadores || config.controladores || config.tiempo > 0;
        if (algoAñadido) {
            mostrarMensaje("Se ha añadido todo el control por completo.", "exito");
        } else {
            mostrarMensaje("No has añadido nada.", "error");
        }
    });
});
//---------------------------------------------//
//--|funcionalidad_vista_previa_del_carrusel|--//
//---------------------------------------------//
document.addEventListener("DOMContentLoaded", () => {
    console.log("✅ Script de vista previa del carrusel cargado correctamente.");
    const btnIzquierda = document.querySelector(".btn-lateral.izquierda");
    const btnDerecha = document.querySelector(".btn-lateral.derecha");
    if (btnIzquierda && btnDerecha) {
        const iconoIzq = document.createElement("i");
        iconoIzq.classList.add("fas", "fa-chevron-left");
        const iconoDer = document.createElement("i");
        iconoDer.classList.add("fas", "fa-chevron-right");
        if (!btnIzquierda.querySelector("i")) btnIzquierda.appendChild(iconoIzq);
        if (!btnDerecha.querySelector("i")) btnDerecha.appendChild(iconoDer);
    }
    const btnCentro = document.querySelector(".btn-centro");
    const btnEnviar = document.querySelector(".btn-enviar");
    const contenedorBlanco = document.querySelector(".contenedor-blanco");
    const carruselBlanco = document.querySelector(".carrusel-blanco");
    const carruseles = JSON.parse(localStorage.getItem("carruselesCreados")) || [];
    if (carruseles.length > 0) {
        const ultimoCarrusel = carruseles[carruseles.length - 1];
        contenedorBlanco.textContent = ultimoCarrusel.nombre;
    }
    const imagenesGuardadas = JSON.parse(localStorage.getItem("imagenesCarrusel")) || [];
    let indiceActual = 0;
    let intervalo = null;
    const mostrarImagen = () => {
        carruselBlanco.innerHTML = "";
        if (imagenesGuardadas.length === 0) {
            carruselBlanco.innerHTML = `<p style="text-align:center;">No hay imágenes cargadas.</p>`;
            return;
        }
        const img = document.createElement("img");
        img.src = imagenesGuardadas[indiceActual];
        carruselBlanco.appendChild(img);
        actualizarIndicadores();
    };
    const siguienteImagen = () => {
        if (imagenesGuardadas.length > 0) {
            indiceActual = (indiceActual + 1) % imagenesGuardadas.length;
            mostrarImagen();
        }
    };
    const anteriorImagen = () => {
        if (imagenesGuardadas.length > 0) {
            indiceActual = (indiceActual - 1 + imagenesGuardadas.length) % imagenesGuardadas.length;
            mostrarImagen();
        }
    };
    btnIzquierda.addEventListener("click", anteriorImagen);
    btnDerecha.addEventListener("click", siguienteImagen);
    btnCentro.addEventListener("click", () => {
        console.log(`⏺️ Imagen actual: ${indiceActual + 1} / ${imagenesGuardadas.length}`);
    });
    btnEnviar.addEventListener("click", () => {
        const nombreCarrusel = contenedorBlanco.textContent.trim();
        const estado = document.getElementById("estadoEdicion");
        estado.innerHTML = "";
        const mensaje = document.createElement("div");
        mensaje.classList.add("mensaje", "info");
        if (nombreCarrusel && nombreCarrusel !== "") {
            mensaje.textContent = `"${nombreCarrusel}" se ha enviado correctamente.`;
        } else {
            mensaje.textContent = "No hay un carrusel en la vista previa.";
        }
        estado.appendChild(mensaje);
    });
    function actualizarIndicadores() {
        const config = JSON.parse(localStorage.getItem("configCarrusel")) || {};
        const contenedorIndicadores = document.querySelector(".indicadores-container");
        contenedorIndicadores.innerHTML = "";
        if (config.indicadores && imagenesGuardadas.length > 0) {
            imagenesGuardadas.forEach((_, i) => {
                const indicador = document.createElement("span");
                indicador.classList.add("indicador");
                if (i === indiceActual) indicador.classList.add("activo");
                indicador.addEventListener("click", () => {
                    indiceActual = i;
                    mostrarImagen();
                });
                contenedorIndicadores.appendChild(indicador);
            });
        }
    }
    const aplicarConfiguracion = () => {
        const config = JSON.parse(localStorage.getItem("configCarrusel")) || {};
        console.log("🔄 Configuración recibida:", config);
        const mostrarControladores = (estado) => {
            const btnIzq = document.querySelector(".btn-lateral.izquierda");
            const btnDer = document.querySelector(".btn-lateral.derecha");
            if (btnIzq && btnDer) {
                btnIzq.style.display = estado ? "flex" : "none";
                btnDer.style.display = estado ? "flex" : "none";
            }
        };
        if (config.controladores) {
            console.log("🎮 Controladores visibles");
            mostrarControladores(true);
        } else {
            console.log("🙈 Controladores ocultos");
            mostrarControladores(false);
        }
        clearInterval(intervalo);
        if (config.automatico && config.tiempo > 0) {
            intervalo = setInterval(siguienteImagen, config.tiempo);
            console.log(`▶️ Modo automático activado cada ${config.tiempo / 1000}s`);
        } else {
            console.log("⏸️ Modo automático desactivado");
        }
        actualizarIndicadores();
    };
    mostrarImagen();
    aplicarConfiguracion();
    window.addEventListener("storage", aplicarConfiguracion);
    const imagenesSeleccionadas = [];
    const imagenBox = document.querySelector(".imagen-box");
    const lector = new FileReader();
    lector.onload = (evento) => {
        imagenesSeleccionadas.push(evento.target.result);
        const img = document.createElement("img");
        img.src = evento.target.result;
        img.classList.add("miniatura-carrusel");
        if (imagenBox) imagenBox.appendChild(img);
    };
});