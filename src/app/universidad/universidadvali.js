const { ipcRenderer } = require('electron');
const SHA256 = require('crypto-js/sha256');

const seach__input = document.getElementById('seach__input');
const seach__btn = document.getElementById('seach__btn');
// const btn__validar = document.getElementById('btn__validar');
const btn__enviar = document.getElementById('btn__enviar');
const tableBody = document.getElementById('tableBody');

seach__btn.addEventListener('click', (e) => {
  e.preventDefault();
  if (seach__input.value == '') {
    console.log('Debe ingresar un numero de tramite');
  }
  ipcRenderer.send('getProcedureId', seach__input.value);
  ipcRenderer.on('idproced', (e, procedure) => {
    if (procedure.length !== 0) {
      tableBody.innerHTML = `<tr class="fila" >
      <td id="id">${procedure[0].id_procedure}</td>
      <td>${procedure[0].name}</td>
      <td>${procedure[0].lastName}</td>
      <td>${procedure[0].dni}</td>
      <td>${procedure[0].matricula}</td>
      <td>${procedure[0].carrera}</td>
      <td>${procedure[0].universidad}</td>
      <td>Pendiente</td>
      <td>
      <input class="btn__checkbox" id="btn__checkbox" type="checkbox"/>
      </td>
        </tr>`;
    }
  });
});

ipcRenderer.send('getProcedures');

ipcRenderer.on('dataProcedure', (e, procedure) => {
  procedure.forEach((procedure) => {
    tableBody.innerHTML += `<tr class="fila" >
    <td id="id">${procedure.id_procedure}</td>
    <td>${procedure.name}</td>
    <td>${procedure.lastName}</td>
    <td>${procedure.dni}</td>
    <td>${procedure.matricula}</td>
    <td>${procedure.carrera}</td>
    <td>${procedure.universidad}</td>
    <td>Pendiente</td>
      <td>

       
      </td>
    </tr>`;
  });
});

//Creacion de certificados render
let dataCertificate;

tableBody.addEventListener('click', (e) => {
  if (e.path[0].checked === true) {
    btn__enviar.disabled = false;

    const fila = e.target.parentNode.parentNode;
    const idFila = fila.children;

    let valores = Object.values(idFila);

    dataCertificate = {
      id_tramite: valores[0].innerHTML,
      nombreApellido: valores[1].innerHTML + ' ' + valores[2].innerHTML,
      dni: valores[3].innerHTML,
      matricula: valores[4].innerHTML,
      carrera: valores[5].innerHTML,
      universidad: valores[6].innerHTML,
      state: valores[7].innerHTML,
      hash: null,
    };

    dataCertificate.hash = SHA256(
      JSON.stringify({ ...dataCertificate, hash: null })
    ).toString();
  } else {
    btn__enviar.disabled = true;
  }
});

btn__enviar.addEventListener('click', () => {
  ipcRenderer.send('createNewCertificate', dataCertificate);
});
