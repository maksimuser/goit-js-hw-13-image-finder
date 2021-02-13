const axios = require('axios');
const apiKey = '20233756-b895373d2640f193f5e1d61a5';

export default {
  searchQuery: '',
  page: 1,

  async fetchImages() {
    axios.defaults.baseURL = `https://pixabay.com/api/?image_type=photo&orientation=horizontal&q=${this.query}&page=${this.page}&per_page=12&key=${apiKey}`;

    try {
      const res = await axios.get();
      const data = res.data.hits;

      this.incrementPage();

      return data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },

  resetPage() {
    this.page = 1;
  },

  get query() {
    return this.searchQuery;
  },

  set query(value) {
    this.searchQuery = value;
  },

  incrementPage() {
    this.page += 1;
  },
};
