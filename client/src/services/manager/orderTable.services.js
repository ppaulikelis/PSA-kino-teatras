import axios from 'axios';

const API_URL = 'http://localhost:6310/api/order';

class OrderTableServices {
  add(orderTable) {
    return axios.post(API_URL + '/addOrder', orderTable);
  }
  getSnacks() {
    return axios.get(API_URL + '/getSnacks');
  }
  addSnacks(orderedSnack) {
    return axios.post(API_URL + '/addSnacks', orderedSnack);
  }
  getMovies() {
    return axios.get(API_URL + '/getMovies');
  }
  getSessions() {
    return axios.get(API_URL + '/getSessions');
  }
  getSeats() {
    return axios.get(API_URL + '/getSeats');
  }
  addTicket(ticket) {
    return axios.post(API_URL + '/addTicket', ticket);
  }
  getOrder(id) {
    return axios.get(API_URL + '/getOrder/' + id);
  }
  delete(id) {
    return axios.delete(API_URL + '/' + id);
  }
  confirm(id) {
    return axios.put(API_URL + '/' + id);
  }
}

export default new OrderTableServices();
