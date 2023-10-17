import axios from '@/utils/axios';

export const signIn = (username: string, password: string, ...reset: any) =>
  axios.post('/auth/signin', { username, password, ...reset });

export const signUp = (username: string, password: string) =>
  axios.post('/auth/signup', { username, password });
