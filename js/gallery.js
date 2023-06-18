import {isEscapeKey} from './util.js';
import {dataPhotos} from './data.js';

const pictureList = document.querySelector('.pictures');

const bigPicture = document.querySelector('.big-picture');
const buttonClosePicture = bigPicture.querySelector('#picture-cancel');
const bigPictureImg = bigPicture.querySelector('.big-picture__img img');
const likesCount = bigPicture.querySelector('.likes-count');
const commentsCount = bigPicture.querySelector('.comments-count');
const photoDescription = bigPicture.querySelector('.social__caption');

const photoComments = bigPicture.querySelector('.social__comments');
const commentsLoader = bigPicture.querySelector('.comments-loader');
const uploadedComments = bigPicture.querySelector('.uploaded-comments');

const onDocumentKeydown = (evt) => {
  evt.preventDefault();
  if (isEscapeKey) {
    closeBigPicture();
  }
};

const addComment = (dataComments) => {
  const uploadedCommentsCount = photoComments.children.length;

  for (let i = uploadedCommentsCount; i < dataComments.length && i < uploadedCommentsCount + 5; i++) {
    const comment = document.createElement('li');
    comment.classList.add('social__comment');
    comment.innerHTML = '<img class="social__picture" src="#" alt="" width="35" height="35"/><p class="social__text"></p>';

    const {avatar, name, message} = dataComments[i];
    const commentAvatar = comment.querySelector('img');
    commentAvatar.src = avatar;
    commentAvatar.alt = name;
    comment.querySelector('p').textContent = message;

    photoComments.append(comment);
  }

  uploadedComments.textContent = photoComments.children.length;
};

let onCommentsLoaderClick;

function openBigPicture (evt) {
  const photoData = dataPhotos.find((photo) => +evt.target.id === photo.id);
  const {url, likes, comments, description} = photoData;

  bigPictureImg.src = url;
  likesCount.textContent = likes;
  commentsCount.textContent = comments.length;
  photoDescription.textContent = description;

  photoComments.innerHTML = '';
  onCommentsLoaderClick = () => addComment(comments);
  onCommentsLoaderClick();
  commentsLoader.addEventListener('click', onCommentsLoaderClick);

  bigPicture.classList.remove('hidden');

  document.body.classList.add('modal-open');

  document.addEventListener('keydown', onDocumentKeydown);
}

function closeBigPicture () {
  bigPicture.classList.add('hidden');

  document.body.classList.remove('modal-open');

  commentsLoader.removeEventListener('click', onCommentsLoaderClick);
  onCommentsLoaderClick = null;
  document.removeEventListener('keydown', onDocumentKeydown);
}

pictureList.addEventListener('click', (evt) => {
  evt.preventDefault();
  if (evt.target.closest('.picture')) {
    openBigPicture(evt);
  }
});

buttonClosePicture.addEventListener('click', closeBigPicture);
