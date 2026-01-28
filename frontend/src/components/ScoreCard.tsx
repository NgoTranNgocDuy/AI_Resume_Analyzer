import React from 'react';

interface ScoreCardProps {
  title: string;
  score: number;
  description: string;
  color: 'blue' | 'green' | 'purple';
}

const colorMap = {
  blue: {
    path: '#3b82f6',
    trail: '#1e3a5f',
    text: '#60a5fa',
    glow: '#3b82f6'
  },
  green: {
    path: '#10b981',
    trail: '#1e4d3a',
    text: '#34d399',
    glow: '#10b981'
  },
  purple: {
    path: '#8b5cf6',
    trail: '#3d2b5f',
    text: '#a78bfa',
    glow: '#8b5cf6'
  }
};

export const ScoreCard: React.FC<ScoreCardProps> = ({ title, score, description, color }) => {
  const colors = colorMap[color];
  
  const getScoreLabel = (score: number) => {
    if (score >= 80) return 'Excellent';
    if (score >= 60) return 'Good';
    if (score >= 40) return 'Fair';
    return 'Needs Work';
  };

  return (
    <div className="glass-card rounded-3xl shadow-xl shadow-purple-500/10 p-8 hover:shadow-2xl hover:shadow-purple-500/20 transition-all duration-500 transform hover:scale-105 group border border-purple-500/20">
      <h3 className="text-lg font-bold text-white mb-6 text-center">{title}</h3>
      
      <div className="flex items-center justify-center mb-6">
        <div className="relative w-40 h-40">
          {/* Glow effect */}
          <div className="absolute inset-0 rounded-full blur-2xl opacity-20" style={{ backgroundColor: colors.glow }}></div>
          
          {/* Background circle */}
          <svg className="absolute top-0 left-0 w-40 h-40 -rotate-90">
            <circle
              cx="80"
              cy="80"
              r="70"
              fill="none"
              stroke={colors.trail}
              strokeWidth="12"
            />
            {/* Progress circle */}
            <circle
              cx="80"
              cy="80"
              r="70"
              fill="none"
              stroke="url(#gradient)"
              strokeWidth="12"
              strokeDasharray={`${2 * Math.PI * 70}`}
              strokeDashoffset={`${2 * Math.PI * 70 * (1 - score / 100)}`}
              strokeLinecap="round"
              className="transition-all duration-1000 ease-out drop-shadow-lg"
              style={{ filter: `drop-shadow(0 0 8px ${colors.glow}80)` }}
            />
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor={colors.path} />
                <stop offset="100%" stopColor={score >= 70 ? '#10b981' : score >= 40 ? '#f59e0b' : '#ef4444'} />
              </linearGradient>
            </defs>
          </svg>
          {/* Center content */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <div className="text-5xl font-black" style={{ color: colors.text }}>
              {score}
            </div>
            <div className="text-xs text-gray-400 font-semibold mt-1">{getScoreLabel(score)}</div>
          </div>
        </div>
      </div>
      
      <p className="text-sm text-gray-300 text-center leading-relaxed">{description}</p>
      
      {/* Score indicator bar */}
      <div className="mt-4 h-2 bg-gray-800 rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-1000 ease-out ${
            score >= 80 ? 'bg-gradient-to-r from-green-400 to-green-600' :
            score >= 60 ? 'bg-gradient-to-r from-blue-400 to-blue-600' :
            score >= 40 ? 'bg-gradient-to-r from-yellow-400 to-orange-600' :
            'bg-gradient-to-r from-red-400 to-red-600'
          }`}
          style={{ width: `${score}%`, boxShadow: `0 0 10px ${colors.glow}60` }}
        ></div>
      </div>
    </div>
  );
};
