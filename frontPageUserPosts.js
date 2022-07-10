const mainDiv = document.getElementById("mainDiv");

fetch("https://jsonplaceholder.typicode.com/todos/1/posts?_limit=10&_start=0")
  .then((response) => response.json())
  .then((data) => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => res.json())
      .then((user) => {
        for (let key of Object.keys(data)) {
          const userBox = document.createElement("div");
          const showComments = document.createElement("button");
          showComments.value = `${key}`;
          showComments.textContent = "Show";
          showComments.classList.add(
            "hover-underline-animation",
            "showComments"
          );
          userBox.classList.add("userBox");
          userBox.innerHTML = `
          <div class="authorPostInfo">
          <a class="hover-underline-animation" href="./oneUser.html?user_id=${user[key].id}">Author: ${user[key].name}</a>
          <h3>Title: ${data[key].title}</h3>
          <p>Post: ${data[key].body}</p>
          </div>`;
          showComments.addEventListener("click", displayComment);
          mainDiv.append(userBox);
          userBox.append(showComments);
          const commentBox = document.createElement("div");
          function displayComment() {
            clicked = true;
            if (clicked && showComments.textContent === "Show") {
              fetch(
                "https://jsonplaceholder.typicode.com/todos/1/comments?_limit=10&_start=0"
              )
                .then((res) => res.json())
                .then((comments) => {
                  console.log(comments);
                  if (data[key].id === comments[key].id) {
                    commentBox.innerHTML = `<p>Comment title: ${comments[key].name}</p><p>Comment: ${comments[key].body}</p>`;
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
          }
        }
      });
  });
