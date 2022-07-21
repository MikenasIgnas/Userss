import { createHeader } from './header.js';

const formClass = document.querySelector('.formClass');
const form = document.getElementById('form');
const button = document.getElementById('button');

button.style.margin = 'auto';
button.style.width = '70px';
button.style.height = '20px';
formClass.style.margin = 'auto';
formClass.style.width = '20%';
formClass.style.display = 'flex';
formClass.style.flexDirection = 'column';

createHeader();

const userInFoContainer = document.createElement('ul');
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
    .then((json) => {
      userInFoContainer.innerHTML = `
    <li>Name:${json.name}</li>
    <li>User Name: ${json.username}</li>
    <li>Phone: ${json.phone}</li>
    <li>Email: ${json.email}</li>
    <li>Adress:</li>
    <ul>
    <li>Street: ${json.address.street}</li>
    <li>Suite: ${json.address.suite}</li>
    <li>City: ${json.address.city}</li>
    <li>Zipcode: ${json.address.zipcode}</li>
    </ul>`;
      form.append(userInFoContainer);
      form.reset();
    });
});

function makeRequest(location) {
  return new Promise((resolve, reject) => {
    console.log(`Making request to ${location}`);
    if (location === 'Google') {
      resolve('Google say Hi');
    } else {
      reject('We can only talk to Google');
    }
  });
}

function processRequest(response) {
  return new Promise((resolve, reject) => {
    console.log('Procesing response');
    resolve(`Extra information + ${response}`);
  });
}

async function doWork() {
  const response = await makeRequest('Google');
  console.log('response received');
  const processResponse = await processRequest(response);
  console.log(processResponse);
}
doWork();
