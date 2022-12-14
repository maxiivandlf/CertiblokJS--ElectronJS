const { ipcRenderer } = require('electron');

const btn__generarpdf = document.getElementById('btn__generarpdf');
const tabla = document.getElementById('tableBody');
const seach__input = document.getElementById('seach__input');
const seach__btn = document.getElementById('seach__btn');

// CARGAR TABLA CON DATOS CERTIFICADOS

ipcRenderer.send('getCertificates');
ipcRenderer.on('dataCertificate', (e, certificate) => {
  certificate.forEach((certificate) => {
    if (certificate.state === 'Aprobado') {
      tabla.innerHTML += `<tr class="fila" >
    <td id="id">${certificate.id_certificate}</td>
    <td>${certificate.nombreApellido}</td>
    <td>${certificate.state}</td>
    
    </tr>`;
    }
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
          <td id="id">${certificate[0].id_certificate}</td>
          <td>${certificate[0].nombreApellido}</td>
          <td>${certificate[0].state}</td>
          <td>
          <input class="btn__checkbox" id="btn__checkbox" type="checkbox"/>
          </td>
          </tr>`;
    }
  });
});

// Valida certificados seleccionados
let datacertificateChange = {};
tabla.addEventListener('click', (e) => {
  if (e.path[0].checked === true) {
    btn__generarpdf.disabled = false;

    const fila = e.target.parentNode.parentNode;
    const idFila = fila.children;

    let valores = Object.values(idFila);
    datacertificateChange = {
      id: valores[0].innerHTML,
      state: 'Sellado',
    };
    console.log(datacertificateChange);
  } else {
    btn__generarpdf.disabled = true;
  }
});

btn__generarpdf.addEventListener('click', (e) => {
  ipcRenderer.send('changeState', datacertificateChange);
  console.log('Se a Generado el PDF');
});
