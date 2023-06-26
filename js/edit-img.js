import { getFilterForSlider, getFilterForImage, getFilterPreview } from './filters.js';

const imgUploadForm = document.querySelector('#upload-select-image');
const imgPreview = imgUploadForm.querySelector('.img-upload__preview img');

//  Мастштаб

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
  connect: 'lower',
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

const switchFilterToOriginal = () => {
  imgPreview.className = '';
  imgPreview.style.filter = '';
  sliderContainer.classList.add('hidden');
  sliderElement.classList.add('hidden');
};

const switchFilter = (evt) => {
  const effect = getFilterPreview(
    evt.target
      .closest('.effects__label')
      .querySelector('.effects__preview')
  );
  imgPreview.className = '';
  imgPreview.classList.add(effect);
  sliderContainer.classList.remove('hidden');
  sliderElement.classList.remove('hidden');

  sliderElement.noUiSlider.updateOptions(getFilterForSlider(effect));
};

effectsList.addEventListener('click', (evt) => {
  if (evt.target.closest('[for="effect-none"]')) {
    switchFilterToOriginal();
    return;
  }
  if (evt.target.closest('.effects__label')) {
    switchFilter(evt);
  }
});

export {switchFilterToOriginal};
