# AI Resume Analyzer

## Overview

AI Resume Analyzer is a full-stack web application that uses artificial intelligence to analyze resumes and match them with job descriptions. The system extracts skills from PDF resumes, scores them based on industry relevance, and provides job matching capabilities with detailed recommendations for improvement.

## Features

### Core Functionality
- **Resume Upload & Analysis**: Upload PDF resumes for automatic text extraction and skill identification
- **AI-Powered Scoring**: Calculate resume quality scores based on skills, length, and diversity
- **Job Matching**: Compare resumes against job descriptions using TF-IDF similarity algorithms
- **Skill Gap Analysis**: Identify missing skills and provide targeted recommendations
- **Resume Dashboard**: Track upload history, scores, and analytics

### User Management
- **Secure Authentication**: JWT-based user authentication and authorization
- **User Profiles**: Personalized dashboard for each user
- **Resume History**: Complete history of uploaded and analyzed resumes

### Technical Features
- **PDF Processing**: Advanced text extraction from PDF documents
- **Machine Learning**: Custom ML models for skill extraction and job matching
- **Responsive Design**: Mobile-first web interface
- **Real-time Analysis**: Instant feedback and scoring results

## Technology Stack

### Backend
- **Framework**: FastAPI (Python)
- **Database**: PostgreSQL with SQLAlchemy ORM
- **Authentication**: JWT tokens with bcrypt hashing
- **ML/AI**: scikit-learn, custom algorithms
- **PDF Processing**: pdfplumber
- **Validation**: Pydantic schemas

### Frontend
- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **UI Library**: React 19
- **Styling**: Tailwind CSS 4
- **Components**: shadcn/ui (Radix UI primitives)
- **Icons**: Lucide React

### Infrastructure
- **Deployment**: Backend on Render, Frontend on Vercel
- **Database**: PostgreSQL (production)
- **Environment**: Python virtual environment

## Project Structure

```
ai-resume-analyzer/
├── backend/                      # FastAPI backend application
│   ├── main.py                   # Application entry point
│   ├── database.py               # Database configuration
│   ├── requirements.txt          # Python dependencies
│   ├── api/                      # API route handlers
│   ├── models/                   # SQLAlchemy database models
│   ├── services/                 # Business logic layer
│   ├── ml/                       # Machine learning components
│   ├── schemas/                  # Pydantic validation schemas
│   ├── security/                 # Authentication utilities
│   ├── utils/                    # Utility functions
│   ├── uploads/                  # File upload directory
│   └── README.md                 # Backend documentation
├── frontend/                     # Next.js frontend application
│   ├── app/                      # Next.js App Router pages
│   ├── components/               # React components
│   ├── lib/                      # Utility libraries
│   ├── public/                   # Static assets
│   ├── package.json              # Node.js dependencies
│   └── README.md                 # Frontend documentation
├── venv/                         # Python virtual environment
└── README.md                     # This file
```

## Prerequisites

- **Python 3.8+** for backend
- **Node.js 18+** for frontend
- **PostgreSQL** database
- **Git** for version control

## Installation & Setup

### 1. Clone the Repository

```bash
git clone <repository-url>
cd ai-resume-analyzer
```

### 2. Backend Setup

```bash
# Navigate to backend directory
cd backend

# Create Python virtual environment
python -m venv venv

# Activate virtual environment
# On Windows:
venv\Scripts\activate
# On macOS/Linux:
source venv/bin/activate

# Install Python dependencies
pip install -r requirements.txt

# Set up environment variables
# Create .env file in backend directory
DATABASE_URL=postgresql://username:password@localhost:5432/resume_analyzer
SECRET_KEY=your-secret-key-here
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30
```

### 3. Database Setup

```bash
# Create PostgreSQL database
createdb resume_analyzer

# The application will automatically create tables on startup
```

### 4. Frontend Setup

```bash
# Navigate to frontend directory
cd ../frontend

# Install Node.js dependencies
npm install

# Configure API endpoint (optional)
# Update lib/api.ts if needed
export const API_URL = "http://localhost:8000"
```

## Running the Application

### Development Mode

1. **Start Backend**:
   ```bash
   cd backend
   venv\Scripts\activate  # Windows
   uvicorn main:app --reload
   ```
   Backend will be available at: http://localhost:8000

2. **Start Frontend**:
   ```bash
   cd frontend
   npm run dev
   ```
   Frontend will be available at: http://localhost:3000

### Production Mode

1. **Backend Production**:
   ```bash
   cd backend
   uvicorn main:app --host 0.0.0.0 --port 8000
   ```

2. **Frontend Production**:
   ```bash
   cd frontend
   npm run build
   npm run start
   ```

## Usage

### User Registration & Login

