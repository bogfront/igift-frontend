import { $axios } from '../../utils/axios';

const endpoint = '/orders/metadata';

export function urlMetadata (params) {
  return $axios.post(endpoint, params);
}
