import { createHeader } from './header.js';

createHeader();

const userInfoElement = document.getElementById('user-info');
fetch('https://jsonplaceholder.typicode.com/users')
  .then((res) => res.json())
  .then((user) => {
    user.map((userInfo) => {
      const userInfoContainer = document.createElement('div');
      userInfoContainer.classList.add('userInfoContainer');
      // eslint-disable-next-line max-len
      userInfoContainer.innerHTML = `<div class="ItemContent"><div class="itemHeader"><h2><a class="hover-underline-animation" href="./oneUser.html?user_id=${userInfo.id}">${userInfo.name} (${userInfo.username})</a></h2></div>
    <div class="itemListElement"> <ul class="listItems">
    <li><strong>Email:</strong> <a href="mailto:${userInfo.email}">${userInfo.email}</a></li>
    <li><strong>Phone:</strong> <a href="tel:${userInfo.phone}">${user.phone}</a></li>
    <li><strong>Address:</strong> <a href="#">${userInfo.address.street} ${userInfo.address.suite}, ${userInfo.address.city} (zipcode: ${userInfo.address.zipcode})</a></li>
    <li><strong>Website:</strong> <a href="${userInfo.website}" target="_blank">${userInfo.website}</a></li>
    <li><strong>Work:</strong> ${userInfo.company.name}</li>
    </ul></div>
    </div>`;
      userInfoElement.append(userInfoContainer);
    });
  });
