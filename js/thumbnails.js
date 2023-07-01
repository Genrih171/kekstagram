const templatePicture = document.querySelector('#picture').content;
const pictureList = document.querySelector('.pictures');

const renderThumbnails = (photos) => {
  photos.forEach((photo) => {
    const thumbnail = templatePicture.cloneNode(true);

    thumbnail.querySelector('.picture__img').dataset.thumbnailId = photo.id;
    thumbnail.querySelector('.picture__img').src = photo.url;
    thumbnail.querySelector('.picture__img').alt = photo.description;
    thumbnail.querySelector('.picture__likes').textContent = photo.likes;
    thumbnail.querySelector('.picture__comments').textContent = photo.comments.length;

    pictureList.append(thumbnail);
  }
  );
};

export { renderThumbnails };
