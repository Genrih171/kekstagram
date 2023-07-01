const ALERT_SHOW_TIME = 5000;

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

const isEscapeKey = (evt) => evt.key === 'Escape';

const onStopPropagation = (evt) => evt.stopPropagation();

const showAlert = (message) => {
  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = '100';
  alertContainer.style.position = 'absolute';
  alertContainer.style.display = 'inline-block';
  alertContainer.style.width = '60%';
  alertContainer.style.left = '20%';
  alertContainer.style.top = '35%';
  alertContainer.style.right = '0';
  alertContainer.style.padding = '10px 3px';
  alertContainer.style.fontSize = '30px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.backgroundColor = 'rgb(252, 84, 255)';
  alertContainer.style.borderRadius = '15px';

  alertContainer.style.color = 'black';
  alertContainer.style.lineHeight = '30px';
  alertContainer.textContent = message;

  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, ALERT_SHOW_TIME);
};

export {getRandomInteger, getValueCounter, createRandomIntegerFromRangeNoRepeats, isEscapeKey, onStopPropagation, showAlert};
