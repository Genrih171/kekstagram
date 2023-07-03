import { isEscapeKey, onStopPropagation } from './util.js';

const showModal = (result) => {
  document.body.append(document.querySelector(`#${result}`).content.cloneNode(true));

  const report = document.querySelector(`.${result}`);

  const onDocumentKeydown = (evt) => {
    if (isEscapeKey(evt)) {
      evt.preventDefault();
      if (report) {
        report.remove();
      }
      document.removeEventListener('keydown', onDocumentKeydown);
    }
  };

  report.querySelector(`.${result}__button`).addEventListener('click', () => report.remove());
  report.querySelector(`.${result}__inner`).addEventListener('click', onStopPropagation);
  report.addEventListener('click', () => report.remove());

  document.addEventListener('keydown', onDocumentKeydown);
};

const showSuccess = () => showModal('success');
const showError = () => showModal('error');

export { showSuccess, showError };
