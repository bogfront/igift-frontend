import { $axios } from '../../utils/axios';

const endpoint = '/order/create';

export function create (data) {
  return $axios.post(endpoint, data);
}
