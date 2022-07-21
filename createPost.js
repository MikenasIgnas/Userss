/* eslint-disable no-param-reassign */
import { createHeader } from './header.js';

createHeader();
const formContainer = document.getElementById('formContainer');

formContainer.style.margin = 'auto';
formContainer.style.maxWidth = '1000px';
formContainer.style.display = 'flex';
formContainer.style.flexDirection = 'column';
formContainer.style.justifyContent = 'center';
formContainer.style.alignItems = 'center';
const createForm = () => {
  const form = document.createElement('form');
  const button = document.createElement('button');
  button.style.width = '70px';
  button.style.height = '20px';
  button.textContent = 'Submit';
  form.style.width = '50%';
  form.style.height = '340px';
  form.style.margin = 'auto';
  form.style.display = 'flex';
  form.style.alignItems = 'center';
  form.style.flexDirection = 'column';
  form.style.backgroundColor = 'lightblue';

  const containerElement = document.createElement('div');
  const selectContainer = document.createElement('div');
  const selectTitle = document.createElement('p');
  const selectElement = document.createElement('select');
  selectTitle.textContent = 'Select User';
  selectContainer.style.display = 'flex';
  selectElement.style.width = '300px';
  selectElement.name = 'variations';

  selectContainer.style.width = '100%';
  selectContainer.style.alignItems = 'center';
  selectContainer.style.justifyContent = 'space-around';
  selectContainer.style.height = '100px';

  const createInput = () => {
    const inputContainer = document.createElement('div');
    const postTitleIputContainer = document.createElement('div');
    const postInputName = document.createElement('div');
    const postBodyInputContainer = document.createElement('div');
    const postTextAreaName = document.createElement('div');
    const inputElement = document.createElement('input');
    const textAreaElement = document.createElement('textarea');

    const inputContainerStyle = (inputName, inputTextContent, container) => {
      inputName.textContent = inputTextContent;
      container.style.display = 'flex';
      container.style.alignItems = 'center';
      container.style.justifyContent = 'space-around';
    };
    const inputElementStyles = (elements, placeholder) => {
      elements.style.width = '300px';
      elements.style.maxWidth = '300px';
      elements.style.minWidth = '300px';
      elements.style.maxHeight = '90px';
      elements.placeholder = placeholder;
      elements.style.border = 'none';
      elements.style.outline = 'none';
      elements.style.borderBottom = '1px solid black';
    };
    inputElementStyles(textAreaElement, 'Enter Post Body');
    inputElementStyles(inputElement, 'Enter Post Title');
    inputContainerStyle(postInputName, 'Post Title: ', postTitleIputContainer);
    inputContainerStyle(postTextAreaName, 'Post Body: ', postBodyInputContainer);

    containerElement.style.width = '100%';
    containerElement.style.alignItems = 'center';

    postTitleIputContainer.append(postInputName, inputElement);
    postBodyInputContainer.append(postTextAreaName, textAreaElement);
    inputContainer.append(postTitleIputContainer, postBodyInputContainer);
    containerElement.append(inputContainer);
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      fetch('https://jsonplaceholder.typicode.com/users?_embed=posts', {
        method: 'POST',
        body: JSON.stringify({
          title: `${inputElement.value}`,
          body: `${textAreaElement.value}`,
        }),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      })
        .then((response) => response.json())
        .then((json) => {
          if (inputElement.value !== '' && textAreaElement.value !== '') {
            const searchVariation = e.target.elements.variations.value;
            const postContainer = document.createElement('div');
            const postAuthor = document.createElement('div');
            const postTitle = document.createElement('div');
            const postBody = document.createElement('div');
            fetch('https://jsonplaceholder.typicode.com/users').then((res) => res.json()).then((data) => {
              data.map((user) => {
                if (searchVariation === user.name) {
                  postAuthor.innerHTML = `<a href="./oneUser.html?user_id=${user.id}">Author: ${user.name} userId ${user.id}</a> `;
                }
              });
            });
            postTitle.textContent = `Title: ${json.title}`;
            postBody.textContent = `Body: ${json.body}`;

            postAuthor.style.height = '25px';
            postTitle.style.height = '25px';

            postContainer.style.width = '50%';
            postContainer.style.textAlign = 'left';
            postContainer.style.marginTop = '20px';
            postContainer.style.marginBottom = '20px';

            postContainer.style.backgroundColor = 'lightgray';
            postAuthor.style.marginLeft = '30px';
            postTitle.style.marginLeft = '30px';
            postBody.style.marginLeft = '30px';

            postContainer.append(postAuthor, postTitle, postBody);
            formContainer.append(postContainer);

            e.target.reset();
          }
        });
    });
    return containerElement;
  };
  fetch('https://jsonplaceholder.typicode.com/users').then((res) => res.json()).then((users) => {
    users.map((user) => {
      const optionElement = document.createElement('option');
      optionElement.textContent = user.name;
      optionElement.id = user.id;
      selectElement.append(optionElement);
    });
  });
  const postTitleContainer = createInput();
  selectContainer.append(selectTitle, selectElement);
  form.append(selectContainer, postTitleContainer, button);
  formContainer.append(form);
};
createForm();
