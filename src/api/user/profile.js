import { $axios } from '../../utils/axios';

const endpoint = '/user/profile';

export function profile () {
  return $axios.get(endpoint);
}
