import { Job } from '@/types';
import api from './axios';

export const getJobs = () => api.get('/jobs');

export const getJobsPaginated = (page: number) => api.get(`/jobs?page=${page}`);

export const updateJobStatus = (id: string, status: string) =>
  api.patch(`/jobs/${id}`, { status });

export const createJob = (data: Partial<Job>) => api.post('/jobs', data);

export const deleteJob = (id: string) => api.delete(`/jobs/${id}`);

export const getDashboardJobs = () => api.get('/jobs/stats');

export const getActivityChartJobs = (period: string) =>
  api.get(`/jobs/chart?period=${period}`);
