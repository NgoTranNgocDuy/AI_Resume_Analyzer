import React from 'react';
import { SectionAnalysis } from '../types';
import { CheckCircle, XCircle } from 'lucide-react';

interface SectionScoresProps {
  sections: SectionAnalysis;
}

export const SectionScores: React.FC<SectionScoresProps> = ({ sections }) => {
  const sectionData = [
    {
      name: 'Contact Information',
      has: sections.hasContactInfo,
      score: sections.contactInfoScore
    },
    {
      name: 'Professional Summary',
      has: sections.hasSummary,
      score: sections.summaryScore
    },
    {
      name: 'Work Experience',
      has: sections.hasExperience,
      score: sections.experienceScore
    },
    {
      name: 'Education',
      has: sections.hasEducation,
      score: sections.educationScore
    },
    {
      name: 'Skills',
      has: sections.hasSkills,
      score: sections.skillsScore
    }
  ];

  return (
    <div className="glass-card rounded-3xl shadow-xl shadow-blue-500/10 p-8 mb-8 hover:shadow-2xl hover:shadow-blue-500/20 transition-all duration-500 border border-blue-500/20">
      <h3 className="text-2xl font-black text-white mb-8 flex items-center">
        <div className="w-1 h-8 bg-gradient-to-b from-blue-500 to-purple-600 rounded-full mr-3 shadow-lg shadow-blue-500/50"></div>
        Section Analysis
      </h3>
      
      <div className="space-y-6">
        {sectionData.map((section, index) => (
          <div
            key={section.name}
            className="group animate-slide-up"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-3">
                <div className={`p-2 rounded-xl ${
                  section.has
                    ? 'bg-gradient-to-br from-green-400 to-green-600 shadow-lg shadow-green-500/30'
                    : 'bg-gradient-to-br from-red-400 to-red-600 shadow-lg shadow-red-500/30'
                }`}>
                  {section.has ? (
                    <CheckCircle className="w-5 h-5 text-white" />
                  ) : (
                    <XCircle className="w-5 h-5 text-white" />
                  )}
                </div>
                <span className="font-semibold text-white text-lg">{section.name}</span>
              </div>
              <div className="flex items-center space-x-3">
                <span className="text-sm font-bold text-gray-300 px-3 py-1 bg-white/5 backdrop-blur-sm rounded-full border border-white/10">
                  {section.score}%
                </span>
              </div>
            </div>
            
            <div className="relative h-4 bg-gray-800 rounded-full overflow-hidden shadow-inner">
              <div
                className={`absolute inset-y-0 left-0 rounded-full transition-all duration-1000 ease-out ${
                  section.score >= 70
                    ? 'bg-gradient-to-r from-green-400 via-green-500 to-green-600'
                    : section.score >= 40
                    ? 'bg-gradient-to-r from-yellow-400 via-orange-500 to-orange-600'
                    : 'bg-gradient-to-r from-red-400 via-red-500 to-red-600'
                }`}
                style={{ 
                  width: `${section.score}%`,
                  boxShadow: section.score >= 70 
                    ? '0 0 15px rgba(16, 185, 129, 0.6)' 
                    : section.score >= 40 
                    ? '0 0 15px rgba(251, 146, 60, 0.6)' 
                    : '0 0 15px rgba(239, 68, 68, 0.6)'
                }}
              >
                <div className="absolute inset-0 bg-white/20 animate-shimmer"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
