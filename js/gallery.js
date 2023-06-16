import {isEscapeKey} from './util.js';
import {newPhotos} from './data.js';

const pictureList = document.querySelector('.pictures');

const bigPicture = document.querySelector('.big-picture');
const buttonClosePicture = bigPicture.querySelector('#picture-cancel');
const bigPictureImg = bigPicture.querySelector('.big-picture__img img');
const likesCount = bigPicture.querySelector('.likes-count');
const commentsCount = bigPicture.querySelector('.comments-count');
const photoDescription = bigPicture.querySelector('.social__caption');
const photoComments = bigPicture.querySelector('.social__comments');

const onDocumentKeydown = (evt) => {
  evt.preventDefault();
  if (isEscapeKey) {
    closeBigPicture();
  }
};

const getPhotoData = (evt, photos) => {
  let photoData;
  for (let i = 0; i < photos.length; i++) {
    if (+evt.target.id === photos[i].id) {
      photoData = photos[i];
      break;
    }
  }
  return photoData;
};

const addComment = ({avatar, name, message}) => {
  const comment = document.createElement('li');
  comment.classList.add('social__comment');
  comment.innerHTML = '<img class="social__picture" src="#" alt="" width="35" height="35"><p class="social__text"></p>';

  comment.querySelector('img').src = avatar;
  comment.querySelector('img').alt = name;
  comment.querySelector('p').textContent = message;

  if (photoComments.children.length >= 5) {
    comment.classList.add('hidden');
  }

  photoComments.append(comment);
};

function openBigPicture (evt) {
  const photoData = getPhotoData(evt, newPhotos);
  const {url, likes, comments, description} = photoData;

  bigPictureImg.src = url;
  likesCount.textContent = likes;
  commentsCount.textContent = comments.length;
  photoDescription.textContent = description;

  photoComments.innerHTML = '';
  photoData.comments.forEach(addComment);

  bigPicture.classList.remove('hidden');

  document.body.classList.add('modal-open');

  document.addEventListener('keydown', onDocumentKeydown);
}

function closeBigPicture () {
  bigPicture.classList.add('hidden');

  document.body.classList.remove('modal-open');

  document.removeEventListener('keydown', onDocumentKeydown);
}

pictureList.addEventListener('click', (evt) => {
  evt.preventDefault();
  if (evt.target.closest('.picture')) {
    openBigPicture(evt);
  }
});

buttonClosePicture.addEventListener('click', () => {
  closeBigPicture();
});

bigPicture.querySelector('.social__comment-count').classList.add('hidden');
bigPicture.querySelector('.comments-loader').classList.add('hidden');
