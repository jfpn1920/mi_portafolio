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
    const checkboxAutomatico = checkboxes[0];
    const checkboxIndicadores = checkboxes[1];
    const checkboxControladores = checkboxes[2];
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
        console.log(`⏱️ Tiempo seleccionado: ${tiempoSeleccionado}`);
        actualizarConfiguracion();
    });
    checkboxAutomatico.addEventListener("change", (e) => {
        const estado = e.target.checked ? "activado" : "desactivado";
        console.log(`🔘 Automático ${estado}`);
        actualizarConfiguracion();
    });
    checkboxIndicadores.addEventListener("change", (e) => {
        const estado = e.target.checked ? "activados" : "desactivados";
        console.log(`🔘 Indicadores ${estado}`);
        actualizarConfiguracion();
        aplicarConfiguracion();
    });
    checkboxControladores.addEventListener("change", (e) => {
        const estado = e.target.checked ? "visibles" : "ocultos";
        console.log(`🎮 Controladores ${estado}`);
        actualizarConfiguracion();
    });
    checkboxes.forEach((checkbox, index) => {
        if (index < 3) return;
        checkbox.addEventListener("change", (e) => {
            const estado = e.target.checked ? "activado" : "desactivado";
            console.log(`🔘 ${e.target.nextSibling.textContent.trim()} ${estado}`);
        });
    });
    btnAgregarControl.addEventListener("click", () => {
        console.log("🟢 Botón 'añadir control' presionado.");
        const config = actualizarConfiguracion();
        const algoAñadido =
            config.automatico || config.indicadores || config.controladores || config.tiempo > 0;
        if (algoAñadido) {
            alert("✅ Se ha añadido todo el control por completo.");
        } else {
            alert("⚠️ No has añadido nada.");
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
        console.log("🚀 Despliegue del carrusel iniciado");
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
                if (estado) {
                    btnIzq.style.display = "flex";
                    btnDer.style.display = "flex";
                } else {
                    btnIzq.style.display = "none";
                    btnDer.style.display = "none";
                }
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