import { $axios } from '../../utils/axios';

const endpoint = '/order/comment';

export function comment (data) {
  return $axios.post(endpoint, data);
}
