'use client';

import JobSelectionModal from '@/components/JobSelectionModal';
import { getMatchScore } from '@/lib/api/match';
import { Upload, CheckCircle2, XCircle, Sparkles } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { MatchResult } from '@/types';

function ScoreRing({ score }: { score: number }) {
  const radius = 70;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;
  const color = score >= 70 ? '#4361ee' : score >= 50 ? '#8429c8' : '#d90071';

  return (
    <div className='flex flex-col items-center gap-2'>
      <svg width='180' height='180' viewBox='0 0 180 180'>
        <circle
          cx='90'
          cy='90'
          r={radius}
          fill='none'
          stroke='#efecff'
          strokeWidth='12'
        />
        <circle
          cx='90'
          cy='90'
          r={radius}
          fill='none'
          stroke={color}
          strokeWidth='12'
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap='round'
          transform='rotate(-90 90 90)'
          style={{ transition: 'stroke-dashoffset 0.6s ease' }}
        />
        <text
          x='90'
          y='90'
          textAnchor='middle'
          dominantBaseline='central'
          fontSize='32'
          fontWeight='700'
          fill={color}
        >
          {score}%
        </text>
      </svg>
      <p className='text-sm font-semibold text-on-surface-variant'>
        Overall Match Score
      </p>
    </div>
  );
}

