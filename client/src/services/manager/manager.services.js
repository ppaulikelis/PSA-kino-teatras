import axios from 'axios';

const API_URL = 'http://localhost:6310/api/movie';

class MovieService {
  getMovies() {
    return axios.get(API_URL);
  }
  addMovie(data) {
    return axios.post(API_URL, data);
  }
  removeMovie(id) {
    return axios.delete(API_URL + '/' + id);
  }
  getMovie(id) {
    return axios.get(API_URL + '/' + id);
  }
  updateMovie(data) {
    return axios.put(API_URL, data);
  }
}
export default new MovieService();
