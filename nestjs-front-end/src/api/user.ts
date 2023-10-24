import axios from '@/utils/axios';

export const getAllUsers = (data: any) =>
  axios.get('/user/get', { params: data });
