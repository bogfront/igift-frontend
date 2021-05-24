import { $axios } from '../../utils/axios';

const endpoint = '/orders/create';

export function create (data) {
  return $axios.post(endpoint, data);
}
