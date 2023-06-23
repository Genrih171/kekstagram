import {isEscapeKey} from './util.js';
import { getFilterForSlider, getFilterForImage } from './filters.js';

const imgUploadForm = document.querySelector('#upload-select-image');
const imgUploadOverlay = imgUploadForm.querySelector('.img-upload__overlay');

const hashtags = imgUploadForm.querySelector('.text__hashtags');
const description = imgUploadForm.querySelector('.text__description');

const uploadInput = imgUploadForm.querySelector('#upload-file');
const buttonCloseOverlay = imgUploadForm.querySelector('#upload-cancel');

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    onCloseOverlay();
  }
};

uploadInput.addEventListener('change', () => {
  imgUploadOverlay.classList.remove('hidden');
  document.body.classList.add('modal-open');

  document.addEventListener('keydown', onDocumentKeydown);
});

function onCloseOverlay () {
  imgUploadOverlay.classList.add('hidden');
  document.body.classList.remove('modal-open');

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

const hashtagPattern = /^#[a-zа-яё0-9]{1,19}$/i;

const validateHashtags = (value) => {
  if (hashtags.value === '') {
    return true;
  }

  const validHashtags = value.split(' ');

  if (validHashtags.length > 5) {
    return false;
  }

  for (const hashtag of validHashtags) {
    if (!hashtagPattern.test(hashtag)) {
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
  pristine.validate();
});

hashtags.addEventListener('keydown', (evt) => evt.stopPropagation());
description.addEventListener('keydown', (evt) => evt.stopPropagation());

hashtags.addEventListener('focusout', () => {
  if (hashtags.value === '') {
    pristine.reset();
  }
});


// Редактирование изображения
//  Мастштаб

const imgPreview = imgUploadForm.querySelector('.img-upload__preview img');

const scaleControl = imgUploadForm.querySelector('.scale__control--value');
const buttonScaleSmaller = imgUploadForm.querySelector('.scale__control--smaller');
const buttonScaleBigger = imgUploadForm.querySelector('.scale__control--bigger');

let scaleValue = 100;
scaleControl.value = `${scaleValue}%`;
imgPreview.style.transform = `scale(${scaleValue / 100})`;

buttonScaleSmaller.addEventListener('click', () => {
  if (scaleValue > 25) {
    scaleValue -= 25;
    scaleControl.value = `${scaleValue}%`;
    imgPreview.style.transform = `scale(${scaleValue / 100})`;
  }
});

buttonScaleBigger.addEventListener('click', () => {
  if (scaleValue < 100) {
    scaleValue += 25;
    scaleControl.value = `${scaleValue}%`;
    imgPreview.style.transform = `scale(${scaleValue / 100})`;
  }
});

// Редактирование изображения
//  Фильтры

const sliderContainer = imgUploadForm.querySelector('.img-upload__effect-level');
const sliderElement = sliderContainer.querySelector('.effect-level__slider');
const effectValue = sliderContainer.querySelector('.effect-level__value');
const effectsList = imgUploadForm.querySelector('.effects__list');

noUiSlider.create(sliderElement, {
  range: {
    min: 0,
    max: 1
  },
  step: 0.1,
  start: 1,
  format: {
    to: (value) => {
      if (Number.isInteger(value)) {
        return value.toFixed(0);
      }
      return value.toFixed(1);
    },
    from: (value) => parseFloat(value)
  },
});

sliderElement.noUiSlider.on('update', () => {
  const sliderValue = sliderElement.noUiSlider.get();
  effectValue.value = sliderValue;
  imgPreview.style.filter = getFilterForImage(imgPreview, sliderValue);
});

sliderContainer.classList.add('hidden');
sliderElement.classList.add('hidden');

effectsList.addEventListener('click', (evt) => {
  if (evt.target.closest('[for="effect-none"]')) {
    imgPreview.className = '';
    imgPreview.style.filter = '';
    sliderContainer.classList.add('hidden');
    sliderElement.classList.add('hidden');
    return;
  }
  if (evt.target.closest('.effects__label')) {
    const effect = evt.target
      .closest('.effects__label')
      .querySelector('.effects__preview')
      .className
      .split('  ')[1];
    imgPreview.className = '';
    imgPreview.classList.add(`${effect}`);
    sliderContainer.classList.remove('hidden');
    sliderElement.classList.remove('hidden');

    sliderElement.noUiSlider.updateOptions(getFilterForSlider(effect));
  }
});

// imgUploadOverlay.classList.remove('hidden');
