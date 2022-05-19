import axios from 'axios';

const API_URL = 'http://localhost:6310/api/movietheatre';

class TheaterService {
  get() {
    return axios.get(API_URL);
  }
  delete(id) {
    return axios.delete(API_URL + '/' + id);
  }
  add(theater) {
    return axios.post(API_URL, theater);
  }
}
export default new TheaterService();
