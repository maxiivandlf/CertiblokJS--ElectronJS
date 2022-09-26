const { ipcRenderer } = require('electron/renderer');

const inputName = document.getElementById('name');
const inputLastName = document.getElementById('lastName');
const inputdni = document.getElementById('dni');
const inputEnrrollment = document.getElementById('enrollment');
const inputCareer = document.getElementById('career');
const inputUniversity = document.getElementById('university');
const btnEnviar = document.getElementById('enviar');

btnEnviar.addEventListener('click', (e) => {
  e.preventDefault();

  const dataNewTramite = {
    name: inputName.value,
    lastName: inputLastName.value,
    dni: inputdni.value,
    matricula: inputEnrrollment.value,
    carrera: inputCareer.value,
    universidad: inputUniversity.value,
  };

  console.log(dataNewTramite);

  ipcRenderer.send('newProcedure', dataNewTramite);
});
