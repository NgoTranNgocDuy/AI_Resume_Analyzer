# 🚀 Quick Start Guide

## Installation Steps

### 1. Install all dependencies
Open a terminal in the project root directory and run:

```bash
npm run install-all
```

This will install dependencies for:
- Root project
- Backend
- Frontend

### 2. Start the development servers

```bash
npm run dev
```

This will start both the backend (port 5000) and frontend (port 5173) concurrently.

Or run them separately:

**Backend only:**
```bash
cd backend
npm run dev
```

**Frontend only:**
```bash
cd frontend
npm run dev
```

### 3. Open the application

Navigate to `http://localhost:5173` in your browser.

## Testing the Application

1. Prepare a resume file (PDF or DOCX format)
2. Drag and drop the file onto the upload area, or click to browse
3. Wait for the analysis to complete
4. Review the detailed feedback and recommendations

## Project Structure

```
AI_Resume_Analyzer/
├── backend/              # Express TypeScript API
│   ├── src/
│   │   ├── controllers/  # Request handlers
│   │   ├── routes/       # API routes
│   │   ├── services/     # Business logic
│   │   ├── types/        # TypeScript types
│   │   └── index.ts      # Entry point
│   └── uploads/          # Temporary file storage
├── frontend/             # React TypeScript UI
│   ├── src/
│   │   ├── components/   # React components
│   │   ├── services/     # API client
│   │   ├── types/        # TypeScript types
│   │   ├── App.tsx       # Main app component
│   │   └── main.tsx      # Entry point
│   └── index.html
└── README.md
```

## Available Scripts

### Root directory
- `npm run dev` - Start both frontend and backend
- `npm run install-all` - Install all dependencies

### Backend
- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production
- `npm start` - Start production server

### Frontend
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

## Features

✅ Drag and drop resume upload
✅ PDF and DOCX support
✅ Overall resume score
✅ ATS compatibility score
✅ Section-by-section analysis
✅ Skills detection
✅ Statistical analysis
✅ Actionable recommendations
✅ Beautiful, responsive UI

## Troubleshooting

**Port already in use:**
- Change the port in `backend/.env` (PORT=5000)
- Change the port in `frontend/vite.config.ts` (server.port)

**File upload not working:**
- Ensure the `backend/uploads` directory exists
- Check file size (max 5MB)
- Ensure file format is PDF or DOCX

**Dependencies issues:**
- Delete `node_modules` folders and reinstall:
  ```bash
  rm -rf node_modules backend/node_modules frontend/node_modules
  npm run install-all
  ```

## Environment Variables

Create a `.env` file in the `backend` directory:

```env
PORT=5000
NODE_ENV=development
```

## Next Steps

Consider adding:
- User authentication
- Resume history/storage
- PDF export of analysis results
- Integration with OpenAI for advanced analysis
- Resume template suggestions
- Comparison with job descriptions
- Export functionality

## Support

For issues or questions, please open an issue on GitHub.

Happy analyzing! 🎉
