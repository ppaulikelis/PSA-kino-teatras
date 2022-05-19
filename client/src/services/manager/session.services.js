import axios from 'axios';

const API_URL = 'http://localhost:6310/api/session';

class sessionService {
  get() {
    return axios.get(API_URL);
  }
  getData() {
    return axios.get(API_URL + '/getData');
  }
  add(session) {
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
