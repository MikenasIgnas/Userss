const headerContainer = document.getElementById("headerContainer");

createHeader = () => {
  const header = document.createElement("div");
  const headerItems = document.createElement("div");
  const homeElement = document.createElement("a");
  const usersElement = document.createElement("a");
  const postsElement = document.createElement("a");
  const albumsElement = document.createElement("a");
  header.classList.add("header");
  headerItems.classList.add("headerItems");
  homeElement.classList.add("hover-underline-animation");
  usersElement.classList.add("hover-underline-animation");
  postsElement.classList.add("hover-underline-animation");
  albumsElement.classList.add("hover-underline-animation");
  homeElement.textContent = "HOME";
  usersElement.textContent = "USERS";
  postsElement.textContent = "POSTS";
  albumsElement.textContent = "ALBUMS";
  homeElement.href = "./index.html";
  usersElement.href = "./allUsers.html";
  postsElement.href = "./allUsersPosts.html";
  albumsElement.href = "./allUserAlbums.html";
  headerContainer.append(header);
  header.append(headerItems);
  headerItems.append(homeElement, usersElement, postsElement, albumsElement);
};
createHeader();
