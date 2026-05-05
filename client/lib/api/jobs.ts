import api from './axios';

export const getJobs = () => api.get('/jobs');

export const updateJobStatus = (id: string, status: string) =>
  api.patch(`/jobs/${id}`, { status });
