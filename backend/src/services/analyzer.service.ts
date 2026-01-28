import natural from 'natural';
import {
  ResumeAnalysis,
  SectionAnalysis,
  Skill,
  Recommendation,
  Statistics,
  ContactInfo
} from '../types';

const tokenizer = new natural.WordTokenizer();

export const analyzeResumeContent = async (text: string): Promise<ResumeAnalysis> => {
  const lowerText = text.toLowerCase();
  
  // Analyze sections
  const sections = analyzeSections(text, lowerText);
  
  // Extract and analyze skills
  const skills = extractSkills(text, lowerText);
  
  // Analyze contact information
  const contactInfo = analyzeContactInfo(text);
  
  // Calculate statistics
  const statistics = calculateStatistics(text);
  
  // Calculate ATS score
  const atsScore = calculateATSScore(sections, skills, statistics);
  
  // Generate recommendations
  const recommendations = generateRecommendations(sections, skills, statistics, contactInfo);
  
  // Calculate overall score
  const overallScore = calculateOverallScore(sections, atsScore, statistics, contactInfo);
  
  return {
    overallScore,
    sections,
    skills,
    experience: [],
    education: [],
    recommendations,
    statistics,
    atsScore,
    contactInfo
  };
};

const analyzeSections = (text: string, lowerText: string): SectionAnalysis => {
  // Check for common section headers
  const hasContactInfo = /email|phone|linkedin|address|location/i.test(text);
  const hasSummary = /summary|objective|profile|about/i.test(text);
  const hasExperience = /experience|employment|work history/i.test(text);
  const hasEducation = /education|academic|degree|university|college/i.test(text);
  const hasSkills = /skills|technical skills|competencies|technologies/i.test(text);
  
  // Score each section
  const contactInfoScore = hasContactInfo ? 
    ((/email/i.test(text) ? 25 : 0) + (/phone/i.test(text) ? 25 : 0) + 
     (/linkedin/i.test(text) ? 25 : 0) + (/address|location/i.test(text) ? 25 : 0)) : 0;
  
  const summaryScore = hasSummary ? 
    Math.min(100, (text.match(/\b(years?|experienced?|professional|expert|skilled?)\b/gi)?.length || 0) * 10) : 0;
  
  const experienceScore = hasExperience ?
    Math.min(100, (text.match(/\b(developed?|created?|managed?|led|implemented?|designed?|increased?|reduced?|improved?)\b/gi)?.length || 0) * 5) : 0;
  
  const educationScore = hasEducation ?
    Math.min(100, (text.match(/\b(bachelor|master|phd|degree|diploma|certified?|certification)\b/gi)?.length || 0) * 20) : 0;
  
  const skillsScore = hasSkills ?
    Math.min(100, (text.match(/\b(javascript|python|java|react|node|sql|aws|azure|docker|kubernetes|git)\b/gi)?.length || 0) * 5) : 0;
  
  return {
    hasContactInfo,
    hasSummary,
    hasExperience,
    hasEducation,
    hasSkills,
    contactInfoScore,
    summaryScore,
    experienceScore,
    educationScore,
    skillsScore
  };
};

const extractSkills = (text: string, lowerText: string): Skill[] => {
  const skills: Skill[] = [];
  
  // Technical skills database
  const technicalSkills = [
    'javascript', 'typescript', 'python', 'java', 'c++', 'c#', 'ruby', 'php', 'swift', 'kotlin',
    'react', 'angular', 'vue', 'node.js', 'express', 'django', 'flask', 'spring', 'asp.net',
    'html', 'css', 'sass', 'tailwind', 'bootstrap',
    'sql', 'mysql', 'postgresql', 'mongodb', 'redis', 'elasticsearch',
    'aws', 'azure', 'gcp', 'docker', 'kubernetes', 'jenkins', 'git', 'github', 'gitlab',
    'rest api', 'graphql', 'microservices', 'agile', 'scrum', 'ci/cd',
    'machine learning', 'data analysis', 'ai', 'tensorflow', 'pytorch'
  ];
  
  const softSkills = [
    'leadership', 'communication', 'teamwork', 'problem solving', 'critical thinking',
    'project management', 'time management', 'adaptability', 'creativity', 'collaboration'
  ];
  
  technicalSkills.forEach(skill => {
    if (lowerText.includes(skill)) {
      skills.push({
        name: skill,
        category: 'technical',
        relevance: 85 + Math.floor(Math.random() * 15)
      });
    }
  });
  
  softSkills.forEach(skill => {
    if (lowerText.includes(skill)) {
      skills.push({
        name: skill,
        category: 'soft',
        relevance: 70 + Math.floor(Math.random() * 20)
      });
    }
  });
  
  return skills;
};

