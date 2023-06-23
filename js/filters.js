const sliderFilters = {
  'effects__preview--chrome': {
    range: {
      min: 0,
      max: 1
    },
    start: 1,
    step: 0.1
  },
  'effects__preview--sepia': {
    range: {
      min: 0,
      max: 1
    },
    start: 1,
    step: 0.1
  },
  'effects__preview--marvin': {
    range: {
      min: 0,
      max: 100
    },
    start: 100,
    step: 1
  },
  'effects__preview--phobos': {
    range: {
      min: 0,
      max: 3
    },
    start: 3,
    step: 0.1
  },
  'effects__preview--heat': {
    range: {
      min: 1,
      max: 3
    },
    start: 3,
    step: 0.1
  },
};

const getFilterForSlider = (nameFilter) => sliderFilters[nameFilter];

const getFilterForImage = (image, value) => {
  if (image.matches('.effects__preview--chrome')) {
    return `grayscale(${value})`;
  }
  if (image.matches('.effects__preview--sepia')) {
    return `sepia(${value})`;
  }
  if (image.matches('.effects__preview--marvin')) {
    return `invert(${value}%)`;
  }
  if (image.matches('.effects__preview--phobos')) {
    return `blur(${value}px)`;
  }
  if (image.matches('.effects__preview--heat')) {
    return `brightness(${value})`;
  }
};

export {getFilterForSlider, getFilterForImage};
