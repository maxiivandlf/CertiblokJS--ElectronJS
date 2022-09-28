const { ipcRenderer } = require('electron');

const btn__enviar__confeccion = document.getElementById(
  'btn__enviar__confeccion'
);
const tableBody = document.getElementById('tableBody');

// CARGAR TABLA CON DATOS CERTIFICADOS

ipcRenderer.send('getCertificates');
ipcRenderer.on('dataCertificate', (e, certificate) => {
  certificate.forEach((certificate) => {
    tableBody.innerHTML += `<tr class="fila" >
    <td id="id">${certificate.id_certificate}</td>
    <td>${certificate.nombreApellido}</td>
    <td>${certificate.state}</td>
    <td>
      <input class="btn__checkbox" id="checkbox__confecciones" type="checkbox"/>
      </td>
    </tr>`;
  });
});

tableBody.addEventListener('click', (e) => {
  if (e.target && e.target.tagName === 'INPUT') {
    const fila = e.target.parentNode.parentNode;
    if (
      e.path[0].checked === true &&
      fila.children[2].innerHTML === 'En proceso'
    ) {
      const idFila = fila.children[0].innerHTML;
      console.log(`N° de tramite seleccionado es: ${idFila}`);
    }
  }
});
