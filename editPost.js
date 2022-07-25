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
    const mapFunctiom = () => {
      users.map((user, i) => {
        const selectOption = document.createElement('option');
        if (Number(postId) === user.id) {
          userName.textContent = user.name;
        }
        selectOption.textContent = user.name;
        selectOption.id = i + 1;
        selectOption.name = 'option';
        console.log(selectOption.id);
        selectElement.append(selectOption);
      });
    };
    mapFunctiom();
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      fetch('https://jsonplaceholder.typicode.com/posts/1', {
        method: 'PUT',
        body: JSON.stringify({
          id: 2,
          title: postTitleInput.value,
          body: postBodyInput.value,
          userId: mapFunctiom(),
        }),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      })
        .then((response) => response.json())
        .then((json) => {
          console.log(json);
          const searchVariation = e.target.elements.variations.value;
          console.log(e.target.variations);
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
