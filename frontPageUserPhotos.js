createSwiper = (itemId, userIndex, albumTitleId) => {
  const photoTest = document.getElementById(itemId);
  const albumTitle = document.getElementById(albumTitleId);
  albumTitle.style.textAlign = "center";
  albumTitle.style.paddingLeft = "20px";
  albumTitle.style.paddingRight = "20px";
  albumTitle.style.paddingTop = "20px";
  fetch("https://jsonplaceholder.typicode.com/albums/?_embed=photos")
    .then((res) => res.json())
    .then((data) => {
      const firstAlbumTitleAndPhotos = data.filter(function (value, index) {
        return index % 10 === 0;
      });
      firstAlbumTitleAndPhotos.map((data) => {
        albumTitle.textContent =
          "Album Title: " + firstAlbumTitleAndPhotos[userIndex].title;
        const photoContainer = document.createElement("div");
        const photoTitleContainer = document.createElement("div");
        photoTitleContainer.classList.add("photoTitleContainer");
        photoContainer.classList.add("swiper-slide");
        photoContainer.innerHTML = `<img src="${data.photos[userIndex].thumbnailUrl}" />`;
        photoTitleContainer.textContent =
          "Photo: " + data.photos[userIndex].title;

        photoTest.append(photoContainer);
        photoContainer.prepend(photoTitleContainer);
      });
    });
};
createSwiper("photoTest", 0, "albumTitle1");
createSwiper("photoTest2", 1, "albumTitle2");
createSwiper("photoTest3", 2, "albumTitle3");
createSwiper("photoTest4", 9, "albumTitle4");
createSwiper("photoTest5", 4, "albumTitle5");
createSwiper("photoTest6", 5, "albumTitle6");
createSwiper("photoTest7", 6, "albumTitle7");
createSwiper("photoTest8", 7, "albumTitle8");
createSwiper("photoTest9", 8, "albumTitle9");
createSwiper("photoTest10", 9, "albumTitle10");
