//--------------------------------------//
//--|funcionalidad_menu_de_navegacion|--//
//--------------------------------------//
const barra = document.querySelector('nav');
const medirBarra = () => document.documentElement.style.setProperty('--navh', barra.offsetHeight + 'px');
medirBarra();
addEventListener('resize', medirBarra);
new ResizeObserver(medirBarra).observe(barra);
const raiz = document.documentElement;
const btnTema = document.getElementById('tema');
let tema;
try { tema = localStorage.getItem('tema'); } catch (e) {}
if (!tema) tema = matchMedia('(prefers-color-scheme:dark)').matches ? 'dark' : 'light';
function aplicarTema() {
    raiz.dataset.theme = tema;
    btnTema.setAttribute('aria-label', tema === 'dark' ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro');
}
btnTema.onclick = () => {
    tema = tema === 'dark' ? 'light' : 'dark';
    try { localStorage.setItem('tema', tema); } catch (e) {}
    aplicarTema();
};
aplicarTema();
const btnMenu = document.getElementById('menu');
function menu(abrir) {
    barra.classList.toggle('open', abrir);
    btnMenu.setAttribute('aria-expanded', abrir);
    btnMenu.setAttribute('aria-label', abrir ? 'Cerrar menú' : 'Abrir menú');
}
btnMenu.onclick = () => menu(!barra.classList.contains('open'));                      
barra.addEventListener('click', e => { if (e.target.closest('ul a')) menu(false); }); 
addEventListener('keydown', e => { if (e.key === 'Escape') menu(false); });
//-------------------------------------//
//--|funcionalidad_filtros_proyectos|--//
//-------------------------------------//
document.addEventListener('DOMContentLoaded', function () {
    var busca = document.getElementById('pbusca');
    var lista = document.getElementById('plista');
    var selCat = document.getElementById('ptipo');
    var selTipo = document.getElementById('ptp');
    var selTec = document.getElementById('ptec');
    var listaLenguajes = document.getElementById('plista-lenguajes');
    function normalizar(texto) {
        return texto.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').trim();
    }
    //-----------------------//
    //--|barra_de_busqueda|--//
    //-----------------------//
    function buscar() {
        var texto = normalizar(busca.value);
        var contenedor = lista;
        if (lista.style.display === 'none') {
            contenedor = listaLenguajes;
        }
        var mensajeViejo = contenedor.querySelector('.pmensaje');
        if (mensajeViejo) {
            mensajeViejo.remove();
        }
        var tarjetas = contenedor.querySelectorAll('.pc');
        var encontrados = 0;
        tarjetas.forEach(function (tarjeta) {
            var nombre = tarjeta.querySelector('h3').textContent;
            var tecnologia = tarjeta.querySelector('.tech b').textContent;
            var contenido = normalizar(nombre + ' ' + tecnologia);
            if (contenido.indexOf(texto) !== -1) {
                tarjeta.style.display = '';
                encontrados++;
            } else {
                tarjeta.style.display = 'none';
            }
        });
        if (tarjetas.length > 0 && encontrados === 0) {
            contenedor.insertAdjacentHTML('beforeend', '<p class="pvacio pmensaje">No se encontraron proyectos.</p>');
        }
    }
    //----------------//
    //--|categorias|--//
    //----------------//
    function cambiarCategoria() {
        selTipo.value = 'todos';
        selTec.value = 'todos';
        if (selCat.value === 'lenguajes') {
            var contenidoLenguajes = `
                <div class="card pc">
                    <div class="logo">📒</div>
                    <h3>Agenda de contactos</h3>
                    <div class="pc-body">
                        <h4>Detalles del proyecto</h4>
                        <ul>
                            <li>Menú de 7 opciones</li>
                            <li>Hasta 20 contactos</li>
                        </ul>
                        <div class="tech">
                            <small>Lenguaje de programación</small>
                            <b>PSeInt</b>
                        </div>
                        <a class="btn" href="#">Ver proyecto</a>
                    </div>
                </div>
                <div class="card pc">
                    <div class="logo">👨‍👩‍👧</div>
                    <h3>Ahorro familiar</h3>
                    <div class="pc-body">
                        <h4>Detalles del proyecto</h4>
                        <ul>
                            <li>Menú de 7 opciones</li>
                            <li>Hasta 20 contactos</li>
                        </ul>
                        <div class="tech">
                            <small>Lenguaje de programación</small>
                            <b>PSeInt</b>
                        </div>
                        <a class="btn" href="#">Ver proyecto</a>
                    </div>
                </div>
                <div class="card pc">
                    <div class="logo">🌱</div>
                    <h3>Agricultura hidropónica</h3>
                    <div class="pc-body">
                        <h4>Detalles del proyecto</h4>
                        <ul>
                            <li>Menú de 7 opciones</li>
                            <li>Hasta 20 contactos</li>
                        </ul>
                        <div class="tech">
                            <small>Lenguaje de programación</small>
                            <b>Java</b>
                        </div>
                        <a class="btn" href="#">Ver proyecto</a>
                    </div>
                </div>
                <div class="card pc">
                    <div class="logo">🌱</div>
                    <h3>Agricultura hidropónica</h3>
                    <div class="pc-body">
                        <h4>Detalles del proyecto</h4>
                        <ul>
                            <li>Menú de 7 opciones</li>
                            <li>Hasta 20 contactos</li>
                        </ul>
                        <div class="tech">
                            <small>Lenguaje de programación</small>
                            <b>Java</b>
                        </div>
                        <a class="btn" href="#">Ver proyecto</a>
                    </div>
                </div>
            `;
            listaLenguajes.innerHTML = contenidoLenguajes;
            lista.style.display = 'none';
            listaLenguajes.style.display = 'grid';
        }
        else if (selCat.value === 'web') {
            var contenidoWeb = `
                <div class="card pc">
                    <div class="logo">🏛️</div>
                    <h3>Plataforma web gubernamental</h3>
                    <div class="pc-body">
                        <h4>Detalles del proyecto</h4>
                        <ul>
                            <li>Diseño responsivo</li>
                            <li>Formularios de trámites</li>
                        </ul>
                        <div class="tech">
                            <small>Tecnologías</small>
                            <b>HTML, CSS, JavaScript</b>
                        </div>
                        <a class="btn" href="#">Ver proyecto</a>
                    </div>
                </div>
                <div class="card pc">
                    <div class="logo">🍔</div>
                    <h3>Plantilla de comida rápida</h3>
                    <div class="pc-body">
                        <h4>Detalles del proyecto</h4>
                        <ul>
                            <li>Menú de productos</li>
                            <li>Carrito de pedidos</li>
                        </ul>
                        <div class="tech">
                            <small>Tecnologías</small>
                            <b>HTML, CSS, JavaScript</b>
                        </div>
                        <a class="btn" href="#">Ver proyecto</a>
                    </div>
                </div>
                <div class="card pc">
                    <div class="logo">💼</div>
                    <h3>Mi portafolio</h3>
                    <div class="pc-body">
                        <h4>Detalles del proyecto</h4>
                        <ul>
                            <li>5 páginas enlazadas</li>
                            <li>Modo claro y oscuro</li>
                        </ul>
                        <div class="tech">
                            <small>Tecnologías</small>
                            <b>HTML, CSS, JavaScript</b>
                        </div>
                        <a class="btn" href="#">Ver proyecto</a>
                    </div>
                </div>
                <div class="card pc">
                    <div class="logo">🛒</div>
                    <h3>Tienda en línea</h3>
                    <div class="pc-body">
                        <h4>Detalles del proyecto</h4>
                        <ul>
                            <li>Catálogo de productos</li>
                            <li>Filtro por categoría</li>
                        </ul>
                        <div class="tech">
                            <small>Tecnologías</small>
                            <b>HTML, CSS, JavaScript</b>
                        </div>
                        <a class="btn" href="#">Ver proyecto</a>
                    </div>
                </div>
                <div class="card pc">
                    <div class="logo">📝</div>
                    <h3>Blog personal</h3>
                    <div class="pc-body">
                        <h4>Detalles del proyecto</h4>
                        <ul>
                            <li>Lista de artículos</li>
                            <li>Buscador de entradas</li>
                        </ul>
                        <div class="tech">
                            <small>Tecnologías</small>
                            <b>HTML, CSS, JavaScript</b>
                        </div>
                        <a class="btn" href="#">Ver proyecto</a>
                    </div>
                </div>
                <div class="card pc">
                    <div class="logo">🚀</div>
                    <h3>Landing page</h3>
                    <div class="pc-body">
                        <h4>Detalles del proyecto</h4>
                        <ul>
                            <li>Una sola página</li>
                            <li>Formulario de contacto</li>
                        </ul>
                        <div class="tech">
                            <small>Tecnologías</small>
                            <b>HTML, CSS, JavaScript</b>
                        </div>
                        <a class="btn" href="#">Ver proyecto</a>
                    </div>
                </div>
            `;
            listaLenguajes.innerHTML = contenidoWeb;
            lista.style.display = 'none';
            listaLenguajes.style.display = 'grid';
        }
        else if (selCat.value === 'juegos') {
            var contenidoJuegos = `
                <div class="card pc">
                    <div class="logo">🎮</div>
                    <h3>Cartagena Retro</h3>
                    <div class="pc-body">
                        <h4>Detalles del proyecto</h4>
                        <ul>
                            <li>Videojuego de estilo retro</li>
                            <li>Ambientado en Cartagena</li>
                        </ul>
                        <div class="tech">
                            <small>Motor de juego</small>
                            <b>Unity</b>
                        </div>
                        <a class="btn" href="#">Ver proyecto</a>
                    </div>
                </div>
                <div class="card pc">
                    <div class="logo">🐍</div>
                    <h3>Juego de la serpiente</h3>
                    <div class="pc-body">
                        <h4>Detalles del proyecto</h4>
                        <ul>
                            <li>Movimiento con el teclado</li>
                            <li>Puntaje en pantalla</li>
                        </ul>
                        <div class="tech">
                            <small>Tecnologías</small>
                            <b>HTML, CSS, JavaScript</b>
                        </div>
                        <a class="btn" href="#">Ver proyecto</a>
                    </div>
                </div>
                <div class="card pc">
                    <div class="logo">🧩</div>
                    <h3>Juego de memoria</h3>
                    <div class="pc-body">
                        <h4>Detalles del proyecto</h4>
                        <ul>
                            <li>Cartas con parejas</li>
                            <li>Contador de intentos</li>
                        </ul>
                        <div class="tech">
                            <small>Tecnologías</small>
                            <b>HTML, CSS, JavaScript</b>
                        </div>
                        <a class="btn" href="#">Ver proyecto</a>
                    </div>
                </div>
                <div class="card pc">
                    <div class="logo">🚗</div>
                    <h3>Carreras 2D</h3>
                    <div class="pc-body">
                        <h4>Detalles del proyecto</h4>
                        <ul>
                            <li>Esquiva obstáculos</li>
                            <li>Dificultad progresiva</li>
                        </ul>
                        <div class="tech">
                            <small>Motor de juego</small>
                            <b>Unity</b>
                        </div>
                        <a class="btn" href="#">Ver proyecto</a>
                    </div>
                </div>
                <div class="card pc">
                    <div class="logo">👾</div>
                    <h3>Plataformas 2D</h3>
                    <div class="pc-body">
                        <h4>Detalles del proyecto</h4>
                        <ul>
                            <li>Saltos y enemigos</li>
                            <li>3 niveles</li>
                        </ul>
                        <div class="tech">
                            <small>Motor de juego</small>
                            <b>Unity</b>
                        </div>
                        <a class="btn" href="#">Ver proyecto</a>
                    </div>
                </div>
            `;
            listaLenguajes.innerHTML = contenidoJuegos;
            lista.style.display = 'none';
            listaLenguajes.style.display = 'grid';
        }
        else {
            lista.style.display = 'grid';
            listaLenguajes.style.display = 'none';
        }
    }
    //----------------------//
    //--|tipo_de_proyecto|--//
    //----------------------//
    function cambiarTipo() {
        selTec.value = 'todos';
        if (selTipo.value === 'todos') {
            cambiarCategoria();
        }
        else if (selTipo.value === 'Consola') {
            var contenidoConsola = `
                <div class="card pc">
                    <div class="logo">📒</div>
                    <h3>Agenda de contactos</h3>
                    <div class="pc-body">
                        <h4>Detalles del proyecto</h4>
                        <ul>
                            <li>Menú de 7 opciones</li>
                            <li>Hasta 20 contactos</li>
                        </ul>
                        <div class="tech">
                            <small>Lenguaje de programación</small>
                            <b>PSeInt</b>
                        </div>
                        <a class="btn" href="#">Ver proyecto</a>
                    </div>
                </div>
                <div class="card pc">
                    <div class="logo">👨‍👩‍👧</div>
                    <h3>Ahorro familiar</h3>
                    <div class="pc-body">
                        <h4>Detalles del proyecto</h4>
                        <ul>
                            <li>Menú de 7 opciones</li>
                            <li>Hasta 20 contactos</li>
                        </ul>
                        <div class="tech">
                            <small>Lenguaje de programación</small>
                            <b>PSeInt</b>
                        </div>
                        <a class="btn" href="#">Ver proyecto</a>
                    </div>
                </div>
                <div class="card pc">
                    <div class="logo">🌱</div>
                    <h3>Agricultura hidropónica</h3>
                    <div class="pc-body">
                        <h4>Detalles del proyecto</h4>
                        <ul>
                            <li>Menú de 7 opciones</li>
                            <li>Hasta 20 contactos</li>
                        </ul>
                        <div class="tech">
                            <small>Lenguaje de programación</small>
                            <b>Java</b>
                        </div>
                        <a class="btn" href="#">Ver proyecto</a>
                    </div>
                </div>
            `;
            listaLenguajes.innerHTML = contenidoConsola;
            lista.style.display = 'none';
            listaLenguajes.style.display = 'grid';
        }
        else if (selTipo.value === 'Panel de control') {
            listaLenguajes.innerHTML = '<p class="pvacio">Aún no hay proyectos de este tipo.</p>';
            lista.style.display = 'none';
            listaLenguajes.style.display = 'grid';
        }
        else if (selTipo.value === 'Sitio web') {
            var contenidoSitioWeb = `
                <div class="card pc">
                    <div class="logo">🏛️</div>
                    <h3>Plataforma web gubernamental</h3>
                    <div class="pc-body">
                        <h4>Detalles del proyecto</h4>
                        <ul>
                            <li>Diseño responsivo</li>
                            <li>Formularios de trámites</li>
                        </ul>
                        <div class="tech">
                            <small>Tecnologías</small>
                            <b>HTML, CSS, JavaScript</b>
                        </div>
                        <a class="btn" href="#">Ver proyecto</a>
                    </div>
                </div>
                <div class="card pc">
                    <div class="logo">🍔</div>
                    <h3>Plantilla de comida rápida</h3>
                    <div class="pc-body">
                        <h4>Detalles del proyecto</h4>
                        <ul>
                            <li>Menú de productos</li>
                            <li>Carrito de pedidos</li>
                        </ul>
                        <div class="tech">
                            <small>Tecnologías</small>
                            <b>HTML, CSS, JavaScript</b>
                        </div>
                        <a class="btn" href="#">Ver proyecto</a>
                    </div>
                </div>
                <div class="card pc">
                    <div class="logo">💼</div>
                    <h3>Mi portafolio</h3>
                    <div class="pc-body">
                        <h4>Detalles del proyecto</h4>
                        <ul>
                            <li>5 páginas enlazadas</li>
                            <li>Modo claro y oscuro</li>
                        </ul>
                        <div class="tech">
                            <small>Tecnologías</small>
                            <b>HTML, CSS, JavaScript</b>
                        </div>
                        <a class="btn" href="#">Ver proyecto</a>
                    </div>
                </div>
            `;
            listaLenguajes.innerHTML = contenidoSitioWeb;
            lista.style.display = 'none';
            listaLenguajes.style.display = 'grid';
        }
        else if (selTipo.value === 'Videojuego') {
            var contenidoVideojuego = `
                <div class="card pc">
                    <div class="logo">🎮</div>
                    <h3>Cartagena Retro</h3>
                    <div class="pc-body">
                        <h4>Detalles del proyecto</h4>
                        <ul>
                            <li>Videojuego de estilo retro</li>
                            <li>Ambientado en Cartagena</li>
                        </ul>
                        <div class="tech">
                            <small>Motor de juego</small>
                            <b>Unity</b>
                        </div>
                        <a class="btn" href="#">Ver proyecto</a>
                    </div>
                </div>
                <div class="card pc">
                    <div class="logo">🐍</div>
                    <h3>Juego de la serpiente</h3>
                    <div class="pc-body">
                        <h4>Detalles del proyecto</h4>
                        <ul>
                            <li>Movimiento con el teclado</li>
                            <li>Puntaje en pantalla</li>
                        </ul>
                        <div class="tech">
                            <small>Tecnologías</small>
                            <b>HTML, CSS, JavaScript</b>
                        </div>
                        <a class="btn" href="#">Ver proyecto</a>
                    </div>
                </div>
                <div class="card pc">
                    <div class="logo">🧩</div>
                    <h3>Juego de memoria</h3>
                    <div class="pc-body">
                        <h4>Detalles del proyecto</h4>
                        <ul>
                            <li>Cartas con parejas</li>
                            <li>Contador de intentos</li>
                        </ul>
                        <div class="tech">
                            <small>Tecnologías</small>
                            <b>HTML, CSS, JavaScript</b>
                        </div>
                        <a class="btn" href="#">Ver proyecto</a>
                    </div>
                </div>
            `;
            listaLenguajes.innerHTML = contenidoVideojuego;
            lista.style.display = 'none';
            listaLenguajes.style.display = 'grid';
        }
    }
    //-----------------//
    //--|tecnologias|--//
    //-----------------//
    function cambiarTecnologia() {
        if (selTec.value === 'todos') {
            cambiarCategoria();
        }
        else if (selTec.value === 'PSeInt') {
            selTipo.value = 'todos';
            var contenidoPseint = `
                <div class="card pc">
                    <div class="logo">📒</div>
                    <h3>Agenda de contactos</h3>
                    <div class="pc-body">
                        <h4>Detalles del proyecto</h4>
                        <ul>
                            <li>Menú de 7 opciones</li>
                            <li>Hasta 20 contactos</li>
                        </ul>
                        <div class="tech">
                            <small>Lenguaje de programación</small>
                            <b>PSeInt</b>
                        </div>
                        <a class="btn" href="#">Ver proyecto</a>
                    </div>
                </div>
                <div class="card pc">
                    <div class="logo">👨‍👩‍👧</div>
                    <h3>Ahorro familiar</h3>
                    <div class="pc-body">
                        <h4>Detalles del proyecto</h4>
                        <ul>
                            <li>Menú de 7 opciones</li>
                            <li>Hasta 20 contactos</li>
                        </ul>
                        <div class="tech">
                            <small>Lenguaje de programación</small>
                            <b>PSeInt</b>
                        </div>
                        <a class="btn" href="#">Ver proyecto</a>
                    </div>
                </div>
                <div class="card pc">
                    <div class="logo">📅</div>
                    <h3>Ahorro mensual</h3>
                    <div class="pc-body">
                        <h4>Detalles del proyecto</h4>
                        <ul>
                            <li>Menú de 7 opciones</li>
                            <li>Hasta 20 contactos</li>
                        </ul>
                        <div class="tech">
                            <small>Lenguaje de programación</small>
                            <b>PSeInt</b>
                        </div>
                        <a class="btn" href="#">Ver proyecto</a>
                    </div>
                </div>
                <div class="card pc">
                    <div class="logo">🗓️</div>
                    <h3>Ahorro semanal</h3>
                    <div class="pc-body">
                        <h4>Detalles del proyecto</h4>
                        <ul>
                            <li>Menú de 7 opciones</li>
                            <li>Hasta 20 contactos</li>
                        </ul>
                        <div class="tech">
                            <small>Lenguaje de programación</small>
                            <b>PSeInt</b>
                        </div>
                        <a class="btn" href="#">Ver proyecto</a>
                    </div>
                </div>
            `;
            listaLenguajes.innerHTML = contenidoPseint;
            lista.style.display = 'none';
            listaLenguajes.style.display = 'grid';
        }
        else if (selTec.value === 'Python') {
            selTipo.value = 'todos';
            listaLenguajes.innerHTML = '<p class="pvacio">Aún no hay proyectos con esta tecnología.</p>';
            lista.style.display = 'none';
            listaLenguajes.style.display = 'grid';
        }
        else if (selTec.value === 'Java') {
            selTipo.value = 'todos';
            var contenidoJava = `
                <div class="card pc">
                    <div class="logo">🌱</div>
                    <h3>Agricultura hidropónica</h3>
                    <div class="pc-body">
                        <h4>Detalles del proyecto</h4>
                        <ul>
                            <li>Menú de 7 opciones</li>
                            <li>Hasta 20 contactos</li>
                        </ul>
                        <div class="tech">
                            <small>Lenguaje de programación</small>
                            <b>Java</b>
                        </div>
                        <a class="btn" href="#">Ver proyecto</a>
                    </div>
                </div>
            `;
            listaLenguajes.innerHTML = contenidoJava;
            lista.style.display = 'none';
            listaLenguajes.style.display = 'grid';
        }
        else if (selTec.value === 'Visual Basic') {
            selTipo.value = 'todos';
            listaLenguajes.innerHTML = '<p class="pvacio">Aún no hay proyectos con esta tecnología.</p>';
            lista.style.display = 'none';
            listaLenguajes.style.display = 'grid';
        }
        else if (selTec.value === 'Frontend') {
            selTipo.value = 'todos';
            var contenidoFrontend = `
                <div class="card pc">
                    <div class="logo">🏛️</div>
                    <h3>Plataforma web gubernamental</h3>
                    <div class="pc-body">
                        <h4>Detalles del proyecto</h4>
                        <ul>
                            <li>Diseño responsivo</li>
                            <li>Formularios de trámites</li>
                        </ul>
                        <div class="tech">
                            <small>Tecnologías</small>
                            <b>HTML, CSS, JavaScript</b>
                        </div>
                        <a class="btn" href="#">Ver proyecto</a>
                    </div>
                </div>
                <div class="card pc">
                    <div class="logo">🍔</div>
                    <h3>Plantilla de comida rápida</h3>
                    <div class="pc-body">
                        <h4>Detalles del proyecto</h4>
                        <ul>
                            <li>Menú de productos</li>
                            <li>Carrito de pedidos</li>
                        </ul>
                        <div class="tech">
                            <small>Tecnologías</small>
                            <b>HTML, CSS, JavaScript</b>
                        </div>
                        <a class="btn" href="#">Ver proyecto</a>
                    </div>
                </div>
                <div class="card pc">
                    <div class="logo">💼</div>
                    <h3>Mi portafolio</h3>
                    <div class="pc-body">
                        <h4>Detalles del proyecto</h4>
                        <ul>
                            <li>5 páginas enlazadas</li>
                            <li>Modo claro y oscuro</li>
                        </ul>
                        <div class="tech">
                            <small>Tecnologías</small>
                            <b>HTML, CSS, JavaScript</b>
                        </div>
                        <a class="btn" href="#">Ver proyecto</a>
                    </div>
                </div>
            `;
            listaLenguajes.innerHTML = contenidoFrontend;
            lista.style.display = 'none';
            listaLenguajes.style.display = 'grid';
        }
        else if (selTec.value === 'Backend') {
            selTipo.value = 'todos';
            listaLenguajes.innerHTML = '<p class="pvacio">Aún no hay proyectos con esta tecnología.</p>';
            lista.style.display = 'none';
            listaLenguajes.style.display = 'grid';
        }
        else if (selTec.value === 'Videojuegos') {
            selTipo.value = 'todos';
            var contenidoVideojuegos = `
                <div class="card pc">
                    <div class="logo">🎮</div>
                    <h3>Cartagena Retro</h3>
                    <div class="pc-body">
                        <h4>Detalles del proyecto</h4>
                        <ul>
                            <li>Videojuego de estilo retro</li>
                            <li>Ambientado en Cartagena</li>
                        </ul>
                        <div class="tech">
                            <small>Motor de juego</small>
                            <b>Unity</b>
                        </div>
                        <a class="btn" href="#">Ver proyecto</a>
                    </div>
                </div>
                <div class="card pc">
                    <div class="logo">🐍</div>
                    <h3>Juego de la serpiente</h3>
                    <div class="pc-body">
                        <h4>Detalles del proyecto</h4>
                        <ul>
                            <li>Movimiento con el teclado</li>
                            <li>Puntaje en pantalla</li>
                        </ul>
                        <div class="tech">
                            <small>Tecnologías</small>
                            <b>HTML, CSS, JavaScript</b>
                        </div>
                        <a class="btn" href="#">Ver proyecto</a>
                    </div>
                </div>
                <div class="card pc">
                    <div class="logo">🧩</div>
                    <h3>Juego de memoria</h3>
                    <div class="pc-body">
                        <h4>Detalles del proyecto</h4>
                        <ul>
                            <li>Cartas con parejas</li>
                            <li>Contador de intentos</li>
                        </ul>
                        <div class="tech">
                            <small>Tecnologías</small>
                            <b>HTML, CSS, JavaScript</b>
                        </div>
                        <a class="btn" href="#">Ver proyecto</a>
                    </div>
                </div>
            `;
            listaLenguajes.innerHTML = contenidoVideojuegos;
            lista.style.display = 'none';
            listaLenguajes.style.display = 'grid';
        }
    }
    busca.addEventListener('input', buscar);
    selCat.addEventListener('change', cambiarCategoria);
    selTipo.addEventListener('change', cambiarTipo);
    selTec.addEventListener('change', cambiarTecnologia);
    cambiarCategoria();
    buscar();
});
//----------------------------------------//
//--|funcionalidad_paginacion_proyectos|--//
//----------------------------------------//
document.addEventListener('DOMContentLoaded', function () {
    var lista = document.getElementById('plista');
    var listaLenguajes = document.getElementById('plista-lenguajes');
    var busca = document.getElementById('pbusca');
    var selCat = document.getElementById('ptipo');
    var selTipo = document.getElementById('ptp');
    var selTec = document.getElementById('ptec');
    var botones = document.querySelectorAll('#ppag .pag-num');
    var btnPrev = document.querySelector('#ppag .pag-prev');
    var btnNext = document.querySelector('#ppag .pag-next');
    var totalPaginas = botones.length;
    var paginaActual = 1;
    //------------------------------//
    //--|contenido_de_la_pagina_2|--//
    //------------------------------//
    var contenidoPagina2 = `
        <div class="card pc">
            <div class="logo">🏛️</div>
            <h3>Plataforma web gubernamental</h3>
            <div class="pc-body">
                <h4>Detalles del proyecto</h4>
                <ul>
                    <li>Diseño responsivo</li>
                    <li>Formularios de trámites</li>
                </ul>
                <div class="tech">
                    <small>Tecnologías</small>
                    <b>HTML, CSS, JavaScript</b>
                </div>
                <a class="btn" href="#">Ver proyecto</a>
            </div>
        </div>
        <div class="card pc">
            <div class="logo">🍔</div>
            <h3>Plantilla de comida rápida</h3>
            <div class="pc-body">
                <h4>Detalles del proyecto</h4>
                <ul>
                    <li>Menú de productos</li>
                    <li>Carrito de pedidos</li>
                </ul>
                <div class="tech">
                    <small>Tecnologías</small>
                    <b>HTML, CSS, JavaScript</b>
                </div>
                <a class="btn" href="#">Ver proyecto</a>
            </div>
        </div>
        <div class="card pc">
            <div class="logo">💼</div>
            <h3>Mi portafolio</h3>
            <div class="pc-body">
                <h4>Detalles del proyecto</h4>
                <ul>
                    <li>5 páginas enlazadas</li>
                    <li>Modo claro y oscuro</li>
                </ul>
                <div class="tech">
                    <small>Tecnologías</small>
                    <b>HTML, CSS, JavaScript</b>
                </div>
                <a class="btn" href="#">Ver proyecto</a>
            </div>
        </div>
        <div class="card pc">
            <div class="logo">🎮</div>
            <h3>Cartagena Retro</h3>
            <div class="pc-body">
                <h4>Detalles del proyecto</h4>
                <ul>
                    <li>Videojuego de estilo retro</li>
                    <li>Ambientado en Cartagena</li>
                </ul>
                <div class="tech">
                    <small>Motor de juego</small>
                    <b>Unity</b>
                </div>
                <a class="btn" href="#">Ver proyecto</a>
            </div>
        </div>
    `;
    //-----------------------------------//
    //--|marcar_la_pagina_seleccionada|--//
    //-----------------------------------//
    function marcarPagina(numero) {
        paginaActual = numero;
        botones.forEach(function (boton, i) {
            if (i + 1 === numero) {
                boton.classList.add('activo');
                boton.setAttribute('aria-current', 'page');
            } 
            else {
                boton.classList.remove('activo');
                boton.removeAttribute('aria-current');
            }
        });
        btnPrev.disabled = (numero === 1);
        btnNext.disabled = (numero === totalPaginas);
    }
    //-----------------------//
    //--|mostrar_contenido|--//
    //-----------------------//
    function irAPagina(numero) {
        if (numero === 1) {
            selCat.value = 'todos';
            selCat.dispatchEvent(new Event('change'));
        } 
        else if (numero === 2) {
            selCat.value = 'todos';
            selTipo.value = 'todos';
            selTec.value = 'todos';
            listaLenguajes.innerHTML = contenidoPagina2;
            lista.style.display = 'none';
            listaLenguajes.style.display = 'grid';
        }
        marcarPagina(numero);
        busca.dispatchEvent(new Event('input'));
    }
    //--------------------------//
    //--|clics_en_los_botones|--//
    //--------------------------//
    botones.forEach(function (boton, i) {
        boton.addEventListener('click', function () {
            irAPagina(i + 1);
        });
    });
    btnPrev.addEventListener('click', function () {
        if (paginaActual > 1) {
            irAPagina(paginaActual - 1);
        }
    });
    btnNext.addEventListener('click', function () {
        if (paginaActual < totalPaginas) {
            irAPagina(paginaActual + 1);
        }
    });
    selCat.addEventListener('change', function () { marcarPagina(1); });
    selTipo.addEventListener('change', function () { marcarPagina(1); });
    selTec.addEventListener('change', function () { marcarPagina(1); });
    marcarPagina(1);
});