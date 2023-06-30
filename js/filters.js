const filters = [{
  class: 'effects__preview--none',
  css: '',
  units: '',
  'slider options': {},
},
{
  class: 'effects__preview--chrome',
  css: 'grayscale',
  units: '',
  'slider options': {
    range: {
      min: 0,
      max: 1
    },
    start: 1,
    step: 0.1
  },
},
{
  class: 'effects__preview--sepia',
  css: 'sepia',
  units: '',
  'slider options': {
    range: {
      min: 0,
      max: 1
    },
    start: 1,
    step: 0.1
  },
},
{
  class: 'effects__preview--marvin',
  css: 'invert',
  units: '%',
  'slider options': {
    range: {
      min: 0,
      max: 100
    },
    start: 100,
    step: 1
  },
},
{
  class: 'effects__preview--phobos',
  css: 'blur',
  units: 'px',
  'slider options': {
    range: {
      min: 0,
      max: 3
    },
    start: 3,
    step: 0.1
  },
},
{
  class: 'effects__preview--heat',
  css: 'brightness',
  units: '',
  'slider options': {
    range: {
      min: 1,
      max: 3
    },
    start: 3,
    step: 0.1
  },
},];

const getFilter = (thumnailPreview) => filters.find((filter) => thumnailPreview.matches(`.${filter.class}`));

export { getFilter };
