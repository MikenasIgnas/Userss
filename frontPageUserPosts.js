const mainDiv = document.getElementById("mainDiv");
fetch("https://jsonplaceholder.typicode.com/users?_embed=posts")
  .then((res) => res.json())
  .then((data) =>
    data.map((posts, i) => {
      const userBox = document.createElement("div");
      const showComments = document.createElement("button");
      showComments.value = `${i}`;
      showComments.textContent = "Show";
      showComments.classList.add("hover-underline-animation", "showComments");
      userBox.classList.add("userBox");
      userBox.innerHTML = `
          <div class="authorPostInfo">
          <a class="hover-underline-animation" href="./oneUser.html?user_id=${posts.id}">Author: ${posts.name}</a>
          <h3>Title: ${posts.posts[0].title}</h3>
          <p>Post: ${posts.posts[0].body}</p>
          </div>`;

      mainDiv.append(userBox);
      userBox.append(showComments);
      const commentBox = document.createElement("div");
      const displayComment = () => {
        if (showComments.textContent === "Show") {
          fetch("https://jsonplaceholder.typicode.com/todos/1/comments")
            .then((res) => res.json())
            .then((comments) => {
              if (data[0].id === comments[0].id) {
                commentBox.innerHTML = `<p>Comment title: ${comments[0].name}</p><p>Comment: ${comments[0].body}</p>`;
              }
              userBox.append(commentBox);
              commentBox.classList.add("commentBox");
              showComments.textContent = "Hide";
              commentBox.style.display = "block";
              showComments.addEventListener("click", () => {
                if ((showComments.textContent = "Hide")) {
                  showComments.textContent = "Show";
                  commentBox.style.display = "none";
                }
              });
            });
        }
      };
      showComments.addEventListener("click", displayComment);
    })
  );
