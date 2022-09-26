const { ipcRenderer } = require('electron');

const usuario = document.getElementById('usuario');
const contraseña = document.getElementById('contraseña');
const categoria = document.getElementById('categoria');
const btnIngesar = document.getElementById('btnIngesar');

const messgError = document.getElementById('messgError');

btnIngesar.addEventListener('click', (e) => {
  e.preventDefault();

  const User = {
    userName: usuario.value,
    userPassword: contraseña.value,
    userCategory: categoria.value,
  };

  ipcRenderer.send('comUser', User);
  ipcRenderer.on('validation', (e, validation) => {
    if (validation.validate === false) {
      messgError.style.opacity = 1;
    } else if (validation.cat === 'Alumno') {
      location = './layout_alumno/alumnosInicio.html';
    } else if (validation.cat === 'Universidad') {
      location = './layout_universidad/universidadInicio.html';
    } else if (validation.cat === 'Ministerio') {
      location = './layout_universidad/universidadInicio.html';
    }
  });

  // if (categoria.value === 'universidad') {
  //   ;
  // } else if (categoria.value === 'ministerio') {
  //   location = './layoutministerio/ministerioInicio.html';
  // } else {
  //   location = './layout_alumno/alumnosInicio.html';
  // }
});
