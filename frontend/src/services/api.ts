import axios from 'axios';
import { ResumeAnalysis } from '../types';

const API_BASE_URL = '/api';

export const analyzeResume = async (file: File): Promise<ResumeAnalysis> => {
  const formData = new FormData();
  formData.append('resume', file);

  const response = await axios.post(`${API_BASE_URL}/analyze`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return response.data.data;
};
