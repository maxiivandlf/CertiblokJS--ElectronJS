const { ipcRenderer } = require('electron');

const tabla = document.getElementById('tableBody');

// CARGAR TABLA CON DATOS CERTIFICADOS

ipcRenderer.send('getCertificates');
ipcRenderer.on('dataCertificate', (e, certificate) => {
  certificate.forEach((certificate) => {
    if (certificate.state === 'Emitido') {
      tabla.innerHTML += `<tr class="fila" >
    <td id="id">${certificate.id_certificate}</td>
    <td>${certificate.nombreApellido}</td>
    <td>${certificate.dni}</td>
    <td>${certificate.matricula}</td>
    <td>${certificate.carrera}</td>
    <td>${certificate.universidad}</td>
    <td>${certificate.state}</td>
    
    </tr>`;
    }
  });
});
