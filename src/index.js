import './sass/styles.scss';
import refs from './js/refs';
import apiService from './js/api-service';
import renderMarkup from './js/render-markup';
import loadMoreBtn from './js/load-more-btn';

const debounce = require('lodash.debounce');

const debouncedInput = debounce(() => {
  apiService.query = refs.searchForm.query.value;

  handlerClean();

  apiService.resetPage();

  getImages();
}, 1000);

refs.searchForm.addEventListener('input', debouncedInput);

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

function handlerClean() {
  refs.galleryRoot.innerHTML = '';
  refs.searchForm.reset();
}
