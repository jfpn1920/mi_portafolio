//------------------------------------//
//--|funcionalidad_menu_hamburguesa|--//
//------------------------------------//
const menuBtn = document.getElementById('menu-btn');
const menu = document.getElementById('menu');
menuBtn.addEventListener('click', () => {
    menu.style.display = menu.style.display === 'block' ? 'none' : 'block';
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
        localStorage.setItem("ultimaImagenSeleccionada", imagenesSeleccionadas[imagenesSeleccionadas.length - 1]);
        mostrarMensaje(`Se han agregado ${imagenesSeleccionadas.length} imágenes con éxito.`, "exito");
        imagenBox.innerHTML = `<i class="fa-regular fa-image"></i>`;
        inputImagen.value = "";
        imagenesSeleccionadas = [];
    });
});
//-----------------------------------------------//
//--|funcionalidad_tablero_editor_de_contenido|--//
//-----------------------------------------------//
document.addEventListener("DOMContentLoaded", () => {
    console.log("✅ Script de contenido.js cargado correctamente.");
    const btnAgregarContenido = document.querySelector(".editor-boton5");
    const selectTipoTexto = document.querySelectorAll(".selector5")[0];
    const selectTamanoTexto = document.querySelectorAll(".selector5")[1];
    const selectOrdenTexto = document.querySelectorAll(".selector5")[2];
    const selectAjusteTexto = document.querySelectorAll(".selector5")[3];
    const botonesEstilo = document.querySelectorAll(".btn-estilo5");
    const btnContenido = document.querySelector(".columna-btn5");
    const btnEliminar = document.querySelector(".columna-btneliminar5");
    const areaContenido = document.querySelector(".contenido-area5");
    console.log("📂 Elementos del editor listos:", {
        btnAgregarContenido,
        selectTipoTexto,
        selectTamanoTexto,
        selectOrdenTexto,
        selectAjusteTexto,
        botonesEstilo,
        btnContenido,
        btnEliminar,
        areaContenido
    });
    btnAgregarContenido.addEventListener("click", () => {
        console.log("🧩 Botón 'Agregar contenido' presionado.");
    });
    botonesEstilo.forEach((boton, index) => {
        boton.addEventListener("click", () => {
            console.log(`🎨 Botón de estilo ${index + 1} presionado.`);
        });
    });
    function construirContenido(tipo) {
        console.log(`🔄 Reconstruyendo Contenido ${tipo}...`);
        if (tipo === "1") {
            const imagenesBotonera = JSON.parse(localStorage.getItem("imagenesBotonera") || "[]");
            areaContenido.innerHTML = `
                <div class="contenido1">
                    <div class="columna-izquierda">
                        <div class="imagen">Aquí irá la imagen</div>
                    </div>
                    <div class="columna-derecha">
                        <div class="titulo" contenteditable="true">Aquí irá el título</div>
                        <div class="parrafo" contenteditable="true">Aquí irá el párrafo</div>
                        <div class="subtitulo" contenteditable="true">Aquí irá el subtítulo</div>
                        <div class="botonera">
                            <button class="btn-add">+</button>
                            <button class="btn-add">+</button>
                            <button class="btn-add">+</button>
                            <button class="btn-add">+</button>
                        </div>
                    </div>
                </div>
            `;
            const contenedorImagen = areaContenido.querySelector(".imagen");
            const ultimaImagen = localStorage.getItem("ultimaImagenSeleccionada");
            const imagenesCarrusel = JSON.parse(localStorage.getItem("imagenesCarrusel") || "[]");
            if (imagenesCarrusel.length > 0) {
                contenedorImagen.innerHTML = imagenesCarrusel.map(
                    src => `<img src="${src}" alt="imagen carrusel" style="width:282px; border-radius:5px; margin-left: 0px; height: 378px;">`
                ).join("");
                console.log(`🖼️ ${imagenesCarrusel.length} imagen(es) cargadas desde agregar imagen.`);
            } else if (ultimaImagen) {
                contenedorImagen.innerHTML = `<img src="${ultimaImagen}" alt="imagen seleccionada" style="width:100%; border-radius:10px; object-fit:cover;">`;
                console.log("🖼️ Imagen principal cargada correctamente.");
            } else {
                contenedorImagen.innerHTML = `<p style="color:#888;">No hay imagen seleccionada aún.</p>`;
            }
            inicializarBotonera();
            restaurarImagenesEnBotones(imagenesBotonera);
            const titulo = areaContenido.querySelector(".titulo");
            const parrafo = areaContenido.querySelector(".parrafo");
            const subtitulo = areaContenido.querySelector(".subtitulo");
            limitarTexto(titulo, "Has alcanzado el máximo de espacio.");
            limitarTexto(parrafo, "Has llegado al máximo permitido.");
            limitarTexto(subtitulo, "Has alcanzado el máximo de espacio.");
            [titulo, parrafo, subtitulo].forEach((el) => {
                el.addEventListener("input", guardarContenidoEditable);
            });
            restaurarContenidoEditable();
        }
        else if (tipo === "2") {
            areaContenido.innerHTML = `<p class="mensaje-temp">📘 Contenido 2 — Próximamente.</p>`;
        }
        else if (tipo === "3") {
            areaContenido.innerHTML = `<p class="mensaje-temp">📗 Contenido 3 — Próximamente.</p>`;
        }
    }
    window.addEventListener("storage", (event) => {
        if (event.key === "ultimaImagenSeleccionada" || event.key === "imagenesCarrusel") {
            const contenedor = document.querySelector(".imagen");
            if (!contenedor) return;
            const imagenesCarrusel = JSON.parse(localStorage.getItem("imagenesCarrusel") || "[]");
            const ultimaImagen = localStorage.getItem("ultimaImagenSeleccionada");
            if (imagenesCarrusel.length > 0) {
                contenedor.innerHTML = imagenesCarrusel.map(
                    src => `<img src="${src}" alt="imagen carrusel" style="width:100%; margin-bottom:5px; border-radius: 5px; object-fit:cover;">`
                ).join("");
                console.log("♻️ Carrusel actualizado desde otra pestaña.");
            } else if (ultimaImagen) {
                contenedor.innerHTML = `<img src="${ultimaImagen}" alt="imagen actualizada" style="width:100%; border-radius: 5px; object-fit:cover;">`;
                console.log("♻️ Imagen única actualizada desde otra pestaña.");
            }
        }
    });
    function inicializarBotonera() {
        const botones = areaContenido.querySelectorAll(".btn-add");
        botones.forEach((btn, index) => {
            btn.addEventListener("click", () => {
                console.log(`🖱️ Botón + #${index + 1} presionado.`);
                const inputFile = document.createElement("input");
                inputFile.type = "file";
                inputFile.accept = "image/*";
                inputFile.addEventListener("change", (e) => {
                    const archivo = e.target.files[0];
                    if (!archivo) return;
                    const lector = new FileReader();
                    lector.onload = (evento) => {
                        const base64 = evento.target.result;
                        btn.innerHTML = `<img src="${base64}" alt="img" style="width:100%; height:100%; object-fit:cover; border-radius:5px;">`;
                        btn.style.padding = "0";
                        const key = "imagenesBotonera";
                        const arr = JSON.parse(localStorage.getItem(key) || "[]");
                        arr[index] = base64;
                        localStorage.setItem(key, JSON.stringify(arr));
                        console.log(`💾 Imagen guardada en botón #${index + 1}`);
                    };
                    lector.readAsDataURL(archivo);
                });
                inputFile.click();
            });
        });
    }
    function restaurarImagenesEnBotones(imagenesArray) {
        if (!imagenesArray?.length) return;
        const botones = areaContenido.querySelectorAll(".btn-add");
        botones.forEach((btn, i) => {
            const b64 = imagenesArray[i];
            if (b64) {
                btn.innerHTML = `<img src="${b64}" alt="img" style="width:100%; height:100%; object-fit:cover; border-radius: 5px;">`;
                btn.style.padding = "0";
            }
        });
    }
    function limitarTexto(elemento, mensaje) {
        elemento.addEventListener("input", () => {
            requestAnimationFrame(() => {
                const alturaVisible = elemento.clientHeight;
                const alturaContenido = elemento.scrollHeight;
                if (alturaContenido > alturaVisible) {
                    elemento.innerText = elemento.innerText.trim().slice(0, -1);
                    alert(mensaje);
                }
            });
        });
    }
    function guardarContenidoEditable() {
        const titulo = areaContenido.querySelector(".titulo")?.innerText || "";
        const parrafo = areaContenido.querySelector(".parrafo")?.innerText || "";
        const subtitulo = areaContenido.querySelector(".subtitulo")?.innerText || "";
        localStorage.setItem("contenidoEditable", JSON.stringify({ titulo, parrafo, subtitulo }));
        console.log("💾 Contenido editable guardado.");
    }
    function restaurarContenidoEditable() {
        const datos = JSON.parse(localStorage.getItem("contenidoEditable"));
        if (!datos) return;
        const titulo = areaContenido.querySelector(".titulo");
        const parrafo = areaContenido.querySelector(".parrafo");
        const subtitulo = areaContenido.querySelector(".subtitulo");
        if (titulo) titulo.innerText = datos.titulo;
        if (parrafo) parrafo.innerText = datos.parrafo;
        if (subtitulo) subtitulo.innerText = datos.subtitulo;
    }
    const contenidoGuardado = localStorage.getItem("contenidoSeleccionado");
    if (contenidoGuardado) construirContenido(contenidoGuardado);
    btnContenido.addEventListener("click", () => {
        console.log("🗂 Botón 'Contenido' presionado.");
        let menu = document.querySelector(".menu-contenido");
        if (menu) {
            menu.remove();
            return;
        }
        menu = document.createElement("div");
        menu.classList.add("menu-contenido");
        menu.innerHTML = `
            <div data-id="1">Contenido 1</div>
            <div data-id="2">Contenido 2</div>
            <div data-id="3">Contenido 3</div>
        `;
        btnContenido.insertAdjacentElement("afterend", menu);
        menu.querySelectorAll("div").forEach(item => {
            item.addEventListener("click", () => {
                const valor = item.dataset.id;
                menu.remove();
                localStorage.setItem("contenidoSeleccionado", valor);
                construirContenido(valor);
            });
        });
        document.addEventListener("click", (e) => {
            if (!menu.contains(e.target) && e.target !== btnContenido) menu.remove();
        }, { once: true });
    });
    btnEliminar.addEventListener("click", () => {
        console.log("🗑 Botón 'Eliminar' presionado.");
        areaContenido.innerHTML = "";
        localStorage.removeItem("contenidoSeleccionado");
        localStorage.removeItem("contenidoEditable");
        localStorage.removeItem("imagenesBotonera");
    });
    const selectores = [selectTipoTexto, selectTamanoTexto, selectOrdenTexto, selectAjusteTexto];
    selectores.forEach((selector, i) => {
        selector.addEventListener("change", () => {
            console.log(`🔧 Selector ${i + 1} cambió a: ${selector.value}`);
        });
    });
});