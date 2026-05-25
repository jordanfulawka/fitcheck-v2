'use client';

import { MatchResult } from '@/types';
import { X } from 'lucide-react';

const labelClass =
  'block text-xs font-semibold tracking-wide text-on-surface-variant uppercase mb-2';

function scoreColor(score: number) {
  if (score >= 70) return '#1a7a4a';
  if (score >= 40) return '#b45309';
  return '#ba1a1a';
}

export default function MatchResultModal({
  result,
  onClose,
}: {
  result?: MatchResult;
  onClose: () => void;
}) {
  if (!result) return null;

  return (
    <div
      className='fixed inset-0 bg-black/40 z-50 flex items-center justify-center'
      onClick={onClose}
    >
      <div
        className='bg-white rounded-2xl w-full max-w-lg mx-4 max-h-[90vh] overflow-y-auto'
        style={{ boxShadow: '0 12px 24px rgba(26, 26, 46, 0.08)' }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className='flex items-center justify-between px-6 py-5 border-b border-[#dee2e6]'>
          <h2 className='text-xl font-semibold tracking-tight text-on-surface'>
            AI Match Result
          </h2>
          <button
            onClick={onClose}
            className='text-on-surface-variant hover:text-on-surface transition-colors'
          >
            <X size={20} />
          </button>
        </div>

        <div className='px-6 py-5 space-y-5'>
          <div className='flex flex-col items-center py-2'>
            <span
              className='text-5xl font-bold'
              style={{ color: scoreColor(result.matchScore) }}
            >
              {result.matchScore}
              <span className='text-2xl'>%</span>
            </span>
            <span className='text-sm text-on-surface-variant mt-1'>
              Match Score
            </span>
          </div>

          {result.matchedSkills.length > 0 && (
            <div>
              <span className={labelClass}>Matched Skills</span>
              <div className='flex flex-wrap gap-2'>
                {result.matchedSkills.map((skill) => (
                  <span
                    key={skill}
                    className='rounded-full px-3 py-1 text-xs font-semibold bg-[#4361ee]/10 border border-[#4361ee] text-[#4361ee]'
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}

          {result.missingSkills.length > 0 && (
            <div>
              <span className={labelClass}>Missing Skills</span>
              <div className='flex flex-wrap gap-2'>
                {result.missingSkills.map((skill) => (
                  <span
                    key={skill}
                    className='rounded-full px-3 py-1 text-xs font-semibold bg-[#ba1a1a]/10 border border-[#ba1a1a] text-[#ba1a1a]'
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}

          {result.strengths.length > 0 && (
            <div>
              <span className={labelClass}>Strengths</span>
              <ul className='space-y-1 list-disc list-inside'>
                {result.strengths.map((s) => (
                  <li key={s} className='text-sm text-on-surface'>
                    {s}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {result.gaps.length > 0 && (
            <div>
              <span className={labelClass}>Gaps</span>
              <ul className='space-y-1 list-disc list-inside'>
                {result.gaps.map((g) => (
                  <li key={g} className='text-sm text-on-surface'>
                    {g}
                  </li>
                ))}
              </ul>
            </div>
          )}
          {result.recommendation && (
            <div>
              <span className={labelClass}>Recommendation</span>
              <p className='text-sm text-on-surface bg-[#f8f9fa] rounded-lg p-3 leading-relaxed'>
                {result.recommendation}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
