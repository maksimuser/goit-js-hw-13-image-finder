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
        text: 'Please, enter your request!',
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
