const mysql = require('promise-mysql');

const connection = mysql.createConnection({
  host: 'aws-sa-east-1.connect.psdb.cloud',
  user: 'whrkkn5a2ix0oxqocbsu',
  password: 'pscale_pw_IM9DmPYHDoamWCPqrERGHGWCnhKsfQB7CPvypoPWHcB',
  database: 'certiblockchain',
  ssl: true,
});

function getConetion() {
  return connection;
}

module.exports = {
  getConetion,
};
