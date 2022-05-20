import axios from 'axios';

const API_URL = 'http://localhost:6310/api/snack';

class snackService {
  get() {
    return axios.get(API_URL);
  }

  addSnack(snack) {
    return axios.post(API_URL, snack);
  }
  delete(id) {
    return axios.delete(API_URL + '/' + id);
  }
  getSnack(id) {
    return axios.get(API_URL + '/' + id);
  }
  edit(hall) {
    return axios.put(API_URL, hall);
  }
}
export default new snackService();
