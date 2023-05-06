let getStringLength = (string, maxLength) => string.length <= maxLength;

let getIsPalindrom = function (string) {
  let isPalindrom = true;
  string = string.toLowerCase();
  string = string.replaceAll(' ', '');

  for (let i = 0; i <= string.length / 2; i++) {
    if (string[i] !== string[string.length - (i + 1)]) {
      isPalindrom = false;
      break;
    }
  }

  return isPalindrom;
};

let getNumber = function (string) {
  let currentNumber = '';
  string = string.replaceAll(' ', '');

  for (let i = 0; i <= string.length - 1; i++) {
    if (isNaN(+string[i])) {
      continue;
    }
    currentNumber += string[i];
  }

  return (currentNumber !== '') ? +currentNumber : NaN;
};

let addStringStart = function (originalString, minLength, additionalCharacters) {
  if (originalString.length >= minLength) {
    return originalString;
  }

  let extraString = '';

  while (extraString.length < minLength - originalString.length) {
    for (let i = 0; i <= additionalCharacters.length - 1; i++) {
      extraString += additionalCharacters[i];

      if (extraString.length >= minLength - originalString.length) {
        break;
      }
    }
  }

  return extraString + originalString;
};
