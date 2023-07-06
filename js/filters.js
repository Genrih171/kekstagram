import { createRandomIntegerFromRangeNoRepeats, debounce } from './util.js';

const AMOUNT_RANDOM_PHOTOS = 10;

const filters = document.querySelector('.img-filters');
const filterButtons = filters.querySelectorAll('.img-filters__button');
const buttonRandomFilter = filters.querySelector('#filter-random');
const buttonDefaultFilter = filters.querySelector('#filter-default');
const buttonRaitingFilter = filters.querySelector('#filter-discussed');

filters.classList.remove('img-filters--inactive');

const removeThumbnails = () => {
  const thumbnails = document.querySelectorAll('.picture');
  for (const thumbnail of thumbnails) {
    thumbnail.remove();
  }
};

const changeButtonClass = (button) => {
  filterButtons.forEach((el) => el.classList.remove('img-filters__button--active'));
  button.classList.add('img-filters__button--active');
};

const addFilters = (photos, cb) => {
  const toggleDefaultFilter = () => {
    changeButtonClass(buttonDefaultFilter);
    removeThumbnails();
    cb(photos);
  };

  const toggleRandomFilter = () => {
    changeButtonClass(buttonRandomFilter);
    removeThumbnails();
    const randomOrder = [];
    const randomPhotoNumber = createRandomIntegerFromRangeNoRepeats(0, photos.length - 1);
    for (let i = 0; i < AMOUNT_RANDOM_PHOTOS; i++) {
      randomOrder.push(photos[randomPhotoNumber()]);
    }
    cb(randomOrder);
  };

  const toggleRaitingFilter = () => {
    changeButtonClass(buttonRaitingFilter);
    removeThumbnails();
    const sortedPhotos = photos.slice();
    sortedPhotos.sort((a, b) => b.likes - a.likes);
    cb(sortedPhotos);
  };

  buttonDefaultFilter.addEventListener('click', debounce(toggleDefaultFilter));
  buttonRandomFilter.addEventListener('click', debounce(toggleRandomFilter));
  buttonRaitingFilter.addEventListener('click', debounce(toggleRaitingFilter));
};


export {addFilters};
