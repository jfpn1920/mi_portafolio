/* Código compartido por todas las páginas: modo claro/oscuro, barra superior y menú móvil */

/* ===== Barra superior: se mide su alto para que no tape los títulos al ir a una sección ===== */
const barra=document.querySelector('nav');
const medirBarra=()=>document.documentElement.style.setProperty('--navh',barra.offsetHeight+'px');
medirBarra();addEventListener('resize',medirBarra);new ResizeObserver(medirBarra).observe(barra);

/* ===== Modo claro / oscuro ===== */
const raiz=document.documentElement,btnT=document.getElementById('tema');
let tema;try{tema=localStorage.getItem('tema')}catch(e){}
if(!tema)tema=matchMedia('(prefers-color-scheme:dark)').matches?'dark':'light';
function aplicar(){raiz.dataset.theme=tema;btnT.setAttribute('aria-label',tema==='dark'?'Cambiar a modo claro':'Cambiar a modo oscuro')}
btnT.onclick=()=>{tema=tema==='dark'?'light':'dark';try{localStorage.setItem('tema',tema)}catch(e){}aplicar()};
aplicar();


/* ===== Menú móvil y carrusel táctil ===== */
const btnMenu=document.getElementById('menu');
function menu(abrir){barra.classList.toggle('open',abrir);btnMenu.setAttribute('aria-expanded',abrir);btnMenu.setAttribute('aria-label',abrir?'Cerrar menú':'Abrir menú')}
btnMenu.onclick=()=>menu(!barra.classList.contains('open'));
barra.addEventListener('click',e=>{if(e.target.closest('ul a'))menu(false)});
addEventListener('keydown',e=>{if(e.key==='Escape')menu(false)});
