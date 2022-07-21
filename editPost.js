import { createHeader } from './header.js';
import { firstLetterUpercase } from './utility.js';

createHeader();
const queryParams = document.location.search;
const urlParams = new URLSearchParams(queryParams);
const postId = urlParams.get('post_id');
const form = document.getElementById('form');
const selectElement = document.createElement('select');
const postTitleInput = document.getElementById('postTitleInput');
const postBodyInput = document.getElementById('postBodyInput');
selectElement.style.width = '300px';
selectElement.name = 'variations';
form.prepend(selectElement);

const mainDiv = document.getElementById('mainDiv');
fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`).then((res) => res.json()).then((data) => {
  const userPostElement = document.createElement('div');
  const userPostInfoContainer = document.createElement('div');
  userPostInfoContainer.classList.add('userPostInfoContainer');
  const userName = document.createElement('h4');
  const userPostTitle = document.createElement('h4');
  const userPostBody = document.createElement('p');
  const editPostButton = document.createElement('a');
  const commentContainerTitle = document.createElement('p');
  commentContainerTitle.textContent = 'Comments: ';
  editPostButton.textContent = 'Edit Post';
  editPostButton.style.backgroundColor = 'lightblue';
  editPostButton.style.padding = '5px';
  editPostButton.style.borderRadius = '15px';

  editPostButton.classList.add('hover-underline-animation');
  editPostButton.href = `./editPost.html?post_id=${data.id}`;
  userPostTitle.textContent = `Title:  ${firstLetterUpercase(data.title)}`;
  userPostBody.innerHTML = `<strong>Post:</strong>  ${firstLetterUpercase(
    data.body,
  )}`;
  fetch('https://jsonplaceholder.typicode.com/users').then((res) => res.json()).then((users) => {
    users.map((user) => {
      if (Number(postId) === user.id) {
        userName.textContent = user.name;
      }
      const selectOption = document.createElement('option');
      selectOption.textContent = user.name;
      selectElement.append(selectOption);
    });
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      fetch('https://jsonplaceholder.typicode.com/posts/1', {
        method: 'PUT',
        body: JSON.stringify({
          id: 2,
          title: postTitleInput.value,
          body: postBodyInput.value,
          userId: 1,
        }),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      })
        .then((response) => response.json())
        .then((json) => {
          const searchVariation = e.target.elements.variations.value;
          userName.textContent = searchVariation;
          userPostTitle.textContent = `Title: ${json.title}`;
          userPostBody.innerHTML = `<strong>Post:</strong> ${json.body}`;
        });
    });
  });

  userPostInfoContainer.prepend(userName, userPostTitle, userPostBody);
  userPostElement.append(userPostInfoContainer);
  mainDiv.append(userPostElement);
  mainDiv.append(userPostElement);
});
