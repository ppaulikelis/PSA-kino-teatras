import axios from 'axios';

const API_URL = 'http://localhost:6310/api/movie';

class MovieService {
  get() {
    return axios.get(API_URL);
  }
  add(formData) {
    return axios.post(API_URL, formData);
  }
  delete(id) {
    return axios.delete(API_URL + '/' + id);
  }
  getMovie(id) {
    return axios.get(API_URL + '/' + id);
  }
  edit(formData) {
    return axios.put(API_URL, formData);
  }
}
export default new MovieService();
