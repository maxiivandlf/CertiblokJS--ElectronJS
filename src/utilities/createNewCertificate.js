const { getConetion } = require('./dbconection');

async function newCertificate(certificate) {
  const conx = await getConetion();

  await conx.query('INSERT INTO certificate SET ?', certificate);
}

module.exports = {
  newCertificate,
};
