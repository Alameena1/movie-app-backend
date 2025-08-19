Backend README.md
markdown
# Movie Search App - Backend

A Node.js/Express/TypeScript backend for the Movie Search application that provides authentication and movie management APIs.

## Features

- User authentication (register/login) with JWT
- Movie search using OMDb API
- Save movies to user profiles
- MongoDB database integration
- CORS enabled for frontend communication

## Tech Stack

- Node.js
- Express.js
- TypeScript
- MongoDB with Mongoose
- JWT for authentication
- bcryptjs for password hashing
- CORS for cross-origin requests

## Prerequisites

- Node.js
- MongoDB MongoDB Atlas
- OMDb API key (free from http://www.omdbapi.com/)

## Installation

1. Clone the repository:
```bash
git clone <https://github.com/Alameena1/movie-app-backend.git>
cd backend
Install dependencies:

bash
npm install
Create environment file:

bash
cp .env.example .env
Configure environment variables in .env:

env
MONGO_URI=mongodb://localhost:27017/movie-app
JWT_SECRET=your_jwt_secret_here
OMDB_API_KEY=your_omdb_api_key_here
PORT=5000
Configuration
MongoDB Setup
Local MongoDB: Install MongoDB locally and ensure it's running

MongoDB Atlas: Create a free account at https://www.mongodb.com/atlas and get your connection string

OMDb API Key
Visit http://www.omdbapi.com/apikey.aspx

Add the key to your .env file

Running the Application
Development Mode
bash
npm run dev
Server will start on http://localhost:5000

Production Build
bash
npm run build
npm start
API Endpoints
Authentication
POST /api/auth/register - Register a new user

POST /api/auth/login - Login user

Movies (Protected - requires JWT)
GET /api/movies/search?title=<movie_title> - Search movies

POST /api/movies/save - Save a movie to user's list

GET /api/movies/list - Get user's saved movies

API Usage Examples
Register User
bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"user@example.com","password":"password123"}'
Login User
bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"user@example.com","password":"password123"}'
Search Movies (with JWT)
bash
curl -X GET "http://localhost:5000/api/movies/search?title=avengers" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
Project Structure
text
backend/
├── src/
│   ├── controllers/     # Route controllers
│   ├── models/         # MongoDB models
│   ├── routes/         # API routes
│   ├── middleware/     # Custom middleware
│   └── index.ts        # Application entry point
├── .env               # Environment variables
├── package.json
└── tsconfig.json
Development
Scripts
npm run dev - Start development server with hot reload

npm run build - Build TypeScript to JavaScript

npm start - Start production server

npm test - Run tests (if configured)

Linting
bash
npm run lint
Deployment
Build the project: npm run build

Start production server: npm start

Ensure environment variables are set in production environment