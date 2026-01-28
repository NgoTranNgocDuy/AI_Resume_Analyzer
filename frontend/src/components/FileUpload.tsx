import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, FileText } from 'lucide-react';

interface FileUploadProps {
  onFileUpload: (file: File) => void;
}

export const FileUpload: React.FC<FileUploadProps> = ({ onFileUpload }) => {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      onFileUpload(acceptedFiles[0]);
    }
  }, [onFileUpload]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
      'application/msword': ['.doc'],
      'image/jpeg': ['.jpg', '.jpeg'],
      'image/png': ['.png']
    },
    maxFiles: 1,
    maxSize: 10485760, // 10MB
  });

  return (
    <div className="max-w-3xl mx-auto">
      <div
        {...getRootProps()}
        className={`
          relative overflow-hidden
          border-3 border-dashed rounded-3xl p-16 text-center cursor-pointer
          transition-all duration-500 ease-out transform
          ${
            isDragActive
              ? 'border-purple-400 bg-gradient-to-br from-purple-900/30 to-pink-900/30 scale-105 shadow-2xl shadow-purple-500/20'
              : 'border-gray-600 glass-card hover:border-purple-500 hover:shadow-xl hover:shadow-purple-500/10 hover:scale-102'
          }
        `}
      >
        <input {...getInputProps()} />
        
        {/* Animated gradient overlay on drag */}
        {isDragActive && (
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 via-pink-500/20 to-blue-500/20 animate-gradient-shift"></div>
        )}
        
        <div className="flex flex-col items-center space-y-6 relative z-10">
          {isDragActive ? (
            <>
              <div className="p-6 bg-gradient-to-br from-purple-500 to-pink-600 rounded-3xl shadow-2xl shadow-purple-500/50 animate-pulse-glow">
                <Upload className="w-16 h-16 text-white" />
              </div>
              <div>
                <p className="text-2xl font-bold gradient-text mb-2">
                  Drop it like it's hot! 🔥
                </p>
                <p className="text-purple-300">Release to analyze your resume</p>
              </div>
            </>
          ) : (
            <>
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-3xl blur-xl opacity-30 animate-pulse"></div>
                <div className="relative p-6 bg-gradient-to-br from-purple-500 to-pink-600 rounded-3xl shadow-2xl shadow-purple-500/50 transform hover:scale-110 transition-transform duration-300">
                  <FileText className="w-16 h-16 text-white" />
                </div>
              </div>
              <div className="max-w-md">
                <p className="text-2xl font-bold text-white mb-3">
                  Drop your resume here
                </p>
                <p className="text-gray-300 mb-4">
                  or click to browse from your computer
                </p>
                <div className="flex items-center justify-center gap-3 flex-wrap">
                  <span className="px-4 py-2 bg-red-500/20 border border-red-400/30 text-red-300 rounded-full text-sm font-semibold backdrop-blur-sm">PDF</span>
                  <span className="px-4 py-2 bg-blue-500/20 border border-blue-400/30 text-blue-300 rounded-full text-sm font-semibold backdrop-blur-sm">DOCX</span>
                  <span className="px-4 py-2 bg-purple-500/20 border border-purple-400/30 text-purple-300 rounded-full text-sm font-semibold backdrop-blur-sm">DOC</span>
                  <span className="px-4 py-2 bg-green-500/20 border border-green-400/30 text-green-300 rounded-full text-sm font-semibold backdrop-blur-sm">JPG</span>
                  <span className="px-4 py-2 bg-pink-500/20 border border-pink-400/30 text-pink-300 rounded-full text-sm font-semibold backdrop-blur-sm">PNG</span>
                </div>
                <p className="text-xs text-gray-400 mt-3">Maximum file size: 10MB</p>
              </div>
            </>
          )}
        </div>

        <div className="mt-10">
          <button
            type="button"
            className="px-8 py-4 bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 text-white rounded-2xl font-bold text-lg hover:from-purple-700 hover:via-pink-700 hover:to-purple-700 transition-all duration-300 shadow-xl shadow-purple-500/30 hover:shadow-2xl hover:shadow-pink-500/40 transform hover:scale-105"
          >
            Choose File
          </button>
        </div>
      </div>

      <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
        <div className="glass-card p-6 rounded-2xl shadow-lg shadow-blue-500/10 hover:shadow-2xl hover:shadow-blue-500/20 transform hover:scale-105 transition-all duration-300 group border border-blue-500/20">
          <div className="flex items-center justify-center mb-3">
            <div className="p-3 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-blue-500/30">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
          </div>
          <div className="font-bold text-white mb-2 text-center">Detailed Analysis</div>
          <div className="text-gray-300 text-center">Comprehensive feedback on every section of your resume</div>
        </div>
        <div className="glass-card p-6 rounded-2xl shadow-lg shadow-green-500/10 hover:shadow-2xl hover:shadow-green-500/20 transform hover:scale-105 transition-all duration-300 group border border-green-500/20">
          <div className="flex items-center justify-center mb-3">
            <div className="p-3 bg-gradient-to-br from-green-500 to-green-600 rounded-xl group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-green-500/30">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
          <div className="font-bold text-white mb-2 text-center">ATS Score</div>
          <div className="text-gray-300 text-center">Check compatibility with applicant tracking systems</div>
        </div>
        <div className="glass-card p-6 rounded-2xl shadow-lg shadow-purple-500/10 hover:shadow-2xl hover:shadow-purple-500/20 transform hover:scale-105 transition-all duration-300 group border border-purple-500/20">
          <div className="flex items-center justify-center mb-3">
            <div className="p-3 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-purple-500/30">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </div>
          </div>
          <div className="font-bold text-white mb-2 text-center">Smart Tips</div>
          <div className="text-gray-300 text-center">Actionable recommendations to improve your resume</div>
        </div>
      </div>
    </div>
  );
};
