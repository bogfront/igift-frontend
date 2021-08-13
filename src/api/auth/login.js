import { $axios } from '../../utils/axios';

const endpoint = '/auth/email/login';

export function login (data) {
  return $axios.post(endpoint, data);
}
