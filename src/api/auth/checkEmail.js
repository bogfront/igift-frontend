import { $axios } from '../../utils/axios';

const endpoint = '/auth/check-email';

export function checkEmail (data) {
  return $axios.post(endpoint, data);
}
