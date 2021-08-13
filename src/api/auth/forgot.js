import { $axios } from '../../utils/axios';

export function forgot (email) {
  return $axios.get(`auth/email/forgot-password/${email}`);
}
