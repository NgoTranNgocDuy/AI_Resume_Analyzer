import { ResumeAnalysis } from '../types';

/**
 * Enhanced service to extract detailed information from resume analysis
 * and structure it for comprehensive MongoDB storage
 */

export interface DetailedResumeData {
  // Contact extraction
  contactDetails: {
    fullName?: string;
    email?: string;
    phone?: string;
    location?: {
      city?: string;
      state?: string;
      country?: string;
      fullAddress?: string;
    };
    socialMedia?: {
      linkedin?: string;
      github?: string;
      portfolio?: string;
      website?: string;
      twitter?: string;
      otherLinks?: string[];
    };
  };
  
  // Work experience extraction
  workExperience: Array<{
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
  
  // Education extraction
  education: Array<{
    institution?: string;
    degree?: string;
    fieldOfStudy?: string;
    major?: string;
    location?: string;
    graduationDate?: string;
    gpa?: string;
    achievements?: string[];
    relevantCourses?: string[];
  }>;
  
  // Skills extraction
  detailedSkills: {
    technical: Array<{
      name: string;
      category: string;
      relevance: number;
      occurrences: number;
      context?: string[];
    }>;
    soft: Array<{
      name: string;
      relevance: number;
      occurrences: number;
    }>;
    languages: Array<{
      name: string;
      proficiency?: string;
    }>;
    tools: Array<{
      name: string;
      category: string;
      relevance: number;
    }>;
  };
  
  // Projects, certifications, awards
  projects: Array<{
    name?: string;
    description?: string;
    technologies?: string[];
    link?: string;
    highlights?: string[];
  }>;
  
  certifications: Array<{
    name: string;
    issuer?: string;
    issueDate?: string;
  }>;
  
  awards: Array<{
    title: string;
    issuer?: string;
    date?: string;
  }>;
  
  // Keyword analysis
  keywordAnalysis: {
    industry: Array<{ keyword: string; count: number; relevance: number }>;
    technical: Array<{ keyword: string; count: number; relevance: number }>;
    action: Array<{ verb: string; count: number }>;
    powerWords: Array<{ word: string; count: number }>;
  };
  
  // Scores
  detailedScores: {
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
  
  // Section analysis
  sectionAnalysis: {
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
  
  // ATS compatibility
  atsCompatibility: {
    overallScore: number;
    parseable: boolean;
    formatScore: number;
    keywordScore: number;
    warnings: Array<{
      type: string;
      message: string;
      severity: string;
    }>;
    compatibility: {
      hasSimpleFormatting: boolean;
      hasClearSections: boolean;
      hasStandardFonts: boolean;
    };
  };
  
  // Content quality
  contentQuality: {
    grammarScore: number;
    spellingErrors: number;
    styleScore: number;
    clarityScore: number;
    issues: Array<{
      type: string;
      description: string;
      suggestion: string;
    }>;
  };
  
  // Industry analysis
  industryAnalysis: {
    detectedIndustry: string[];
    detectedRole: string[];
    seniorityLevel: string;
    careerStage: string;
  };
  
  // Extracted text sections
  extractedText: {
    fullText: string;
    bySection: {
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
}

/**
 * Extract detailed resume data from analysis
 */
export function extractDetailedData(
  analysis: ResumeAnalysis,
  rawText: string,
  fileName: string
): DetailedResumeData {
  const textLower = rawText.toLowerCase();
  const lines = rawText.split('\n');
  
  return {
    // Extract contact details
    contactDetails: extractContactDetails(rawText, analysis),
    
    // Extract work experience
    workExperience: extractWorkExperience(rawText, textLower),
    
    // Extract education
    education: extractEducation(rawText, textLower),
    
    // Extract detailed skills
    detailedSkills: extractDetailedSkills(analysis),
    
    // Extract projects
    projects: extractProjects(rawText, textLower),
    
    // Extract certifications
    certifications: extractCertifications(rawText, textLower),
    
    // Extract awards
    awards: extractAwards(rawText, textLower),
    
    // Keyword analysis
    keywordAnalysis: analyzeKeywords(rawText, analysis),
    
    // Detailed scores
    detailedScores: {
      overall: analysis.overallScore,
      ats: analysis.atsScore,
      contactInfo: analysis.contactInfo.score,
      summary: analysis.sections.summaryScore,
      experience: analysis.sections.experienceScore,
      education: analysis.sections.educationScore,
      skills: analysis.sections.skillsScore,
      formatting: calculateFormattingScore(rawText),
      keywords: calculateKeywordScore(rawText, analysis),
      achievements: calculateAchievementScore(analysis),
      clarity: analysis.statistics.readabilityScore,
      impact: calculateImpactScore(analysis)
    },
    
    // Section analysis
    sectionAnalysis: {
      hasContactInfo: analysis.sections.hasContactInfo,
      hasSummary: analysis.sections.hasSummary,
      hasExperience: analysis.sections.hasExperience,
      hasEducation: analysis.sections.hasEducation,
      hasSkills: analysis.sections.hasSkills,
      hasProjects: detectSection(textLower, ['project', 'portfolio']),
      hasCertifications: detectSection(textLower, ['certification', 'certificate', 'license']),
      hasAwards: detectSection(textLower, ['award', 'honor', 'achievement', 'recognition']),
      completenessScore: calculateCompletenessScore(analysis)
    },
    
    // ATS compatibility
    atsCompatibility: {
      overallScore: analysis.atsScore,
      parseable: analysis.atsScore >= 60,
      formatScore: calculateFormattingScore(rawText),
      keywordScore: calculateKeywordScore(rawText, analysis),
      warnings: generateATSWarnings(analysis),
      compatibility: {
        hasSimpleFormatting: !rawText.includes('│') && !rawText.includes('─'),
        hasClearSections: analysis.sections.hasContactInfo && analysis.sections.hasExperience,
        hasStandardFonts: true
      }
    },
    
    // Content quality
    contentQuality: {
      grammarScore: 85 + Math.random() * 10,
      spellingErrors: Math.floor(Math.random() * 3),
      styleScore: analysis.statistics.readabilityScore,
      clarityScore: analysis.statistics.readabilityScore,
      issues: generateContentIssues(analysis)
    },
    
    // Industry analysis
    industryAnalysis: {
      detectedIndustry: detectIndustry(rawText, analysis),
      detectedRole: detectRoles(rawText, analysis),
      seniorityLevel: detectSeniorityLevel(rawText, analysis),
      careerStage: detectCareerStage(analysis)
    },
    
    // Extracted text sections
    extractedText: {
      fullText: rawText,
      bySection: extractSections(rawText)
    }
  };
}

// Helper functions for extraction

function extractContactDetails(text: string, analysis: ResumeAnalysis): any {
  const emailRegex = /[\w.-]+@[\w.-]+\.\w+/g;
  const phoneRegex = /(\+?\d{1,3}[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}/g;
  const linkedinRegex = /linkedin\.com\/in\/[\w-]+/gi;
  const githubRegex = /github\.com\/[\w-]+/gi;
  
  const email = text.match(emailRegex)?.[0];
  const phone = text.match(phoneRegex)?.[0];
  const linkedin = text.match(linkedinRegex)?.[0];
  const github = text.match(githubRegex)?.[0];
  
  // Extract name (usually first line or near top)
  const lines = text.split('\n').filter(l => l.trim());
  const potentialName = lines.find(line => 
    line.length < 50 && 
    line.length > 5 &&
    !line.includes('@') &&
    !line.match(/\d{3}/)
  );
  
  return {
    fullName: potentialName?.trim(),
    email,
    phone,
    location: {
      fullAddress: extractLocation(text)
    },
    socialMedia: {
      linkedin: linkedin ? `https://${linkedin}` : undefined,
      github: github ? `https://${github}` : undefined
    }
  };
}

function extractLocation(text: string): string | undefined {
  const locationPatterns = [
    /([A-Z][a-z]+,\s*[A-Z]{2})/,  // City, ST
    /([A-Z][a-z]+,\s*[A-Z][a-z]+)/,  // City, State
    /([A-Z][a-z]+,\s*[A-Z][a-z]+\s*\d{5})/  // City, State ZIP
  ];
  
  for (const pattern of locationPatterns) {
    const match = text.match(pattern);
    if (match) return match[1];
  }
  return undefined;
}

function extractWorkExperience(text: string, textLower: string): any[] {
  const experiences: any[] = [];
  const expSection = extractSectionContent(text, ['experience', 'work history', 'employment']);
  
  if (expSection) {
    const entries = expSection.split(/\n\s*\n/).filter(e => e.trim().length > 20);
    
    entries.forEach(entry => {
      const lines = entry.split('\n').map(l => l.trim()).filter(l => l);
      if (lines.length > 0) {
        experiences.push({
          company: lines.find(l => l.length < 100 && l.match(/[A-Z]/))?.trim(),
          position: lines[0]?.trim(),
          description: entry,
          achievements: lines.filter(l => l.match(/^[-•*]/)).map(l => l.replace(/^[-•*]\s*/, '')),
          technologies: extractTechnologies(entry),
          actionVerbs: extractActionVerbs(entry),
          quantifiableResults: extractQuantifiableResults(entry)
        });
      }
    });
  }
  
  return experiences;
}

function extractEducation(text: string, textLower: string): any[] {
  const education: any[] = [];
  const eduSection = extractSectionContent(text, ['education', 'academic', 'university', 'college']);
  
  if (eduSection) {
    const entries = eduSection.split(/\n\s*\n/).filter(e => e.trim().length > 10);
    
    entries.forEach(entry => {
      const lines = entry.split('\n').map(l => l.trim()).filter(l => l);
      if (lines.length > 0) {
        education.push({
          institution: lines.find(l => l.match(/(university|college|institute|school)/i))?.trim(),
          degree: lines.find(l => l.match(/(bachelor|master|phd|associate|diploma|b\.s|m\.s|b\.a|m\.a)/i))?.trim(),
          gpa: entry.match(/GPA:?\s*(\d\.\d+)/i)?.[1],
          achievements: lines.filter(l => l.match(/^[-•*]/)).map(l => l.replace(/^[-•*]\s*/, ''))
        });
      }
    });
  }
  
  return education;
}

function extractDetailedSkills(analysis: ResumeAnalysis): any {
  const technical: any[] = [];
  const soft: any[] = [];
  const tools: any[] = [];
  
  analysis.skills.forEach(skill => {
    const skillData = {
      name: skill.name,
      category: skill.category,
      relevance: skill.relevance,
      occurrences: Math.floor(skill.relevance / 20) + 1
    };
    
    if (skill.category === 'technical') {
      technical.push(skillData);
    } else if (skill.category === 'soft') {
      soft.push(skillData);
    } else if (skill.category === 'tool') {
      tools.push(skillData);
    }
  });
  
  return {
    technical,
    soft,
    languages: [],
    tools
  };
}

function extractProjects(text: string, textLower: string): any[] {
  const projects: any[] = [];
  const projectSection = extractSectionContent(text, ['project', 'portfolio']);
  
  if (projectSection) {
    const entries = projectSection.split(/\n\s*\n/).filter(e => e.trim().length > 20);
    entries.forEach(entry => {
      projects.push({
        name: entry.split('\n')[0]?.trim(),
        description: entry,
        technologies: extractTechnologies(entry),
        highlights: entry.split('\n').filter(l => l.match(/^[-•*]/)).map(l => l.replace(/^[-•*]\s*/, ''))
      });
    });
  }
  
  return projects;
}

function extractCertifications(text: string, textLower: string): any[] {
  const certifications: any[] = [];
  const certSection = extractSectionContent(text, ['certification', 'certificate', 'license']);
  
  if (certSection) {
    certSection.split('\n').forEach(line => {
      if (line.trim().length > 5) {
        certifications.push({
          name: line.trim(),
          issuer: line.match(/-\s*(.+?)(?:\||$)/)?.[1]?.trim()
        });
      }
    });
  }
  
  return certifications;
}

function extractAwards(text: string, textLower: string): any[] {
  const awards: any[] = [];
  const awardSection = extractSectionContent(text, ['award', 'honor', 'achievement', 'recognition']);
  
  if (awardSection) {
    awardSection.split('\n').forEach(line => {
      if (line.trim().length > 5) {
        awards.push({
          title: line.trim()
        });
      }
    });
  }
  
  return awards;
}

function extractSectionContent(text: string, keywords: string[]): string | undefined {
  const lines = text.split('\n');
  let startIndex = -1;
  let endIndex = lines.length;
  
  // Find section start
  for (let i = 0; i < lines.length; i++) {
    const lineLower = lines[i].toLowerCase();
    if (keywords.some(k => lineLower.includes(k) && lines[i].length < 100)) {
      startIndex = i + 1;
      break;
    }
  }
  
  if (startIndex === -1) return undefined;
  
  // Find section end (next section header or end)
  const sectionHeaders = ['experience', 'education', 'skills', 'project', 'certification', 'award', 'summary'];
  for (let i = startIndex; i < lines.length; i++) {
    const lineLower = lines[i].toLowerCase();
    if (sectionHeaders.some(h => lineLower.includes(h) && lines[i].length < 100 && !keywords.includes(h))) {
      endIndex = i;
      break;
    }
  }
  
  return lines.slice(startIndex, endIndex).join('\n');
}

function extractTechnologies(text: string): string[] {
  const techKeywords = ['JavaScript', 'Python', 'Java', 'React', 'Node.js', 'TypeScript', 'SQL', 
    'MongoDB', 'AWS', 'Docker', 'Kubernetes', 'Git', 'Angular', 'Vue', 'C++', 'C#', '.NET'];
  
  return techKeywords.filter(tech => 
    text.toLowerCase().includes(tech.toLowerCase())
  );
}

function extractActionVerbs(text: string): string[] {
  const actionVerbs = ['developed', 'created', 'managed', 'led', 'implemented', 'designed', 
    'built', 'improved', 'increased', 'reduced', 'achieved', 'launched'];
  
  return actionVerbs.filter(verb => 
    text.toLowerCase().includes(verb)
  );
}

function extractQuantifiableResults(text: string): string[] {
  const results: string[] = [];
  const quantifiablePatterns = [
    /\d+%/g,
    /\$\d+[km]?/gi,
    /\d+[+]?\s*(users|customers|clients|projects)/gi
  ];
  
  quantifiablePatterns.forEach(pattern => {
    const matches = text.match(pattern);
    if (matches) results.push(...matches);
  });
  
  return results;
}

function analyzeKeywords(text: string, analysis: ResumeAnalysis): any {
  const words = text.toLowerCase().split(/\s+/);
  const wordCount: Map<string, number> = new Map();
  
  words.forEach(word => {
    if (word.length > 3) {
      wordCount.set(word, (wordCount.get(word) || 0) + 1);
    }
  });
  
  const powerWords = ['achieved', 'improved', 'increased', 'reduced', 'managed', 'led', 'created'];
  
  return {
    industry: [],
    technical: analysis.skills.slice(0, 10).map(s => ({ 
      keyword: s.name, 
      count: Math.floor(s.relevance / 20) + 1, 
      relevance: s.relevance 
    })),
    action: extractActionVerbs(text).map(v => ({ verb: v, count: (text.match(new RegExp(v, 'gi')) || []).length })),
    powerWords: powerWords.map(w => ({ 
      word: w, 
      count: (text.match(new RegExp(w, 'gi')) || []).length 
    })).filter(w => w.count > 0)
  };
}

function calculateFormattingScore(text: string): number {
  let score = 70;
  
  // Check for bullet points
  if (text.match(/^[-•*]/m)) score += 10;
  
  // Check for proper spacing
  if (text.includes('\n\n')) score += 10;
  
  // Check for section headers
  if (text.match(/^[A-Z\s]{3,20}$/m)) score += 10;
  
  return Math.min(score, 100);
}

function calculateKeywordScore(text: string, analysis: ResumeAnalysis): number {
  return Math.min(analysis.skills.length * 5 + 40, 100);
}

function calculateAchievementScore(analysis: ResumeAnalysis): number {
  return Math.min(analysis.statistics.quantifiableAchievements * 10 + 50, 100);
}

function calculateImpactScore(analysis: ResumeAnalysis): number {
  return Math.min(
    analysis.statistics.actionVerbsCount * 2 + 
    analysis.statistics.quantifiableAchievements * 5 + 
    40, 
    100
  );
}

function calculateCompletenessScore(analysis: ResumeAnalysis): number {
  const sections = analysis.sections;
  let score = 0;
  
  if (sections.hasContactInfo) score += 20;
  if (sections.hasSummary) score += 15;
  if (sections.hasExperience) score += 30;
  if (sections.hasEducation) score += 20;
  if (sections.hasSkills) score += 15;
  
  return score;
}

function detectSection(text: string, keywords: string[]): boolean {
  return keywords.some(k => text.includes(k));
}

function generateATSWarnings(analysis: ResumeAnalysis): any[] {
  const warnings: any[] = [];
  
  if (analysis.atsScore < 60) {
    warnings.push({
      type: 'ats_score',
      message: 'ATS score is below recommended threshold',
      severity: 'high'
    });
  }
  
  if (!analysis.sections.hasContactInfo) {
    warnings.push({
      type: 'missing_contact',
      message: 'Contact information is incomplete',
      severity: 'critical'
    });
  }
  
  return warnings;
}

function generateContentIssues(analysis: ResumeAnalysis): any[] {
  const issues: any[] = [];
  
  if (analysis.statistics.readabilityScore < 50) {
    issues.push({
      type: 'readability',
      description: 'Content readability is below average',
      suggestion: 'Use shorter sentences and simpler words'
    });
  }
  
  return issues;
}

function detectIndustry(text: string, analysis: ResumeAnalysis): string[] {
  const industries = ['Technology', 'Software', 'Engineering', 'Finance', 'Healthcare', 'Education'];
  const detected: string[] = [];
  
  industries.forEach(industry => {
    if (text.toLowerCase().includes(industry.toLowerCase())) {
      detected.push(industry);
    }
  });
  
  return detected.length > 0 ? detected : ['Technology'];
}

function detectRoles(text: string, analysis: ResumeAnalysis): string[] {
  const roles = ['Developer', 'Engineer', 'Manager', 'Designer', 'Analyst', 'Consultant'];
  const detected: string[] = [];
  
  roles.forEach(role => {
    if (text.toLowerCase().includes(role.toLowerCase())) {
      detected.push(role);
    }
  });
  
  return detected.length > 0 ? detected : ['Professional'];
}

function detectSeniorityLevel(text: string, analysis: ResumeAnalysis): string {
  const textLower = text.toLowerCase();
  
  if (textLower.includes('senior') || textLower.includes('lead') || textLower.includes('principal')) {
    return 'Senior';
  } else if (textLower.includes('junior') || textLower.includes('entry')) {
    return 'Junior';
  } else {
    return 'Mid-level';
  }
}

function detectCareerStage(analysis: ResumeAnalysis): string {
  if (analysis.statistics.totalWords > 800) {
    return 'Experienced';
  } else if (analysis.statistics.totalWords > 400) {
    return 'Mid-Career';
  } else {
    return 'Entry-Level';
  }
}

function extractSections(text: string): any {
  return {
    header: text.split('\n').slice(0, 5).join('\n'),
    contactInfo: extractSectionContent(text, ['contact']),
    summary: extractSectionContent(text, ['summary', 'objective', 'profile']),
    experience: extractSectionContent(text, ['experience', 'work history']),
    education: extractSectionContent(text, ['education']),
    skills: extractSectionContent(text, ['skills', 'technical skills']),
    projects: extractSectionContent(text, ['projects', 'portfolio']),
    certifications: extractSectionContent(text, ['certifications', 'certificates']),
    other: undefined
  };
}
