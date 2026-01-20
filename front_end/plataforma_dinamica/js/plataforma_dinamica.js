//-----------------------------//
//--|contenidos_por_pestañas|--//
//-----------------------------//
const CONTENIDOS_PESTANAS = {
    2: `
        <section class="bloque">
            <h2>Servicios</h2>
            <p>Servicios ofrecidos.</p>
        </section>
    `,
    3: `
        <section class="bloque">
            <h2>Proyectos</h2>
            <p>Proyectos desarrollados.</p>
        </section>
    `,
    4: `
        <section class="bloque">
            <h2>Equipo</h2>
            <p>Equipo de trabajo.</p>
        </section>
    `,
    5: `
        <section class="bloque">
            <h2>Blog</h2>
            <p>Blog y noticias.</p>
        </section>
    `,
    6: `
        <section class="bloque">
            <h2>Contacto</h2>
            <p>Formulario de contacto.</p>
        </section>
    `,
    7: `
        <section class="bloque">
            <h2>Soporte</h2>
            <p>Soporte técnico.</p>
        </section>
    `
};
//-------------------------------------------------//
//--|funcionalidad_nombre_de_plataforma_dinamico|--//
//-------------------------------------------------//
document.addEventListener("DOMContentLoaded", () => {
    const titulo = document.getElementById("tituloPlataforma");
    const favicon = document.getElementById("iconoPlataforma");
    const contenedorContenido = document.getElementById("contenidoPlataforma");
    const plataformaActiva = JSON.parse(
        localStorage.getItem("plataforma_activa")
    );
    if (!plataformaActiva) {
        console.warn("No hay plataforma activa");
        return;
    }
    titulo.textContent = plataformaActiva.nombre || "Plataforma";
    if (plataformaActiva.imagen) {
        favicon.setAttribute("href", plataformaActiva.imagen);
    }
    const params = new URLSearchParams(window.location.search);
    let pestana = params.get("pestana");
    if (!pestana) {
        pestana = localStorage.getItem("pestana_activa") || 1;
    }
    pestana = Number(pestana);
    localStorage.setItem("pestana_activa", pestana);
    console.log("Pestaña activa:", pestana);
    if (!contenedorContenido) return;
    contenedorContenido.innerHTML =
        CONTENIDOS_PESTANAS[pestana] ||
        `
        <section class="bloque ocultar1">
            <h2 class="ocultar1">Contenido no disponible</h2>
            <p>Esta pestaña no tiene contenido asignado.</p>
        </section>
        `;
    console.log("Pestañas creadas:", plataformaActiva.pestanas || []);
    console.log("Total pestañas:", Object.keys(CONTENIDOS_PESTANAS).length);
});
//-----------------------------------------------//
//--|funcionalidad_menu_de_navegacion_dinamico|--//
//-----------------------------------------------//
document.addEventListener("DOMContentLoaded", () => {
    const dataMenu = JSON.parse(
        localStorage.getItem("menu_navegacion_dinamico")
    );
    if (!dataMenu) {
        console.warn("No hay datos de menú");
        return;
    }
    const menuLogo = document.getElementById("menuLogo");
    const menuLogoTexto = document.getElementById("menuLogoTexto");
    const menuLogoImg = document.getElementById("menuLogoImg");
    menuLogoTexto.textContent = dataMenu.nombre || "Mi Web";
    if (dataMenu.logo) {
        menuLogoImg.style.display = "none";
        const iconoLogo = document.createElement("i");
        iconoLogo.className = dataMenu.logo;
        iconoLogo.style.fontSize = "20px";
        iconoLogo.style.marginRight = "8px";
        menuLogo.prepend(iconoLogo);
    }
    const menuOpciones = document.getElementById("menuOpciones");
    menuOpciones.innerHTML = "";
    dataMenu.paginas.forEach((pagina, index) => {
        const li = document.createElement("li");
        const link = document.createElement("a");
        const numeroPestana = index + 1;
        link.textContent = pagina;
        link.href = `plataforma_dinamica.html?pestana=${numeroPestana}`;
        link.target = "_blank";
        li.appendChild(link);
        menuOpciones.appendChild(li);
    });
    if (dataMenu.submenus && dataMenu.submenus.length > 0) {
        const submenuData = dataMenu.submenus[0];
        const liSubmenu = document.createElement("li");
        liSubmenu.className = "submenu";
        liSubmenu.innerHTML = `
            <button class="submenu-btn">
                ${submenuData.nombre}
                <i class="fa-solid fa-chevron-down"></i>
            </button>
            <ul class="submenu-lista"></ul>
        `;
        const listaSubmenu = liSubmenu.querySelector(".submenu-lista");
        let offset = dataMenu.paginas.length;
        submenuData.paginas.forEach((pagina, index) => {
            const li = document.createElement("li");
            const link = document.createElement("a");
            const numeroPestana = offset + index + 1;
            link.textContent = pagina;
            link.href = `plataforma_dinamica.html?pestana=${numeroPestana}`;
            link.target = "_blank";
            li.appendChild(link);
            listaSubmenu.appendChild(li);
        });
        menuOpciones.appendChild(liSubmenu);
        const btnSubmenu = liSubmenu.querySelector(".submenu-btn");
        btnSubmenu.addEventListener("click", (e) => {
            e.stopPropagation();
            listaSubmenu.style.display =
                listaSubmenu.style.display === "block" ? "none" : "block";
        });
        document.addEventListener("click", (e) => {
            if (!e.target.closest(".submenu")) {
                listaSubmenu.style.display = "none";
            }
        });
    }
    const menuIconos = document.getElementById("menuIconos");
    menuIconos.innerHTML = "";
    dataMenu.iconos.forEach(ic => {
        const icono = document.createElement("i");
        icono.className = ic;
        icono.style.marginLeft = "10px";
        menuIconos.appendChild(icono);
    });
    const params = new URLSearchParams(window.location.search);
    const pestana = params.get("pestana");
    const contenidoBase = document.getElementById("contenidoBase");
    const contenedor = document.getElementById("contenidoPlataforma");
    if (!pestana || pestana === "1") {
        contenidoBase.style.display = "block";
        contenedor.innerHTML = "";
        return;
    }
    contenidoBase.style.display = "none";
    if (CONTENIDOS_PESTANAS[pestana]) {
        contenedor.innerHTML = CONTENIDOS_PESTANAS[pestana];
        return;
    }
    fetch(`pages/pestana_${pestana}.html`)
        .then(res => res.ok ? res.text() : null)
        .then(html => {
            contenedor.innerHTML = html || `
                <section class="bloque">
                    <h2>Contenido no disponible</h2>
                </section>
            `;
        })
        .catch(() => {
            contenedor.innerHTML = `
                <section class="bloque">
                    <h2>Error al cargar contenido</h2>
                </section>
            `;
        });
});
//-------------------------------------//
//--|funcionalidad_carrusel_dinamico|--//
//-------------------------------------//
function cargarCarruselDinamico() {
    const data = JSON.parse(localStorage.getItem("carrusel_dinamico"));
    if (!data || !Array.isArray(data.imagenes) || data.imagenes.length === 0) {
        console.warn("❌ No hay datos de carrusel dinámico");
        return;
    }
    const contenedor = document.getElementById("carrusel-contenedor");
    const btnPrev = document.getElementById("btn-prev");
    const btnNext = document.getElementById("btn-next");
    const indicadoresCont = document.getElementById("indicadores");
    let indexActual = 0;
    let autoplayId = null;
    contenedor.innerHTML = "";
    indicadoresCont.innerHTML = "";
    data.imagenes.forEach((src, i) => {
        const img = document.createElement("img");
        img.src = src;
        img.className = "carrusel-item";
        if (i === 0) img.classList.add("activo");
        contenedor.appendChild(img);
    });
    const items = contenedor.querySelectorAll(".carrusel-item");
    if (!data.controladores) {
        btnPrev.style.display = "none";
        btnNext.style.display = "none";
    } else {
        btnPrev.style.display = "";
        btnNext.style.display = "";
    }
    if (data.indicadores) {
        data.imagenes.forEach((_, i) => {
            const dot = document.createElement("span");
            dot.className = "indicador";
            if (i === 0) dot.classList.add("activo");
            dot.addEventListener("click", () => {
                indexActual = i;
                mostrar(indexActual);
                reiniciarAutoplay();
            });
            indicadoresCont.appendChild(dot);
        });
        indicadoresCont.style.display = "flex";
    } else {
        indicadoresCont.style.display = "none";
    }
    function mostrar(index) {
        items.forEach(item => item.classList.remove("activo"));
        items[index].classList.add("activo");
        indicadoresCont
            .querySelectorAll(".indicador")
            .forEach((dot, i) =>
                dot.classList.toggle("activo", i === index)
            );
    }
    btnNext.onclick = () => {
        indexActual = (indexActual + 1) % items.length;
        mostrar(indexActual);
        reiniciarAutoplay();
    };
    btnPrev.onclick = () => {
        indexActual = (indexActual - 1 + items.length) % items.length;
        mostrar(indexActual);
        reiniciarAutoplay();
    };
    function iniciarAutoplay() {
        if (!data.automatico || items.length <= 1 || !data.tiempo) return;
        autoplayId = setInterval(() => {
            indexActual = (indexActual + 1) % items.length;
            mostrar(indexActual);
        }, data.tiempo);
    }
    function reiniciarAutoplay() {
        clearInterval(autoplayId);
        iniciarAutoplay();
    }
    iniciarAutoplay();
}
document.addEventListener("DOMContentLoaded", cargarCarruselDinamico);
window.addEventListener("carruselActualizado", cargarCarruselDinamico);
//-----------------------------------------------//
//--|funcionalidad_contenido_sobre_mi_dinamico|--//
//-----------------------------------------------//
document.addEventListener("DOMContentLoaded", () => {
    const datosGuardados = JSON.parse(localStorage.getItem("contenido_publicado"));
    if (!datosGuardados || !datosGuardados.contenido1) return; // solo cargar contenido1
    renderizarContenido1(datosGuardados.contenido1);
});
//-------------------------------------//
//--|datos_a_recibir_del_contenido_1|--//
//-------------------------------------//
function renderizarContenido1(datos) {
    const imagen    = document.getElementById("imagenSobreMi");
    const titulo    = document.getElementById("tituloSobreMi");
    const parrafo   = document.getElementById("parrafoSobreMi");
    const subtitulo = document.getElementById("subtituloSobreMi");
    //--------------------------//
    //--|dectectando_el_texto|--//
    //--------------------------//
    titulo.innerHTML    = datos.titulo || "";
    parrafo.innerHTML   = datos.parrafo || "";
    subtitulo.innerHTML = datos.subtitulo || "";
    //----------------------------//
    //--|dectectando_el_estilos|--//
    //----------------------------//
    if (datos.estilos) {
        Object.assign(titulo.style, datos.estilos.titulo || {});
        Object.assign(parrafo.style, datos.estilos.parrafo || {});
        Object.assign(subtitulo.style, datos.estilos.subtitulo || {});
    }
    //---------------------------//
    //--|dectectando_la_imagen|--//
    //---------------------------//
    if (datos.imagen) {
        imagen.innerHTML = `<img src="${datos.imagen}" style="width:100%;height:100%;object-fit:cover;">`;
    } else {
        imagen.innerHTML = "";
    }
    //----------------------------//
    //--|dectectando_los_iconos|--//
    //----------------------------//
    if (Array.isArray(datos.iconos)) {
        datos.iconos.forEach((src, index) => {
            const span = document.getElementById(`icono${index + 1}`);
            if (span && src) {
                span.innerHTML = `<img src="${src}" style="width:100%;height:100%;object-fit:contain;">`;
            }
        });
    }
}
//-----------------------------------------------------------//
//--|funcionalidad_contenido_proyectos_realizados_dinamico|--//
//-----------------------------------------------------------//
document.addEventListener("DOMContentLoaded", () => {
    //-------------------------------------//
    //--|datos_a_recibir_del_contenido_4|--//
    //-------------------------------------//
    const storage = JSON.parse(
        localStorage.getItem("contenido_publicado")
    );
    if (!storage || !storage.contenido4) return;
    const datos = storage.contenido4;
    //-----------------------//
    //--|detectando_titulo|--//
    //-----------------------//
    const titulo = document.getElementById("tituloProyectos");
    if (titulo) {
        titulo.innerHTML = datos.titulo;
    }
    //---------------------------//
    //--|detectando_subtitulos|--//
    //---------------------------//
    datos.subtitulos.forEach((sub, index) => {
        const subEl = document.getElementById(
            `subtituloProyectos${index + 1}`
        );
        if (subEl) {
            subEl.innerHTML = sub;
        }
    });
    //-----------------------------------//
    //--|detectando_imagenes_y_botones|--//
    //-----------------------------------//
    datos.imagenesBotones.forEach((item, index) => {
        const bloque = index < 4 ? 1 : 2;
        const posicion = (index % 4) + 1;
        const imgEl = document.getElementById(
            `imagen${bloque}-${posicion}`
        );
        const btnEl = document.getElementById(
            `boton${bloque}-${posicion}`
        );
        if (imgEl && item.imagen) {
            imgEl.innerHTML = `
                <img src="${item.imagen}"
                    style="width:100%;height:100%;object-fit:cover;">
            `;
        }
        if (btnEl) {
            btnEl.textContent = item.boton;
        }
    });
});