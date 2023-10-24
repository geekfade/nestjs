import axios from '@/utils/axios';

export const getAllRoles = () => axios.get('/roles');
