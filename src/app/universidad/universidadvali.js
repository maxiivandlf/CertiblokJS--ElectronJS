const { ipcRenderer } = require('electron');
const Blockchain = require('../../utilities/blockchain');
const Block = require('../../utilities/block');

const seach__input = document.getElementById('seach__input');
const seach__btn = document.getElementById('seach__btn');
const btn__validar = document.getElementById('btn__validar');
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

let dataTramites = ipcRenderer.on('dataProcedure', (e, procedure) => {
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
  return procedure;
});

// btn__validar.addEventListener('click', (e) => {});

tableBody.addEventListener('click', (e) => {
  if (e.path[0].checked === true) {
    // const fila = e.target.parentNode.parentNode;
    // idFila = parseInt(fila.children[0].innerHTML);
    // console.log(idFila);

    btn__enviar.removeAttribute('disabled');
    btn__enviar.addEventListener('click', (e) => {
      let idPrecedure = tableBody.getElementsByTagName('td')[0].innerText;

      async function run() {
        const blockchain = new Blockchain();

        const block1 = new Block({ nro_tramite: `${idPrecedure}` });

        await blockchain.addBlock(block1);

        const datablock = blockchain.returnData();

        datablock.forEach((blockdata) => {
          console.log('Los datos de los bloques son ', blockdata.hash);
        });
      }

      run();
    });
  } else {
    btn__enviar.setAttribute('disabled');
  }
});
