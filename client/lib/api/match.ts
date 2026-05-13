import api from './axios';

export const getMatchScore = (resume: File, jobDescription: string) => {
  const formData = new FormData();
  formData.append('resume', resume);
  formData.append('jobDescription', jobDescription);

  return api.post('/match', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
};
