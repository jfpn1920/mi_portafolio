//-----------------------------//
//--|contenidos_por_pestañas|--//
//-----------------------------//
const CONTENIDOS_PESTANAS = {
    1: `
        <section class="bloque">
            <h2>Pestaña 1</h2>
            <p>Contenido principal de la plataforma.</p>
        </section>
    `,
    2: `
        <section class="bloque">
            <h2>Pestaña 2</h2>
            <p>Servicios ofrecidos.</p>
        </section>
    `,
    3: `
        <section class="bloque">
            <h2>Pestaña 3</h2>
            <p>Proyectos desarrollados.</p>
        </section>
    `,
    4: `
        <section class="bloque">
            <h2>Pestaña 4</h2>
            <p>Equipo de trabajo.</p>
        </section>
    `,
    5: `
        <section class="bloque">
            <h2>Pestaña 5</h2>
            <p>Blog y noticias.</p>
        </section>
    `,
    6: `
        <section class="bloque">
            <h2>Pestaña 6</h2>
            <p>Formulario de contacto.</p>
        </section>
    `,
    7: `
        <section class="bloque">
            <h2>Pestaña 7</h2>
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
        <section class="bloque">
            <h2>Contenido no disponible</h2>
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
        link.addEventListener("click", () => {
            localStorage.setItem("pestana_activa", numeroPestana);
        });
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
            link.addEventListener("click", () => {
                localStorage.setItem("pestana_activa", numeroPestana);
            });
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
});