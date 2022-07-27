import { createHeader } from './header.js';
import { firstLetterUpercase } from './utility.js';

const queryParams = document.location.search;
const urlParams = new URLSearchParams(queryParams);
const userId = urlParams.get('user_id');
const homePageContainer = document.getElementById('homePageContainer');

const albumBox = document.createElement('div');
albumBox.classList.add('albumBox');

createHeader();
const oneUserAlbums = async () => {
  const res = await fetch(`https://jsonplaceholder.typicode.com/albums?user_id=${userId}`);
  const userAlbums = await res.json();
  userAlbums.map((album) => {
    if (Number(userId) === album.userId) {
      const albumContainer = document.createElement('div');
      albumContainer.classList.add('albumContainer');
      const albumListItemms = document.createElement('div');

      albumListItemms.innerHTML = `<a class="hover-underline-animation" href="./photos.html?user_id=${userId}&album_id=${
        album.id
      }">${firstLetterUpercase(album.title)}</a>`;
      homePageContainer.append(albumBox);
      albumBox.append(albumContainer);
      albumContainer.append(albumListItemms);
    }
  });
};

oneUserAlbums();
