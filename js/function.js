const getStringLength = (string, maxLength) => string.length <= maxLength;

const getIsPalindrom = (string) => {
  let isPalindrom = true;

  string = string.toLowerCase();
  string = string.replaceAll(' ', '');

  const stringLength = string.length;

  for (let i = 0; i <= stringLength / 2; i++) {
    if (string[i] !== string[stringLength - (i + 1)]) {
      isPalindrom = false;
      break;
    }
  }

  return isPalindrom;
};

const getNumber = (string) => {
  let currentNumber = '';

  string += '';
  string = string.replaceAll(' ', '');

  const stringLength = string.length;

  for (let i = 0; i < stringLength; i++) {
    if (isNaN(+string[i])) {
      continue;
    }
    currentNumber += string[i];
  }

  return (currentNumber !== '') ? +currentNumber : NaN;
};

const addStringStart = (originalString, maxLength, additionalCharacters) => {
  if (originalString.length >= maxLength) {
    return originalString;
  }

  let newString = originalString;

  while (newString.length + additionalCharacters.length <= maxLength) {
    newString = additionalCharacters + newString;
  }

  if (newString.length === maxLength) {
    return newString;
  }

  for (let i = -1; newString.length < maxLength; i--) {
    if (newString.length + additionalCharacters.slice(0, i).length === maxLength) {
      newString = additionalCharacters.slice(0, i) + newString;
      break;
    }
  }

  return newString;
};

export {
  getStringLength,
  getIsPalindrom,
  getNumber,
  addStringStart
};
