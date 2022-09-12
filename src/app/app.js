const tabla = document.getElementById('tableBody');
const buscarTramite = document.getElementById('buscarTramite');
const input_tramite = document.getElementById('input_tramite');

buscarTramite.addEventListener('click', (e) => {
  e.preventDefault();
  if (input_tramite.value == '') {
    alert('Debe ingresar un numero de tramite');
  } else {
    console.log(input_tramite.value);
  }
});

tabla.addEventListener('click', (e) => {
  if (e.target && e.target.tagName === 'BUTTON') {
    const fila = e.target.parentNode.parentNode;
    const idFila = fila.children[0].innerHTML;
    alert(`N° de tramite seleccionado es: ${idFila}`);
  }
});
