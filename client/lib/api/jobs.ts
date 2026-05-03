import api from './axios';

export const getJobs = () => api.get('/jobs');