const analyzeContactInfo = (text: string): ContactInfo => {
  const hasEmail = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/.test(text);
  const hasPhone = /(\+?\d{1,3}[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}/.test(text);
  const hasLinkedIn = /linkedin\.com|linkedin/i.test(text);
  const hasLocation = /\b(city|state|country|address|location)\b/i.test(text);
  
  const score = (
    (hasEmail ? 25 : 0) +
    (hasPhone ? 25 : 0) +
    (hasLinkedIn ? 25 : 0) +
    (hasLocation ? 25 : 0)
  );
  
  return {
    hasEmail,
    hasPhone,
    hasLinkedIn,
    hasLocation,
    score
  };
};

const calculateStatistics = (text: string): Statistics => {
  const words = tokenizer.tokenize(text) || [];
  const totalWords = words.length;
  
  // Estimate pages (assuming 500 words per page)
  const totalPages = Math.ceil(totalWords / 500);
  
  // Count action verbs
  const actionVerbs = [
    'achieved', 'improved', 'trained', 'managed', 'created', 'resolved', 'volunteered',
    'influenced', 'increased', 'decreased', 'developed', 'implemented', 'led', 'designed',
    'built', 'launched', 'established', 'coordinated', 'executed', 'generated'
  ];
  
  let actionVerbsCount = 0;
  actionVerbs.forEach(verb => {
    const regex = new RegExp(`\\b${verb}\\b`, 'gi');
    actionVerbsCount += (text.match(regex) || []).length;
  });
  
  // Count quantifiable achievements (numbers followed by % or metrics)
  const quantifiableAchievements = (text.match(/\d+%|\$\d+|\d+\+/g) || []).length;
  
  // Calculate keyword density
  const keywordDensity = Math.min(100, (actionVerbsCount / totalWords) * 100 * 10);
  
  // Simple readability score (based on average word length)
  const avgWordLength = totalWords > 0 ? text.replace(/\s+/g, '').length / totalWords : 0;
  const readabilityScore = Math.max(0, 100 - (avgWordLength - 5) * 10);
  
  return {
    totalWords,
    totalPages,
    keywordDensity: Math.round(keywordDensity),
    readabilityScore: Math.round(readabilityScore),
    actionVerbsCount,
    quantifiableAchievements
  };
};

const calculateATSScore = (sections: SectionAnalysis, skills: Skill[], statistics: Statistics): number => {
  let score = 0;
  
  // Section completeness (40 points)
  if (sections.hasContactInfo) score += 10;
  if (sections.hasExperience) score += 10;
  if (sections.hasEducation) score += 10;
  if (sections.hasSkills) score += 10;
  
  // Skills presence (30 points)
  const technicalSkills = skills.filter(s => s.category === 'technical').length;
  score += Math.min(30, technicalSkills * 3);
  
  // Formatting (30 points)
  if (statistics.totalPages <= 2) score += 10;
  if (statistics.actionVerbsCount >= 10) score += 10;
  if (statistics.quantifiableAchievements >= 3) score += 10;
  
  return Math.min(100, score);
};

const generateRecommendations = (
  sections: SectionAnalysis,
  skills: Skill[],
  statistics: Statistics,
  contactInfo: ContactInfo
): Recommendation[] => {
  const recommendations: Recommendation[] = [];
  
  // Contact info recommendations
  if (!contactInfo.hasEmail) {
    recommendations.push({
      category: 'Contact Information',
      severity: 'high',
      message: 'Add a professional email address',
      impact: 'Essential for recruiters to contact you'
    });
  }
  
  if (!contactInfo.hasPhone) {
    recommendations.push({
      category: 'Contact Information',
      severity: 'medium',
      message: 'Include a phone number',
      impact: 'Provides an alternative contact method'
    });
  }
  
  if (!contactInfo.hasLinkedIn) {
    recommendations.push({
      category: 'Contact Information',
      severity: 'medium',
      message: 'Add your LinkedIn profile URL',
      impact: 'Shows professional online presence'
    });
  }
  
  // Section recommendations
  if (!sections.hasSummary) {
    recommendations.push({
      category: 'Professional Summary',
      severity: 'high',
      message: 'Add a professional summary or objective',
      impact: 'Helps recruiters quickly understand your value proposition'
    });
  }
  
  if (!sections.hasSkills) {
    recommendations.push({
      category: 'Skills',
      severity: 'high',
      message: 'Create a dedicated skills section',
      impact: 'Improves ATS compatibility and keyword matching'
    });
  }
  
  // Skills recommendations
  const technicalSkills = skills.filter(s => s.category === 'technical');
  if (technicalSkills.length < 5) {
    recommendations.push({
      category: 'Skills',
      severity: 'medium',
      message: 'Add more technical skills relevant to your target role',
      impact: 'Increases visibility in keyword searches'
    });
  }
  
  // Statistics-based recommendations
  if (statistics.totalPages > 2) {
    recommendations.push({
      category: 'Formatting',
      severity: 'high',
      message: 'Reduce resume length to 1-2 pages',
      impact: 'Most recruiters prefer concise resumes'
    });
  }
  
  if (statistics.actionVerbsCount < 10) {
    recommendations.push({
      category: 'Content',
      severity: 'medium',
      message: 'Use more action verbs to describe your achievements',
      impact: 'Makes your accomplishments more impactful'
    });
  }
  
  if (statistics.quantifiableAchievements < 3) {
    recommendations.push({
      category: 'Content',
      severity: 'high',
      message: 'Add quantifiable achievements (numbers, percentages, metrics)',
      impact: 'Demonstrates concrete impact of your work'
    });
  }
  
  // Experience score recommendations
  if (sections.experienceScore < 50) {
    recommendations.push({
      category: 'Experience',
      severity: 'high',
      message: 'Provide more detailed descriptions of your work experience',
      impact: 'Better showcases your responsibilities and achievements'
    });
  }
  
  return recommendations;
};

const calculateOverallScore = (
  sections: SectionAnalysis,
  atsScore: number,
  statistics: Statistics,
  contactInfo: ContactInfo
): number => {
  // Weighted scoring system
  const sectionScore = (
    sections.contactInfoScore * 0.15 +
    sections.summaryScore * 0.10 +
    sections.experienceScore * 0.25 +
    sections.educationScore * 0.15 +
    sections.skillsScore * 0.20
  );
  
  const atsWeight = atsScore * 0.15;
  
  // Adjust for statistics
  let statisticsBonus = 0;
  if (statistics.totalPages <= 2) statisticsBonus += 5;
  if (statistics.actionVerbsCount >= 10) statisticsBonus += 5;
  if (statistics.quantifiableAchievements >= 5) statisticsBonus += 5;
  
  const finalScore = Math.min(100, sectionScore + atsWeight + statisticsBonus);
  
  return Math.round(finalScore);
};
