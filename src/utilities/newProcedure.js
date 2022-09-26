const { getConetion } = require('./dbconection');

async function newProcedure(procedure) {
  const conx = await getConetion();

  await conx.query('INSERT INTO procedure SET ?', procedure);
}

module.exports = {
  newProcedure,
};
