import {isEscapeKey} from './util.js';

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
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    onCloseBigPicture();
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
  if (photoComments.children.length === dataComments.length) {
    commentsLoader.classList.add('hidden');
  }
};

let onCommentsLoaderClick;

function openBigPicture (evt, dataPhotos) {
  const photoData = dataPhotos.find((photo) => +evt.target.dataset.thumbnailId === photo.id);
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

function onCloseBigPicture () {
  bigPicture.classList.add('hidden');

  document.body.classList.remove('modal-open');

  commentsLoader.classList.remove('hidden');
  commentsLoader.removeEventListener('click', onCommentsLoaderClick);
  onCommentsLoaderClick = null;
  document.removeEventListener('keydown', onDocumentKeydown);
}

const renderGallery = (dataPhotos) => {
  pictureList.addEventListener('click', (evt) => {
    if (evt.target.closest('.picture')) {
      evt.preventDefault();
      openBigPicture(evt, dataPhotos);
    }
  });

  buttonClosePicture.addEventListener('click', onCloseBigPicture);
};

export { renderGallery };
