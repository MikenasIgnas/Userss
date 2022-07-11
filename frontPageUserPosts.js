const mainDiv = document.getElementById("mainDiv");

fetch("https://jsonplaceholder.typicode.com/todos/1/posts")
  .then((response) => response.json())
  .then((data) => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => res.json())
      .then((user) => {
        postFilter = data.filter(function (value, index, Arr) {
          return index % 10 == 0;
        });

        for (let key of Object.keys(data)) {
          upperCase = (objectItem) => {
            const textContent = objectItem;
            upperCaseText =
              textContent.charAt(0).toUpperCase() +
              textContent.slice(1).toLowerCase();
            return upperCaseText;
          };

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
          <a class="hover-underline-animation" href="./oneUser.html?user_id=${
            postFilter[key].userId
          }">Author: ${user[key].name}</a>
          <h3>Title: ${upperCase(postFilter[key].title)}</h3>
          <p>Post: ${upperCase(postFilter[key].body)}</p>
          </div>`;

          showComments.addEventListener("click", displayComment);
          mainDiv.append(userBox);
          userBox.append(showComments);
          const commentBox = document.createElement("div");
          function displayComment() {
            clicked = true;
            if (clicked && showComments.textContent === "Show") {
              fetch("https://jsonplaceholder.typicode.com/todos/1/comments")
                .then((res) => res.json())
                .then((comments) => {
                  if (data[key].id === comments[key].id) {
                    commentBox.innerHTML = `<p>Comment title: ${upperCase(
                      comments[key].name
                    )}</p><p>Comment: ${upperCase(comments[key].body)}</p>`;
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
