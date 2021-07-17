import { $axios } from '../../utils/axios';

const endpoint = '/orders';

export function getOrder (id) {
  return $axios.get(`${endpoint}/${id}`);
}
