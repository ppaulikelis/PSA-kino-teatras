import axios from 'axios';

const API_URL = 'http://localhost:6310/api/ordertable';

class OrderTableServices {
  add(orderTable) {
    return axios.post(API_URL, orderTable);
  }
}

export default new OrderTableServices();
