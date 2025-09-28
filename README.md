# Placement Portal

A comprehensive campus-centric software platform designed to streamline the internship and placement process for technical education institutions. This MERN stack application replaces scattered WhatsApp groups, email chains, and manual spreadsheets with a single source of truth.

## Features

### For Students
- **Digital Profile Management**: Maintain one digital profile with resume, skills, and preferences
- **AI-Powered Job Matching**: Get personalized job recommendations based on skills and preferences
- **One-Click Applications**: Apply to jobs with a single click
- **Real-Time Tracking**: Track application status and interview schedules
- **Mentor Integration**: Streamlined approval process with faculty mentors

### For Companies
- **Easy Job Posting**: Post verified internship and job opportunities
- **Automated Matching**: Get matched with eligible students automatically
- **Application Management**: Review and shortlist candidates efficiently
- **Interview Scheduling**: Schedule interviews with calendar integration
- **Feedback System**: Provide feedback and evaluations

### For Placement Cell (Admin)
- **Comprehensive Dashboard**: Real-time analytics and statistics
- **User Management**: Manage students, companies, and faculty accounts
- **Verification System**: Verify company credentials and job postings
- **Placement Analytics**: Track placement trends and success rates
- **System Administration**: Monitor platform health and performance

### For Faculty Mentors
- **Streamlined Approvals**: Approve student applications efficiently
- **Progress Monitoring**: Track student application progress
- **Automated Notifications**: Get notified about pending approvals
- **Feedback Submission**: Submit supervisor feedback and evaluations

## Technology Stack

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM for MongoDB
- **JWT** - Authentication
- **bcryptjs** - Password hashing
- **Express Validator** - Input validation
- **Multer** - File uploads
- **Nodemailer** - Email notifications

### Frontend
- **React** - UI library
- **Vite** - Build tool
- **React Router** - Routing
- **Tailwind CSS** - Styling
- **React Hook Form** - Form handling
- **React Query** - Data fetching
- **React Hot Toast** - Notifications
- **Lucide React** - Icons

## Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (v16 or higher)
- **MongoDB** (v4.4 or higher)
- **MongoDB Compass** (for database management)
- **Git**

## Installation & Setup

### 1. Clone the Repository
```bash
git clone <repository-url>
cd sih-placement-portal
```

### 2. Backend Setup
```bash
cd backend

# Install dependencies
npm install

# Create environment file
cp env.example .env

# Edit .env file with your configuration
# Update MONGODB_URI, JWT_SECRET, and other variables

# Start MongoDB (make sure MongoDB is running)
# On Windows: Start MongoDB service
# On macOS: brew services start mongodb-community
# On Linux: sudo systemctl start mongod

# Run database seed script (optional - creates sample data)
npm run seed

# Start the development server
npm run dev
```

### 3. Frontend Setup
```bash
cd frontend

# Install dependencies
npm install

# Create environment file
cp env.example .env

# Edit .env file with your configuration
# Update VITE_API_URL if needed

# Start the development server
npm run dev
```

### 4. Database Setup with MongoDB Compass

1. **Install MongoDB Compass** from [MongoDB website](https://www.mongodb.com/products/compass)

2. **Connect to MongoDB**:
   - Open MongoDB Compass
   - Connect to `mongodb://localhost:27017`
   - Create a new database named `placement-portal`

3. **Verify Collections**:
   After running the seed script, you should see these collections:
   - `users` - User accounts and authentication
   - `students` - Student profiles and information
   - `companies` - Company profiles and information
   - `jobs` - Job postings and details
   - `applications` - Job applications and status

## Environment Variables

### Backend (.env)
```env
# Database Configuration
MONGODB_URI=mongodb://localhost:27017/placement-portal

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production

# Server Configuration
PORT=5000
NODE_ENV=development

# Frontend URL (for CORS)
FRONTEND_URL=http://localhost:5173

# Email Configuration (for notifications)
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password

# File Upload Configuration
MAX_FILE_SIZE=5242880
UPLOAD_PATH=uploads/
```

### Frontend (.env)
```env
# API Configuration
VITE_API_URL=http://localhost:5000/api

# App Configuration
VITE_APP_NAME=Placement Portal
VITE_APP_VERSION=1.0.0

# Environment
VITE_NODE_ENV=development
```

## Default Accounts

After running the seed script, you can use these default accounts:

### Admin Account
- **Email**: admin@placementportal.com
- **Password**: admin123
- **Role**: Admin

### Student Account
- **Email**: john.doe@student.com
- **Password**: student123
- **PRN**: PRN001
- **Role**: Student

### Company Account
- **Email**: hr@techcorp.com
- **Password**: company123
- **Role**: Company

## API Endpoints

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/register/student` - Student registration
- `POST /api/auth/register/company` - Company registration
- `GET /api/auth/me` - Get current user
- `PUT /api/auth/change-password` - Change password

### Jobs
- `GET /api/jobs` - Get all jobs (with filters)
- `GET /api/jobs/:id` - Get single job
- `POST /api/jobs` - Create job (Company)
- `PUT /api/jobs/:id` - Update job (Company)
- `DELETE /api/jobs/:id` - Delete job (Company)
- `POST /api/jobs/:id/apply` - Apply for job (Student)

### Students
- `GET /api/students` - Get all students (Admin/Company)
- `GET /api/students/:id` - Get single student
- `PUT /api/students/profile` - Update student profile
- `GET /api/students/stats/my-stats` - Get student statistics

### Companies
- `GET /api/companies` - Get all companies
- `GET /api/companies/:id` - Get single company
- `PUT /api/companies/profile` - Update company profile
- `PUT /api/companies/:id/verify` - Verify company (Admin)

### Admin
- `GET /api/admin/dashboard` - Get dashboard statistics
- `GET /api/admin/users` - Get all users
- `PUT /api/admin/users/:id/status` - Update user status
- `GET /api/admin/analytics/placement` - Get placement analytics

## Development

### Running in Development Mode

1. **Start MongoDB** (if not already running)
2. **Start Backend**: `cd backend && npm run dev`
3. **Start Frontend**: `cd frontend && npm run dev`

The application will be available at:
- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:5000

### Building for Production

```bash
# Build frontend
cd frontend
npm run build

# Start backend in production
cd backend
npm start
```

## Security Features

- **JWT Authentication**: Secure token-based authentication
- **Password Hashing**: bcryptjs for password security
- **Role-Based Access Control**: Different access levels for different user types
- **Input Validation**: Express-validator for request validation
- **CORS Protection**: Configured CORS for API security
- **Rate Limiting**: API rate limiting to prevent abuse
- **Helmet**: Security headers middleware

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support, email support@placementportal.com or create an issue in the repository.
