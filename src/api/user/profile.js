import { $axios } from '../../utils/axios';

export function profile (email) {
  return $axios.get(`/users/user/${email}`);
}
