export interface Job {
  _id: string;
  company: string;
  role: string;
  location: string;
  dateApplied: string;
  applicationURL: string;
  status: string;
  priority: string;
  notes: string;
  __v: string;
  matchResult?: MatchResult;
}

export interface MatchResult {
  matchScore: number;
  matchedSkills: string[];
  missingSkills: string[];
  strengths: string[];
  gaps: string[];
  recommendation: string;
  savedAt?: Date;
}
