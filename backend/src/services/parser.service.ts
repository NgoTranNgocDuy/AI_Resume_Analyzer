import fs from 'fs';
import path from 'path';
import pdfParse from 'pdf-parse';
import mammoth from 'mammoth';
import Tesseract from 'tesseract.js';
import sharp from 'sharp';
import { ParsedResume } from '../types';

export const parseResume = async (filePath: string, fileName: string): Promise<ParsedResume> => {
  const ext = path.extname(fileName).toLowerCase();
  let text = '';

  try {
    if (ext === '.pdf') {
      const dataBuffer = fs.readFileSync(filePath);
      const data = await pdfParse(dataBuffer);
      text = data.text;
    } else if (ext === '.docx' || ext === '.doc') {
      const result = await mammoth.extractRawText({ path: filePath });
      text = result.value;
    } else if (ext === '.jpg' || ext === '.jpeg' || ext === '.png') {
      // Process image with OCR
      text = await extractTextFromImage(filePath);
    } else {
      throw new Error('Unsupported file format');
    }

    return {
      text: text.trim(),
      fileName,
      fileType: ext
    };
  } catch (error: any) {
    throw new Error(`Failed to parse resume: ${error.message}`);
  }
};

const extractTextFromImage = async (imagePath: string): Promise<string> => {
  try {
    // Preprocess image for better OCR results
    const processedImagePath = imagePath.replace(/\.[^.]+$/, '_processed.png');
    
    await sharp(imagePath)
      .grayscale()
      .normalize()
      .sharpen()
      .toFile(processedImagePath);

    // Perform OCR
    const { data: { text } } = await Tesseract.recognize(
      processedImagePath,
      'eng',
      {
        logger: () => {} // Suppress logs
      }
    );

    // Clean up processed image
    if (fs.existsSync(processedImagePath)) {
      fs.unlinkSync(processedImagePath);
    }

    return text;
  } catch (error: any) {
    throw new Error(`Failed to extract text from image: ${error.message}`);
  }
};
