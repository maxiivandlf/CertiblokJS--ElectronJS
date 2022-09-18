const { app, BrowserWindow, ipcMain: ipc, Notification } = require('electron');

const { getConetion } = require('./src/utilities/dbconection');

require('electron-reload')(__dirname);

async function userValidation(User) {
  const conx = await getConetion();

  const resultado = await conx.query(
    `SELECT * FROM users WHERE userName = "${User.userName}" AND password = "${User.userPassword}" AND typeUser = "${User.userCategory}" `
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

// async function getUser() {
//   const conx = await getConetion();
//   const resultadop = await conx.query('SELECT * FROM products');
//   return resultadop;
// }

app.whenReady().then(() => {
  const win = new BrowserWindow({
    minWidth: 1200,
    minHeight: 900,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });
  win.loadFile('./src/layout/login.html');
  win.maximize();

  //obtiene datos del proceso render escuchando el evento usuario

  ipc.on('comUser', async (env, User) => {
    const validation = await userValidation(User);
    win.webContents.send('validation', validation);
  });

  // ipc.on('comUser', async () => {
  //   //regresa los datos de la base
  //   const dbdatos = await getUser();
  //   win.webContents.send('datosdb', dbdatos);
  // });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
