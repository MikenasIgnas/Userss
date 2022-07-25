import { createUserForm } from './createUser.js';

createUserForm();

const button = document.getElementById('button');

button.addEventListener('click', (e) => {
  e.preventDefault();
  console.log('AAAAAAAAAA');
});
