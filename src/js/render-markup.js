import imagesTpl from '../templates/images.hbs';
import MicroModal from 'micromodal';

import refs from './refs';

function renderMarkup(data) {
  const markup = imagesTpl(data);

  refs.galleryRoot.insertAdjacentHTML('beforeend', markup);

  refs.galleryRoot.addEventListener('click', openModal);
}

function openModal(event) {
  event.preventDefault();

  if (event.target.nodeName !== 'IMG') {
    return;
  }

  setLargeImage('', '');

  MicroModal.show('modal-1', {
    awaitOpenAnimation: true,
    awaitCloseAnimation: true,
    disableScroll: true,
  });

  const largeImageUrl = event.target.dataset.source;
  const largeImageAlt = event.target.alt;

  setLargeImage(largeImageUrl, largeImageAlt);
}

function setLargeImage(imageUrl, imageAlt) {
  refs.modalImage.src = imageUrl;
  refs.modalImage.alt = imageAlt;
}

export default renderMarkup;
