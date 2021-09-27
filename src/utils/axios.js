import axios from 'axios';

export const $axios = axios.create({
  baseURL: `http://localhost:8383/api/`,
  // baseURL: `/api/`,
})
