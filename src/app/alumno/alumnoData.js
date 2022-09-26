const { ipcRenderer } = require('electron');

const tabla = document.getElementById('tableBody');
const buscarTramite = document.getElementById('buscarTramite');
const input_tramite = document.getElementById('input_tramite');

buscarTramite.addEventListener('click', (e) => {
  e.preventDefault();
  if (input_tramite.value == '') {
    console.log('Debe ingresar un numero de tramite');
  }
  ipcRenderer.send('getProcedureId', input_tramite.value);
  ipcRenderer.on('idproced', (e, procedure) => {
    if (procedure.length !== 0) {
      tabla.innerHTML = `<tr class="fila" >
    <td id="id">${procedure[0].id_procedure}</td>
    <td>${procedure[0].name}</td>
    <td>${procedure[0].lastName}</td>
    <td>${procedure[0].dni}</td>
    <td>${procedure[0].matricula}</td>
    <td>${procedure[0].carrera}</td>
    <td>${procedure[0].universidad}</td>
    <td>Pendiente</td>
    <td>
        <button class="btn_view" id="btn_viewSeguimiento">
            View
          </button>
    </td>
      </tr>`;
    }
  });
});
ipcRenderer.send('getProcedures');
ipcRenderer.on('dataProcedure', (e, procedure) => {
  procedure.forEach((procedure) => {
    tabla.innerHTML += `<tr class="fila" >
    <td id="id">${procedure.id_procedure}</td>
    <td>${procedure.name}</td>
    <td>${procedure.lastName}</td>
    <td>${procedure.dni}</td>
    <td>${procedure.matricula}</td>
    <td>${procedure.carrera}</td>
    <td>${procedure.universidad}</td>
    <td>Pendiente</td>
      <td>
        <button class="btn_view" id="btn_viewSeguimiento">
          View
        </button>
      </td>
    </tr>`;
  });
});

tabla.addEventListener('click', (e) => {
  if (e.target && e.target.tagName === 'BUTTON') {
    const fila = e.target.parentNode.parentNode;
    const idFila = fila.children[0].innerHTML;
    console.log(`N° de tramite seleccionado es: ${idFila}`);
  }
});
