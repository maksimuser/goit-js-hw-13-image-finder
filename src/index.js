import refs from './js/refs';
import apiService from './js/api-service';
import renderMarkup from './js/render-markup';

import loadMoreBtn from './js/load-more-btn';

import './sass/styles.scss';

const debounce = require('lodash.debounce');

const debouncedInputCallback = debounce(() => {
  const form = refs.searchForm;
  apiService.query = form.elements.query.value;

  clearMarkup();
  form.reset();

  apiService.resetPage();
  getImages();
}, 500);

refs.searchForm.addEventListener('input', debouncedInputCallback);

refs.loadMoreBtn.addEventListener('click', getImages);

function getImages() {
  loadMoreBtn.disable();

  apiService.fetchImages().then(hits => {
    renderMarkup(hits);
    loadMoreBtn.show();
    loadMoreBtn.enable();

    window.scrollTo({
      top: document.documentElement.offsetHeight,
      behavior: 'smooth',
    });
  });
}

export default function clearMarkup() {
  refs.imagesContainer.innerHTML = '';
}
