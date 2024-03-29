import { isEscapeKey, onStopPropagation } from './util.js';
import { switchEffectToOriginal } from './edit-img.js';
import { sendPhoto } from './api.js';
import { showSuccess, showError } from './delivery-reports.js';

const FILE_TYPES = ['jpg', 'jpeg', 'png'];
const HASHTAG_PATTERN = /^#[a-zа-яё0-9]{1,19}$/i;

const imgUploadForm = document.querySelector('#upload-select-image');
const imgUploadOverlay = imgUploadForm.querySelector('.img-upload__overlay');
const imgPreview = imgUploadForm.querySelector('.img-upload__preview img');

const hashtags = imgUploadForm.querySelector('.text__hashtags');
const description = imgUploadForm.querySelector('.text__description');

const uploadInput = imgUploadForm.querySelector('#upload-file');
const buttonCloseOverlay = imgUploadForm.querySelector('#upload-cancel');
const submitButton = imgUploadForm.querySelector('#upload-submit');

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt) && !document.querySelector('.error')) {
    evt.preventDefault();
    onCloseOverlay();
  }
};

const changePreview = () => {
  const file = uploadInput.files[0];
  const fileName = file.name.toLowerCase();

  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

  if (matches) {
    imgPreview.src = URL.createObjectURL(file);
  }
};

uploadInput.addEventListener('change', () => {
  changePreview();
  imgPreview.style.transform = 'scale(1)';
  switchEffectToOriginal();

  imgUploadOverlay.classList.remove('hidden');
  document.body.classList.add('modal-open');

  document.addEventListener('keydown', onDocumentKeydown);
});

function onCloseOverlay () {
  imgUploadOverlay.classList.add('hidden');
  document.body.classList.remove('modal-open');

  imgPreview.src = 'img/upload-default-image.jpg';
  uploadInput.value = '';
  hashtags.value = '';
  description.value = '';

  document.removeEventListener('keydown', onDocumentKeydown);
}

buttonCloseOverlay.addEventListener('click', onCloseOverlay);

// Валидация формы с помощью Pristine.

const pristine = new Pristine (imgUploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextTag: 'span',
  errorTextClass: 'text__error'
});

const validateHashtags = (value) => {
  if (!hashtags.value) {
    return true;
  }

  const validHashtags = value.split(' ');

  if (validHashtags.length > 5) {
    return false;
  }

  for (const hashtag of validHashtags) {
    if (!HASHTAG_PATTERN.test(hashtag)) {
      return false;
    }

    if (validHashtags.filter((el) => hashtag === el).length > 1) {
      return false;
    }
  }

  return true;
};

const validateDescription = (value) => value.length <= 140;

pristine.addValidator(hashtags, validateHashtags, 'Не правильные хэштеги!');
pristine.addValidator(description, validateDescription, 'Максимальная длина комментария 140 символов!');

imgUploadForm.addEventListener('submit', (evt) => {
  evt.preventDefault();

  const isValid = pristine.validate();
  if (isValid) {
    submitButton.disabled = true;
    sendPhoto(new FormData(evt.target))
      .then(() => {
        onCloseOverlay();
        showSuccess();
      })
      .catch(() => {
        showError();
      })
      .finally(() => {
        submitButton.disabled = false;
      });
  }
});

hashtags.addEventListener('keydown', onStopPropagation);
description.addEventListener('keydown', onStopPropagation);
