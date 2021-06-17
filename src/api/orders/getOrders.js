import { $axios } from '../../utils/axios';

const endpoint = '/orders';

export function getOrders () {
  return $axios.get(endpoint);
}
