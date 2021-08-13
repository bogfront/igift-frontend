import { $axios } from '../../utils/axios';

const endpoint = '/auth/email/reset-password';

export function resetPassword (data) {
  return $axios.post(endpoint, data);
}
