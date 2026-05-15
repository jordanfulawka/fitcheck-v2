import axios from 'axios';
import { getSession } from 'next-auth/react';

const api = axios.create({
  baseURL: 'http://localhost:3001/api',
});

api.interceptors.request.use(async (config) => {
  const session = await getSession();
  if (session?.user?.email) {
    config.headers['x-user-email'] = session.user.email;
  }
  return config;
});

export default api;
