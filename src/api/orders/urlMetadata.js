import { $axios } from '../../utils/axios';

const endpoint = '/product/url-data';

export function urlMetadata (params) {
  return $axios.post(endpoint, params);
}
