import { renderThumbnails } from './thumbnails.js';
import { renderGallery } from './gallery.js';
import { uploadPhotos } from './api.js';
import { showAlert } from './util.js';
import { addFilters } from './filters.js';
import './img-upload-form.js';

uploadPhotos()
  .then((data) => {
    renderThumbnails(data);
    renderGallery(data);
    addFilters(data, renderThumbnails);
  })
  .catch((err) => showAlert(err.message));


