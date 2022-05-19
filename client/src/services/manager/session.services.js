import axios from 'axios';

const API_URL = 'http://localhost:6310/api/session';

class sessionService {
  get() {
    return axios.get(API_URL);
  }
  getHalls() {
    return axios.get(API_URL + '/getHalls');
  }
  getMovies() {
    return axios.get(API_URL + '/getMovies');
  }

  addSession(session) {
    return axios.post(API_URL, session);
  }
  delete(id) {
    return axios.delete(API_URL + '/' + id);
  }
  getSession(id) {
    return axios.get(API_URL + '/' + id);
  }
  edit(hall) {
    return axios.put(API_URL, hall);
  }
}
export default new sessionService();
