import { createHeader } from './header.js';
import { firstLetterUpercase } from './utility.js';

const mainDiv = document.getElementById('mainDiv');
createHeader();
const createPost = () => {
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
        const editPostButton = document.createElement('a');
        editPostButton.textContent = 'Edit Post';
        editPostButton.style.backgroundColor = 'lightblue';
        editPostButton.style.padding = '5px';
        editPostButton.style.borderRadius = '15px';

        editPostButton.classList.add('hover-underline-animation');
        editPostButton.href = `./editPost.html?post_id=${post.id}`;
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

          userPostInfoContainer.append(editPostButton);
          commentContainer.append(commentItem);
          userPostElement.prepend(userName);
          userPostElement.append(userPostInfoContainer);
          mainDiv.append(userPostElement);
          userPostElement.prepend(userName);
          mainDiv.append(userPostElement);
        });
      });
    });
};
createPost();
export { createPost };
