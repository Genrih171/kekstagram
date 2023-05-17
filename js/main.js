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

const idComment = getValueCounter();
const avatarNumber = createRandomIntegerFromRange(1, 6);

const indexMessage = createRandomIntegerFromRange(0, COMMENTS.length - 1);
const numberOfMessage = createRandomIntegerFromRange(1, 2);
const createCommentMessage = () => {
  const previousMessage = [];

  for (let i = 0; i < numberOfMessage(); i++) {
    let currentMesssage = COMMENTS[indexMessage()];
    while (previousMessage.includes(currentMesssage)) {
      currentMesssage = COMMENTS[indexMessage()];
    }
    previousMessage.push(currentMesssage);
  }

  return previousMessage.join(' ');
};

const commentMessage = () => createCommentMessage();

const indexName = createRandomIntegerFromRange(0, NAMES.length - 1);
const commenter = () => NAMES[indexName()];

const getRandomComment = () => {
  const randomComment = {
    id: idComment(),
    avatar: `img/avatar-${avatarNumber()}.svg`,
    message: createCommentMessage(),
    name: commenter(),
  };

  return randomComment;
};

const numberOfComments = createRandomIntegerFromRange(1, 5);

const createCommentsToPhoto = () => Array.from({length: numberOfComments()}, getRandomComment);


// Свойства случайно сгенерированного фото.

const randomIdPhoto = createRandomIntegerFromRangeNoRepeats(1, MAX_ARRAY_LENGTH);
const randomUrl = createRandomIntegerFromRangeNoRepeats(1, MAX_ARRAY_LENGTH);
const randomNumberDescription = createRandomIntegerFromRangeNoRepeats(1, MAX_ARRAY_LENGTH);
const numberOfLikes = createRandomIntegerFromRange(15, 200);

const getRandomPhoto = () => {
  const randomPhoto = {
    id: randomIdPhoto(),
    url: `photos/${randomUrl()}.jpg`,
    description: `Описание#${randomNumberDescription()}`,
    likes: numberOfLikes(),
    comments: createCommentsToPhoto(),
  };

  return randomPhoto;
};

const getPhoto = () => Array.from({length: MAX_ARRAY_LENGTH}, getRandomPhoto);

export {getPhoto as getArrayOfPhoto};
