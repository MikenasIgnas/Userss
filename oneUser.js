const queryParams = document.location.search;
const urlParams = new URLSearchParams(queryParams);
const userId = urlParams.get("user_id");
const userInfo = document.getElementById("user-info");
const postsWrapper = document.getElementById("posts-wrapper");
const albumsWrapper = document.getElementById("albums-wrapper");
const showPostsButton = document.getElementById("showPosts");
let albumId = urlParams.get("album_id");
let albumTitle = urlParams.get("album_title");
let userName = urlParams.get("user_name");
fetch(`https://jsonplaceholder.typicode.com/posts?user_id=${userId}`)
  .then((res) => res.json())
  .then((posts) => {
    posts.map((post) => {
      if (userId == post.userId) {
        const updatedTitle = post.title[0].toUpperCase() + post.title.slice(1);

        const postItem = document.createElement("div");
        postItem.classList.add("post-item");

        const postTitle = document.createElement("h5");
        postTitle.classList.add("post-title");
        postTitle.textContent = updatedTitle;

        const postAuthor = document.createElement("span");
        postAuthor.classList.add("post-author");

        const postBody = document.createElement("p");
        postBody.classList.add("post-content");
        postBody.textContent = post.body;

        const commentsWrapper = document.createElement("div");
        commentsWrapper.classList.add("comments-wrapper");

        postItem.append(postTitle, postAuthor, postBody, commentsWrapper);
        postsWrapper.append(postItem);
        fetch("https://jsonplaceholder.typicode.com/users/" + userId)
          .then((res) => res.json())
          .then((user) => {
            postAuthor.innerHTML = `Author: <a href="./oneUser.html?user_id=${userId}">${user.name}</a>`;
          });
      }
    });
  });

fetch(`https://jsonplaceholder.typicode.com/users?user_id=${userId}`)
  .then((res) => res.json())
  .then((user) => {
    user.map((user) => {
      if (userId == user.id) {
        const userInfoContainer = document.createElement("div");
        userInfoContainer.classList.add("userInfoContainer");
        userInfoContainer.innerHTML = `<div class="ItemContent"><div class="itemHeader"><h2>${user.name} (${user.username})</h2></div>
                           <div class="itemListElement"> <ul class="listItems">
                              <li><strong>Email:</strong> <a href="mailto:${user.email}">${user.email}</a></li>
                              <li><strong>Phone:</strong> <a href="tel:${user.phone}">${user.phone}</a></li>
                              <li><strong>Address:</strong> <a href="#">${user.address.street} ${user.address.suite}, ${user.address.city} (zipcode: ${user.address.zipcode})</a></li>
                              <li><strong>Website:</strong> <a href="${user.website}" target="_blank">${user.website}</a></li>
                              <li><strong>Work:</strong> ${user.company.name}</li>
                            </ul></div>
                            </div>`;
        userInfo.append(userInfoContainer);
      }
    });
  });
const fieldSet = document.createElement("fieldset");
fieldSet.classList.add("fieldset");
const legend = document.createElement("legend");
legend.textContent = "ALBUMS";
fetch(`https://jsonplaceholder.typicode.com/albums?user_id=${userId}`)
  .then((res) => res.json())
  .then((userAlbums) => {
    userAlbums.map((album) => {
      if (userId == album.userId) {
        const albumContainer = document.createElement("ul");
        albumContainer.classList.add("albumContainer");
        const albumListItemms = document.createElement("li");
        albumListItemms.innerHTML =
          album.title +
          ` (<a href="./photos.html?user_id=${userId}&album_id=${album.id}">Photos</a>)`;
        albumsWrapper.append(fieldSet);
        fieldSet.append(legend, albumContainer);
        albumContainer.append(albumListItemms);
      }
    });
  });

function change(el, show, hide, wraper) {
  if (el.value === show) {
    el.value = hide;
    wraper.style.display = "grid";
  } else (el.value = show), (wraper.style.display = "none");
}