export default function AIMatcher() {
  const [resume, setResume] = useState<File | null>(null);
  const [jobDescription, setJobDescription] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<MatchResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isJobModalOpen, setIsJobModalOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setResume(file);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file) setResume(file);
  };

  const handleAnalyze = async () => {
    if (!resume || !jobDescription.trim()) return;
    setIsLoading(true);
    setError(null);
    setResult(null);
    try {
      const { data } = await getMatchScore(resume, jobDescription);
      setResult(data.message);
    } catch {
      setError('Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const prefill = localStorage.getItem('prefillJobDescription');
    if (prefill) {
      setJobDescription(prefill);
      localStorage.removeItem('prefillJobDescription');
    }
    console.log(prefill);
  }, []);

  const canSubmit = !!resume && jobDescription.trim().length > 0 && !isLoading;

  return (
    <div className='bg-background h-full p-6'>
      <div className='p-5'>
        <h1 className='text-2xl font-bold'>AI Match Checker</h1>
        <p className='text-on-surface-variant'>
          Compare your profile against any job description to identify gaps and
          optimize your application.
        </p>
      </div>

      <div className='flex gap-6 px-5'>
        <div className='flex-1 bg-white border border-[#dee2e6] rounded-xl shadow-card p-6 flex flex-col gap-4'>
          <h2 className='text-base font-semibold'>Your Resume</h2>
          <div
            className='flex-1 flex flex-col items-center justify-center gap-3 border-2 border-dashed border-outline-variant rounded-xl py-10 cursor-pointer hover:border-priamry-container hover:bg-surface-container-low transition-colors'
            onClick={() => fileInputRef.current?.click()}
            onDrop={handleDrop}
            onDragOver={(e) => e.preventDefault()}
          >
            <Upload size={32} color={resume ? '#4361ee' : '#747686'} />
            {resume ? (
              <div className='text-center'>
                <p className='text-sm font-semibold text-primary-container'>
                  {resume.name}
                </p>
                <p className='text-xs text-on-surface-variant mt-1'>
                  Click to replace
                </p>
              </div>
            ) : (
              <div className='text-center'>
                <p className='text-sm font-semibold text-on-surface-variant'>
                  Drag & drop or click to upload
                </p>
                <p className='text-xs text-on-surface-variant mt-1'>
                  PDF, DOC, DOCX
                </p>
              </div>
            )}
          </div>
          <input
            ref={fileInputRef}
            type='file'
            accept='.pdf,.doc,.docx'
            className='hidden'
            onChange={handleFileChange}
          />
        </div>

        <div className='flex-1 bg-white border border-[#dee2e6] rounded-xl shadow-card p-6 flex flex-col gap-4'>
          <h2 className='text-base font-semibold'>Job Description</h2>
          <textarea
            className='flex-1 w-full min-h-52 border-[1.5px] border-[#dee2e6] rounded-lg p-3 text-sm text-on-background resize-none outline-none focus:border-primary-container focus:shadow-[0_0_0_3px_rgba(67,97,238,0.15)] transition-shadow placeholder:text-on-surface-variant'
            placeholder='Paste the full job description here...'
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
          />
        </div>
      </div>

      <div className='px-5 mt-6'>
        <button
          onClick={handleAnalyze}
          disabled={!canSubmit}
          className='w-full py-3 rounded-lg text-white font-semibold text-sm bg-linear-to-r from-primary-container to-secondary hover:opacity-90 transition-opacity disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2'
        >
          {isLoading ? (
            <>
              <svg
                className='animate-spin h-4 w-4 text-white'
                viewBox='0 0 24 24'
                fill='none'
              >
                <circle
                  className='opacity-25'
                  cx='12'
                  cy='12'
                  r='10'
                  stroke='currentColor'
                  strokeWidth='4'
                />
                <path
                  className='opacity-75'
                  fill='currentColor'
                  d='M4 12a8 8 0 018-8v8z'
                />
              </svg>
              Analyzing...
            </>
          ) : (
            <>
              <Sparkles size={16} />
              Analyze Match
            </>
          )}
        </button>
        {error && (
          <p className='text-center text-sm text-error mt-3'>{error}</p>
        )}
      </div>

      {result && (
        <div className='px-5 mt-8 flex flex-col gap-6'>
          <div className='bg-white border border-[#dee2e6] rounded-xl shadow-card p-8 flex justify-center'>
            <ScoreRing score={result.matchScore} />
          </div>

          <div className='bg-white border border-[#dee2e6] rounded-xl shadow-card p-6 flex flex-col gap-5'>
            <h2 className='text-base font-semibold'>Skills Breakdown</h2>
            <div className='flex flex-col gap-3'>
              <div>
                <div className='flex items-center gap-2 mb-2'>
                  <CheckCircle2 size={14} color='#4361ee' />
                  <span className='text-xs font-semibold text-on-surface-variant uppercase tracking-wide'>
                    Matched Skills
                  </span>
                </div>
                <div className='flex flex-wrap gap-2'>
                  {result.matchedSkills.map((skill) => (
                    <span
                      key={skill}
                      className='px-3 py-1 rounded-full text-xs font-semibold bg-[rgba(67,97,238,0.10)] border border-primary-container text-primary-container'
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <div className='flex items-center gap-2 mb-2'>
                  <XCircle size={14} color='#ac0058' />
                  <span className='text-xs font-semibold text-on-surface-variant uppercase tracking-wide'>
                    Missing Skills
                  </span>
                </div>
                <div className='flex flex-wrap gap-2'>
                  {result.missingSkills.map((skill) => (
                    <span
                      key={skill}
                      className='px-3 py-1 rounded-full text-xs font-semibold bg-[rgba(247,37,133,0.10)] border border-[#f72585] text-tertiary'
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className='grid grid-cols-2 gap-6'>
            <div className='bg-white border border-[#dee2e6] rounded-xl shadow-card p-6'>
              <h2 className='text-base font-semibold mb-4'>Strengths</h2>
              <ul className='flex flex-col gap-2'>
                {result.strengths.map((s, i) => (
                  <li key={i} className='flex items-start gap-2 text-sm'>
                    <span className='mt-1 w-1.5 h-1.5 rounded-full bg-primary-container shrink-0' />
                    {s}
                  </li>
                ))}
              </ul>
            </div>
            <div className='bg-white border border-[#dee2e6] rounded-xl shadow-card p-6'>
              <h2 className='text-base font-semibold mb-4'>Key Gaps</h2>
              <ul className='flex flex-col gap-2'>
                {result.gaps.map((g, i) => (
                  <li key={i} className='flex items-start gap-2 text-sm'>
                    <span className='mt-1 w-1.5 h-1.5 rounded-full bg-tertiary-container shrink-0' />
                    {g}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <JobSelectionModal
            isOpen={isJobModalOpen}
            result={result}
            onClose={() => setIsJobModalOpen(false)}
          />
          {/* AI Recommendation */}
          <div className='bg-white border border-[#dee2e6] rounded-xl shadow-card p-6 border-l-4 border-l-secondary'>
            <h2 className='text-base font-semibold mb-3'>AI Recommendation</h2>
            <p className='text-sm text-on-surface-variant leading-relaxed'>
              {result.recommendation}
            </p>
          </div>
          <div className='pb-5'>
            <button
              onClick={() => setIsJobModalOpen(true)}
              className='py-3 px-5 rounded-lg text-white font-semibold text-sm bg-linear-to-r from-primary-container to-secondary hover:opacity-90 transition-opacity disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2'
            >
              Save to Job
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
