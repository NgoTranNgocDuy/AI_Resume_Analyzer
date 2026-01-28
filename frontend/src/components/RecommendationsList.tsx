import React from 'react';
import { Recommendation } from '../types';
import { AlertCircle, AlertTriangle, Info } from 'lucide-react';

interface RecommendationsListProps {
  recommendations: Recommendation[];
}

export const RecommendationsList: React.FC<RecommendationsListProps> = ({ recommendations }) => {
  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'high':
        return <AlertCircle className="w-5 h-5" />;
      case 'medium':
        return <AlertTriangle className="w-5 h-5" />;
      case 'low':
        return <Info className="w-5 h-5" />;
      default:
        return <Info className="w-5 h-5" />;
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high':
        return 'bg-red-50 border-red-200 text-red-800';
      case 'medium':
        return 'bg-yellow-50 border-yellow-200 text-yellow-800';
      case 'low':
        return 'bg-blue-50 border-blue-200 text-blue-800';
      default:
        return 'bg-gray-50 border-gray-200 text-gray-800';
    }
  };

  const getSeverityBadge = (severity: string) => {
    switch (severity) {
      case 'high':
        return 'bg-red-100 text-red-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'low':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // Group recommendations by severity
  const groupedRecommendations = {
    high: recommendations.filter(r => r.severity === 'high'),
    medium: recommendations.filter(r => r.severity === 'medium'),
    low: recommendations.filter(r => r.severity === 'low')
  };

  return (
    <div className="glass-card rounded-3xl shadow-xl shadow-orange-500/10 p-8 hover:shadow-2xl hover:shadow-orange-500/20 transition-all duration-500 border border-orange-500/20">
      <h3 className="text-2xl font-black text-white mb-8 flex items-center">
        <div className="w-1 h-8 bg-gradient-to-b from-orange-500 to-red-600 rounded-full mr-3 shadow-lg shadow-orange-500/50"></div>
        Recommendations
      </h3>
      
      <div className="space-y-6">
        {/* High Priority */}
        {groupedRecommendations.high.length > 0 && (
          <div>
            <div className="flex items-center mb-4">
              <div className="p-2 bg-gradient-to-br from-red-500 to-red-600 rounded-xl shadow-lg">
                <AlertCircle className="w-5 h-5 text-white" />
              </div>
              <h4 className="text-base font-bold text-red-700 uppercase ml-3">
                High Priority
              </h4>
              <span className="ml-3 px-3 py-1 bg-red-100 text-red-700 rounded-full text-xs font-bold">
                {groupedRecommendations.high.length}
              </span>
            </div>
            <div className="space-y-4">
              {groupedRecommendations.high.map((rec, index) => (
                <div
                  key={`high-${index}`}
                  className="border-2 border-red-400/30 rounded-2xl p-6 bg-gradient-to-br from-red-900/20 to-orange-900/20 transform hover:scale-102 transition-all duration-300 shadow-md shadow-red-500/20 hover:shadow-lg hover:shadow-red-500/30 backdrop-blur-sm"
                >
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0 p-3 bg-red-500/20 border border-red-400/30 rounded-xl backdrop-blur-sm">
                      <AlertCircle className="w-5 h-5 text-red-400" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-3">
                        <span className="font-bold text-white text-lg">{rec.category}</span>
                        <span className="px-3 py-1 bg-red-600 text-white rounded-full text-xs font-bold shadow-md shadow-red-500/30">
                          {rec.severity.toUpperCase()}
                        </span>
                      </div>
                      <p className="text-base font-semibold text-red-200 mb-2">{rec.message}</p>
                      <p className="text-sm text-red-300 leading-relaxed">{rec.impact}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Medium Priority */}
        {groupedRecommendations.medium.length > 0 && (
          <div>
            <div className="flex items-center mb-4">
              <div className="p-2 bg-gradient-to-br from-yellow-500 to-orange-600 rounded-xl shadow-lg shadow-yellow-500/30">
                <AlertTriangle className="w-5 h-5 text-white" />
              </div>
              <h4 className="text-base font-bold text-yellow-300 uppercase ml-3">
                Medium Priority
              </h4>
              <span className="ml-3 px-3 py-1 bg-yellow-500/20 border border-yellow-400/30 text-yellow-300 rounded-full text-xs font-bold backdrop-blur-sm">
                {groupedRecommendations.medium.length}
              </span>
            </div>
            <div className="space-y-4">
              {groupedRecommendations.medium.map((rec, index) => (
                <div
                  key={`medium-${index}`}
                  className="border-2 border-yellow-400/30 rounded-2xl p-6 bg-gradient-to-br from-yellow-900/20 to-orange-900/20 transform hover:scale-102 transition-all duration-300 shadow-md shadow-yellow-500/20 hover:shadow-lg hover:shadow-yellow-500/30 backdrop-blur-sm"
                >
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0 p-3 bg-yellow-500/20 border border-yellow-400/30 rounded-xl backdrop-blur-sm">
                      <AlertTriangle className="w-5 h-5 text-yellow-400" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-3">
                        <span className="font-bold text-white text-lg">{rec.category}</span>
                        <span className="px-3 py-1 bg-yellow-600 text-white rounded-full text-xs font-bold shadow-md shadow-yellow-500/30">
                          {rec.severity.toUpperCase()}
                        </span>
                      </div>
                      <p className="text-base font-semibold text-yellow-200 mb-2">{rec.message}</p>
                      <p className="text-sm text-yellow-300 leading-relaxed">{rec.impact}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Low Priority */}
        {groupedRecommendations.low.length > 0 && (
          <div>
            <div className="flex items-center mb-4">
              <div className="p-2 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-lg shadow-blue-500/30">
                <Info className="w-5 h-5 text-white" />
              </div>
              <h4 className="text-base font-bold text-blue-300 uppercase ml-3">
                Low Priority
              </h4>
              <span className="ml-3 px-3 py-1 bg-blue-500/20 border border-blue-400/30 text-blue-300 rounded-full text-xs font-bold backdrop-blur-sm">
                {groupedRecommendations.low.length}
              </span>
            </div>
            <div className="space-y-4">
              {groupedRecommendations.low.map((rec, index) => (
                <div
                  key={`low-${index}`}
                  className="border-2 border-blue-400/30 rounded-2xl p-6 bg-gradient-to-br from-blue-900/20 to-cyan-900/20 transform hover:scale-102 transition-all duration-300 shadow-md shadow-blue-500/20 hover:shadow-lg hover:shadow-blue-500/30 backdrop-blur-sm"
                >
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0 p-3 bg-blue-500/20 border border-blue-400/30 rounded-xl backdrop-blur-sm">
                      <Info className="w-5 h-5 text-blue-400" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-3">
                        <span className="font-bold text-white text-lg">{rec.category}</span>
                        <span className="px-3 py-1 bg-blue-600 text-white rounded-full text-xs font-bold shadow-md shadow-blue-500/30">
                          {rec.severity.toUpperCase()}
                        </span>
                      </div>
                      <p className="text-base font-semibold text-blue-200 mb-2">{rec.message}</p>
                      <p className="text-sm text-blue-300 leading-relaxed">{rec.impact}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {recommendations.length === 0 && (
        <div className="text-center py-12">
          <div className="inline-block p-4 bg-green-500/20 border border-green-400/30 rounded-full mb-4 backdrop-blur-sm">
            <svg className="w-12 h-12 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <p className="text-white font-semibold text-lg">
            Excellent! Your resume looks great.
          </p>
          <p className="text-gray-400 mt-2">
            No major recommendations at this time.
          </p>
        </div>
      )}
    </div>
  );
};
