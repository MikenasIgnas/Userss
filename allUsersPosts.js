import { createHeader } from './header.js';
import { firstLetterUpercase } from './utility.js';

const mainDiv = document.getElementById('mainDiv');
createHeader();
fetch('https://jsonplaceholder.typicode.com/posts?_embed=comments')
  .then((res) => res.json())
  .then((posts) => {
    posts.map((post) => {
      const userPostElement = document.createElement('div');
      const userName = document.createElement('div');
      const userPostInfoContainer = document.createElement('div');
      userPostInfoContainer.classList.add('userPostInfoContainer');
      const userPostBody = document.createElement('p');
      const userPostTitle = document.createElement('h4');
      userPostTitle.textContent = `Title:  ${firstLetterUpercase(post.title)}`;
      userPostBody.innerHTML = `<strong>Post:</strong>  ${firstLetterUpercase(
        post.body,
      )}`;
      userPostElement.classList.add('userPostElement');
      post.comments.map((comments) => {
        const commentContainer = document.createElement('ul');
        const commentItem = document.createElement('li');
        commentItem.textContent = firstLetterUpercase(comments.body);
        commentItem.classList.add('commentContainer');
        userPostInfoContainer.prepend(
          userPostTitle,
          userPostBody,
          commentContainer,
        );
        commentContainer.append(commentItem);
        userPostElement.prepend(userName);
        userPostElement.append(userPostInfoContainer);
        mainDiv.append(userPostElement);
        userPostElement.prepend(userName);
        mainDiv.append(userPostElement);
      });
    });
  });
