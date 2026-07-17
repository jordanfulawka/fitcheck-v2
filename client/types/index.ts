export interface Job {
  _id: string;
  company: string;
  role: string;
  location: string;
  dateApplied: string;
  applicationURL: string;
  status: string;
  priority: string;
  __v: string;
  jobDescription?: string;
  matchResult?: MatchResult;
  resume: {
    fileName: string;
    contentType: string;
    data: Buffer;
    uploadedAt: Date;
  };
  coverLetter: {
    fileName: string;
    contentType: string;
    data: Buffer;
    uploadedAt: Date;
  };
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
