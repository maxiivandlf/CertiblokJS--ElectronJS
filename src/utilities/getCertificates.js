const { getConetion } = require('./dbconection');

async function dataCertificate() {
  const conx = await getConetion();
  const resultado = await conx.query(`SELECT * FROM certificate`);
  return resultado;
}

async function dataCertificateID(idCertificate) {
  const conx = await getConetion();
  const resultado = await conx.query(
    `SELECT * FROM certificate WHERE id_certificate = "${idCertificate}"`
  );
  return resultado;
}

module.exports = {
  dataCertificate,
  dataCertificateID,
};
