import { createHeader } from './header.js';

createHeader();

const userInFoContainer = document.createElement('ul');
 

const form = document.getElementById('form');
const button = document.getElementById('button');
export const createUserForm = () => {
  const formClass = document.querySelector('.formClass');
  button.style.margin = 'auto';
  button.style.width = '70px';
  button.style.height = '20px';
  formClass.style.margin = 'auto';
  formClass.style.width = '20%';
  formClass.style.display = 'flex';
  formClass.style.flexDirection = 'column';
  formClass.style.backgroundColor = 'lightblue';
  formClass.style.padding = '20px';
};
createUserForm();

button.addEventListener('click', (e) => {
  e.preventDefault();
  fetch('https://jsonplaceholder.typicode.com/users', {
    method: 'POST',
    body: JSON.stringify({
      address: {
        city: form.city.value,
        street: form.street.value,
        suite: form.suite.value,
        zipcode: form.zipCode.value,
      },
      name: form.name.value,
      phone: form.phone.value,
      username: form.userName.value,
      email: form.email.value,
      id: 1,
    }),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  })
    .then((response) => response.json())
    .then((jsonData) => {
      userInFoContainer.innerHTML = `
        <li>Name:${jsonData.name}</li>
        <li>User Name: ${jsonData.username}</li>
        <li>Phone: ${jsonData.phone}</li>
        <li>Email: ${jsonData.email}</li>
        <li>Adress:</li>
        <ul>
        <li>Street: ${jsonData.address.street}</li>
        <li>Suite: ${jsonData.address.suite}</li>
        <li>City: ${jsonData.address.city}</li>
        <li>Zipcode: ${jsonData.address.zipcode}</li>
        </ul>`;
      form.append(userInFoContainer);
      form.reset();
    });
});
