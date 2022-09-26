const { getConetion } = require('./dbconection');

async function newUserdb(dataUser) {
  const conx = await getConetion();
  await conx.query('INSERT INTO users SET ?', dataUser);
}

module.exports = {
  newUserdb,
};
