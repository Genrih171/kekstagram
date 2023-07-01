const uploadPhotos = () => fetch('https://28.javascript.pages.academy/kekstagram/data')
  .then((response) => {
    if (!response.ok) {
      throw new Error('Не удалось загрузить фотографии. Попробуйте обновить страницу.');
    }
    return response.json();
  })
  .catch(() => {
    throw new Error('Не удалось загрузить фотографии. Попробуйте обновить страницу.');
  });

export { uploadPhotos };
