import { createRandomIntegerFromRangeNoRepeats, debounce } from './util.js';

const AMOUNT_RANDOM_PHOTOS = 10;

const filters = document.querySelector('.img-filters');
const filterButtons = filters.querySelectorAll('.img-filters__button');

filters.classList.remove('img-filters--inactive');

const removeThumbnails = () => {
  const thumbnails = document.querySelectorAll('.picture');
  thumbnails.forEach((el) => el.remove());
};

const changeButtonClass = (evt) => {
  filterButtons.forEach((el) => el.classList.remove('img-filters__button--active'));
  evt.target.classList.add('img-filters__button--active');
};

const addFilters = (photos, cb) => {
  const toggleDefaultFilter = () => {
    removeThumbnails();
    cb(photos);
  };

  const toggleRandomFilter = () => {
    removeThumbnails();
    const randomOrder = [];
    const randomPhotoNumber = createRandomIntegerFromRangeNoRepeats(0, photos.length - 1);
    for (let i = 0; i < AMOUNT_RANDOM_PHOTOS; i++) {
      randomOrder.push(photos[randomPhotoNumber()]);
    }
    cb(randomOrder);
  };

  const toggleRaitingFilter = () => {
    removeThumbnails();
    const sortedPhotos = photos.slice();
    sortedPhotos.sort((a, b) => b.comments.length - a.comments.length);
    cb(sortedPhotos);
  };

  const toogleFilter = (evt) => {
    switch (evt.target.closest('.img-filters__button').id) {
      case 'filter-default':
        toggleDefaultFilter();
        break;
      case 'filter-random':
        toggleRandomFilter();
        break;
      case 'filter-discussed':
        toggleRaitingFilter();
        break;
      default:
        break;
    }
  };

  const debounceFilter = debounce(toogleFilter);

  const onFilterButtons = (evt) => {
    if (evt.target.closest('.img-filters__button--active')) {
      return;
    }

    if (evt.target.closest('.img-filters__button')) {
      changeButtonClass(evt);
      debounceFilter(evt);
    }
  };

  filters.addEventListener('click', onFilterButtons);
};


export {addFilters};
