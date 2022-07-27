import { firstLetterUpercase } from './utility.js';

const mainDiv = document.getElementById('mainDiv');
const frontPageUserPosts = async () => {
  const res = await fetch('https://jsonplaceholder.typicode.com/users?_embed=posts');
  const posts = await res.json();
  posts.map(async (post, i) => {
    const res2 = await fetch('https://jsonplaceholder.typicode.com/comments');
    const comments = await res2.json();
    const userBox = document.createElement('div');
    const showComments = document.createElement('button');
    showComments.value = `${i}`;
    showComments.textContent = 'Show';
    showComments.classList.add('hover-underline-animation', 'showComments');
    userBox.classList.add('userBox');
    userBox.innerHTML = `
          <div class="authorPostInfo">
          <a class="hover-underline-animation" href="./oneUser.html?user_id=${
  post.id
}">Author: ${post.name}</a>
          <h3>Title: ${post.posts[0].title}</h3>
          <p>Post: ${post.posts[0].body}</p>
          </div>`;

    mainDiv.append(userBox);
    userBox.append(showComments);
    const commentBox = document.createElement('div');
    const displayComment = () => {
      if (showComments.textContent === 'Show') {
        if (posts[0].id === comments[0].id) {
          commentBox.innerHTML = `<p>Comment title: ${firstLetterUpercase(
            comments[0].name,
          )}</p><p>Comment: ${firstLetterUpercase(comments[0].body)}</p>`;
        }
        userBox.append(commentBox);
        commentBox.classList.add('commentBox');
        showComments.textContent = 'Hide';
        commentBox.style.display = 'block';
        showComments.addEventListener('click', () => {
          if ((showComments.textContent === 'Hide')) {
            showComments.textContent = 'Show';
            commentBox.style.display = 'none';
          }
        });
      }
    };
    showComments.addEventListener('click', displayComment);
  });
};

frontPageUserPosts();
