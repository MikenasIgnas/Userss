import { firstLetterUpercase } from './utility.js';
import { createHeader } from './header.js';

const queryParams = document.location.search;
const urlParams = new URLSearchParams(queryParams);
const searchWord = urlParams.get('search_word');

const albumId = urlParams.get('album_id');
const albumBox = document.createElement('div');

const albumsWrapper = document.getElementById('albums-wrapper');
const fieldSet = document.createElement('fieldset');
const legend = document.createElement('legend');
albumBox.classList.add('albumBox');
fieldSet.classList.add('fieldset');
legend.textContent = 'Search Results';

createHeader();
fetch('https://jsonplaceholder.typicode.com/users')
  .then((res) => res.json())
  .then((users) => {
    const albumContainer = document.createElement('ul');
    albumContainer.textContent = 'Albums: ';

    albumContainer.classList.add('albumContainer');
    users.map((user) => {
      fetch(`https://jsonplaceholder.typicode.com/albums?album_id=${albumId}`)
        .then((res) => res.json())
        .then((albums) => {
          albums.map((album) => {
            if (album.userId === user.id) {
              const userName = document.createElement('p');
              userName.textContent = `Author: ${user.name}`;
              userName.style.textDecoration = 'underline';
              if (album.title.includes(searchWord)) {
                const albumListItemms = document.createElement('li');
                albumListItemms.innerHTML = `${firstLetterUpercase(album.title)
                } (<a href="./photos.html?album_id=${albumId}">Photos</a>)`;
                albumContainer.append(userName, albumListItemms);
              }
            }
            fieldSet.append(legend, albumContainer);
            albumsWrapper.append(fieldSet);
          });
        });
    });
  });
