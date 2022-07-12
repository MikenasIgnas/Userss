const mainDiv = document.getElementById("mainDiv");
const queryParams = document.location.search;
const urlParams = new URLSearchParams(queryParams);
const userId = urlParams.get("user_id");

fetch("https://jsonplaceholder.typicode.com/todos/1/posts")
  .then((res) => res.json())
  .then((posts) => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => res.json())
      .then((names) => {
        upperCase = (objectItem) => {
          const textContent = objectItem;
          upperCaseText =
            textContent.charAt(0).toUpperCase() +
            textContent.slice(1).toLowerCase();
          return upperCaseText;
        };
        filterPosts = (idNumber) => {
          const userPosts = posts.filter(
            (element) => element.userId === idNumber
          );
          return userPosts;
        };
        filterNames = (idNumber) => {
          const userName = names.filter((element) => element.id === idNumber);
          return userName;
        };

        function createPost(userPost, authorName) {
          const userPostElement = document.createElement("div");
          const userName = document.createElement("div");
          userPostElement.classList.add("userPostElement");
          for (let key in Object.keys(userPost)) {
            const userPostInfoContainer = document.createElement("div");
            userPostInfoContainer.classList.add("userPostInfoContainer");
            const userPostBody = document.createElement("p");
            const userPostTitle = document.createElement("h4");
            userPostTitle.textContent = "Title:  " + userPost[key].title;

            userPostBody.innerHTML = `<strong>Post:</strong>  ${upperCase(
              userPost[key].body
            )}`;

            userPostInfoContainer.append(userPostTitle, userPostBody);
            userPostElement.prepend(userName);
            userPostElement.append(userPostInfoContainer);
            mainDiv.append(userPostElement);
          }
          for (let key in Object.keys(authorName)) {
            const userNames = authorName[key].name;

            userName.innerHTML = `<a  style=font-size:25px class="hover-underline-animation"  href="./oneUser.html?user_id=${authorName[key].id}">${userNames}</a>`;
          }
        }
        createPost(filterPosts(1), filterNames(1));
        createPost(filterPosts(2), filterNames(2));
        createPost(filterPosts(3), filterNames(3));
        createPost(filterPosts(4), filterNames(4));
        createPost(filterPosts(5), filterNames(5));
        createPost(filterPosts(6), filterNames(6));
        createPost(filterPosts(7), filterNames(7));
        createPost(filterPosts(8), filterNames(8));
        createPost(filterPosts(9), filterNames(9));
        createPost(filterPosts(10), filterNames(10));
      });
  });
