const certificate = document.getElementById('certificate');
const btnGenerar = document.getElementById('btnGenerar');

btnGenerar.addEventListener('click', (e) => {
  html2pdf()
    .set({
      margin: 0.5,
      filename: 'Certificado',
      image: {
        type: 'jpeg',
        quality: 1,
      },
      html2canvas: {
        scale: 1,
        letterRendering: true,
      },
      jsPDF: {
        unit: 'in',
        format: 'a4',
        orientation: 'landscape',
      },
    })
    .from(certificate)
    .save()
    .catch((err) => console.log(err));
});
