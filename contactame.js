/* Página Contáctame: el formulario abre el correo con el mensaje listo */

/* ===== Formulario de la página Contáctame: abre el correo con el mensaje listo ===== */
document.getElementById('form2').addEventListener('submit',e=>{
  e.preventDefault();
  const g=id=>document.getElementById(id).value.trim();
  const cuerpo='Nombre: '+g('c-n')+'\nEmail: '+g('c-e')+'\nTipo de consulta: '+g('c-t')+'\n\n'+g('c-d');
  const a=document.createElement('a');
  a.href='mailto:dacamo0502@gmail.com?subject='+encodeURIComponent(g('c-a'))+'&body='+encodeURIComponent(cuerpo);
  a.click();
  document.getElementById('cmsg').textContent='Se abrió tu correo con el mensaje listo. Si no se abrió, escríbeme a dacamo0502@gmail.com.';
});

