import imagesTpl from '../templates/images.hbs';
import refs from './refs';

function renderMarkup(data) {
  const markup = imagesTpl(data);
  refs.galleryRoot.insertAdjacentHTML('beforeend', markup);
}

export default renderMarkup;
