import refs from './refs';
import imagesTpl from '../templates/markup-images.hbs';

function renderMarkup(images) {
  const markup = imagesTpl(images);
  refs.imagesContainer.insertAdjacentHTML('beforeend', markup);
}
export default renderMarkup;
