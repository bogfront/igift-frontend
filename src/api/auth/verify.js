import { $axios } from '../../utils/axios';

export function verify (token) {
  return $axios.get(`/auth/email/verify/${token}`);
}
