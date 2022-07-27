import { createHeader } from './header.js';
import { firstLetterUpercase } from './utility.js';

const mainDiv = document.getElementById('user-info');
createHeader();
const allUserAlbums = async () => {
  const res = await fetch('https://jsonplaceholder.typicode.com/users/?_embed=albums');
  const userAlbums = await res.json();

  userAlbums.map((users) => {
    const userAlbumElement = document.createElement('div');
    const userName = document.createElement('p');
    const userAlbum = document.createElement('ul');
    users.albums.map((album) => {
      const userAlbumList = document.createElement('li');
      userAlbumElement.classList.add('userAlbumElement');
      userAlbumList.classList.add('userAlbumList');
      userAlbumList.innerHTML = `<a href="./photos.html?user_id=${
        users.id
      }&album_id=${
        album.id
      }" class="hover-underline-animation">${firstLetterUpercase(
        album.title,
      )}</a>`;
      userAlbum.append(userAlbumList);
      userAlbum.prepend(userName);
      userName.innerHTML = `<a style=font-size:20px class="hover-underline-animation" href="./oneUser.html?user_id=${users.id}">${users.name}</a>`;
      userAlbumElement.append(userAlbum);
      mainDiv.append(userAlbumElement);
      return userAlbumList;
    });
    return userAlbumElement;
  });
};

allUserAlbums();
