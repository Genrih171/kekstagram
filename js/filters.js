const getFilter = (image, value) => {
  if (image.matches('.effects__preview--chrome')) {
    return {
      class: 'effects__preview--chrome',
      css: `grayscale(${value})`,
      'slider options': {
        range: {
          min: 0,
          max: 1
        },
        start: 1,
        step: 0.1
      },
    };
  }
  if (image.matches('.effects__preview--sepia')) {
    return {
      class: 'effects__preview--sepia',
      css: `sepia(${value})`,
      'slider options': {
        range: {
          min: 0,
          max: 1
        },
        start: 1,
        step: 0.1
      },
    };
  }
  if (image.matches('.effects__preview--marvin')) {
    return {
      class: 'effects__preview--marvin',
      css: `invert(${value}%)`,
      'slider options': {
        range: {
          min: 0,
          max: 100
        },
        start: 100,
        step: 1
      },
    };
  }
  if (image.matches('.effects__preview--phobos')) {
    return {
      class: 'effects__preview--phobos',
      css: `blur(${value}px)`,
      'slider options': {
        range: {
          min: 0,
          max: 3
        },
        start: 3,
        step: 0.1
      },
    };
  }
  if (image.matches('.effects__preview--heat')) {
    return {
      class: 'effects__preview--heat',
      css: `brightness(${value})`,
      'slider options': {
        range: {
          min: 1,
          max: 3
        },
        start: 3,
        step: 0.1
      },
    };
  } else {
    return {
      class: '',
      css: '',
      'slider options': {},
    };
  }
};

export { getFilter };