1. Visit the application at http://localhost:3000
2. Click "Signup" to create a new account
3. Login with your credentials
4. Access the dashboard and upload functionality

### Resume Analysis

1. **Upload Resume**: Click "Choose File" and select a PDF resume
2. **Optional Job Description**: Paste a job description for matching
3. **Analyze**: Click "Upload & Analyze" to process the resume
4. **View Results**: See ATS score, job match percentage, skills found, and recommendations

### Dashboard Features

- View all uploaded resumes
- Check individual scores and match results
- Track analysis history
- Download processed resumes

## API Documentation

### Authentication Endpoints
- `POST /auth/login` - User login (OAuth2 form data)
- `POST /users` - User registration

### Resume Endpoints
- `POST /resume/upload` - Upload and analyze resume
- `POST /resume/match` - Match resume with job description
- `GET /resume/history` - Get user's resume history
- `GET /resume/dashboard` - Get dashboard analytics
- `GET /resume/progress` - Get processing progress
- `PUT /resume/{id}` - Update resume
- `DELETE /resume/{id}` - Delete resume
- `GET /resume/download/{id}` - Download resume file

### User Endpoints
- `GET /users/me` - Get current user information
- `PUT /users/me` - Update user profile

Full API documentation available at: http://localhost:8000/docs (Swagger UI)

## Machine Learning Components

### Resume Scoring Algorithm
- **Skill Weights**: Industry-specific skill importance (Python: 10, Git: 6, etc.)
- **Length Bonus**: Optimal resume length (200-600 words)
- **Diversity Bonus**: Points for multiple skill categories
- **Maximum Score**: 100 points

### Skill Extraction
- **Method**: Regex pattern matching against predefined skill database
- **Coverage**: Technical skills (programming languages, frameworks, tools)
- **Accuracy**: Case-insensitive matching with word boundaries

### Job Matching
- **Algorithm**: TF-IDF vectorization with cosine similarity
- **Input**: Resume text vs. job description text
- **Output**: Match percentage (0-100%)

## Development

### Code Quality
- **Backend**: Type hints, Pydantic validation, SQLAlchemy best practices
- **Frontend**: TypeScript strict mode, ESLint, component composition
- **Testing**: Unit tests for ML algorithms, API endpoint testing

### Adding New Features
1. **Backend**: Add models, services, and API routes following existing patterns
2. **Frontend**: Create components in `/components`, pages in `/app`
3. **ML**: Extend algorithms in `/backend/ml` directory

### Environment Variables
```env
# Backend
DATABASE_URL=postgresql://user:pass@localhost:5432/db
SECRET_KEY=your-256-bit-secret
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30

# Frontend (if needed)
NEXT_PUBLIC_API_URL=http://localhost:8000
```

## Deployment

### Backend Deployment (Render)
1. Connect GitHub repository
2. Set environment variables
3. Configure PostgreSQL database
4. Deploy with uvicorn

### Frontend Deployment (Vercel)
1. Connect GitHub repository
2. Set build settings (Next.js default)
3. Configure environment variables
4. Deploy automatically

### Database
- Use managed PostgreSQL (Render, Railway, or AWS RDS)
- Set connection pooling for production
- Enable SSL connections

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines
- Follow existing code structure and naming conventions
- Add type hints and TypeScript types
- Write descriptive commit messages
- Test your changes thoroughly
- Update documentation for new features

## Troubleshooting

### Common Issues

**Backend Connection Issues**:
- Verify PostgreSQL is running and credentials are correct
- Check `.env` file configuration
- Ensure virtual environment is activated

**Frontend API Errors**:
- Confirm backend is running on correct port
- Check API_URL in `frontend/lib/api.ts`
- Verify CORS configuration in backend

**PDF Processing Errors**:
- Ensure PDF files are not corrupted
- Check file size limits
- Verify pdfplumber installation

**Authentication Issues**:
- Clear browser localStorage
- Check JWT token expiration
- Verify backend secret key configuration

### Logs and Debugging
- **Backend**: Check uvicorn console output
- **Frontend**: Use browser developer tools
- **Database**: Check PostgreSQL logs

## License

[Add your license information here]

## Support

For questions, issues, or contributions:
- Create an issue in the GitHub repository
- Check the backend and frontend READMEs for detailed documentation
- Review API documentation at `/docs` endpoint

## Roadmap

### Planned Features
- [ ] Advanced ML models for better skill extraction
- [ ] Resume optimization suggestions
- [ ] Multiple file format support (DOCX, TXT)
- [ ] Team collaboration features
- [ ] Analytics dashboard improvements
- [ ] Mobile app development

### Technical Improvements
- [ ] Unit and integration testing
- [ ] CI/CD pipeline setup
- [ ] Performance optimization
- [ ] Security audits
- [ ] Docker containerization