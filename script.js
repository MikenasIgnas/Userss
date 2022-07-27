/* eslint-disable max-len */
import { createHeader } from './header.js';

const userInfo = document.getElementById('user-info');

createHeader();

const fetchUsers = async () => {
  const res = await fetch('https://jsonplaceholder.typicode.com/users');
  const users = await res.json();
  users.map((user) => {
    const userInfoContainer = document.createElement('div');
    userInfoContainer.classList.add('userInfoContainer');
    userInfoContainer.innerHTML = `<div class="itemContent"><div> 
  <img class="image" src="https://imgs.search.brave.com/tU2MnBBqd8zDGuTXSoMUMIuNy0c9LltuJOreUqqS6Bc/rs:fit:1200:1200:1/g:ce/aHR0cHM6Ly9wbHVz/cG5nLmNvbS9pbWct/cG5nL3VzZXItcG5n/LWljb24tZG93bmxv/YWQtaWNvbnMtbG9n/b3MtZW1vamlzLXVz/ZXJzLTIyNDAucG5n">
  </div><h3>${user.name} (${user.username})</h3>
  <div class="showMore"><h5><a class="hover-underline-animation" href="./oneUser.html?user_id=${user.id}&user_name=${user.name}">Show more</a></h5></div>
  </div>`;
    userInfo.append(userInfoContainer);
  });
};

fetchUsers();
