import { $axios } from '../../utils/axios';

const endpoint = '/product/create';

export function create (data) {
  return $axios.post(endpoint, data);
}
