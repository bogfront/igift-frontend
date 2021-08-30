import { $axios } from '../../utils/axios';

export function changeStatus (orderId, status) {
  return $axios.get(`/order/${orderId}/status/${status}`);
}
