import React from 'react';
import { ResumeAnalysis } from '../types';
import { ScoreCard } from './ScoreCard';
import { SkillsList } from './SkillsList';
import { RecommendationsList } from './RecommendationsList';
import { StatisticsCard } from './StatisticsCard';
import { SectionScores } from './SectionScores';
import { RotateCcw } from 'lucide-react';

interface AnalysisResultsProps {
  analysis: ResumeAnalysis;
  onReset: () => void;
}

export const AnalysisResults: React.FC<AnalysisResultsProps> = ({ analysis, onReset }) => {
  return (
    <div className="max-w-7xl mx-auto">
      {/* Header with Reset Button */}
      <div className="flex justify-between items-center mb-10">
        <div>
          <h2 className="text-4xl font-black gradient-text mb-2">
            Analysis Results
          </h2>
          {analysis.fileName && (
            <p className="text-gray-300 flex items-center">
              <svg className="w-5 h-5 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              {analysis.fileName}
            </p>
          )}
        </div>
        <button
          onClick={onReset}
          className="flex items-center space-x-2 px-6 py-3 glass-card text-white rounded-xl hover:bg-white/10 transition-all duration-300 font-semibold shadow-lg shadow-purple-500/10 hover:shadow-xl hover:shadow-purple-500/20 transform hover:scale-105 border border-purple-500/30"
        >
          <RotateCcw className="w-5 h-5" />
          <span>Analyze Another</span>
        </button>
      </div>

      {/* Main Scores */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <ScoreCard
          title="Overall Score"
          score={analysis.overallScore}
          description="Comprehensive resume quality score"
          color="blue"
        />
        <ScoreCard
          title="ATS Score"
          score={analysis.atsScore}
          description="Applicant Tracking System compatibility"
          color="green"
        />
        <ScoreCard
          title="Contact Info"
          score={analysis.contactInfo.score}
          description="Completeness of contact information"
          color="purple"
        />
      </div>

      {/* Section Scores */}
      <SectionScores sections={analysis.sections} />

      {/* Statistics */}
      <StatisticsCard statistics={analysis.statistics} />

      {/* Skills */}
      {analysis.skills.length > 0 && (
        <SkillsList skills={analysis.skills} />
      )}

      {/* Recommendations */}
      {analysis.recommendations.length > 0 && (
        <RecommendationsList recommendations={analysis.recommendations} />
      )}
    </div>
  );
};
