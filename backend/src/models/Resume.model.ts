import mongoose, { Schema, Document } from 'mongoose';
import { ResumeAnalysis } from '../types';

export interface IResume extends Document {
  // File Information
  fileName: string;
  originalFileName: string;
  fileType: string;
  fileSize: number;
  fileSizeFormatted?: string;
  fileData: Buffer;
  mimeType?: string;
  uploadDate: Date;
  uploadIP?: string;
  
  // Contact Details (Structured)
  contactDetails?: {
    fullName?: string;
    email?: string;
    phone?: string;
    location?: {
      city?: string;
      state?: string;
      country?: string;
      fullAddress?: string;
      zipCode?: string;
    };
    socialMedia?: {
      linkedin?: string;
      github?: string;
      twitter?: string;
      portfolio?: string;
      website?: string;
      otherLinks?: string[];
    };
  };
  
  // Work Experience (Detailed)
  workExperience?: Array<{
    company?: string;
    position?: string;
    location?: string;
    duration?: string;
    startDate?: string;
    endDate?: string;
    current?: boolean;
    description?: string;
    achievements?: string[];
    technologies?: string[];
    actionVerbs?: string[];
    quantifiableResults?: string[];
  }>;
  
  // Education (Detailed)
  education?: Array<{
    institution?: string;
    degree?: string;
    fieldOfStudy?: string;
    major?: string;
    location?: string;
    graduationDate?: string;
    startDate?: string;
    gpa?: string;
    maxGpa?: string;
    achievements?: string[];
    relevantCourses?: string[];
  }>;
  
  // Skills (Categorized)
  detailedSkills?: {
    technical?: Array<{
      name: string;
      category?: string;
      relevance: number;
      occurrences: number;
      context?: string[];
    }>;
    soft?: Array<{
      name: string;
      relevance: number;
      occurrences: number;
    }>;
    languages?: Array<{
      name: string;
      proficiency?: string;
    }>;
    tools?: Array<{
      name: string;
      category?: string;
      relevance: number;
    }>;
  };
  
  // Projects
  projects?: Array<{
    name?: string;
    description?: string;
    role?: string;
    technologies?: string[];
    link?: string;
    githubUrl?: string;
    highlights?: string[];
  }>;
  
  // Certifications
  certifications?: Array<{
    name: string;
    issuer?: string;
    issueDate?: string;
    expiryDate?: string;
    credentialId?: string;
  }>;
  
  // Awards
  awards?: Array<{
    title: string;
    issuer?: string;
    date?: string;
    description?: string;
  }>;
  
  // Keywords Analysis
  keywordAnalysis?: {
    industry?: Array<{ keyword: string; count: number; relevance: number }>;
    technical?: Array<{ keyword: string; count: number; relevance: number }>;
    action?: Array<{ verb: string; count: number }>;
    powerWords?: Array<{ word: string; count: number }>;
  };
  
  // Detailed Scores
  detailedScores?: {
    overall: number;
    ats: number;
    contactInfo: number;
    summary: number;
    experience: number;
    education: number;
    skills: number;
    formatting: number;
    keywords: number;
    achievements: number;
    clarity: number;
    impact: number;
  };
  
  // Section Analysis
  sectionAnalysis?: {
    hasContactInfo: boolean;
    hasSummary: boolean;
    hasExperience: boolean;
    hasEducation: boolean;
    hasSkills: boolean;
    hasProjects: boolean;
    hasCertifications: boolean;
    hasAwards: boolean;
    completenessScore: number;
  };
  
  // ATS Compatibility
  atsCompatibility?: {
    overallScore: number;
    parseable: boolean;
    formatScore: number;
    keywordScore: number;
    warnings?: Array<{
      type: string;
      message: string;
      severity: string;
    }>;
    compatibility?: {
      hasSimpleFormatting: boolean;
      hasClearSections: boolean;
      hasStandardFonts: boolean;
    };
  };
  
  // Content Quality
  contentQuality?: {
    grammarScore: number;
    spellingErrors: number;
    styleScore: number;
    clarityScore: number;
    issues?: Array<{
      type: string;
      description: string;
      suggestion: string;
    }>;
  };
  
  // Industry Analysis
  industryAnalysis?: {
    detectedIndustry?: string[];
    detectedRole?: string[];
    seniorityLevel?: string;
    careerStage?: string;
  };
  
  // Extracted Text by Sections
  extractedText?: {
    fullText?: string;
    bySection?: {
      header?: string;
      contactInfo?: string;
      summary?: string;
      experience?: string;
      education?: string;
      skills?: string;
      projects?: string;
      certifications?: string;
      other?: string;
    };
  };
  
  // Processing Metadata
  processingMetadata?: {
    processingTime?: number;
    processingDate?: Date;
    ocrUsed: boolean;
    ocrConfidence?: number;
    languageDetected?: string;
    version?: string;
    analysisEngine?: string;
  };
  
  // Original analysis (backward compatibility)
  analysis: ResumeAnalysis;
  rawText: string;
}

