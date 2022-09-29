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

async function changeState(dataChange) {
  const conx = await getConetion();
  await conx.query(
    `UPDATE certificate SET state = "${dataChange.state}" WHERE id_certificate = ${dataChange.id}`
  );
}

module.exports = {
  dataCertificate,
  dataCertificateID,
  changeState,
};
