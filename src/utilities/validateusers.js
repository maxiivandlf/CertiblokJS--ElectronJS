const { getConetion } = require('./dbconection');

async function userValidation(user) {
  const conx = await getConetion();

  const resultado = await conx.query(
    `SELECT * FROM users WHERE userName = "${user.userName}" AND password = "${user.userPassword}" AND typeUser = "${user.userCategory}" `
  );

  let valueValidation;
  let category;

  if (!Array.isArray(resultado) || resultado.length === 0) {
    valueValidation = false;
    category = false;
  } else {
    valueValidation = true;
    category = resultado[0].typeUser;
  }
  const res = {
    validate: valueValidation,
    cat: category,
  };
  return res;
}

module.exports = {
  userValidation,
};
