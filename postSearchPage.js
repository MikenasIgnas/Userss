const queryParams = document.location.search;
const urlParams = new URLSearchParams(queryParams);
const userId = urlParams.get("user_id");
const searchWord = urlParams.get("search_word");
const homePageContainer = document.getElementById("homePageContainer");
const albumId = urlParams.get("album_id");
const albumBox = document.createElement("div");
const albumTitle = urlParams.get("album_title");
const postTitle = urlParams.get("post_title");
const postId = urlParams.get("post_id");
const albumsWrapper = document.getElementById("albums-wrapper");
const fieldSet = document.createElement("fieldset");
const legend = document.createElement("legend");
albumBox.classList.add("albumBox");
fieldSet.classList.add("fieldset");
legend.textContent = "Search Results";

fetch(`https://jsonplaceholder.typicode.com/users`)
  .then((res) => res.json())
  .then((users) => {
    const postContainer = document.createElement("ul");
    postContainer.textContent = "Posts:";
    postContainer.classList.add("postContainer");
    users.map((user) => {
      fetch(`https://jsonplaceholder.typicode.com/posts?post_id=${postId}`)
        .then((res) => res.json())
        .then((posts) => {
          posts.map((post) => {
            if (post.userId === user.id) {
              const userName = document.createElement("p");
              userName.textContent = "Author: " + user.name;
              userName.style.textDecoration = "underline";
              if (post.title.includes(searchWord)) {
                const albumListItemms = document.createElement("li");
                albumListItemms.innerHTML = post.title;
                postContainer.append(userName, albumListItemms);
              }
            }
            fieldSet.append(legend, postContainer);
            albumsWrapper.append(fieldSet);
          });
        });
    });
  });
