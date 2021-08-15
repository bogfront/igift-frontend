import { $axios } from '../../utils/axios';

export function verify (token) {
  return $axios.get(`/email/verify/${token}`);
}
