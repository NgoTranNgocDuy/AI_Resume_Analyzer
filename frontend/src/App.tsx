import { useState } from 'react';
import { FileUpload } from './components/FileUpload';
import { AnalysisResults } from './components/AnalysisResults';
import { analyzeResume } from './services/api';
import { ResumeAnalysis } from './types';
import { Sparkles, Zap, Shield, TrendingUp } from 'lucide-react';

function App() {
  const [analysis, setAnalysis] = useState<ResumeAnalysis | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileUpload = async (file: File) => {
    setLoading(true);
    setError(null);
    setAnalysis(null);

    try {
      const result = await analyzeResume(file);
      setAnalysis(result);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to analyze resume. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setAnalysis(null);
    setError(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-float"></div>
        <div className="absolute top-3/4 right-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-float" style={{animationDelay: '2s'}}></div>
        <div className="absolute bottom-1/4 left-1/2 w-96 h-96 bg-pink-500/20 rounded-full blur-3xl animate-float" style={{animationDelay: '4s'}}></div>
      </div>

      <div className="container mx-auto px-4 py-8 relative z-10">
        {/* Hero Header */}
        {!analysis && !loading && !error && (
          <div className="text-center mb-16 animate-slide-up">
            <div className="flex items-center justify-center mb-8">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-3xl blur-2xl opacity-50 animate-pulse"></div>
                <div className="relative px-8 py-4 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 rounded-3xl shadow-2xl animate-gradient">
                  <h1 className="text-5xl md:text-7xl font-black text-white tracking-tight">
                    AI Resume Analyzer
                  </h1>
                </div>
              </div>
            </div>
            
            <p className="text-2xl text-gray-300 font-medium mb-8 max-w-3xl mx-auto">
              Harness the power of AI to perfect your resume and land your dream job
            </p>

            {/* Feature Pills */}
            <div className="flex flex-wrap items-center justify-center gap-4 mb-12">
              <div className="glass-effect px-6 py-3 rounded-full flex items-center gap-3 hover-scale">
                <Sparkles className="w-5 h-5 text-yellow-400" />
                <span className="text-white font-semibold">AI-Powered</span>
              </div>
              <div className="glass-effect px-6 py-3 rounded-full flex items-center gap-3 hover-scale">
                <Zap className="w-5 h-5 text-blue-400" />
                <span className="text-white font-semibold">Instant Analysis</span>
              </div>
              <div className="glass-effect px-6 py-3 rounded-full flex items-center gap-3 hover-scale">
                <Shield className="w-5 h-5 text-green-400" />
                <span className="text-white font-semibold">ATS Compatible</span>
              </div>
              <div className="glass-effect px-6 py-3 rounded-full flex items-center gap-3 hover-scale">
                <TrendingUp className="w-5 h-5 text-purple-400" />
                <span className="text-white font-semibold">Smart Tips</span>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 max-w-3xl mx-auto">
              <div className="glass-card p-6 rounded-2xl hover-scale">
                <div className="text-4xl font-black bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent mb-2">
                  10K+
                </div>
                <div className="text-gray-400 text-sm font-medium">Resumes Analyzed</div>
              </div>
              <div className="glass-card p-6 rounded-2xl hover-scale">
                <div className="text-4xl font-black bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">
                  98%
                </div>
                <div className="text-gray-400 text-sm font-medium">Accuracy Rate</div>
              </div>
              <div className="glass-card p-6 rounded-2xl hover-scale">
                <div className="text-4xl font-black bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent mb-2">
                  &lt;3s
                </div>
                <div className="text-gray-400 text-sm font-medium">Average Time</div>
              </div>
            </div>
          </div>
        )}

        {/* Main Content */}
        {!analysis && !loading && !error && (
          <div className="animate-scale-in">
            <FileUpload onFileUpload={handleFileUpload} />
          </div>
        )}

        {loading && (
          <div className="flex flex-col items-center justify-center py-32 animate-scale-in">
            <div className="relative mb-12">
              <div className="w-32 h-32 border-8 border-purple-500/20 rounded-full"></div>
              <div className="w-32 h-32 border-8 border-transparent border-t-purple-500 border-r-pink-500 rounded-full animate-spin absolute top-0 left-0"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <Sparkles className="w-12 h-12 text-purple-400 animate-pulse" />
              </div>
            </div>
            <div className="text-center">
              <h3 className="text-3xl font-bold text-white mb-4">Analyzing Your Resume</h3>
              <p className="text-gray-400 text-lg mb-6">Our AI is working its magic...</p>
              <div className="flex items-center justify-center gap-3">
                <div className="w-3 h-3 bg-purple-500 rounded-full animate-bounce"></div>
                <div className="w-3 h-3 bg-pink-500 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
              </div>
            </div>
          </div>
        )}

        {error && (
          <div className="max-w-2xl mx-auto animate-scale-in">
            <div className="glass-card border-2 border-red-500/50 rounded-3xl p-10 text-center">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-red-500/20 rounded-full mb-6">
                <svg className="w-10 h-10 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Oops! Something went wrong</h3>
              <p className="text-gray-400 mb-8">{error}</p>
              <button
                onClick={handleReset}
                className="px-8 py-4 bg-gradient-to-r from-red-600 to-pink-600 text-white rounded-xl font-bold hover:from-red-700 hover:to-pink-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                Try Again
              </button>
            </div>
          </div>
        )}

        {analysis && (
          <AnalysisResults analysis={analysis} onReset={handleReset} />
        )}

        {/* Footer */}
        {!analysis && !loading && (
          <footer className="mt-24 text-center animate-slide-up">
            <div className="glass-card rounded-2xl p-8 inline-block max-w-2xl">
              <p className="text-gray-300 font-medium mb-4">
                Powered by cutting-edge AI technology
              </p>
              <div className="flex items-center justify-center gap-4 flex-wrap">
                <span className="px-4 py-2 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 border border-blue-500/30 text-blue-300 rounded-full text-sm font-semibold">
                  React 18
                </span>
                <span className="px-4 py-2 bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 text-purple-300 rounded-full text-sm font-semibold">
                  TypeScript
                </span>
                <span className="px-4 py-2 bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-500/30 text-green-300 rounded-full text-sm font-semibold">
                  MongoDB
                </span>
                <span className="px-4 py-2 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border border-yellow-500/30 text-yellow-300 rounded-full text-sm font-semibold">
                  AI Powered
                </span>
              </div>
            </div>
          </footer>
        )}
      </div>
    </div>
  );
}

export default App;
