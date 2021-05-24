import axios from 'axios';

export const $axios = axios.create({
  baseURL: `http://localhost:8838/api/`
})
