import { $axios } from '../../utils/axios';

const endpoint = '/order';

export function getOrder (id) {
  return $axios.get(`${endpoint}/${id}`);
}
