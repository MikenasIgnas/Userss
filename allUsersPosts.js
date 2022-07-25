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
          const createCommentButton = createButton('', 'a', 'Add comment', '');

          createCommentButton.addEventListener('click', (e) => {
            e.preventDefault();
            const newCommentBodyInput = document.createElement('input');
            userPostElement.removeChild(createCommentButton);
            const saveCommentButton = createButton('', 'a', 'Save comment', '');
            userPostInfoContainer.append(saveCommentButton);
            userPostInfoContainer.append(newCommentBodyInput);
            saveCommentButton.addEventListener('click', (e) => {
              e.preventDefault();
              fetch('https://jsonplaceholder.typicode.com/comments', {
                method: 'POST',
                body: JSON.stringify({
                  body: newCommentBodyInput.value,
                  userId: 1,
                }),
                headers: {
                  'Content-type': 'application/json; charset=UTF-8',
                },
              })
                .then((response) => response.json())
                .then((json) => {
                  if (newCommentBodyInput.value !== '') {
                    const newCommentElement = document.createElement('ul');
                    const newCommentListElement = document.createElement('li');
                    newCommentListElement.textContent = json.body;
                    newCommentElement.append(newCommentListElement);
                    userPostInfoContainer.append(newCommentElement);
                    userPostInfoContainer.removeChild(saveCommentButton);
                    userPostInfoContainer.removeChild(newCommentBodyInput);

                    const editCommentButton = createButton('', 'button', 'Edit Comment', '');
                    const saveButton = createButton('', 'button', 'Save Changes', '');

                    const commentContainerEdit = document.createElement('input');
                    editCommentButton.addEventListener('click', () => {
                      newCommentElement.style.display = 'grid';
                      newCommentElement.style.gap = '5px';
                      saveButton.style.display = 'block';
                      saveButton.style.width = '120px';
                      commentContainerEdit.value = newCommentListElement.textContent;
                      commentContainerEdit.append(newCommentBodyInput, saveButton);
                      newCommentElement.removeChild(editCommentButton);
                      newCommentElement.removeChild(newCommentListElement);
                      newCommentElement.append(commentContainerEdit, saveButton);
                    });
                    saveButton.addEventListener('click', () => {
                      newCommentListElement.textContent = commentContainerEdit.value;
                      newCommentElement.style.display = 'block';
                      newCommentElement.append(editCommentButton);
                      newCommentElement.prepend(newCommentListElement);
                      newCommentElement.removeChild(saveButton);
                      newCommentElement.removeChild(commentContainerEdit);
                    });
                    newCommentElement.append(newCommentListElement, editCommentButton);
                    userPostInfoContainer.append(newCommentElement);
                    userPostElement.append(createCommentButton);
                  } else {
                    newCommentBodyInput.placeholder = 'Fill this out to add comment';
                  }
                });
            });
          });

          users.map((user) => {
            if (post.userId === user.id) {
              userName.innerHTML = `<a class='hover-underline-animation' href='./oneUser.html?user_id=${user.id}'>${user.name}</a>`;
            }
          });
          userPostElement.classList.add('userPostElement');

          post.comments.map((comments) => {
            function editButtons() {
              const editCommentButton = createButton('', 'button', 'Edit Comment', '');
              const saveButton = createButton('', 'button', 'Save Changes', '');
              const commentContainer = document.createElement('ul');
              const commentItem = document.createElement('li');
              commentItem.textContent = firstLetterUpercase(comments.body);
              commentItem.classList.add('commentContainer');
              const commentContainerEdit = document.createElement('input');

              saveButton.style.display = 'none';

              editCommentButton.addEventListener('click', () => {
                commentContainer.style.display = 'grid';
                commentContainer.style.gap = '5px';
                saveButton.style.display = 'block';
                saveButton.style.width = '120px';
                commentContainerEdit.value = commentItem.textContent;
                commentContainer.append(commentContainerEdit, saveButton);
                commentContainer.removeChild(editCommentButton);
                commentContainer.removeChild(commentItem);
              });

              saveButton.addEventListener('click', () => {
                commentItem.textContent = commentContainerEdit.value;
                commentContainer.style.display = 'block';
                commentContainer.append(editCommentButton);
                commentContainer.prepend(commentItem);
                commentContainer.removeChild(saveButton);
                commentContainer.removeChild(commentContainerEdit);
              });
              userPostInfoContainer.prepend(
                userPostTitle,
                userPostBody,
                editPostButton,
                commentContainer,
              );
              commentContainer.append(commentItem, editCommentButton);
              userPostElement.prepend(userName);
              userPostElement.append(userPostInfoContainer);
              userPostElement.append(createCommentButton);
              userPostElement.prepend(userName);
              mainDiv.append(userPostElement);
            }
            editButtons();
          });
        });
      });
  });
};
createPost();
