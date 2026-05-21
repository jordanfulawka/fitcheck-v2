import { Job } from '@/types';
import api from './axios';

export const getJobs = () => api.get('/jobs');

export const getJobsPaginated = (
  page: number,
  search?: string,
  status?: string,
) => {
  const params: Record<string, string | number> = { page };
  if (search) {
    params.search = search;
  }
  if (status) {
    params.status = status;
  }
  return api.get(`/jobs`, { params });
};

export const updateJobStatus = (id: string, status: string) =>
  api.patch(`/jobs/${id}`, { status });

export const createJob = (data: Partial<Job>) => api.post('/jobs', data);

export const deleteJob = (id: string) => api.delete(`/jobs/${id}`);

export const getDashboardJobs = () => api.get('/jobs/stats');

export const getActivityChartJobs = (period: string) =>
  api.get(`/jobs/chart?period=${period}`);

export const updateJob = (id: string, data: Partial<Job>) =>
  api.patch(`/jobs/${id}`, data);
