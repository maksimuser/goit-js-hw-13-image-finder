import refs from './refs';

const loadMoreBtn = {
  enable() {
    refs.loadMoreBtn.disabled = false;
    refs.loadMoreBtnLabel.textContent = 'load more';
    refs.loadMoreBtnSpinner.classList.add('is-hidden');
  },
  disable() {
    refs.loadMoreBtn.disabled = true;
    refs.loadMoreBtnLabel.textContent = 'Loading...';
    refs.loadMoreBtnSpinner.classList.remove('is-hidden');
  },
  show() {
    refs.loadMoreBtn.classList.remove('is-hidden');
  },
  hide() {
    refs.loadMoreBtn.classList.add('is-hidden');
  },
};

export default loadMoreBtn;
