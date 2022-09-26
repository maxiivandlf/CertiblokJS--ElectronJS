const { ipcRenderer } = require('electron');

const userName = document.getElementById('userName');
const lastName = document.getElementById('lastName');
const password = document.getElementById('password');
const email = document.getElementById('email');
const typeUser = document.getElementById('typeUser');
const btnRegister = document.getElementById('btnRegister');

btnRegister.addEventListener('click', (e) => {
  //e.preventDefault();
  const newUser = {
    userName: userName.value,
    lastName: lastName.value,
    password: password.value,
    email: email.value,
    typeUser: typeUser.value,
  };

  ipcRenderer.send('newUserdb', newUser);
});
