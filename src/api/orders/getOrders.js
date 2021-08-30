import { $axios } from '../../utils/axios';

export function getOrders (userId, status) {
  return $axios.get(`/order/orders/${userId}/${status}`);
}
