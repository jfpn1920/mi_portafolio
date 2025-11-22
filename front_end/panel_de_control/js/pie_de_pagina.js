//------------------------------------//
//--|funcionalidad_menu_hamburguesa|--//
//------------------------------------//
const menuBtn = document.getElementById('menu-btn');
const menu = document.getElementById('menu');
menuBtn.addEventListener('click', () => {
    menu.style.display = menu.style.display === 'block' ? 'none' : 'block';
});
//-----------------------------------------//
//--|funcionalidad_agregar_pie_de_pagina|--//
//-----------------------------------------//
document.addEventListener("DOMContentLoaded", () => {
    const input = document.querySelector(".campo input");
    const botonCrear = document.querySelector(".crear");
    botonCrear.addEventListener("click", () => {
        const valor = input.value.trim();
        if (valor !== "") {
            alert(`El pie de página "${valor}" ha sido creado exitosamente`);
        } else {
            alert("No hay ningún pie de página");
        }
    });
});
//----------------------------------//
//--|funcionalidad_agregar_imagen|--//
//----------------------------------//
document.addEventListener("DOMContentLoaded", () => {
    console.log("✅ Script de agregar imagen pie_de_pagina cargado correctamente.");
    const imagenBox_pie_de_pagina = document.querySelector(".imagen-box");
    const botonAgregar_pie_de_pagina = document.querySelector(".imagen-btn");
    if (!imagenBox_pie_de_pagina) console.error("No se encontró .imagen-box en el DOM");
    if (!botonAgregar_pie_de_pagina) console.error("No se encontró .imagen-btn en el DOM");
    const inputImagen_pie_de_pagina = document.createElement("input");
    const estado_pie_de_pagina = document.getElementById("estadoEdicion");
    inputImagen_pie_de_pagina.type = "file";
    inputImagen_pie_de_pagina.accept = "image/*";
    inputImagen_pie_de_pagina.multiple = true;
    inputImagen_pie_de_pagina.style.display = "none";
    document.body.appendChild(inputImagen_pie_de_pagina);
    let imagenesSeleccionadas_pie_de_pagina = [];
    function mostrarMensaje_pie_de_pagina(texto, tipo = "info") {
        if (estado_pie_de_pagina) {
            estado_pie_de_pagina.innerHTML = "";
            const mensaje_pie_de_pagina = document.createElement("div");
            mensaje_pie_de_pagina.classList.add("mensaje", tipo);
            mensaje_pie_de_pagina.textContent = texto;
            estado_pie_de_pagina.appendChild(mensaje_pie_de_pagina);
            setTimeout(() => {
                if (estado_pie_de_pagina.contains(mensaje_pie_de_pagina)) {
                    mensaje_pie_de_pagina.remove();
                }
            }, 3500);
            console.log(`[mensaje ${tipo}] ${texto}`);
            return;
        }
        alert(texto);
        console.log(`[alert fallback ${tipo}] ${texto}`);
    }
    if (imagenBox_pie_de_pagina) {
        imagenBox_pie_de_pagina.addEventListener("click", () => {
            inputImagen_pie_de_pagina.click();
        });
    }
    inputImagen_pie_de_pagina.addEventListener("change", (e) => {
        const archivos_pie_de_pagina = Array.from(e.target.files || []);
        if (archivos_pie_de_pagina.length === 0) {
            mostrarMensaje_pie_de_pagina("No se seleccionaron imágenes.", "info");
            return;
        }
        imagenesSeleccionadas_pie_de_pagina = [];
        if (imagenBox_pie_de_pagina) imagenBox_pie_de_pagina.innerHTML = "";
        archivos_pie_de_pagina.forEach((archivo) => {
            const lector_pie_de_pagina = new FileReader();
            lector_pie_de_pagina.onload = (evento) => {
                imagenesSeleccionadas_pie_de_pagina.push(evento.target.result);
                if (imagenBox_pie_de_pagina) {
                    const img_pie_de_pagina = document.createElement("img");
                    img_pie_de_pagina.src = evento.target.result;
                    img_pie_de_pagina.style.width = "100px";
                    img_pie_de_pagina.style.height = "100px";
                    img_pie_de_pagina.style.objectFit = "cover";
                    img_pie_de_pagina.style.margin = "5px";
                    img_pie_de_pagina.style.borderRadius = "5px";
                    imagenBox_pie_de_pagina.appendChild(img_pie_de_pagina);
                }
            };
            lector_pie_de_pagina.readAsDataURL(archivo);
        });
        mostrarMensaje_pie_de_pagina(`🖼️ ${archivos_pie_de_pagina.length} imagen(es) seleccionada(s).`, "info");
    });
    if (botonAgregar_pie_de_pagina) {
        botonAgregar_pie_de_pagina.addEventListener("click", () => {
            if (imagenesSeleccionadas_pie_de_pagina.length === 0) {
                mostrarMensaje_pie_de_pagina("no has agregado ninguna imagen", "error");
                return;
            }
            localStorage.setItem(
                "imagenesCarrusel_pie_de_pagina",
                JSON.stringify(imagenesSeleccionadas_pie_de_pagina)
            );
            mostrarMensaje_pie_de_pagina("has agregado las imagenes correctamente", "exito");
            if (imagenBox_pie_de_pagina) imagenBox_pie_de_pagina.innerHTML = `<i class="fa-regular fa-image"></i>`;
            inputImagen_pie_de_pagina.value = "";
            imagenesSeleccionadas_pie_de_pagina = [];
        });
    }
});
//-----------------------------------------------//
//--|funcionalidad_formulario_de_pie_de_pagina|--//
//-----------------------------------------------//
document.addEventListener("DOMContentLoaded", () => {
    console.log("📌 JS de pie_de_pagina cargado!");
    const botonCrearMenu = document.querySelector(".crear1");
    const inputTitulo = document.querySelector(".input-titulo");
    const inputSubtitulo = document.querySelector(".input-sub");
    const inputOpciones = document.querySelector(".input-opciones");
    const iconosCajas = document.querySelectorAll(".caja2");
    const modalIconos = document.getElementById("modalIconos");
    const cerrarModal = document.getElementById("cerrarModal");
    const iconosModal = document.querySelectorAll(".iconos-grid i");
    const listaPaginas = document.querySelector(".lista-paginas1");
    function mostrarMensaje(texto, tipo = "info") {
        alert(`${tipo.toUpperCase()}: ${texto}`);
    }
    iconosCajas.forEach((caja) => {
        caja.addEventListener("click", () => {
            modalIconos.style.display = "flex";
        });
    });
    cerrarModal.addEventListener("click", () => {
        modalIconos.style.display = "none";
    });
    iconosModal.forEach((icono) => {
        icono.addEventListener("click", () => {
            console.log("Ícono seleccionado:", icono.className);
            modalIconos.style.display = "none";
        });
    });
    botonCrearMenu.addEventListener("click", () => {
        if (inputTitulo.value.trim() === "") {
            mostrarMensaje("Debes colocar un título para el menú.", "error");
            return;
        }
        mostrarMensaje(`Menú "${inputTitulo.value}" creado correctamente`, "exito");
    });
});