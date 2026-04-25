# Places to Visit - Project Overview

## Project Title
**Places to Visit**

## Project Version
v0.1.0

## Short Description
A modern web application that helps users discover and explore interesting places to visit on an interactive map. Users can browse locations by category, filter by ratings, and manage their own collection of places they want to visit.

## Detailed Description

### Overview
Places to Visit is a full-stack React-based application designed to provide users with an intuitive platform for discovering, sharing, and managing travel destinations. The application combines user authentication, interactive mapping capabilities, and location filtering to create an engaging travel planning experience.

### Key Features
- **User Authentication**: Secure login and registration system with token-based authentication
- **Interactive Map**: Leaflet-based map interface for visualizing places and locations
- **Location Filtering**: Filter places by category and minimum rating to find destinations matching user preferences
- **User Location**: Integration with geolocation to show user's current position on the map
- **Place Categories**: Support for multiple place categories (beaches, villages, parks, landmarks, etc.)
- **Rating System**: Places are rated and users can filter by minimum rating requirements
- **Responsive UI**: Modern React components with form validation and user-friendly interface

### Tech Stack

#### Frontend
- **React** (v19.2.0) - UI framework and state management
- **React DOM** (v19.2.0) - DOM rendering
- **React Leaflet** (v5.0.0) - Interactive map component wrapper
- **Leaflet** (v1.9.4) - Mapping library
- **Axios** (v1.12.2) - HTTP client for API communication
- **React Scripts** (5.0.1) - Build configuration and tooling

#### Testing & Development
- **@testing-library/react** (v16.3.0) - React component testing utilities
- **@testing-library/jest-dom** (v6.9.1) - DOM matchers
- **@testing-library/user-event** (v13.5.0) - User interaction simulation
- **Web-Vitals** (v2.1.4) - Performance monitoring

### Project Structure
```
places-to-visit/
├── src/
│   ├── App.js                 # Main application component with map logic
│   ├── App.css                # Main application styles
│   ├── index.js               # React entry point
│   ├── index.css              # Global styles
│   ├── setupTests.js          # Test configuration
│   ├── reportWebVitals.js     # Performance monitoring
│   ├── App.test.js            # Main app tests
│   └── components/
│       ├── LoginForm.jsx       # User login component
│       ├── RegisterForm.jsx    # User registration component
├── public/
│   ├── index.html             # HTML template
│   ├── manifest.json          # PWA manifest
│   └── robots.txt             # SEO robots file
├── package.json               # Dependencies and scripts
└── README.md                  # Project documentation
```

### Core Functionality

#### User Management
- User registration with form validation
- Secure login with token-based authentication
- Session persistence using localStorage

#### Place Discovery
- Browse places on an interactive map
- Filter places by category type
- Set minimum rating filters to find highly-rated destinations
- View detailed place information via map popups
- Automatic display of user's current location

#### Map Integration
- Full-featured Leaflet map with zoom and pan controls
- Custom markers for places and user location
- Location popups with place details
- Responsive map that adapts to different screen sizes

### Data Management
- Places retrieved via API using axios
- Category-based filtering and organization
- Rating-based filtering for quality control
- User preferences stored in localStorage
- Real-time map updates based on filter selections

### User Experience
- Intuitive login/registration forms
- Real-time filter updates
- Clean, organized map interface
- Responsive design for desktop and tablet devices
- Visual distinction between user location and place markers

## Development Scripts

```bash
# Start the development server
npm start

# Build for production
npm build

# Run tests
npm test

# Eject configuration (one-way operation)
npm eject
```

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn package manager

### Installation
1. Clone the repository
2. Navigate to the project directory
3. Install dependencies: `npm install`
4. Start the development server: `npm start`
5. Open `http://localhost:3000` in your browser

## Testing
The project includes testing infrastructure with Jest and React Testing Library:
```bash
npm test
```

## Browser Support
- Latest 1 version of Chrome
- Latest 1 version of Firefox
- Latest 1 version of Safari
- Modern browsers with >0.2% market share

## Future Enhancements
Potential features for future development:
- Advanced search functionality
- Place review and rating system
- User-generated place listings
- Social sharing features
- Saved favorites/wishlists
- Route planning and navigation
- Multi-language support
- Dark mode UI option
- Mobile app version

## API Integration
The application connects to a backend API to:
- Fetch place listings and location data
- Filter places by category and rating
- Manage user authentication
- Store user preferences

## License
This project is private and maintained as part of the Places to Visit initiative.

---

**Project Status**: In Active Development (v0.1.0)
