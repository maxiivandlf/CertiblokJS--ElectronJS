const { ipcRenderer } = require('electron');

const tabla = document.getElementById('tableBody');
const btn_validar = document.getElementById('btn_validar');
const seach__input = document.getElementById('seach__input');
const seach__btn = document.getElementById('seach__btn');

// CARGAR TABLA CON DATOS CERTIFICADOS

ipcRenderer.send('getCertificates');
ipcRenderer.on('dataCertificate', (e, certificate) => {
  certificate.forEach((certificate) => {
    tabla.innerHTML += `<tr class="fila" >
    <td id="id">${certificate.id_certificate}</td>
    <td>${certificate.nombreApellido}</td>
    <td>${certificate.state}</td>
    <td>
      <input class="btn__checkbox" id="checkbox__confecciones" type="checkbox"/>
      </td>
    </tr>`;
  });
});

//Carga certificados por ID
seach__btn.addEventListener('click', (e) => {
  e.preventDefault();
  if (seach__input.value == '') {
    console.log('Debe ingresar un numero de tramite');
  }
  ipcRenderer.send('getCertificateId', seach__input.value);
  ipcRenderer.on('idCerti', (e, certificate) => {
    if (certificate.length !== 0) {
      tabla.innerHTML = `<tr class="fila" >
        <td id="id">${certificate.id_certificate}</td>
        <td>${certificate.nombreApellido}</td>
        <td>${certificate.state}</td>
        <td>
        <input class="btn__checkbox" id="btn__checkbox" type="checkbox"/>
        </td>
        </tr>`;
    }
  });
});
// Valida certificados seleccionados
tabla.addEventListener('click', (e) => {
  if (e.target && e.target.tagName === 'INPUT') {
    const fila = e.target.parentNode.parentNode;
    const idFila = fila.children[0].innerHTML;
    console.log(`N° de tramite seleccionado es: ${idFila}`);
  }
});

btn_validar.addEventListener('click', (e) => {});
