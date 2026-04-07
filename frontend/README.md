# AI Resume Analyzer Frontend

## Overview

This is the frontend component of the AI Resume Analyzer application, built with Next.js 16, React 19, and TypeScript. It provides a modern, responsive web interface for users to upload resumes, analyze them against job descriptions, and track their resume analytics.

## Features

- **User Authentication**: Secure login and registration with JWT token management
- **Resume Upload & Analysis**: Drag-and-drop PDF resume upload with real-time analysis
- **Job Matching**: Compare resumes against job descriptions for match scores
- **Resume Dashboard**: View upload history, scores, and analytics
- **Responsive Design**: Mobile-first design using Tailwind CSS and shadcn/ui
- **Real-time Feedback**: Loading states and progress indicators during analysis

## Technology Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4 with custom theme
- **UI Components**: shadcn/ui (Radix UI primitives)
- **Icons**: Lucide React
- **State Management**: React hooks (useState, useEffect)
- **Routing**: Next.js App Router
- **Authentication**: JWT tokens stored in localStorage

## Project Structure

```
frontend/
├── app/                          # Next.js App Router pages
│   ├── globals.css               # Global styles and Tailwind imports
│   ├── layout.tsx                # Root layout with navbar
│   ├── page.tsx                  # Home page (resume upload/analysis)
│   ├── dashboard/                # User dashboard
│   │   └── page.tsx
│   ├── login/                    # Authentication pages
│   │   └── page.tsx
│   └── signup/
│       └── page.tsx
├── components/                   # React components
│   ├── AuthGuard.tsx             # Route protection component
│   ├── HomeClient.tsx            # Main resume analysis interface
│   ├── Navbar.tsx                # Navigation bar
│   └── ui/                       # shadcn/ui components
│       ├── button.tsx
│       └── card.tsx
├── lib/                          # Utility libraries
│   ├── api.ts                    # API configuration and endpoints
│   └── utils.ts                  # Utility functions
├── public/                       # Static assets
├── components.json               # shadcn/ui configuration
├── eslint.config.mjs             # ESLint configuration
├── next.config.ts                # Next.js configuration
├── next-env.d.ts                 # Next.js TypeScript declarations
├── package.json                  # Dependencies and scripts
├── postcss.config.mjs            # PostCSS configuration
├── README.md                     # This file
├── tsconfig.json                 # TypeScript configuration
├── AGENTS.md                     # Agent configuration
└── CLAUDE.md                     # Claude AI integration notes
```

## Setup Instructions

### Prerequisites

- Node.js 18+
- npm, yarn, pnpm, or bun
- Backend API running (see backend README)

### Installation

1. **Navigate to frontend directory**:
   ```bash
   cd frontend
   ```

2. **Install dependencies**:
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   # or
   bun install
   ```

3. **Configure API endpoint** (optional):
   Update `lib/api.ts` if using a different backend URL:
   ```typescript
   export const API_URL = "http://localhost:8000"  // for local development
   ```

4. **Start development server**:
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   # or
   bun dev
   ```

5. **Open browser**:
   Navigate to [http://localhost:3000](http://localhost:3000)

## Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build production bundle
- `npm run start` - Start production server
- `npm run lint` - Run ESLint for code quality checks

## Key Components

### HomeClient Component
The main interface for resume analysis featuring:
- File upload with drag-and-drop support
- Job description input field
- Real-time analysis with loading states
- Results display including:
  - ATS compatibility score
  - Job match percentage
  - Extracted skills
  - Missing skills recommendations
  - Improvement suggestions

### AuthGuard Component
Protects authenticated routes by:
- Checking for JWT token in localStorage
- Redirecting to login page if not authenticated
- Preventing flash of unauthenticated content

### Navbar Component
Dynamic navigation that shows:
- App branding ("Resulyser")
- Login/Signup links for unauthenticated users
- Home/Dashboard/Logout links for authenticated users

### Dashboard Page
User analytics interface displaying:
- Resume upload history
- Individual resume scores
- Job match results
- Progress tracking

## Authentication Flow

1. **Registration**: Users create accounts via `/signup`
2. **Login**: Users authenticate via `/login`, receiving JWT token
3. **Token Storage**: JWT stored in localStorage for session persistence
4. **Protected Routes**: AuthGuard component validates tokens for protected pages
5. **Logout**: Token removal and redirect to login

## API Integration

The frontend communicates with the FastAPI backend through RESTful endpoints:

- `POST /auth/login` - User authentication
- `POST /users` - User registration
- `POST /resume/upload` - Resume file upload
- `POST /resume/match` - Job-resume matching analysis
- `GET /resume/dashboard` - User analytics data
- `GET /resume/history` - Resume upload history

All authenticated requests include `Authorization: Bearer <token>` headers.

## Styling & UI

### Design System
- **Tailwind CSS**: Utility-first CSS framework
- **shadcn/ui**: High-quality React components built on Radix UI
- **Custom Theme**: CSS variables for consistent theming
- **Responsive**: Mobile-first responsive design

### Key UI Patterns
- Card-based layouts for content organization
- Button variants for different actions
- Loading states with spinner animations
- Error/success message displays
- Form validation feedback

## Development Guidelines

### Component Structure
- Use functional components with hooks
- Implement "use client" directive for client-side components
- Follow TypeScript strict mode
- Use path aliases (`@/components`, `@/lib`, etc.)

### State Management
- Use React hooks for local component state
- Store authentication tokens in localStorage
- Handle loading and error states appropriately

### Code Quality
- ESLint configuration for consistent code style
- TypeScript for type safety
- Component composition over complex inheritance

## Deployment

### Build for Production
```bash
npm run build
npm run start
```

### Environment Variables
For production deployment, configure:
- API endpoint URL
- Any additional environment-specific settings

### Deployment Platforms
Compatible with:
- Vercel (recommended for Next.js)
- Netlify
- Traditional hosting with Node.js support

## Contributing

1. Follow the existing code structure and naming conventions
2. Use TypeScript for all new components
3. Implement proper error handling and loading states
4. Test components across different screen sizes
5. Update this README for any new features

## Troubleshooting

### Common Issues

**API Connection Errors**:
- Verify backend is running and accessible
- Check API_URL configuration in `lib/api.ts`
- Ensure CORS is properly configured in backend

**Authentication Issues**:
- Clear localStorage and re-login
- Check token expiration
- Verify backend authentication endpoints

**Build Errors**:
- Ensure all dependencies are installed
- Check TypeScript compilation errors
- Verify Next.js and React versions compatibility

## License

[Add your license information here]

## Support

For questions or issues, please check the backend README or create an issue in the repository.
