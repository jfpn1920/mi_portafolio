/* Página Proyectos: catálogo, buscador, filtros, paginación y proyectos destacados */

/* ===== Catálogo de proyectos (edita este arreglo) ===== */
const catalogo=[
 {cat:'lenguajes',logo:'📒',t:'Agenda de contactos',d:'Menú de 7 opciones para gestionar hasta 20 contactos.',tec:'PSeInt',url:'#'},
 {cat:'lenguajes',logo:'👨‍👩‍👧',t:'Ahorro familiar',d:'Registro y gestión de los ahorros de una familia.',tec:'PSeInt',url:'#'},
 {cat:'lenguajes',logo:'📅',t:'Ahorro mensual',d:'Control del ahorro por mes con monto, meta, método y estado.',tec:'PSeInt',url:'#'},
 {cat:'lenguajes',logo:'🗓️',t:'Ahorro semanal',d:'Seguimiento semanal de ahorros con meta y estado.',tec:'PSeInt',url:'#'},
 {cat:'lenguajes',logo:'⏰',t:'Alarma de actividades',d:'Registro de actividades con fecha, hora, lugar y prioridad.',tec:'PSeInt',url:'#'},
 {cat:'lenguajes',logo:'🎂',t:'Alarma de cumpleaños',d:'Registro de cumpleaños con fecha, parentesco y datos de contacto.',tec:'PSeInt',url:'#'},
 {cat:'lenguajes',logo:'🏖️',t:'Afluencia turística',d:'Menú de 7 opciones para registrar y consultar la afluencia de turistas.',tec:'Java',url:'#'},
 {cat:'lenguajes',logo:'🌱',t:'Agricultura hidropónica',d:'Gestión y monitoreo de cultivos hidropónicos.',tec:'Java',url:'#'},
 {cat:'web',logo:'🏛️',t:'Plataforma web gubernamental',d:'Colaboración en el sitio web de la Gobernación con chatbot integrado.',tec:'HTML · CSS · JavaScript · PHP',url:'#'},
 {cat:'web',logo:'🏥',t:'Página web DADIS',d:'Sitio web para el Departamento Administrativo Distrital de Salud.',tec:'Python',url:'#'},
 {cat:'web',logo:'🍔',t:'Plantilla de comida rápida',d:'Página para un negocio de comida rápida con 8 secciones.',tec:'HTML · CSS · JavaScript',url:'#'},
 {cat:'web',logo:'🏋️',t:'Aeróbicos Básicos',d:'Ejercicio de práctica frontend con páginas de rutinas.',tec:'HTML · CSS · JavaScript',url:'#'},
 {cat:'juegos',logo:'🏰',t:'Cartagena Retro',d:'Videojuego educativo retro sobre la historia de Cartagena de Indias.',tec:'GameMaker Studio 2 · Piskel',url:'#'}
];
let cat='todos',tipoSel='todos',tecSel='todos';
let pag=1,ultima='';
/* Tipo de cada proyecto (edítalo aquí) */
const TIPO_DE={'Agenda de contactos':'Consola','Ahorro familiar':'Consola','Ahorro mensual':'Consola','Ahorro semanal':'Consola','Alarma de actividades':'Consola','Alarma de cumpleaños':'Consola','Afluencia turística':'Consola','Agricultura hidropónica':'Panel de control','Plataforma web gubernamental':'Sitio web','Página web DADIS':'Sitio web','Plantilla de comida rápida':'Sitio web','Aeróbicos Básicos':'Sitio web','Cartagena Retro':'Videojuego'};
catalogo.forEach(p=>p.tipo=TIPO_DE[p.t]||'Otro');
const nrm=s=>s.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'');
const etiq={lenguajes:'lenguajes de programacion',web:'desarrollo web',juegos:'desarrollo de juegos videojuego'};
const pl=document.getElementById('plista'),pb=document.getElementById('pbusca');
const chips=[...document.querySelectorAll('#ptipo option')],sel=document.getElementById('ptipo');
pl.insertAdjacentHTML('afterend','<div class="pager" id="ppag" role="navigation" aria-label="Paginación de proyectos"></div>');
const ppag=document.getElementById('ppag');
chips.forEach(c=>c.dataset.l=c.textContent.trim());
const TIPOS=[...new Set(catalogo.map(p=>p.tipo))];
/* Grupos del filtro Tecnología, en este orden */
const GRUPOS={'PSeInt':t=>t.includes('PSeInt'),'Python':t=>t.includes('Python'),'Java':t=>t.includes('Java'),'Visual Basic':t=>t.includes('Visual Basic'),'Frontend':t=>['HTML','CSS','JavaScript'].some(x=>t.includes(x)),'Backend':t=>['PHP','Python'].some(x=>t.includes(x)),'Videojuegos':(t,p)=>p.cat==='juegos'};
const TECS=Object.keys(GRUPOS);
const gruposDe=p=>{const t=p.tec.split(' · ');return TECS.filter(n=>GRUPOS[n](t,p))};
const selTipo=document.getElementById('ptp'),selTec=document.getElementById('ptec');
function llenar(el,todos,lista,base,get,val){
  el.innerHTML='<option value="todos">'+todos+'</option>'+lista.map(v=>'<option value="'+v+'">'+v+'</option>').join('');
  el.value=val;
}
const heno=catalogo.map(p=>nrm([p.t,p.d,p.tec,etiq[p.cat],p.tipo,gruposDe(p).join(' ')].join(' ')));
function limpiar(){pb.value='';cat='todos';tipoSel='todos';tecSel='todos';pintar()}
function pintar(){
  const pal=nrm(pb.value).split(/[\s·,]+/).filter(Boolean);
  const toks=p=>p.tec.split(' · ');
  const ok=(p,i,ig)=>pal.every(w=>heno[i].includes(w))&&(ig==='cat'||cat==='todos'||p.cat===cat)&&(ig==='tipo'||tipoSel==='todos'||p.tipo===tipoSel)&&(ig==='tec'||tecSel==='todos'||gruposDe(p).includes(tecSel));
  const cuenta=ig=>catalogo.filter((p,i)=>ok(p,i,ig));
  const r=cuenta(null),cC=cuenta('cat');
  const firma=[pb.value,cat,tipoSel,tecSel].join('|');if(firma!==ultima){pag=1;ultima=firma}
  const PAG=8,np=Math.max(1,Math.ceil(r.length/PAG));pag=Math.min(pag,np);
  chips.forEach(c=>{const k=c.dataset.c;c.textContent=c.dataset.l});sel.value=cat;
  ppag.innerHTML=np>1?'<button class="pg" data-p="'+(pag-1)+'"'+(pag===1?' disabled':'')+' aria-label="Página anterior">‹</button>'+Array.from({length:np},(_,k)=>'<button class="pg'+(k+1===pag?' on':'')+'" data-p="'+(k+1)+'"'+(k+1===pag?' aria-current="page"':'')+'>'+(k+1)+'</button>').join('')+'<button class="pg" data-p="'+(pag+1)+'"'+(pag===np?' disabled':'')+' aria-label="Página siguiente">›</button>':'';
  llenar(selTipo,'Todos los tipos',TIPOS,cuenta('tipo'),p=>[p.tipo],tipoSel);
  llenar(selTec,'Todas las tecnologías',TECS,cuenta('tec'),gruposDe,tecSel);
  const activo=pal.length>0||cat!=='todos'||tipoSel!=='todos'||tecSel!=='todos';
  pl.innerHTML=r.length?r.slice((pag-1)*PAG,pag*PAG).map(p=>`<div class="card pr"><div class="pr-top" aria-hidden="true">${p.logo}</div><div class="pr-t"><h3>${p.t}</h3></div><div class="pr-b"><b>Detalles del proyecto</b><ul><li>${p.d}</li><li>Tecnología: ${p.tec}</li></ul><a class="btn" href="${p.url}">Ver proyecto</a></div></div>`).join(''):'<div class="vacio"><p>No se encontraron proyectos con esa búsqueda.</p><button class="btn" data-a="limpiar" type="button">Limpiar filtros</button></div>';
}
pb.addEventListener('input',pintar);
pb.addEventListener('keydown',e=>{if(e.key==='Enter')e.preventDefault()});
sel.addEventListener('change',()=>{cat=sel.value;pintar()});
selTipo.addEventListener('change',()=>{tipoSel=selTipo.value;pintar()});
selTec.addEventListener('change',()=>{tecSel=selTec.value;pintar()});
pl.addEventListener('click',e=>{if(e.target.closest('button[data-a]'))limpiar()});
ppag.addEventListener('click',e=>{const b=e.target.closest('button[data-p]');if(!b||b.disabled)return;pag=+b.dataset.p;pintar();document.querySelector('.fbar').scrollIntoView({behavior:'smooth',block:'start'})});
/* ===== Filtros que llegan por el enlace (por ejemplo proyectos.html?cat=web o ?tec=Python) ===== */
{
  const q=new URLSearchParams(location.search);
  if(q.get('cat')&&['lenguajes','web','juegos'].includes(q.get('cat')))cat=q.get('cat');
  if(q.get('tec')&&TECS.includes(q.get('tec')))tecSel=q.get('tec');
}
pintar();

/* ===== Proyectos destacados (7) ===== */
const destacados=[ /* un proyecto por tipo; cambia t por el título de tu catálogo */
 {rol:'PSeInt',t:'Agenda de contactos'},
 {rol:'Python',t:'Página web DADIS'},
 {rol:'Java',t:'Agricultura hidropónica'},
 {rol:'Visual Basic',t:'Proyecto por agregar',logo:'🧩',tec:'Visual Basic',url:'#'},
 {rol:'Frontend',t:'Plantilla de comida rápida'},
 {rol:'Backend',t:'Plataforma web gubernamental'},
 {rol:'Videojuego',t:'Cartagena Retro'}
];
document.getElementById('pdestacados').innerHTML=destacados.map(d=>({...catalogo.find(p=>p.t===d.t),...d})).map(p=>`<div class="pdest"><span class="pico">${p.logo}</span><div><b>${p.t}</b><small>${p.rol}</small></div><a class="btn" href="${p.url}">Ver</a></div>`).join('');

