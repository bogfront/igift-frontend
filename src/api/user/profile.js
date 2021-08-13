import { $axios } from '../../utils/axios';

const endpoint = '/users/profile';

export function profile () {
  return $axios.get(endpoint);
}
