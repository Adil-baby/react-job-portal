# React Job Portal

A full-stack job portal application built with MERN stack.

## Features
- User Authentication (Job Seekers & Employers)
- Job Posting and Management
- Resume Upload with Cloudinary
- Advanced Job Search and Filtering
- Real-time Application Tracking
- Role-based Access Control
- Responsive Design

## Tech Stack

### Frontend
- React.js with Vite
- React Router v6
- Axios for API calls
- React Icons
- React Hot Toast

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- JWT Authentication
- Cloudinary Integration

## Installation

1. Clone the repository
```bash
git clone https://github.com/Adil-baby/react-job-portal.git
cd react-job-portal
```

2. Install Dependencies
```bash
# Backend dependencies
cd backend
npm install

# Frontend dependencies
cd ../frontend
npm install
```

3. Environment Setup
Create `.env` file in backend directory:
```env
PORT=4000
CLOUDINARY_CLIENT_NAME=your_cloudinary_name
CLOUDINARY_CLIENT_API=your_api_key
CLOUDINARY_CLIENT_SECRET=your_secret
FRONTEND_URL=http://localhost:5173
DB_URL=your_mongodb_url
JWT_SECRET_KEY=your_jwt_secret
JWT_EXPIRE=7d
COOKIE_EXPIRE=7
```

4. Start Development Servers
```bash
# Start backend
cd backend
npm run dev

# Start frontend (new terminal)
cd frontend
npm run dev
```

## Contributing
Contributions are welcome! Please feel free to submit a Pull Request.