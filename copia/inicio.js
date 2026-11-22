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
//----------------------------//
//--|funcionalidad_carrusel|--//
//----------------------------//
const slides = [...document.querySelectorAll('.slide')];
const dots = document.getElementById('dots');
const TIEMPO = 4000;
let i = 0;          
let t;              
slides.forEach((_, k) => {
    const b = document.createElement('button');
    b.setAttribute('aria-label', 'Imagen ' + (k + 1));
    b.onclick = () => { ir(k); auto(); };
    dots.appendChild(b);
});
function ir(n) {
    i = (n + slides.length) % slides.length;
    slides.forEach((s, k) => s.classList.toggle('on', k === i));
    [...dots.children].forEach((d, k) => d.classList.toggle('on', k === i));
}
function auto() {
    clearInterval(t);
    t = setInterval(() => ir(i + 1), TIEMPO);
}
document.getElementById('prev').onclick = () => { ir(i - 1); auto(); };
document.getElementById('next').onclick = () => { ir(i + 1); auto(); };
let x0 = null;
const carEl = document.querySelector('.car');
carEl.addEventListener('touchstart', e => { x0 = e.touches[0].clientX; }, { passive: true });
carEl.addEventListener('touchend', e => {
    if (x0 === null) return;
    const dx = e.changedTouches[0].clientX - x0;
    x0 = null;
    if (Math.abs(dx) > 40) { ir(dx < 0 ? i + 1 : i - 1); auto(); }
});
ir(0);
auto();
//------------------------------//
//--|funcionalidad_contactame|--//
//------------------------------//
const formulario = document.getElementById('form');
formulario.addEventListener('submit', e => {
    e.preventDefault();
    alert('Se acaba de enviar tu solicitud, pronto recibirás respuesta del ingeniero.');
    formulario.reset();
});