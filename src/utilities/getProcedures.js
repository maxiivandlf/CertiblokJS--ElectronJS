const { getConetion } = require('./dbconection');

async function dataProcedure() {
  const conx = await getConetion();
  const resultado = await conx.query(`SELECT * FROM procedure`);
  return resultado;
}

async function dataProcedureID(idProcedure) {
  const conx = await getConetion();
  const resultado = await conx.query(
    `SELECT * FROM procedure WHERE id_procedure = "${idProcedure}"`
  );
  return resultado;
}

module.exports = {
  dataProcedure,
  dataProcedureID,
};
