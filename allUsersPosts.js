/* eslint-disable no-param-reassign */
import { createHeader } from './header.js';
import { firstLetterUpercase } from './utility.js';

const mainDiv = document.getElementById('mainDiv');
createHeader();
const createPost = () => {
  fetch('https://jsonplaceholder.typicode.com/users').then((res) => res.json()).then((users) => {
    fetch('https://jsonplaceholder.typicode.com/posts?_embed=comments')
      .then((res) => res.json())
      .then((posts) => {
        posts.map((post) => {
          const userPostElement = document.createElement('div');
          const userName = document.createElement('h3');
          const userPostInfoContainer = document.createElement('div');
          userPostInfoContainer.classList.add('userPostInfoContainer');
          const userPostBody = document.createElement('p');
          const userPostTitle = document.createElement('h4');
          const createButton = (elements, elemenType, textContent, href) => {
            elements = document.createElement(elemenType);
            elements.textContent = textContent;
            elements.style.backgroundColor = 'lightblue';
            elements.style.padding = '5px';
            elements.style.borderRadius = '15px';
            elements.style.cursor = 'pointer';
            elements.href = href;
            return elements;
          };
          const editPostButton = createButton('', 'a', 'Edit Post', `./editPost.html?post_id=${post.id}`);
          userPostTitle.textContent = `Title:  ${firstLetterUpercase(post.title)}`;
          userPostBody.innerHTML = `<strong>Post:</strong>  ${firstLetterUpercase(
            post.body,
          )}`;

          users.map((user) => {
            if (post.userId === user.id) {
              userName.innerHTML = `<a class='hover-underline-animation' href='./oneUser.html?user_id=${user.id}'>${user.name}</a>`;
            }
          });
          userPostElement.classList.add('userPostElement');
          post.comments.map((comments) => {
            const editCommentButton = createButton('', 'button', 'Edit Comment', '');
            const commentContainer = document.createElement('ul');
            const commentItem = document.createElement('li');
            commentItem.textContent = firstLetterUpercase(comments.body);
            commentItem.classList.add('commentContainer');
            const commentContainerEdit = document.createElement('input');
            const saveButton = createButton('', 'button', 'Save Changes', '');

            saveButton.style.display = 'none';
            editCommentButton.addEventListener('click', () => {
              commentContainer.style.display = 'grid';
              commentContainer.style.gap = '5px';
              commentContainerEdit.value = commentItem.textContent;
              editCommentButton.style.display = 'none';
              saveButton.style.display = 'block';
              saveButton.style.width = '120px';
              commentContainer.append(commentContainerEdit, saveButton);
              commentContainer.removeChild(commentItem);
            });
            saveButton.addEventListener('click', () => {
              commentContainer.style.display = 'block';
              saveButton.style.display = 'none';
              editCommentButton.style.display = 'block';
              commentItem.textContent = commentContainerEdit.value;
              commentContainer.prepend(commentItem);
              commentContainer.removeChild(commentContainerEdit);
            });
            userPostInfoContainer.prepend(
              userPostTitle,
              userPostBody,
              editPostButton,
              commentContainer,
            );

            commentContainer.append(commentItem, editCommentButton, saveButton);
            userPostElement.prepend(userName);
            userPostElement.append(userPostInfoContainer);
            userPostElement.prepend(userName);
            mainDiv.append(userPostElement);
          });
        });
      });
  });
};
createPost();
export { createPost };
