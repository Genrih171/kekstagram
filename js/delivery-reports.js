import { isEscapeKey, onStopPropagation } from './util.js';

const showModal = (result) => {
  document.body.append(document.querySelector(`#${result}`).content.cloneNode(true));

  const report = document.querySelector(`.${result}`);

  const removeReport = () => {
    report.remove();
    document.removeEventListener('keydown', onDocumentKeydown);
  };

  function onDocumentKeydown (evt) {
    if (isEscapeKey(evt)) {
      evt.preventDefault();
      removeReport();
    }
  }

  report.querySelector(`.${result}__inner`).addEventListener('click', onStopPropagation);
  report.querySelector(`.${result}__button`).addEventListener('click', () => removeReport());
  report.addEventListener('click', () => removeReport());

  document.addEventListener('keydown', onDocumentKeydown);
};

const showSuccess = () => showModal('success');
const showError = () => showModal('error');

export { showSuccess, showError };
