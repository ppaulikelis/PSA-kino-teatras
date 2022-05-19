import axios from 'axios';

const API_URL = 'http://localhost:6310/api/chairtype';

class ChairTypeService {
  get() {
    return axios.get(API_URL);
  }
  add(chair) {
    return axios.post(API_URL, chair);
  }
  delete(id) {
    return axios.delete(API_URL + '/' + id);
  }
  edit(chair) {
    return axios.put(API_URL, chair);
  }
  getChairType(hallid) {
    return axios.get(API_URL + '/' + hallid);
  }
}
export default new ChairTypeService();
