'use client';

import api from '@/lib/api/axios';
import { createJob, updateJob } from '@/lib/api/jobs';
import { Job } from '@/types';
import { X } from 'lucide-react';
import { useSession } from 'next-auth/react';
import { useEffect, useRef, useState } from 'react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  job?: Job | null;
}

const inputClass =
  'w-full h-10 bg-white border-[1.5px] border-[#dee2e6] rounded-lg px-3 text-sm text-on-surface focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-colors';

const labelClass =
  'block text-sm font-semibold tracking-wide text-on-surface-variant mb-1';

export default function AddJobModal({
  isOpen,
  onClose,
  onSuccess,
  job,
}: Props) {
  const [company, setCompany] = useState('');
  const [role, setRole] = useState('');
  const [location, setLocation] = useState('');
  const [dateApplied, setDateApplied] = useState(
    new Date().toISOString().split('T')[0],
  );
  const [applicationURL, setApplicationURL] = useState('');
  const [status, setStatus] = useState('Applied');
  const [jobDescription, setJobDescription] = useState('');
  const [resume, setResume] = useState<File | null>(null);
  const [coverLetter, setCoverLetter] = useState<File | null>(null);

  const [loading, setLoading] = useState(false);

  const resumeRef = useRef<HTMLInputElement | null>(null);
  const coverLetterRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (job) {
      setCompany(job.company);
      setRole(job.role);
      setLocation(job.location ?? '');
      setDateApplied(job.dateApplied?.split('T')[0] ?? '');
      setApplicationURL(job.applicationURL ?? '');
      setStatus(job.status);
      setJobDescription(job.jobDescription ?? '');
    } else {
      setCompany('');
      setRole('');
      setLocation('');
      setDateApplied(new Date().toISOString().split('T')[0]);
      setApplicationURL('');
      setStatus('Applied');
      setJobDescription('');
    }
  }, [job]);

  if (!isOpen) {
    return null;
  }

  async function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();

    const formData = new FormData();

    formData.append('company', company);
    formData.append('role', role);
    formData.append('location', location);
    formData.append('dateApplied', dateApplied);
    formData.append('applicationURL', applicationURL);
    formData.append('status', status);
    formData.append('jobDescription', jobDescription);
    if (resume) formData.append('resume', resume);
    if (coverLetter) formData.append('coverLetter', coverLetter);

    setLoading(true);
    if (job) {
      await updateJob(job._id, formData);
    } else {
      await createJob(formData);
    }
    setLoading(false);

    setCompany('');
    setRole('');
    setLocation('');
    setDateApplied(new Date().toISOString().split('T')[0]);
    setApplicationURL('');
    setStatus('Applied');
    onSuccess();
    setResume(null);
    setCoverLetter(null);
    if (resumeRef.current) {
      // CLEAR RESUME UPLOAD INPUT
    }
    if (coverLetterRef.current) {
      // CLEAR COVER LETTER UPLOAD INPUT
    }
  }

  function handleResumeChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files) {
      setResume(e.target.files[0]);
    }
  }

  function handleCoverLetterChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files) {
      setCoverLetter(e.target.files[0]);
    }
  }

  async function handleDownload(jobId: string, type: 'resume' | 'coverLetter') {
    const res = await api.get(`/jobs/${jobId}/${type}`, {
      responseType: 'blob',
    });
    const url = window.URL.createObjectURL(res.data);
    const a = document.createElement('a');
    a.href = url;
    a.download = '';
    a.click();
    window.URL.revokeObjectURL(url);
  }

  return (
    <div
      className='fixed inset-0 bg-black/40 z-50 flex items-center justify-center'
      onClick={onClose}
    >
      <div
        className='bg-white rounded-2xl p-6 w-full max-w-lg mx-4'
        style={{ boxShadow: '0 12px 24px rgba(26, 26, 46, 0.08)' }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className='flex items-center justify-between px-6 py-5 border-b border-[#dee2e6]'>
          <h2 className='text-xl font-semibold tracking-tight text-on-surface'>
            {job ? 'Edit Job' : 'Add Job'}
          </h2>
          <button
            onClick={onClose}
            className='text-on-surface-variant hover:text-on-surface transition-colors'
          >
            <X size={20} />
          </button>
        </div>
        <form onSubmit={handleSubmit} className='px-6 py-5 space-y-4'>
          <div className='grid grid-cols-2 gap-4'>
            <div>
              <label className={labelClass}>Company</label>
              <input
                type='text'
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                required
                className={inputClass}
              />
            </div>
            <div>
              <label className={labelClass}>Role</label>
              <input
                type='text'
                value={role}
                onChange={(e) => setRole(e.target.value)}
                required
                className={inputClass}
              />
            </div>
          </div>

          <div className='grid grid-cols-2 gap-4'>
            <div>
              <label className={labelClass}>Location</label>
              <input
                type='text'
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className={inputClass}
              />
            </div>
            <div>
              <label className={labelClass}>Date Applied</label>
              <input
                type='date'
                value={dateApplied}
                onChange={(e) => setDateApplied(e.target.value)}
                required
                className={inputClass}
              />
            </div>
          </div>

          <div className='grid grid-cols-2 gap-4'>
            <div>
              <label className={labelClass}>Application URL</label>
              <input
                type='text'
                value={applicationURL}
                onChange={(e) => setApplicationURL(e.target.value)}
                className={inputClass}
              />
            </div>
            <div>
              <label className={labelClass}>Status</label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                required
                className={inputClass}
              >
                <option value='Applied'>Applied</option>
                <option value='Interviewing'>Interviewing</option>
                <option value='Offer'>Offer</option>
                <option value='Rejected'>Rejected</option>
              </select>
            </div>
          </div>

          <div>
            <label className={labelClass}>Job Description</label>
            <textarea
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              rows={3}
              className='w-full bg-white border-[1.5px] border-[#dee2e6] rounded-lg px-3 py-2 text-sm text-on-surface focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-colors resize-none'
            />
          </div>

          <div className='flex justify-between'>
            <div className='w-[45%]'>
              <label className={labelClass}>Resume</label>
              {job?.resume ? (
                <button
                  type='button'
                  onClick={() => handleDownload(job._id, 'resume')}
                  className='text-sm font-semibold text-primary hover:underline'
                >
                  Download Resume
                </button>
              ) : (
                <label
                  htmlFor='resume-upload'
                  className='flex items-center justify-between h-10 w-full bg-white border-[1.5px] border-[#dee2e6] rounded-lg px-3 text-sm text-on-surface-variant cursor-pointer hover:border-primary transition-colors'
                >
                  <span className='truncate'>
                    {resume ? resume.name : 'Choose file...'}
                  </span>
                  <span className='text-xs font-semibold text-primary shrink-0 ml-2'>
                    Browse
                  </span>
                  <input
                    id='resume-upload'
                    type='file'
                    name='resume'
                    onChange={handleResumeChange}
                    ref={resumeRef}
                    className='hidden'
                  />
                </label>
              )}
            </div>
            <div className='w-[45%]'>
              <label className={labelClass}>Cover Letter</label>
              {job?.coverLetter ? (
                <button
                  type='button'
                  onClick={() => handleDownload(job._id, 'coverLetter')}
                  className='text-sm font-semibold text-primary hover:underline'
                >
                  Download Cover Letter
                </button>
              ) : (
                <label
                  htmlFor='coverletter-upload'
                  className='flex items-center justify-between h-10 w-full bg-white border-[1.5px] border-[#dee2e6] rounded-lg px-3 text-sm text-on-surface-variant sursor-pointer hover:border-primary transition-colors'
                >
                  <span className='truncate'>
                    {coverLetter ? coverLetter.name : 'Choose file...'}
                  </span>
                  <span className='text-xs font-semibold text-primary shrink-0 ml-2'>
                    Browse
                  </span>
                  <input
                    id='coverletter-upload'
                    type='file'
                    name='coverLetter'
                    onChange={handleCoverLetterChange}
                    ref={coverLetterRef}
                    className='hidden'
                  />
                </label>
              )}
            </div>
          </div>

          <div className='flex justify-end gap-3 pt-2'>
            <button
              type='button'
              onClick={onClose}
              className='px-4 py-2 text-sm font-semibold border border-primary text-primary rounded-lg hover:bg-primary/10 transition-colors'
            >
              Cancel
            </button>
            <button
              type='submit'
              disabled={loading}
              className='px-4 py-2 text-sm font-semibold bg-primary text-white rounded-lg hover:bg-primary/90 disabled:opacity-50 transition-colors'
            >
              {loading ? 'Saving...' : job ? 'Save Changes' : 'Add Job'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
