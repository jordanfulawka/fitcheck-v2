'use client';

import { createJob } from '@/lib/api/jobs';
import { X } from 'lucide-react';
import { useState } from 'react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

const inputClass =
  'w-full h-10 bg-white border-[1.5px] border-[#dee2e6] rounded-lg px-3 text-sm text-on-surface focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-colors';

const labelClass =
  'block text-sm font-semibold tracking-wide text-on-surface-variant mb-1';

export default function AddJobModal({ isOpen, onClose, onSuccess }: Props) {
  const [company, setCompany] = useState('');
  const [role, setRole] = useState('');
  const [location, setLocation] = useState('');
  const [dateApplied, setDateApplied] = useState(
    new Date().toISOString().split('T')[0],
  );
  const [applicationURL, setApplicationURL] = useState('');
  const [status, setStatus] = useState('Applied');
  const [notes, setNotes] = useState('');

  const [loading, setLoading] = useState(false);

  if (!isOpen) {
    return null;
  }

  async function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();

    const newJob = {
      company,
      role,
      location,
      dateApplied,
      applicationURL,
      status,
      notes,
    };

    setLoading(true);
    await createJob(newJob);
    setLoading(false);
    onSuccess();
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
            Add Job
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
            <label className={labelClass}>Notes</label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={3}
              className='w-full bg-white border-[1.5px] border-[#dee2e6] rounded-lg px-3 py-2 text-sm text-on-surface focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-colors resize-none'
            />
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
              {loading ? 'Saving...' : 'Add Job'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
