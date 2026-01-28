export interface ResumeAnalysis {
  overallScore: number;
  sections: SectionAnalysis;
  skills: Skill[];
  experience: Experience[];
  education: Education[];
  recommendations: Recommendation[];
  statistics: Statistics;
  atsScore: number;
  contactInfo: ContactInfo;
  fileName?: string;
}

export interface SectionAnalysis {
  hasContactInfo: boolean;
  hasSummary: boolean;
  hasExperience: boolean;
  hasEducation: boolean;
  hasSkills: boolean;
  contactInfoScore: number;
  summaryScore: number;
  experienceScore: number;
  educationScore: number;
  skillsScore: number;
}

export interface Skill {
  name: string;
  category: 'technical' | 'soft' | 'language' | 'tool';
  relevance: number;
}

export interface Experience {
  title: string;
  company: string;
  duration: string;
  description: string;
  impactScore: number;
}

export interface Education {
  degree: string;
  institution: string;
  year: string;
  score: number;
}

export interface Recommendation {
  category: string;
  severity: 'high' | 'medium' | 'low';
  message: string;
  impact: string;
}

export interface Statistics {
  totalWords: number;
  totalPages: number;
  keywordDensity: number;
  readabilityScore: number;
  actionVerbsCount: number;
  quantifiableAchievements: number;
}

export interface ContactInfo {
  hasEmail: boolean;
  hasPhone: boolean;
  hasLinkedIn: boolean;
  hasLocation: boolean;
  score: number;
}
