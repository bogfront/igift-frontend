import { $axios } from '../../utils/axios';

const endpoint = '/auth/register';

export function register (data) {
  return $axios.post(endpoint, data);

}
