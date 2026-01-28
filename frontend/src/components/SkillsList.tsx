import React from 'react';
import { Skill } from '../types';
import { Code, Users, Globe, Wrench } from 'lucide-react';

interface SkillsListProps {
  skills: Skill[];
}

export const SkillsList: React.FC<SkillsListProps> = ({ skills }) => {
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'technical':
        return <Code className="w-4 h-4" />;
      case 'soft':
        return <Users className="w-4 h-4" />;
      case 'language':
        return <Globe className="w-4 h-4" />;
      case 'tool':
        return <Wrench className="w-4 h-4" />;
      default:
        return <Code className="w-4 h-4" />;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'technical':
        return 'bg-blue-500/20 text-blue-300 border-blue-400/30';
      case 'soft':
        return 'bg-green-500/20 text-green-300 border-green-400/30';
      case 'language':
        return 'bg-purple-500/20 text-purple-300 border-purple-400/30';
      case 'tool':
        return 'bg-orange-500/20 text-orange-300 border-orange-400/30';
      default:
        return 'bg-gray-500/20 text-gray-300 border-gray-400/30';
    }
  };

  const groupedSkills = skills.reduce((acc, skill) => {
    if (!acc[skill.category]) {
      acc[skill.category] = [];
    }
    acc[skill.category].push(skill);
    return acc;
  }, {} as Record<string, Skill[]>);

  return (
    <div className="glass-card rounded-3xl shadow-xl shadow-green-500/10 p-8 mb-8 hover:shadow-2xl hover:shadow-green-500/20 transition-all duration-500 border border-green-500/20">
      <h3 className="text-2xl font-black text-white mb-8 flex items-center">
        <div className="w-1 h-8 bg-gradient-to-b from-green-500 to-teal-600 rounded-full mr-3 shadow-lg shadow-green-500/50"></div>
        Detected Skills
      </h3>
      
      <div className="space-y-8">
        {Object.entries(groupedSkills).map(([category, categorySkills]) => (
          <div key={category} className="animate-slide-up">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-base font-bold text-white uppercase flex items-center">
                <div className={`p-2 rounded-xl mr-3 ${
                  category === 'technical' ? 'bg-gradient-to-br from-blue-500 to-blue-600' :
                  category === 'soft' ? 'bg-gradient-to-br from-green-500 to-green-600' :
                  category === 'language' ? 'bg-gradient-to-br from-purple-500 to-purple-600' :
                  'bg-gradient-to-br from-orange-500 to-orange-600'
                }`}>
                  <span className="text-white">{getCategoryIcon(category)}</span>
                </div>
                <span>{category} Skills</span>
              </h4>
              <span className="text-xs bg-white/5 border border-white/10 text-gray-300 px-4 py-2 rounded-full font-bold backdrop-blur-sm">
                {categorySkills.length} found
              </span>
            </div>
            
            <div className="flex flex-wrap gap-3">
              {categorySkills.map((skill, index) => (
                <div
                  key={index}
                  className={`group relative px-4 py-3 rounded-xl border-2 ${getCategoryColor(category)} flex items-center space-x-2 transform hover:scale-105 transition-all duration-300 shadow-md hover:shadow-lg backdrop-blur-sm`}
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  <span className="font-semibold capitalize">{skill.name}</span>
                  <div className="flex items-center">
                    <div className="w-16 h-2 bg-gray-800 rounded-full overflow-hidden ml-2">
                      <div
                        className="h-full bg-gradient-to-r from-green-400 to-green-600 rounded-full shadow-sm"
                        style={{ width: `${skill.relevance}%`, boxShadow: '0 0 8px rgba(16, 185, 129, 0.5)' }}
                      ></div>
                    </div>
                    <span className="text-xs font-bold ml-2 text-gray-400">
                      {skill.relevance}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      
      {skills.length === 0 && (
        <div className="text-center py-12">
          <div className="inline-block p-4 bg-white/5 border border-white/10 rounded-full mb-4 backdrop-blur-sm">
            <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <p className="text-gray-400 font-medium">
            No skills detected. Consider adding a dedicated skills section to your resume.
          </p>
        </div>
      )}
    </div>
  );
};
