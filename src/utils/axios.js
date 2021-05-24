import axios from 'axios';

export const $axios = axios.create({
  baseURL: `http://130.193.37.246:8838/api/`
})
