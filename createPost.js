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
  const selectElement = document.createElement('select');
  const selectTitle = document.createElement('p');
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
    postInputName.textContent = 'Post Title: ';
    postTitleIputContainer.style.display = 'flex';
    postTitleIputContainer.style.alignItems = 'center';
    postTitleIputContainer.style.justifyContent = 'space-around';
    const postBodyInputContainer = document.createElement('div');
    const postTextAreaName = document.createElement('div');
    postTextAreaName.textContent = 'Post Body: ';
    postBodyInputContainer.style.display = 'flex';
    postBodyInputContainer.style.alignItems = 'center';
    postBodyInputContainer.style.justifyContent = 'space-around';
    inputContainer.classList.add('inputContainer');

    const inputElement = document.createElement('input');
    const textAreaElement = document.createElement('textarea');

    textAreaElement.style.width = '300px';
    textAreaElement.style.maxWidth = '300px';
    textAreaElement.style.minWidth = '300px';
    textAreaElement.style.maxHeight = '90px';
    textAreaElement.placeholder = 'Enter Post Body';
    textAreaElement.style.border = 'none';
    textAreaElement.style.outline = 'none';
    textAreaElement.style.borderBottom = '1px solid black';

    inputElement.style.border = 'none';
    inputElement.style.outline = 'none';
    inputElement.style.borderBottom = '1px solid black';
    inputElement.style.width = '100%';
    inputElement.placeholder = 'Enter Post Title';
    inputElement.style.maxWidth = '300px';
    inputElement.style.height = '20px';
    containerElement.style.width = '100%';

    containerElement.style.alignItems = 'center';
    postTitleIputContainer.append(postInputName, inputElement);
    postBodyInputContainer.append(postTextAreaName, textAreaElement);
    inputContainer.append(postTitleIputContainer, postBodyInputContainer);
    containerElement.append(inputContainer);
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        body: JSON.stringify({
          title: `${inputElement.value}`,
          body: `${textAreaElement.value}`,
          userId: 1,
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
            postAuthor.textContent = `Author: ${searchVariation}`;
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
            inputElement.value = '';
            textAreaElement.value = '';
          } else {
            alert('Iput fields are not filled');
          }
        });
    });
    return containerElement;
  };
  fetch('https://jsonplaceholder.typicode.com/users').then((res) => res.json()).then((users) => {
    users.map((user) => {
      const optionElement = document.createElement('option');
      optionElement.textContent = user.name;
      selectElement.append(optionElement);
    });
  });
  const postTitleContainer = createInput();
  selectContainer.append(selectTitle, selectElement);
  form.append(selectContainer, postTitleContainer, button);
  formContainer.append(form);
};
createForm();
