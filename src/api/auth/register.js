import { $axios } from '../../utils/axios';

const endpoint = '/auth/email/register';

export function register (data) {
  return $axios.post(endpoint, data);
}
