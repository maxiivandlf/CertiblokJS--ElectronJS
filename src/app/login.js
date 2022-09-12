const formLogin = document.getElementById('formLogin');
const usuario = document.getElementById('usuario');
const contraseña = document.getElementById('contraseña');
const categoria = document.getElementById('categoria');
const btnIngesar = document.getElementById('btnIngesar');

formLogin.addEventListener('submit', (e) => {
  e.preventDefault();
  if (categoria.value === 'universidad') {
    // location = './uni.html';
  } else if (categoria.value === 'ministerio') {
    // alert('HOLA MINISTERIO');
  } else {
    location = './layout_alumno/alumnosInicio.html';
  }
});
