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
        const userNames = names;
        const user1Name = userNames.filter((element) => element.id === 1);
        const user2Name = userNames.filter((element) => element.id === 2);
        const user3Name = userNames.filter((element) => element.id === 3);
        const user4Name = userNames.filter((element) => element.id === 4);
        const user5Name = userNames.filter((element) => element.id === 5);
        const user6Name = userNames.filter((element) => element.id === 6);
        const user7Name = userNames.filter((element) => element.id === 7);
        const user8Name = userNames.filter((element) => element.id === 8);
        const user9Name = userNames.filter((element) => element.id === 9);
        const user10Name = userNames.filter((element) => element.id === 10);

        const postElements = posts;
        const user1Posts = postElements.filter(
          (element) => element.userId === 1
        );
        const user2Posts = postElements.filter(
          (element) => element.userId === 2
        );
        const user3Posts = postElements.filter(
          (element) => element.userId === 3
        );
        const user4Posts = postElements.filter(
          (element) => element.userId === 4
        );
        const user5Posts = postElements.filter(
          (element) => element.userId === 5
        );
        const user6Posts = postElements.filter(
          (element) => element.userId === 6
        );
        const user7Posts = postElements.filter(
          (element) => element.userId === 7
        );
        const user8Posts = postElements.filter(
          (element) => element.userId === 8
        );
        const user9Posts = postElements.filter(
          (element) => element.userId === 9
        );
        const user10Posts = postElements.filter(
          (element) => element.userId === 10
        );

        function createPost(userPost, authorName) {
          const userPostElement = document.createElement("div");
          const userName = document.createElement("p");
          userPostElement.classList.add("userPostElement");
          for (let key in Object.keys(userPost)) {
            const userPostInfo = document.createElement("p");
            const userInput = upperCase(userPost[key].body);
            userPostInfo.append(userInput);

            userPostElement.append(userPostInfo);
            userPostElement.prepend(userName);
            mainDiv.append(userPostElement);
          }
          for (let key in Object.keys(authorName)) {
            const userNames = authorName[key].name;

            userName.innerHTML = `<a  style=font-size:25px class="hover-underline-animation"  href="./oneUser.html?user_id=${authorName[key].id}">${userNames}</a>`;
          }
        }
        createPost(user1Posts, user1Name);
        createPost(user2Posts, user2Name);
        createPost(user3Posts, user3Name);
        createPost(user4Posts, user4Name);
        createPost(user5Posts, user5Name);
        createPost(user6Posts, user6Name);
        createPost(user7Posts, user7Name);
        createPost(user8Posts, user8Name);
        createPost(user9Posts, user9Name);
        createPost(user10Posts, user10Name);
      });
  });
