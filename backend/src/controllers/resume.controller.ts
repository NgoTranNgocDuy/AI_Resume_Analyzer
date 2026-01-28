import { Request, Response } from 'express';
import fs from 'fs';
import { parseResume } from '../services/parser.service';
import { analyzeResumeContent } from '../services/analyzer.service';
import { extractDetailedData } from '../services/extractor.service';
import Resume from '../models/Resume.model';

export const analyzeResume = async (req: Request, res: Response) => {
  const startTime = Date.now();
  
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'No file uploaded'
      });
    }

    // Parse the resume
    const parsedResume = await parseResume(req.file.path, req.file.originalname);

    // Analyze the content
    const analysis = await analyzeResumeContent(parsedResume.text);

    // Extract detailed information
    const detailedData = extractDetailedData(analysis, parsedResume.text, parsedResume.fileName);

    // Read file data for storage
    const fileData = fs.readFileSync(req.file.path);
    
    // Calculate file size formatted
    const formatFileSize = (bytes: number) => {
      if (bytes === 0) return '0 Bytes';
      const k = 1024;
      const sizes = ['Bytes', 'KB', 'MB', 'GB'];
      const i = Math.floor(Math.log(bytes) / Math.log(k));
      return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
    };

    // Save to MongoDB with comprehensive data
    try {
      const processingTime = Date.now() - startTime;
      
      const resume = new Resume({
        fileName: parsedResume.fileName,
        originalFileName: req.file.originalname,
        fileType: parsedResume.fileType,
        fileSize: req.file.size,
        fileSizeFormatted: formatFileSize(req.file.size),
        fileData: fileData,
        mimeType: req.file.mimetype,
        uploadDate: new Date(),
        uploadIP: req.ip || req.connection.remoteAddress,
        
        // Detailed extracted data
        contactDetails: detailedData.contactDetails,
        workExperience: detailedData.workExperience,
        education: detailedData.education,
        detailedSkills: detailedData.detailedSkills,
        projects: detailedData.projects,
        certifications: detailedData.certifications,
        awards: detailedData.awards,
        keywordAnalysis: detailedData.keywordAnalysis,
        detailedScores: detailedData.detailedScores,
        sectionAnalysis: detailedData.sectionAnalysis,
        atsCompatibility: detailedData.atsCompatibility,
        contentQuality: detailedData.contentQuality,
        industryAnalysis: detailedData.industryAnalysis,
        extractedText: detailedData.extractedText,
        
        // Processing metadata
        processingMetadata: {
          processingTime,
          processingDate: new Date(),
          ocrUsed: parsedResume.fileName.match(/\.(jpg|jpeg|png)$/i) !== null,
          languageDetected: 'en',
          version: '2.0.0',
          analysisEngine: 'natural-nlp'
        },
        
        // Original analysis for backward compatibility
        analysis: analysis,
        rawText: parsedResume.text
      });

      await resume.save();
      console.log('✅ Resume saved to database with comprehensive details');
      console.log(`📊 Extracted: ${detailedData.workExperience.length} jobs, ${detailedData.education.length} education entries, ${detailedData.detailedSkills.technical.length} technical skills`);
    } catch (dbError: any) {
      console.error('⚠️  Failed to save to database:', dbError.message);
      // Continue even if DB save fails
    }

    // Clean up uploaded file
    fs.unlinkSync(req.file.path);

    res.json({
      success: true,
      data: {
        fileName: parsedResume.fileName,
        ...analysis
      }
    });
  } catch (error: any) {
    console.error('Error analyzing resume:', error);
    
    // Clean up file if it exists
    if (req.file && fs.existsSync(req.file.path)) {
      fs.unlinkSync(req.file.path);
    }

    res.status(500).json({
      success: false,
      message: error.message || 'Error analyzing resume'
    });
  }
};

export const getAllResumes = async (req: Request, res: Response) => {
  try {
    const resumes = await Resume.find()
      .select('-fileData -rawText')
      .sort({ uploadDate: -1 })
      .limit(50);

    res.json({
      success: true,
      count: resumes.length,
      data: resumes
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'Error fetching resumes'
    });
  }
};

export const getResumeById = async (req: Request, res: Response) => {
  try {
    const resume = await Resume.findById(req.params.id);

    if (!resume) {
      return res.status(404).json({
        success: false,
        message: 'Resume not found'
      });
    }

    res.json({
      success: true,
      data: resume
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'Error fetching resume'
    });
  }
};
