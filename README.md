<<<<<<< HEAD
# AI Resume Analyzer 🚀

A modern fullstack application that analyzes resumes using AI, providing detailed feedback and improvement suggestions.

## Features ✨

- 📄 **Drag & Drop Upload** - Easy resume upload interface
- 🤖 **AI-Powered Analysis** - Intelligent resume parsing and evaluation
- 📊 **Detailed Statistics** - Comprehensive metrics and scores
- 💡 **Improvement Suggestions** - Actionable recommendations
- 🎯 **ATS Compatibility Check** - Ensure your resume passes automated systems
- 📈 **Skills Analysis** - Identify skills and their relevance
- ✅ **Format Validation** - Check resume structure and formatting

## Tech Stack 🛠️

### Frontend
- React 18 with TypeScript
- Vite (Build tool)
- Tailwind CSS (Styling)
- Axios (HTTP client)
- React Dropzone (File upload)
- Recharts (Data visualization)

### Backend
- Node.js with Express
- TypeScript
- Multer (File upload handling)
- PDF-Parse (PDF parsing)
- Mammoth (DOCX parsing)
- Natural (NLP library)

## Installation 📦

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Quick Start

1. **Clone the repository**
```bash
git clone <your-repo-url>
cd AI_Resume_Analyzer
```

2. **Install all dependencies**
```bash
npm run install-all
```

3. **Set up environment variables**

Create a `.env` file in the `backend` directory:
```env
PORT=5000
NODE_ENV=development
```

4. **Run the application**
```bash
npm run dev
```

The frontend will run on `http://localhost:5173`
The backend will run on `http://localhost:5000`

## Manual Installation

### Backend
```bash
cd backend
npm install
npm run dev
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```

## Usage 📝

1. Open your browser and navigate to `http://localhost:5173`
2. Drag and drop your resume (PDF or DOCX format)
3. Wait for the analysis to complete
4. Review the detailed feedback and statistics
5. Implement suggested improvements

## API Endpoints 🔌

### POST `/api/analyze`
Upload and analyze a resume

**Request:**
- Content-Type: `multipart/form-data`
- Body: `file` (PDF or DOCX)

**Response:**
```json
{
  "success": true,
  "data": {
    "overallScore": 85,
    "sections": {...},
    "skills": [...],
    "recommendations": [...],
    "statistics": {...}
  }
}
```

## Project Structure 📁

```
AI_Resume_Analyzer/
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── services/
│   │   ├── utils/
│   │   ├── types/
│   │   ├── routes/
│   │   └── index.ts
│   ├── uploads/
│   ├── package.json
│   └── tsconfig.json
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── services/
│   │   ├── types/
│   │   ├── App.tsx
│   │   └── main.tsx
│   ├── package.json
│   ├── tsconfig.json
│   └── vite.config.ts
└── package.json
```

## Analysis Metrics 📊

The app analyzes:
- **Contact Information** - Presence and completeness
- **Professional Summary** - Quality and relevance
- **Experience** - Detail level and impact
- **Education** - Credentials and relevance
- **Skills** - Technical and soft skills
- **Formatting** - ATS compatibility and readability
- **Keywords** - Industry-relevant terms
- **Length** - Optimal page count

## Contributing 🤝

Contributions are welcome! Please feel free to submit a Pull Request.

## License 📄

MIT License - feel free to use this project for personal or commercial purposes.

## Support 💬

For issues or questions, please open an issue on GitHub.
=======
# AI_Resume_Analyzer
>>>>>>> 9d8e9c89c17d9a63547dcff0c1b387c451375889
