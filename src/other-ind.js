import './sass/styles.scss';
import refs from './js/refs';
import apiService from './js/api-service';
import renderMarkup from './js/render-markup';
import loadMoreBtn from './js/load-more-btn';
import PNotify from './js/notifications';

import debounce from 'lodash.debounce';

PNotify.info({
  text: 'Hello) Enter your request!',
  shadow: true,
  delay: 3000,
});
const debouncedInput = debounce(() => {
  apiService.query = refs.searchForm.query.value;

  apiService.resetPage();

  clearMarkup();

  getImagesOnClick();
}, 1000);

refs.searchForm.addEventListener('input', debouncedInput);

refs.loadMoreBtn.addEventListener('click', getImagesOnClick);

function getImagesOnClick() {
  loadMoreBtn.disable();

  apiService.fetchImages().then(data => {
    if (apiService.query === '') {
      loadMoreBtn.hide();
      PNotify.notice({
        text: 'Please, enter request!',
        shadow: true,
        delay: 3000,
      });
      return;
    } else if (!data.length) {
      loadMoreBtn.show();
      PNotify.error({
        text: `Oops. Something went wrong. Please, enter correct request!`,
        shadow: true,
        delay: 3000,
      });
      return;
    }

    if (data.length < 12) {
      renderMarkup(data);
      loadMoreBtn.hide();
      PNotify.notice({
        text: 'It is all at your request!',
        shadow: true,
        delay: 3000,
      });
      return;
    }

    PNotify.success({
      text: 'Your request :)',
      shadow: true,
      delay: 3000,
    });

    renderMarkup(data);

    loadMoreBtn.enable();
    loadMoreBtn.show();

    window.scrollTo({
      top: document.documentElement.offsetHeight,
      behavior: 'smooth',
    });
  });
}

export default function clearMarkup() {
  refs.galleryRoot.innerHTML = '';
}

//===============================================================
const images = document.querySelectorAll('.photo-card img');
const sentinel = document.querySelector('#sentinel');
console.log(sentinel);
const opt = {
  rootMargin: '100px',
};
const loadImages = (entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const img = entry.target;
      console.log(img);
      const src = img.dataset.lazy;

      img.src = src;

      observer.unobserve(img);
    }
  });
};
const io = new IntersectionObserver(loadImages, opt);
io.observe(sentinel);
// ============================================================
// const sentinel = document.querySelector('#sentinel');

// const opt = {
//   rootMargin: '100px',
// };

// const io = new IntersectionObserver(entries => {
//   entries.some(entry => {
//     if (entry.isIntersecting) {
//       console.log('пересечение!');

//       refs.galleryRoot.appendChild(sentinel);
//       renderMarkup(data);
//     }
//   });
// }, opt);
// io.observe(sentinel);
// =====================================================================
import './scroll';
import './modal';
import apiService from './apiService';
import updateHitsMarkup from './update-hits';
import * as PNotify from '@pnotify/core';
import '@pnotify/core/dist/BrightTheme.css';
import '@pnotify/core/dist/PNotify.css';

const debounce = require('lodash.debounce');
const listRef = document.querySelector('.gallery');
const tittleRightRef = document.querySelector('.hiddenTittleLeft');
const tittleLeftRef = document.querySelector('.hiddenTittleRight');
const serchRef = document.querySelector('.search-form');
const rootTarget = document.querySelector('.js-rootTarget');

let inputValue = '';
let i = -1;
serchRef.addEventListener(
  'input',
  debounce(event => {
    inputValue = event.target.value;

    apiService.query = inputValue;
    apiService.resetPage();
    apiService.fetchHits().then(hits => {
      updateHitsMarkup(hits);

      io.observe(rootTarget);
    });
  }, 1000),
);

const options = {
  rootMargin: '200px',
};
const io = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting && inputValue) {
      apiService.fetchHits().then(hits => {
        updateHitsMarkup(hits);
      });
    }
  });
}, options);
