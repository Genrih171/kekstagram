import {dataPhotos} from './data.js';

const templatePicture = document.querySelector('#picture').content;
const pictureList = document.querySelector('.pictures');

const addThumbnails = (generatedPhotos) => {
  generatedPhotos.forEach((generatedPhoto) => {
    const photo = templatePicture.cloneNode(true);

    photo.querySelector('.picture__img').dataset.thumbnailId = generatedPhoto.id;
    photo.querySelector('.picture__img').src = generatedPhoto.url;
    photo.querySelector('.picture__img').alt = generatedPhoto.description;
    photo.querySelector('.picture__likes').textContent = generatedPhoto.likes;
    photo.querySelector('.picture__comments').textContent = generatedPhoto.comments.length;

    pictureList.append(photo);
  }
  );
};

addThumbnails(dataPhotos);
