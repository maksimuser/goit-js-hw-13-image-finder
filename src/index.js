import './sass/styles.scss';
import refs from './js/refs';
import apiService from './js/api-service';
import renderMarkup from './js/render-markup';
import loadMoreBtn from './js/load-more-btn';
import PNotify from './js/notifications';
import debounce from 'lodash.debounce';

const debouncedInput = debounce(() => {
  apiService.query = refs.searchForm.query.value.trim();

  apiService.resetPage();

  clearMarkup();
  if (apiService.query === '') {
    loadMoreBtn.hide();
    PNotify.notice({
      text: 'Please, enter request!',
      shadow: true,
      delay: 3000,
    });
    return;
  }
  PNotify.success({
    text: `Your request ${apiService.query}`,
    shadow: true,
    delay: 3000,
  });

  getImagesOnClick();
}, 1000);

refs.searchForm.addEventListener('input', debouncedInput);

refs.loadMoreBtn.addEventListener('click', getImagesOnClick);

function getImagesOnClick() {
  loadMoreBtn.disable();

  apiService.fetchImages().then(data => {
    if (!data.length) {
      loadMoreBtn.show();
      PNotify.error({
        text: `Oops. Something went wrong. Please, enter correct request!`,
        shadow: true,
        delay: 3000,
      });
      return;
    } else if (data.length < 12) {
      renderMarkup(data);
      loadMoreBtn.hide();
      PNotify.notice({
        text: 'It is all at your request!',
        shadow: true,
        delay: 3000,
      });
      return;
    }

    const NUMBER = 52;
    const beforeRenderMarkup = document.documentElement.offsetHeight;

    renderMarkup(data);

    const afterRenderMarkup = document.documentElement.offsetHeight;

    window.scrollTo({
      top:
        afterRenderMarkup - (afterRenderMarkup - beforeRenderMarkup + NUMBER),
    });

    loadMoreBtn.enable();
    loadMoreBtn.show();
  });
}

export default function clearMarkup() {
  refs.galleryRoot.innerHTML = '';
}
