import { renderThumbnails } from './thumbnails.js';
import { renderGallery } from './gallery.js';
import './img-upload-form.js';
import { uploadPhotos } from './api.js';
import { showAlert } from './util.js';

uploadPhotos()
  .then((data) => {
    renderThumbnails(data);
    renderGallery(data);
  })
  .catch((err) => showAlert(err.message));
