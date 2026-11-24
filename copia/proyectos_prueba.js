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
    var listaLenguajes = document.getElementById('plista-lenguajes');
    function normalizar(texto) {
        return texto.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').trim();
    }
    //-----------------------//
    //--|barra_de_busqueda|--//
    //-----------------------//
    function buscar() {
        var texto = normalizar(busca.value);
        var html = '';
        proyectos.forEach(function (p) {
            if (normalizar(p.nombre).indexOf(texto) !== -1) {
                html += crearTarjeta(p);
            }
        });
        if (html === '') {
            html = '<p class="pvacio">No se encontraron proyectos.</p>';
        }
        lista.innerHTML = html;
    }
    //---------------------------------------//
    //--|mostrando_contenido_en_categorias|--//
    //---------------------------------------//
    function cambiarCategoria() {
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
        } else {
            lista.style.display = 'grid';
            listaLenguajes.style.display = 'none';
        }
    }
    busca.addEventListener('input', buscar);
    selCat.addEventListener('change', cambiarCategoria);
    cambiarCategoria();
    buscar();
});