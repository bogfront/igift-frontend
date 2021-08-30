import { $axios } from '../../utils/axios';

const endpoint = '/product/update-wrap';

export function updateWrap (data) {
  return $axios.post(endpoint, data);
}
