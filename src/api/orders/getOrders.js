import { $axios } from '../../utils/axios';

const endpoint = '/orders';

export function getOrders (params) {
  return $axios.post(endpoint, params);
}
