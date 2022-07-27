const frontPageUserPhotos = async (itemId, i, albumTitleId) => {
  const photoTest = document.getElementById(itemId);
  const albumTitle = document.getElementById(albumTitleId);
  albumTitle.style.textAlign = 'center';
  albumTitle.style.paddingLeft = '20px';
  albumTitle.style.paddingRight = '20px';
  albumTitle.style.paddingTop = '20px';
  const res = await fetch('https://jsonplaceholder.typicode.com/users');
  const users = await res.json();
  const res2 = await fetch('https://jsonplaceholder.typicode.com/albums/?_embed=photos');
  const photos = await res2.json();
  const firstAlbumTitleAndPhotos = photos.filter((value, index) => index % 10 === 0);
  firstAlbumTitleAndPhotos.map((albumInfo) => {
    const photoContainer = document.createElement('div');
    const photoTitleContainer = document.createElement('div');
    albumTitle.textContent = `Album Title: ${firstAlbumTitleAndPhotos[i].title}`;
    photoTitleContainer.classList.add('photoTitleContainer');
    photoContainer.classList.add('swiper-slide');
    photoContainer.innerHTML = `<img src="${albumInfo.photos[i].thumbnailUrl}" />`;
    photoTitleContainer.textContent = `Photo: ${albumInfo.photos[i].title}`;
    const button = document.createElement('a');
    button.textContent = 'See all albums';
    button.href = `./oneUserAlbums.html?user_id=${users[i].id}`;
    button.classList.add('hover-underline-animation');

    photoTest.append(photoContainer);
    photoContainer.prepend(photoTitleContainer);
    photoContainer.append(button);
    button.style.marginBottom = '20px';
  });
};
// eslint-disable-next-line no-plusplus
for (let i = 1; i < 10; i++) {
  frontPageUserPhotos(`photoTest${i}`, i, `albumTitle${i}`);
}
