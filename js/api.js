const BASE_URL = 'https://28.javascript.pages.academy/kekstagram';

const Route = {
  UPLOAD: '/data',
  SEND: ''
};
const Method = {
  GET: 'GET',
  POST: 'POST'
};

const ErrorText = {
  UPLOAD: 'Не удалось загрузить фотографии. Попробуйте обновить страницу.',
  SEND: 'Не удалось отправить фото. Попробуйте ещё раз.',
};

const load = (route, errorText, method = Method.GET, body = null) =>
  fetch(`${BASE_URL}${route}`, {method, body})
    .then((response) => {
      if (!response.ok) {
        throw new Error(errorText);
      }
      return response.json();
    })
    .catch(() => {
      throw new Error(errorText);
    });

const uploadPhotos = () => load(Route.UPLOAD, ErrorText.UPLOAD);

const sendPhoto = (body) => load(Route.SEND, ErrorText.SEND, Method.POST, body);

export { uploadPhotos, sendPhoto };
