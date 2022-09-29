const { app, BrowserWindow, ipcMain: ipc, Notification } = require('electron');
require('electron-reload')(__dirname);
const { userValidation } = require('./src/utilities/validateusers.js');
const { newProcedure } = require('./src/utilities/newProcedure.js');
const {
  dataProcedureID,
  dataProcedure,
} = require('./src/utilities/getProcedures.js');
const { newUserdb } = require('./src/utilities/dbNewUser');
const { newCertificate } = require('./src/utilities/createNewCertificate');
const {
  dataCertificate,
  dataCertificateID,
  changeState,
} = require('./src/utilities/getCertificates');

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
  win.setMenu(null);

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

  //Crea nuevo usuario
  ipc.on('newUserdb', async (e, newUser) => {
    await newUserdb(newUser);
    new Notification({
      title: 'Nuevo usuario creado',
      body: 'El nuevo usuario fue agragado correctamente',
    }).show();
  });
  //Crea nuevo certificado
  ipc.on('createNewCertificate', async (e, datanewCertificate) => {
    await newCertificate(datanewCertificate);

    new Notification({
      title: 'Nuevo certificado creado',
      body: 'El nuevo certificado fue agragado correctamente',
    }).show();
  });

  //Obtiene datos de certificados
  ipc.on('getCertificates', async (env) => {
    const dataCerti = await dataCertificate();
    win.webContents.send('dataCertificate', dataCerti);
  });
  //Obtiene datos de certificados por ID
  ipc.on('getCertificateId', async (env, idCertificate) => {
    const idCerti = await dataCertificateID(idCertificate);
    win.webContents.send('idCerti', idCerti);
  });

  //Cambiar estado cetificados
  ipc.on('changeState', async (e, state) => {
    await changeState(state);
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
