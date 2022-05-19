import axios from 'axios';

const API_URL = 'http://localhost:6310/api/subscription';

class subscriptionService {
  addSubscription(genre, id) {
    return axios.post(API_URL + '/' + genre + '/' + id);
  }
}
export default new subscriptionService();
