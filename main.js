const { app, BrowserWindow, ipcMain: ipc, Notification } = require('electron');
require('electron-reload')(__dirname);
const { userValidation } = require('./src/utilities/validateusers.js');
const { newProcedure } = require('./src/utilities/newProcedure.js');
const {
  dataProcedureID,
  dataProcedure,
} = require('./src/utilities/getProcedures.js');

app.whenReady().then(() => {
  const win = new BrowserWindow({
    minWidth: 1200,
    minHeight: 600,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });


  win.loadFile('./src/layout/login.html');
  win.maximize();

  // IPC ON obtiene datos del proceso render escuchando el evento usuario

  ipc.on('comUser', async (env, User) => {
    const validation = await userValidation(User);
    win.webContents.send('validation', validation);
  });

  //Obtiene datos de tramites (procedure DB)
  ipc.on('getProcedures', async (env) => {
    const dataProced = await dataProcedure();
    win.webContents.send('dataProcedure', dataProced);
  });
  ipc.on('getProcedureId', async (env, idProcedure) => {
    const idProce = await dataProcedureID(idProcedure);
    win.webContents.send('idproced', idProce);
  });

  //Guarda datos nuevo tramite

  ipc.on('newProcedure', async (e, dataNewTramite) => {
    dataNewTramite.state = 'Pendiente';
    await newProcedure(dataNewTramite);

    new Notification({
      title: 'Nuevo tramite generado',
      body: 'El nuevo tramite fue agragado correctamente',
    }).show();
  });
});


app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
