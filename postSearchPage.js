import { createHeader } from './header.js';
import { firstLetterUpercase } from './utility.js';

const queryParams = document.location.search;
const urlParams = new URLSearchParams(queryParams);
const searchWord = urlParams.get('search_word');
const albumBox = document.createElement('div');
const postId = urlParams.get('post_id');
const albumsWrapper = document.getElementById('albums-wrapper');
const fieldSet = document.createElement('fieldset');
const legend = document.createElement('legend');
albumBox.classList.add('albumBox');
fieldSet.classList.add('fieldset');
legend.textContent = 'Search Results';

createHeader();
const fethcData = async () => {
  const res = await fetch('https://jsonplaceholder.typicode.com/users'); // same as 17-18 eilute
  const users = await res.json();// 19 eilute
  const res2 = await fetch(`https://jsonplaceholder.typicode.com/posts?post_id=${postId}`); // 24 eilute
  const posts = await res2.json(); // 25

  const postContainer = document.createElement('ul');
  postContainer.textContent = 'Posts:';
  postContainer.classList.add('postContainer');

  users.map((user) => {
    posts.map((post) => {
      if (post.userId === user.id) {
        const userName = document.createElement('p');
        userName.textContent = `Author: ${user.name}`;
        userName.style.textDecoration = 'underline';
        if (post.title.includes(searchWord)) {
          const albumListItemms = document.createElement('li');
          albumListItemms.innerHTML = firstLetterUpercase(post.title);
          postContainer.append(userName, albumListItemms);
        }
      }
      fieldSet.append(legend, postContainer);
      albumsWrapper.append(fieldSet);
    });
  });
};

fethcData();
