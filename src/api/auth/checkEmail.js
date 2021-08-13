import { $axios } from '../../utils/axios';

export function checkEmail (email) {
  return $axios.get(`/auth/email/check-email/${email}`);
}
