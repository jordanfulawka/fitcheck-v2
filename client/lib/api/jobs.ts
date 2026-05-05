import api from './axios';

export const getJobs = () => api.get('/jobs');

export const getJobsPaginated = (page: number) => api.get(`/jobs?page=${page}`);

export const updateJobStatus = (id: string, status: string) =>
  api.patch(`/jobs/${id}`, { status });
