import axios from 'axios';

const API_URL = 'http://localhost:6310/api/movie';

class MovieService {
  getMovies() {
    return axios.get(API_URL);
  }
  addMovie(formData) {
    return axios.post(API_URL, formData);
  }
  removeMovie(id) {
    return axios.delete(API_URL + '/' + id);
  }
  getMovie(id) {
    return axios.get(API_URL + '/' + id);
  }
  updateMovie(formData) {
    return axios.put(API_URL, formData);
  }
}
export default new MovieService();
