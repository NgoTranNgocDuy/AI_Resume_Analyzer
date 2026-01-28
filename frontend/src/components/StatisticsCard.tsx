import React from 'react';
import { Statistics } from '../types';
import { FileText, Hash, TrendingUp, BookOpen, Zap, Target } from 'lucide-react';

interface StatisticsCardProps {
  statistics: Statistics;
}

export const StatisticsCard: React.FC<StatisticsCardProps> = ({ statistics }) => {
  const stats = [
    {
      icon: <Hash className="w-6 h-6" />,
      label: 'Total Words',
      value: statistics.totalWords.toLocaleString(),
      color: 'text-blue-600',
      bg: 'bg-blue-100'
    },
    {
      icon: <FileText className="w-6 h-6" />,
      label: 'Pages',
      value: statistics.totalPages,
      color: 'text-green-600',
      bg: 'bg-green-100'
    },
    {
      icon: <Zap className="w-6 h-6" />,
      label: 'Action Verbs',
      value: statistics.actionVerbsCount,
      color: 'text-purple-600',
      bg: 'bg-purple-100'
    },
    {
      icon: <Target className="w-6 h-6" />,
      label: 'Quantifiable Achievements',
      value: statistics.quantifiableAchievements,
      color: 'text-orange-600',
      bg: 'bg-orange-100'
    },
    {
      icon: <TrendingUp className="w-6 h-6" />,
      label: 'Keyword Density',
      value: `${statistics.keywordDensity}%`,
      color: 'text-pink-600',
      bg: 'bg-pink-100'
    },
    {
      icon: <BookOpen className="w-6 h-6" />,
      label: 'Readability',
      value: `${statistics.readabilityScore}%`,
      color: 'text-indigo-600',
      bg: 'bg-indigo-100'
    }
  ];

  return (
    <div className="glass-card rounded-3xl shadow-xl shadow-purple-500/10 p-8 mb-8 hover:shadow-2xl hover:shadow-purple-500/20 transition-all duration-500 border border-purple-500/20">
      <h3 className="text-2xl font-black text-white mb-8 flex items-center">
        <div className="w-1 h-8 bg-gradient-to-b from-purple-500 to-pink-600 rounded-full mr-3 shadow-lg shadow-purple-500/50"></div>
        Resume Statistics
      </h3>
      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
        {stats.map((stat, index) => (
          <div
            key={stat.label}
            className="text-center transform hover:scale-110 transition-all duration-300 animate-slide-up"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div className={`relative mb-4 inline-block`}>
              <div className={`absolute inset-0 ${stat.bg} rounded-2xl blur-xl opacity-30`}></div>
              <div className={`relative ${stat.bg} ${stat.color} w-16 h-16 rounded-2xl flex items-center justify-center shadow-lg shadow-${stat.color.replace('text-', '')}/30 transform hover:rotate-12 transition-transform duration-300`}>
                {stat.icon}
              </div>
            </div>
            <div className="text-3xl font-black text-white">
              {stat.value}
            </div>
            <div className="text-xs text-gray-300 mt-2 font-semibold">{stat.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
};
