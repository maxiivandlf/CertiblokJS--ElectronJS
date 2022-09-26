
const tabla = document.getElementById('tableBody');
const boton = document.getElementById('btn_validar');

tabla.addEventListener('click',(e) => {
  if (e.target && e.target.tagName === 'BUTTON') {
    const fila = e.target.parentNode.parentNode;
    const idFila = fila.children[0].innerHTML;
    alert(`N° de tramite seleccionado es: ${idFila}`);
  }
});

btn_validar.addEventListener('click',(e) => {
    window.location.href='ministeriolistasaprob.html'
});
