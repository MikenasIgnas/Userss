import { createHeader } from './header.js';
import { firstLetterUpercase } from './utility.js';

const queryParams = document.location.search;
const urlParams = new URLSearchParams(queryParams);
const userId = urlParams.get('user_id');
const userInfo = document.getElementById('user-info');
const postsWrapper = document.getElementById('posts-wrapper');
const albumsWrapper = document.getElementById('albums-wrapper');

createHeader();
function createOneUser() {
  fetch(`https://jsonplaceholder.typicode.com/posts?user_id=${userId}`)
    .then((res) => res.json())
    .then((posts) => {
      posts.map((post) => {
        if (Number(userId) === post.userId) {
          const updatedTitle = post.title;

          const postItem = document.createElement('div');
          postItem.classList.add('post-item');

          const postTitle = document.createElement('h5');
          postTitle.classList.add('post-title');
          postTitle.textContent = `Title: ${updatedTitle}`;

          const postAuthor = document.createElement('span');
          postAuthor.classList.add('post-author');

          const postBody = document.createElement('p');

          postBody.classList.add('post-content');
          postBody.textContent = `Post: ${post.body}`;

          const commentsWrapper = document.createElement('div');
          commentsWrapper.classList.add('comments-wrapper');

          postItem.append(postAuthor, postTitle, postBody, commentsWrapper);
          postsWrapper.append(postItem);
          fetch(`https://jsonplaceholder.typicode.com/users/${userId}`)
            .then((res) => res.json())
            .then((user) => {
              postAuthor.innerHTML = `Author: <a href="./oneUser.html?user_id=${userId}">${user.name}</a>`;
            });
        }
      });
    });
  fetch(`https://jsonplaceholder.typicode.com/users?user_id=${userId}`)
    .then((res) => res.json())
    .then((user) => {
      user.map((userData) => {
        if (Number(userId) === userData.id) {
          const userInfoContainer = document.createElement('div');
          userInfoContainer.classList.add('userInfoContainer');
          userInfoContainer.innerHTML = `<div class="ItemContent"><div class="itemHeader"><h2>${firstLetterUpercase(
            userData.name,
          )} (${userData.username})</h2></div>
          <div class="itemListElement"> <ul class="listItems">
          <li><strong>Email:</strong> <a href="mailto:${userData.email}">${
  userData.email
}</a></li>
          <li><strong>Phone:</strong> <a href="tel:${userData.phone}">${
  userData.phone
}</a></li>
          <li><strong>Address:</strong> <a href="#">${userData.address.street} ${
  userData.address.suite
}, ${userData.address.city} (zipcode: ${userData.address.zipcode})</a></li>
          <li><strong>Website:</strong> <a href="${
  userData.website
}" target="_blank">${userData.website}</a></li>
          <li><strong>Work:</strong> ${userData.company.name}</li>
          </ul></div>
          </div>`;
          userInfo.append(userInfoContainer);
        }
      });
    });
  const fieldSet = document.createElement('fieldset');
  fieldSet.classList.add('fieldset');
  const legend = document.createElement('legend');
  legend.textContent = 'ALBUMS';
  fetch(`https://jsonplaceholder.typicode.com/albums?user_id=${userId}`)
    .then((res) => res.json())
    .then((userAlbums) => {
      userAlbums.map((album) => {
        if (Number(userId) === album.userId) {
          const albumContainer = document.createElement('ul');
          albumContainer.classList.add('albumContainer');
          const albumListItemms = document.createElement('li');
          albumListItemms.innerHTML = `${album.title
          } (<a href="./photos.html?user_id=${userId}&album_id=${album.id}">Photos</a>)`;
          albumsWrapper.append(fieldSet);
          fieldSet.append(legend, albumContainer);
          albumContainer.append(albumListItemms);
        }
      });
    });
}
createOneUser();
const showPosts = document.getElementById('showPosts');
const showAlbums = document.getElementById('showAlbums');
const editUser = document.getElementById('editUser');
editUser.addEventListener('click', ()=>{
  window.location.assign(`./editUser.html?user_id=${userId}`);
})
const toggleShowButtons = (showButton, showContentValue, contentWrapper) => {
  showButton.addEventListener('click', (e) => {
    if (e.target.value === showContentValue) {
      e.target.value = 'Hide';
      // eslint-disable-next-line no-param-reassign
      contentWrapper.style.display = 'grid';
    } else {
      // eslint-disable-next-line no-unused-expressions
      e.target.value = showContentValue;
      // eslint-disable-next-line no-param-reassign
      contentWrapper.style.display = 'none';
    }
  });
};
toggleShowButtons(showPosts, 'Show Posts', postsWrapper);
toggleShowButtons(showAlbums, 'Show Albums', albumsWrapper);
