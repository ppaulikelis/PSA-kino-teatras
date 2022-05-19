import axios from 'axios';

const API_URL = 'http://localhost:6310/api/moviehall';

class HallService {
  get(id) {
    return axios.get(API_URL + '/get/' + id);
  }
  add(hall) {
    return axios.post(API_URL, hall);
  }
  delete(id) {
    return axios.delete(API_URL + '/' + id);
  }
  getHall(id) {
    return axios.get(API_URL + '/' + id);
  }
  edit(hall) {
    return axios.put(API_URL, hall);
  }
}
export default new HallService();
