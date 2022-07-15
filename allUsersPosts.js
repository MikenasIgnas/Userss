const mainDiv = document.getElementById("mainDiv");
const queryParams = document.location.search;
const urlParams = new URLSearchParams(queryParams);
const userId = urlParams.get("user_id");

fetch("https://jsonplaceholder.typicode.com/users/?_embed=posts")
  .then((res) => res.json())
  .then((users) => {
    console.log(users);
    users.map((user) => {
      console.log(user.name);
      console.log(user.id);
      const userPostElement = document.createElement("div");
      const userName = document.createElement("div");
      userPostElement.classList.add("userPostElement");
      user.posts.map((posts) => {
        console.log(posts.title);
        console.log(posts.body);
        const userPostInfoContainer = document.createElement("div");
        userPostInfoContainer.classList.add("userPostInfoContainer");
        const commentContainer = document.createElement("div");
        const userPostBody = document.createElement("p");
        const userPostTitle = document.createElement("h4");
        userPostTitle.textContent = "Title:  " + posts.title;
        userPostBody.innerHTML = `<strong>Post:</strong>  ${posts.body}`;
        userPostInfoContainer.prepend(
          userPostTitle,
          userPostBody,
          commentContainer
        );
        userPostElement.prepend(userName);
        userPostElement.append(userPostInfoContainer);
        mainDiv.append(userPostElement);
        userName.innerHTML = `<a style=font-size:20px class="hover-underline-animation" href="./oneUser.html?user_id=${user.id}">${user.name}</a>`;
        userPostElement.prepend(userName);
        mainDiv.append(userPostElement);
      });
    });
  });
