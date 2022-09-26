const mysql = require('promise-mysql');

const connection = mysql.createConnection({
  host: /* 'localhost',*/ 'aws-sa-east-1.connect.psdb.cloud',
  user: /*'root', //*/ 'whrkkn5a2ix0oxqocbsu',
  password: /*'', // */ 'pscale_pw_IM9DmPYHDoamWCPqrERGHGWCnhKsfQB7CPvypoPWHcB',
  database: /*'seminario2', /*/ 'certiblockchain',
  ssl: true,
});

function getConetion() {
  return connection;
}

module.exports = {
  getConetion,
};
