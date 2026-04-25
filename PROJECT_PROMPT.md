# Places to Visit - Backend Project

## Project Overview

**Places to Visit** is a full-stack web application that allows users to discover, create, and rate locations on an interactive map. The backend is built with Node.js, Express, and MongoDB, providing a robust API for managing user authentication, location markers, and user ratings.

## Project Purpose

This application enables users to:
- Register and authenticate securely using JWT tokens
- Create custom location markers on a map with titles and categories
- View their saved locations and markers
- Rate and review places they've visited
- Store their personal collection of places to visit

## Tech Stack

### Backend Technologies
- **Runtime**: Node.js
- **Framework**: Express.js v5.1.0
- **Database**: MongoDB (Mongoose ODM)
- **Authentication**: JWT (JSON Web Tokens)
- **Security**: bcryptjs for password hashing
- **HTTP**: CORS enabled, axios for HTTP requests

### Key Dependencies
```json
{
  "express": "^5.1.0",
  "mongoose": "^8.19.1",
  "jsonwebtoken": "^9.0.2",
  "bcryptjs": "^3.0.2",
  "cors": "^2.8.5",
  "axios": "^1.12.2"
}
```

## Project Structure

```
backend/
├── index.js              # Main application file with API routes
├── package.json          # Project dependencies and metadata
├── models/
│   └── User.js          # Mongoose User model with password hashing
└── scripts/
    └── list-markers.js  # Utility script for marker management
```

## Core Features Implemented

### 1. User Authentication
- User registration with secure password hashing (bcryptjs)
- JWT-based authentication for API protection
- Password comparison methods for login validation
- Bearer token verification middleware

### 2. Marker Management (Location Markers)
- **Create Markers**: Users can create location markers with:
  - Title (name of the place)
  - Category (type of location)
  - Latitude and Longitude coordinates
  - Associated user ID

- **Retrieve Markers**: Fetch all markers for authenticated users
  - Only returns markers created by the authenticated user
  - Includes rating information for each marker

- **Rate Markers**: Users can rate locations:
  - Add or update ratings for specific markers
  - Store user ID and rating value
  - Support for multiple ratings per marker

### 3. API Endpoints

#### Authentication Routes
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login and receive JWT token

#### Marker Routes
- `GET /api/markers` - Retrieve all markers for authenticated user
- `POST /api/markers` - Create a new location marker
- `PUT /api/markers/:id/rate` - Add/update rating for a marker

### 4. Security Features
- **CORS**: Cross-Origin Resource Sharing enabled
- **Password Hashing**: Bcrypt with salt rounds for secure password storage
- **JWT Authentication**: Protected endpoints with token validation
- **Middleware**: Auth middleware for route protection

## Database Schema

### User Model
```javascript
{
  username: String (unique),
  password: String (hashed)
}
```

### Marker Model
```javascript
{
  title: String,
  category: String,
  lat: Number,
  lng: Number,
  ratings: [{ userId: String, value: Number }],
  userId: ObjectId (ref: User)
}
```

## API Response Examples

### Create Marker (Success)
```json
{
  "_id": "507f1f77bcf86cd799439011",
  "title": "Eiffel Tower",
  "category": "Monument",
  "lat": 48.8584,
  "lng": 2.2945,
  "ratings": [],
  "userId": "507f1f77bcf86cd799439012"
}
```

### Rate Marker Response
```json
{
  "message": "Rating saved",
  "marker": {
    "ratings": [
      { "userId": "507f1f77bcf86cd799439012", "value": 5 }
    ]
  }
}
```

## Development Notes

### Current Status
- Authentication middleware implemented with JWT verification
- Core CRUD operations for markers functional
- MongoDB connection configured
- CORS and Express middleware setup complete

### Testing Credentials
- JWT Secret: `qwe123qwe123` (for testing purposes only)
- MongoDB URI: `mongodb://127.0.0.1:27017/mapapp`

## Future Enhancement Opportunities

1. **Input Validation**: Add comprehensive validation for marker data and user inputs
2. **Error Handling**: Implement centralized error handling and custom error classes
3. **Pagination**: Add pagination for marker retrieval
4. **Search & Filter**: Implement marker filtering by category, location radius, etc.
5. **Marker Deletion**: Add endpoint to delete markers
6. **Comments/Reviews**: Extended review system beyond simple ratings
7. **Image Support**: Allow users to upload photos of locations
8. **Social Features**: Share markers, follow users, collaborative lists
9. **Testing**: Unit tests and integration tests
10. **Deployment**: Production-ready configuration and environment variables

## Getting Started

### Prerequisites
- Node.js installed
- MongoDB running locally on port 27017
- npm packages installed

### Installation
```bash
npm install
```

### Running the Server
```bash
node index.js
```

The server will connect to MongoDB and start listening for requests.

## Security Considerations

⚠️ **Important**: The current implementation uses hardcoded JWT secret and database URI for development. Before production:
- Use environment variables for sensitive data
- Implement rate limiting
- Add input sanitization
- Enable HTTPS
- Add comprehensive logging
- Implement refresh tokens
- Add request validation schemas

---

**Last Updated**: April 2026  
**License**: ISC
