# 🏠 Homez - Modern Real Estate Platform

<div align="center">
  <img src="https://img.shields.io/badge/Status-Active-brightgreen" alt="Status">
  <img src="https://img.shields.io/badge/Version-1.0.0-blue" alt="Version">
  <img src="https://img.shields.io/badge/License-MIT-yellow" alt="License">
  <img src="https://img.shields.io/badge/Contributors-Welcome-orange" alt="Contributors">
</div>

<div align="center">
  <h3>🎯 Discover, Buy, Sell, and Rent Properties with Ease</h3>
  <p>A comprehensive fullstack real estate platform built with modern technologies</p>
</div>

---

## 📋 Table of Contents

- [✨ Features](#-features)
- [🚀 Demo](#-demo)
- [🛠️ Tech Stack](#️-tech-stack)
- [📸 Screenshots](#-screenshots)
- [🏁 Getting Started](#-getting-started)
- [📁 Project Structure](#-project-structure)
- [🔧 Configuration](#-configuration)
- [🚀 Deployment](#-deployment)
- [🤝 Contributing](#-contributing)
- [📚 API Documentation](#-api-documentation)
- [👨‍💻 Author](#-author)

---

## ✨ Features

### 🏡 Property Management
- **Property Listings**: Browse and search through extensive property listings
- **Advanced Filtering**: Filter by location, price range, property type, and amenities
- **Interactive Maps**: View properties on interactive maps with location details
- **Property Details**: Comprehensive property information with high-quality images

### 👤 User Experience
- **User Authentication**: Secure login and registration system
- **User Profiles**: Personalized user dashboards and profiles
- **Wishlist**: Save favorite properties for later viewing
- **Reviews & Ratings**: Rate and review properties and agents :hourglass:


### 💼 Business Features
- **Agent Portal**: Dedicated dashboard for real estate agents
- **Property Management**: Add, edit, and manage property listings
- **Lead Generation**: Contact forms and inquiry management
 - **Analytics Dashboard**: Track views, inquiries, and performance metrics :hourglass:

### 📱 Modern UI/UX
- **Responsive Design**: Fully responsive across all devices :hourglass:
- **Dark/Light Mode**: Toggle between dark and light themes :hourglass:
- **Modern Interface**: Clean, intuitive, and user-friendly design
- **Fast Loading**: Optimized for performance and speed

---

## 🚀 Demo

🔗 **Live Demo**: [https://homez-demo.vercel.app](https://homez-sigma.vercel.app)

### Demo Credentials
- **User Account**: demo@homez.com / password123
- **Agent Account**: agent@homez.com / password123
- **Admin Account**: admin@homez.com / password123

---

## 🛠️ Tech Stack

### Frontend
- **Framework**: React.js
- **Styling**: Tailwind CSS
- **State Management**: Zustand
- **UI Components**: ShadCN
- **Maps**: Leaflet.js with OpenStreetMap tiles
- **HTTP Client**: Axios 

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB 
- **Authentication**: JWT 
- **File Storage**: Cloudinary 

### DevOps & Tools
- **Version Control**: GitHub
- **Package Manager**: npm 
- **Build Tool**: Vite 
- **Deployment**: Vercel 


---

## 📸 Screenshots

<div align="center">
  <img src="https://github.com/user-attachments/assets/cffbcd04-9095-4505-b9c4-eae59f232e06" alt="Homepage" width="45%">
  <img src="https://github.com/user-attachments/assets/a22241d6-aa53-46a2-9261-9ce962f3c0cc" alt="Property Listing" width="45%" >
  <img src="https://github.com/user-attachments/assets/b24f131c-7993-457a-ad55-ec9f2508ac4f" alt="Property Detail" width="45%">
  <img src="https://github.com/user-attachments/assets/30cfe751-1ca2-44f4-807a-e750d9a01d02" alt="Dashboard-My-Property-Agent" width="45%">
  <img src="https://github.com/user-attachments/assets/5cbc88f8-efcc-47ea-9974-05669c765efc" alt="Dashboard-My-Favorite-Agent" width="45%">
  <img src="https://github.com/user-attachments/assets/57544249-54d3-428e-b7e4-6364867889f3" alt="Add Property" width="45%">
</div>

---

## 🏁 Getting Started

### Prerequisites

Make sure you have the following installed:
- **Node.js** (v18 or higher)
- **npm**
- **MongoDB**
- **Git**

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/alimprasetyo77/Homez.git
cd Homez
```

2. **Install dependencies**
```bash
# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

3. **Environment Setup**
```bash
# Backend environment
cd backend
cp .env.example .env

# Frontend environment
cd ../frontend
cp .env.example .env
```

4. **Configure environment variables**
```env
# Backend (.env)
PORT=5000
NODE_ENV=development
DATABASE_URL=mongodb://localhost:27017/homez
JWT_SECRET=your-jwt-secret-key
CLOUDINARY_CLOUD_NAME=your-cloudinary-name
CLOUDINARY_API_KEY=your-cloudinary-api-key
CLOUDINARY_API_SECRET=your-cloudinary-api-secret

# Frontend (.env)
REACT_APP_API_URL=http://localhost:5000
REACT_APP_GOOGLE_MAPS_API_KEY=your-google-maps-api-key
```

5. **Start the development servers**
```bash
# Start backend (Terminal 1)
cd backend
npm run dev

# Start frontend (Terminal 2)
cd frontend
npm start
```

6. **Access the application**
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000
---

## 📁 Project Structure

```
Homez/
├── 📁 backend/
│   ├── 📁 src/
│   │   ├── 📁 controllers/
│   │   ├── 📁 middleware/
│   │   ├── 📁 routes/
│   │   ├── 📁 services/
│   │   ├── 📁 types/
│   │   ├── 📁 utils/
│   │   ├── 📁 validations/
│   │   └── 📄 main.js
│   ├── 📄 package.json
│   └── 📄 .env
├── 📁 frontend/
│   ├── 📁 src/
│   │   ├── 📁 assets/
│   │   ├── 📁 components/
│   │   ├── 📁 constants/
│   │   ├── 📁 hooks/
│   │   ├── 📁 lib/
│   │   ├── 📁 pages/
│   │   ├── 📁 routes/
│   │   ├── 📁 services/
│   │   ├── 📁 stores/
│   │   ├── 📁 styles/
│   │   ├── 📁 types/
│   │   └── 📄 main.tsx
│   ├── 📁 public/
│   ├── 📄 package.json
│   └── 📄 .env
├── 📄 README.md
```

---

## 🔧 Configuration

### Database Setup

**MongoDB:**
```bash
# Install MongoDB locally or use MongoDB Atlas
# Create database and configure connection string in .env
```

### Third-party Services

1. **Leaflet.js Maps**
   - Uses OpenStreetMap tiles (free)
   - Optional: Mapbox tiles for enhanced styling
   - Configure default map center coordinates
     
2. **Cloudinary** (for image storage)
   - Create account and get API credentials
   - Configure upload presets
---

## 🚀 Deployment

### Frontend Deployment (Vercel)
```bash
# Build the frontend
cd client
npm run build

# Deploy to Vercel
vercel --prod
```

### Backend Deployment (Vercel)
```bash
# Build the backend
cd api
npm run build

# Deploy to Vercel
vercel --prod
```
---

### Code Style

- Follow ESLint configuration
- Write meaningful commit messages
- Update documentation as needed

---

## 📚 API Documentation

### Base URL
```
Development: http://localhost:3000
Production: https://homez-api.vercel.com
```

### Authentication
All protected routes require a Bearer token in the Authorization header:
```
Authorization: Bearer <your-jwt-token>
```

### Core Endpoints

#### 🔐 Authentication
```http
POST /api/users/register
POST /api/users/login
POST /api/users/logout
POST /api/users/refresh-token
```

#### 👤 Users
```http
GET    /api/users                               # Get all users
GET    /api/users/:id                           # Get user by ID
GET    /api/users/current                       # Get current user 
GET    /api/users/favorites                     # Get favorites property user 
GET    /api/users/properties                    # Get properties user 
PUT    /api/users/change-password               # Change password (Auth required)
PUT    /api/users/current                       # Update user (Auth required)
DELETE /api/users/current                       # Delete current user (Auth required)
DELETE /api/users/:id                           # Delete user by ID (Auth required & ADMIN only) 
```

#### 🏠 Properties
```http
GET    /api/properties                          # Get all properties
GET    /api/properties/:id                      # Get property by ID
POST   /api/properties                          # Create new property (Auth required)
PUT    /api/properties/:propertyId              # Update property (Auth required)
DELETE /api/properties/:propertyId              # Delete property (Auth required)
GET    /api/properties/search                   # Search properties
GET    /api/properties/location                 # Get all location properties
GET    /api/properties/property-of-cities       # Get count property by location properties
```

#### ♥️ Favorites
```http
DELETE /api/favorites/:favoriteId               # Get favorite by id
POST   /api/favorites                           # Add property to withlist favorite
```

#### 📁 Upload File
```http
GET    /api/upload                              # Get publid id
POST   /api/upload                              # Upload file to cloudinary & db
DELETE /api/upload                              # Delete File in cloudinary & db
```

#### 👱 Admin
```http
PUT    /api/admin/approve_property/:propertyId  # Approve the property listing application
PUT    /api/admin/reject_property/:propertyId   # Reject the property listing application
```

## 📈 Roadmap

- [ ] Mobile Application (React Native)
- [ ] AI-powered Property Recommendations
- [ ] Virtual Property Tours
- [ ] Multi-language Support
- [ ] Advanced Analytics Dashboard

---

<div align="center">
  <p>⭐ Don't forget to star this repository if you found it helpful!</p>
  <p>Made with ❤️ by Alim Prasetyo</p>
</div>