const ResumeSchema: Schema = new Schema({
  // File Information
  fileName: { type: String, required: true, index: true },
  originalFileName: { type: String },
  fileType: { type: String, required: true, enum: ['.pdf', '.docx', '.doc', '.jpg', '.jpeg', '.png'] },
  fileSize: { type: Number, required: true },
  fileSizeFormatted: { type: String },
  fileData: { type: Buffer, required: true },
  mimeType: { type: String },
  uploadDate: { type: Date, default: Date.now, index: true },
  uploadIP: { type: String },
  
  // Contact Details
  contactDetails: {
    fullName: { type: String, index: true },
    email: { type: String, index: true },
    phone: String,
    location: {
      city: String,
      state: String,
      country: String,
      fullAddress: String,
      zipCode: String
    },
    socialMedia: {
      linkedin: String,
      github: String,
      twitter: String,
      portfolio: String,
      website: String,
      otherLinks: [String]
    }
  },
  
  // Work Experience
  workExperience: [{
    company: { type: String, index: true },
    position: { type: String, index: true },
    location: String,
    duration: String,
    startDate: String,
    endDate: String,
    current: Boolean,
    description: String,
    achievements: [String],
    technologies: [String],
    actionVerbs: [String],
    quantifiableResults: [String]
  }],
  
  // Education
  education: [{
    institution: { type: String, index: true },
    degree: { type: String, index: true },
    fieldOfStudy: String,
    major: String,
    location: String,
    graduationDate: String,
    startDate: String,
    gpa: String,
    maxGpa: String,
    achievements: [String],
    relevantCourses: [String]
  }],
  
  // Detailed Skills
  detailedSkills: {
    technical: [{
      name: { type: String, index: true },
      category: String,
      relevance: Number,
      occurrences: Number,
      context: [String]
    }],
    soft: [{
      name: String,
      relevance: Number,
      occurrences: Number
    }],
    languages: [{
      name: String,
      proficiency: String
    }],
    tools: [{
      name: { type: String, index: true },
      category: String,
      relevance: Number
    }]
  },
  
  // Projects
  projects: [{
    name: String,
    description: String,
    role: String,
    technologies: [String],
    link: String,
    githubUrl: String,
    highlights: [String]
  }],
  
  // Certifications
  certifications: [{
    name: { type: String, index: true },
    issuer: String,
    issueDate: String,
    expiryDate: String,
    credentialId: String
  }],
  
  // Awards
  awards: [{
    title: String,
    issuer: String,
    date: String,
    description: String
  }],
  
  // Keyword Analysis
  keywordAnalysis: {
    industry: [{ keyword: String, count: Number, relevance: Number }],
    technical: [{ keyword: String, count: Number, relevance: Number }],
    action: [{ verb: String, count: Number }],
    powerWords: [{ word: String, count: Number }]
  },
  
  // Detailed Scores
  detailedScores: {
    overall: { type: Number, index: true },
    ats: { type: Number, index: true },
    contactInfo: Number,
    summary: Number,
    experience: Number,
    education: Number,
    skills: Number,
    formatting: Number,
    keywords: Number,
    achievements: Number,
    clarity: Number,
    impact: Number
  },
  
  // Section Analysis
  sectionAnalysis: {
    hasContactInfo: Boolean,
    hasSummary: Boolean,
    hasExperience: Boolean,
    hasEducation: Boolean,
    hasSkills: Boolean,
    hasProjects: Boolean,
    hasCertifications: Boolean,
    hasAwards: Boolean,
    completenessScore: Number
  },
  
  // ATS Compatibility
  atsCompatibility: {
    overallScore: Number,
    parseable: Boolean,
    formatScore: Number,
    keywordScore: Number,
    warnings: [{
      type: String,
      message: String,
      severity: String
    }],
    compatibility: {
      hasSimpleFormatting: Boolean,
      hasClearSections: Boolean,
      hasStandardFonts: Boolean
    }
  },
  
  // Content Quality
  contentQuality: {
    grammarScore: Number,
    spellingErrors: Number,
    styleScore: Number,
    clarityScore: Number,
    issues: [{
      type: String,
      description: String,
      suggestion: String
    }]
  },
  
  // Industry Analysis
  industryAnalysis: {
    detectedIndustry: [{ type: String, index: true }],
    detectedRole: [{ type: String, index: true }],
    seniorityLevel: String,
    careerStage: String
  },
  
  // Extracted Text
  extractedText: {
    fullText: String,
    bySection: {
      header: String,
      contactInfo: String,
      summary: String,
      experience: String,
      education: String,
      skills: String,
      projects: String,
      certifications: String,
      other: String
    }
  },
  
  // Processing Metadata
  processingMetadata: {
    processingTime: Number,
    processingDate: { type: Date, default: Date.now },
    ocrUsed: { type: Boolean, default: false },
    ocrConfidence: Number,
    languageDetected: { type: String, default: 'en' },
    version: { type: String, default: '2.0.0' },
    analysisEngine: { type: String, default: 'natural-nlp' }
  },
  
  // Original analysis (backward compatibility)
  analysis: { type: Object, required: true },
  rawText: { type: String, required: true }
}, {
  timestamps: true,
  collection: 'resumes'
});

// Additional Indexes for performance
ResumeSchema.index({ 'detailedScores.overall': -1 });
ResumeSchema.index({ 'detailedScores.ats': -1 });
ResumeSchema.index({ 'processingMetadata.processingDate': -1 });
ResumeSchema.index({ createdAt: -1 });

// Virtual for formatted file size
ResumeSchema.virtual('formattedSize').get(function() {
  const bytes = this.fileSize as number;
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
});

// Method to get summary without heavy fields
ResumeSchema.methods.getSummary = function() {
  return {
    id: this._id,
    fileName: this.fileName,
    fileType: this.fileType,
    fileSize: this.fileSizeFormatted || this.formattedSize,
    uploadDate: this.uploadDate,
    contactName: this.contactDetails?.fullName,
    contactEmail: this.contactDetails?.email,
    overallScore: this.detailedScores?.overall || this.analysis?.overallScore,
    atsScore: this.detailedScores?.ats || this.analysis?.atsScore,
    processingTime: this.processingMetadata?.processingTime,
    ocrUsed: this.processingMetadata?.ocrUsed
  };
};

export default mongoose.model<IResume>('Resume', ResumeSchema);

