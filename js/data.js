import {getRandomInteger, getValueCounter, createRandomIntegerFromRangeNoRepeats} from './util.js';

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

// Свойства случайно сгенерированного комментария.

const idComment = getValueCounter();
const getAvatarNumber = () => getRandomInteger(1, 6);

const getIndexMessage = () => getRandomInteger(0, COMMENTS.length - 1);
const getNumberOfMessage = () => getRandomInteger(1, 2);
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

const getIndexName = () => getRandomInteger(0, NAMES.length - 1);
const getCommenterName = () => NAMES[getIndexName()];

const createRandomComment = () => {
  const randomComment = {
    id: idComment(),
    avatar: `img/avatar-${getAvatarNumber()}.svg`,
    message: createCommentMessages(),
    name: getCommenterName(),
  };

  return randomComment;
};

const getNumberOfComments = () => getRandomInteger(1, 5);

const createCommentsToPhoto = () => Array.from({length: getNumberOfComments()}, createRandomComment);


// Свойства случайно сгенерированного фото.

const idPhoto = createRandomIntegerFromRangeNoRepeats(1, MAX_ARRAY_LENGTH);
const urlNumber = createRandomIntegerFromRangeNoRepeats(1, MAX_ARRAY_LENGTH);
const numberDescription = createRandomIntegerFromRangeNoRepeats(1, MAX_ARRAY_LENGTH);
const getNumberOfLikes = () => getRandomInteger(15, 200);

const getRandomPhoto = () => {
  const randomPhoto = {
    id: idPhoto(),
    url: `photos/${urlNumber()}.jpg`,
    description: `Описание#${numberDescription()}`,
    likes: getNumberOfLikes(),
    comments: createCommentsToPhoto(),
  };

  return randomPhoto;
};

const createPhotos = () => Array.from({length: MAX_ARRAY_LENGTH}, getRandomPhoto);

export {createPhotos};
