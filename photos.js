import { createHeader } from './header.js';

const queryParams = document.location.search;
const urlParams = new URLSearchParams(queryParams);

const userPhotos = document.getElementById('photos');
const albumId = urlParams.get('album_id');

createHeader();
const getPhotos = async () => {
  const res = await fetch(`https://jsonplaceholder.typicode.com/albums/${albumId}/photos`);
  const photos = await res.json();
  if (photos.length > 0) {
    photos.map((photo) => {
      const imageContainer = document.createElement('div');
      imageContainer.classList.add('swiper-slide');
      imageContainer.innerHTML = `<img  style="width:400px" src="${photo.url}">`;
      userPhotos.append(imageContainer);
    });
  }
};
getPhotos();
