const MAX_ARRAY_LENGTH = 25;

const COMMENTS = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

const NAMES = ['Emma', 'Jacob', 'Nora', 'Lucas', 'Sophie', 'Oscar', 'Ella', 'Emil', 'Olivia', 'Henrik', 'Ada', 'Noah', 'Ingrid', 'Axel'];

// Функции значений из диапазона и счетчики.

const getRandomInteger = (min, max) => {
  const lower = Math.ceil(Math.min(Math.abs(min), Math.abs(max)));
  const upper = Math.floor(Math.max(Math.abs(min), Math.abs(max)));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

const getValueCounter = () => {
  let currentValue = 0;

  return function () {
    currentValue += 1;
    return currentValue;
  };
};

const createRandomIntegerFromRange = (min, max) => function () {
  return getRandomInteger(min, max);
};

const createRandomIntegerFromRangeNoRepeats = (min, max) => {
  const previousValues = [];

  return function () {
    let currentValue = getRandomInteger(min, max);
    while (previousValues.includes(currentValue)) {
      currentValue = getRandomInteger(min, max);
    }
    previousValues.push(currentValue);
    return currentValue;
  };
};

// Свойства случайно сгенерированного комментария.

const getIdComment = getValueCounter();
const getAvatarNumber = createRandomIntegerFromRange(1, 6);

const getIndexMessage = createRandomIntegerFromRange(0, COMMENTS.length - 1);
const getNumberOfMessage = createRandomIntegerFromRange(1, 2);
const getExclusiveMessage = () => {
  const previousMessage = [];

  return function () {
    let currentMessage = COMMENTS[getIndexMessage()];
    while (previousMessage.includes(currentMessage)) {
      currentMessage = COMMENTS[getIndexMessage()];
    }
    previousMessage.push(currentMessage);
    return currentMessage;
  };
};

const createCommentMessages = () => Array.from({length: getNumberOfMessage()}, getExclusiveMessage()).join(' ');

const getIndexName = createRandomIntegerFromRange(0, NAMES.length - 1);
const getCommenterName = () => NAMES[getIndexName()];

const createRandomComment = () => {
  const randomComment = {
    id: getIdComment(),
    avatar: `img/avatar-${getAvatarNumber()}.svg`,
    message: createCommentMessages(),
    name: getCommenterName(),
  };

  return randomComment;
};

const getNumberOfComments = createRandomIntegerFromRange(1, 5);

const createCommentsToPhoto = () => Array.from({length: getNumberOfComments()}, createRandomComment);


// Свойства случайно сгенерированного фото.

const getIdPhoto = createRandomIntegerFromRangeNoRepeats(1, MAX_ARRAY_LENGTH);
const getUrlNumber = createRandomIntegerFromRangeNoRepeats(1, MAX_ARRAY_LENGTH);
const getNumberDescription = createRandomIntegerFromRangeNoRepeats(1, MAX_ARRAY_LENGTH);
const getNumberOfLikes = createRandomIntegerFromRange(15, 200);

const getRandomPhoto = () => {
  const randomPhoto = {
    id: getIdPhoto(),
    url: `photos/${getUrlNumber()}.jpg`,
    description: `Описание#${getNumberDescription()}`,
    likes: getNumberOfLikes(),
    comments: createCommentsToPhoto(),
  };

  return randomPhoto;
};

const getPhotos = () => Array.from({length: MAX_ARRAY_LENGTH}, getRandomPhoto);

export {getPhotos};
