import axios from 'axios';

const API_URL = 'http://localhost:6310/api/seat';

class SeatService {
  getData() {
    return axios.get(API_URL + '/getData');
  }
  add(seat) {
    return axios.post(API_URL, seat);
  }
  edit(seat) {
    return axios.put(API_URL, seat);
  }
  getSeats(hallid) {
    return axios.get(API_URL + '/' + hallid);
  }
}
export default new SeatService();
