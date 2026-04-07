# AI Resume Analyzer Backend

## Overview

This is the backend component of the AI Resume Analyzer application, built with FastAPI. It provides RESTful APIs for user authentication, resume management, and AI-powered resume analysis including skill extraction, scoring, job matching, and recommendations.

## Features

- **User Authentication**: Secure login and registration using JWT tokens
- **Resume Upload & Processing**: Upload PDF resumes, extract text content
- **Skill Extraction**: Automatically identify and extract technical skills from resumes
- **Resume Scoring**: Calculate resume quality scores based on skills, length, and diversity
- **Job Matching**: Match resumes with job descriptions using TF-IDF similarity
- **Resume Analytics**: Dashboard with progress tracking and history
- **File Management**: Secure file storage and retrieval

## Technology Stack

- **Framework**: FastAPI
- **Database**: PostgreSQL with SQLAlchemy ORM
- **Authentication**: JWT with bcrypt password hashing
- **ML/AI**: scikit-learn for text similarity, custom scoring algorithms
- **PDF Processing**: pdfplumber for text extraction
- **Validation**: Pydantic schemas
- **CORS**: Configured for frontend integration

## Project Structure

```
backend/
├── main.py                 # FastAPI application entry point
├── database.py             # Database configuration and connection
├── requirements.txt        # Python dependencies
├── api/                    # API route handlers
│   ├── auth_routes.py      # Authentication endpoints
│   ├── resume_routes.py    # Resume management endpoints
│   └── user_routes.py      # User management endpoints
├── dependencies/           # Dependency injection modules
│   ├── auth_dependencies.py # Authentication dependencies
│   └── db_dependencies.py   # Database dependencies
├── ml/                     # Machine learning components
│   ├── resume_scorer.py    # Resume scoring algorithm
│   ├── skill_extractor.py  # Skill extraction from text
│   ├── job_matcher.py      # Job-resume matching
│   ├── recommendation_engine.py # Recommendation system
│   ├── job_skill_extractor.py   # Job skill extraction
│   └── skill_gap_analyzer.py    # Skill gap analysis
├── models/                 # SQLAlchemy database models
│   ├── user.py             # User model
│   └── resume.py           # Resume model
├── repositories/           # Data access layer
│   ├── user_repositories.py    # User data operations
│   └── resume_repository.py    # Resume data operations
├── schemas/                # Pydantic schemas for validation
│   ├── auth_schema.py      # Authentication schemas
│   ├── user_schema.py      # User schemas
│   └── resume_schema.py    # Resume schemas
├── security/               # Security utilities
│   └── auth.py             # JWT token handling
├── services/               # Business logic layer
│   ├── auth_service.py     # Authentication services
│   ├── user_services.py    # User management services
│   └── resume_service.py   # Resume processing services
├── uploads/                # File upload directory
│   └── resumes/            # Resume file storage
└── utils/                  # Utility functions
    ├── file_storage.py     # File handling utilities
    └── pdf_parser.py       # PDF text extraction
```

## Setup Instructions

### Prerequisites

- Python 3.8+
- PostgreSQL database
- Virtual environment (recommended)

### Installation

1. **Clone the repository** (if not already done):
   ```bash
   git clone <repository-url>
   cd ai-resume-analyzer/backend
   ```

2. **Create and activate virtual environment**:
   ```bash
   python -m venv venv
   # On Windows:
   venv\Scripts\activate
   # On macOS/Linux:
   source venv/bin/activate
   ```

3. **Install dependencies**:
   ```bash
   pip install -r requirements.txt
   ```

4. **Set up environment variables**:
   Create a `.env` file in the backend directory:
   ```env
   DATABASE_URL=postgresql://username:password@localhost:5432/resume_analyzer
   SECRET_KEY=your-secret-key-here
   ALGORITHM=HS256
   ACCESS_TOKEN_EXPIRE_MINUTES=30
   ```

5. **Set up the database**:
   - Create a PostgreSQL database
   - Update the `DATABASE_URL` in `.env`
   - The application will automatically create tables on startup

## Running the Application

1. **Start the development server**:
   ```bash
   uvicorn main:app --reload
   ```

2. **Access the API documentation**:
   - Open your browser and go to: `http://localhost:8000/docs`
   - Interactive Swagger UI will be available

## API Endpoints

### Authentication
- `POST /auth/login` - User login
- `POST /users` - User registration

### Resume Management
- `POST /resume/upload` - Upload resume (PDF)
- `POST /resume/match` - Match resume with job description
- `GET /resume/history` - Get user's resume history
- `GET /resume/dashboard` - Get resume analytics dashboard
- `GET /resume/progress` - Get resume processing progress
- `PUT /resume/{id}` - Update resume
- `DELETE /resume/{id}` - Delete resume
- `GET /resume/download/{id}` - Download resume file

### User Management
- `GET /users/me` - Get current user info
- `PUT /users/me` - Update user profile

## Machine Learning Components

### Resume Scoring
- Weights technical skills based on industry relevance
- Considers resume length (optimal: 200-600 words)
- Awards diversity bonus for multiple skills
- Maximum score: 100

### Skill Extraction
- Uses regex pattern matching against predefined skill database
- Supports technical skills like Python, FastAPI, Docker, AWS, etc.
- Case-insensitive matching

### Job Matching
- Implements TF-IDF vectorization
- Calculates cosine similarity between resume and job description
- Returns match percentage (0-100%)

## Development

### Adding New Features

1. **API Routes**: Add new endpoints in appropriate `api/` files
2. **Business Logic**: Implement services in `services/` directory
3. **Data Models**: Define new models in `models/` and create migrations
4. **Schemas**: Add Pydantic schemas in `schemas/` for validation
5. **ML Features**: Add new algorithms in `ml/` directory

### Testing

- Use FastAPI's built-in testing framework
- Test endpoints with different scenarios
- Validate ML model outputs

### Deployment

- Use uvicorn or gunicorn for production
- Configure reverse proxy (nginx)
- Set up proper environment variables
- Enable HTTPS

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

[Add your license information here]

## Support

For questions or issues, please create an issue in the repository or contact the development team.