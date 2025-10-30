# Highway Delite - Travel Experiences Platform

A complete full-stack web application for exploring and booking travel experiences. Built with React, TypeScript, Tailwind CSS on the frontend and Node.js, Express, MongoDB on the backend.

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- MongoDB Atlas account (already configured)

### Installation & Setup

#### 1. Backend Setup

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Configure MongoDB Atlas IP Whitelist (IMPORTANT!)
# Go to https://cloud.mongodb.com/
# Navigate to Network Access → Add IP Address
# Either add your current IP or allow access from anywhere (0.0.0.0/0)

# Seed the database with sample data
node seed.js

# Start the backend server (runs on port 5000)
npm run dev
```

#### 2. Frontend Setup

```bash
# Navigate to frontend directory (open new terminal)
cd frontend

# Install dependencies
npm install

# Start the development server (runs on port 5173)
npm run dev
```

#### 3. Access the Application

- **Frontend:** http://localhost:5173
- **Backend API:** http://localhost:5000/api
- **Health Check:** http://localhost:5000/api/health

## 📁 Project Structure

```
highway-delite/
├── backend/                    # Node.js + Express backend
│   ├── config/
│   │   └── database.js        # MongoDB connection
│   ├── models/
│   │   ├── Experience.js      # Experience model
│   │   └── Booking.js         # Booking model
│   ├── routes/
│   │   ├── experiences.js     # Experience endpoints
│   │   └── bookings.js        # Booking endpoints
│   ├── server.js              # Express server
│   ├── seed.js                # Database seeding script
│   ├── .env                   # Environment variables
│   └── package.json
│
└── frontend/                   # React + TypeScript + Vite
    ├── src/
    │   ├── assets/
    │   │   └── svg/
    │   │       └── logo.svg   # App logo
    │   ├── components/
    │   │   └── ExperienceCard.tsx
    │   ├── pages/
    │   │   ├── Home.tsx       # Main landing page
    │   │   ├── ExperienceDetail.tsx
    │   │   ├── Checkout.tsx   # Booking checkout
    │   │   └── Result.tsx     # Confirmation page
    │   ├── services/
    │   │   └── api.ts         # API service layer
    │   ├── styles/
    │   │   └── index.css      # Global styles
    │   ├── App.tsx            # Root component with routing
    │   └── main.tsx           # Entry point
    ├── index.html
    ├── vite.config.ts
    ├── tailwind.config.cjs
    └── package.json
```

## 🎨 Features

### Frontend
- ✅ Responsive grid layout with experience cards
- ✅ Dynamic routing with React Router
- ✅ Experience detail pages with date/time selection
- ✅ Checkout flow with customer information
- ✅ Promo code validation
- ✅ Booking confirmation page
- ✅ Inter font integration
- ✅ Tailwind CSS with semantic class names (hd-*)

### Backend
- ✅ RESTful API with Express
- ✅ MongoDB Atlas integration
- ✅ Experience CRUD operations
- ✅ Booking creation and management
- ✅ Promo code validation
- ✅ Availability tracking
- ✅ Automatic slot updates

## 🔌 API Endpoints

### Experiences
- `GET /api/experiences` - Get all experiences
- `GET /api/experiences/:id` - Get experience details
- `POST /api/experiences` - Create new experience

### Bookings
- `POST /api/bookings` - Create a booking
- `GET /api/bookings/:id` - Get booking details
- `POST /api/bookings/promo/validate` - Validate promo code

### Promo Codes
Available promo codes for testing:
- `SAVE10` - 10% discount
- `FLAT100` - ₹100 flat discount

## 🛠️ Technology Stack

### Frontend
- **React 18.2.0** - UI library
- **TypeScript 5.2.2** - Type safety
- **Vite 5.1.0** - Build tool
- **Tailwind CSS 3.4.6** - Styling
- **React Router DOM** - Routing

### Backend
- **Node.js** - Runtime
- **Express 4.18.2** - Web framework
- **MongoDB** - Database
- **Mongoose 8.0.0** - ODM
- **CORS** - Cross-origin support
- **dotenv** - Environment management

## 📝 Development Workflow

### Backend Development
```bash
cd backend
npm run dev  # Runs with nodemon for auto-reload
```

### Frontend Development
```bash
cd frontend
npm run dev  # Runs Vite dev server with HMR
```

### Database Seeding
```bash
cd backend
node seed.js  # Populates DB with 8 sample experiences
```

## 🎯 User Flow

1. **Browse Experiences** - User lands on home page with grid of experiences
2. **View Details** - Click on an experience to see full details
3. **Select Date/Time** - Choose from available dates and time slots
4. **Set Quantity** - Select number of participants
5. **Checkout** - Enter contact information
6. **Apply Promo** - Optional promo code for discounts
7. **Confirm Booking** - Submit booking and get confirmation
8. **View Result** - See booking ID and confirmation details

## 🚨 Troubleshooting

### MongoDB Connection Error
**Error:** `Could not connect to any servers in your MongoDB Atlas cluster`

**Solution:** 
1. Go to https://cloud.mongodb.com/
2. Navigate to Network Access
3. Add IP Address → Add Current IP Address or Allow Access from Anywhere

### Port Already in Use
**Frontend:** Change Vite port in `frontend/vite.config.ts`
```ts
export default defineConfig({
  server: { port: 3000 }
})
```

**Backend:** Change port in `backend/.env`
```
PORT=5001
```

### TypeScript Errors for SVG Imports
These are expected and resolve at runtime. The `src/env.d.ts` file handles type declarations.

## 📚 Semantic Class Names

All major UI elements have `hd-*` prefixed class names for easy targeting:

- `hd-app-root` - App root container
- `hd-header` - Header section
- `hd-logo` - Logo container
- `hd-search-area` - Search section
- `hd-card` - Experience card
- `hd-detail-title` - Detail page title
- And many more...

## 🔄 API Service Layer

The frontend uses a centralized API service (`src/services/api.ts`) for all backend communication:

```typescript
import apiService from '@/services/api'

// Get all experiences
const experiences = await apiService.getExperiences()

// Get single experience
const experience = await apiService.getExperienceById(id)

// Create booking
const booking = await apiService.createBooking(bookingData)

// Validate promo
const result = await apiService.validatePromoCode(code)
```

## 🎨 Styling

- **Tailwind CSS** for utility-first styling
- **Inter Font** from Google Fonts
- **Brand Color:** Yellow (#ffcc00) for CTAs
- **Responsive Design:** Mobile-first approach

## 📊 Database Schema

### Experience Collection
```javascript
{
  _id: ObjectId,
  title: String,
  location: String,
  price: Number,
  image: String,
  short: String,
  description: String,
  availableDates: [String],
  timeSlots: [{
    time: String,
    available: Number,
    soldOut: Boolean
  }],
  minAge: Number,
  aboutText: String,
  images: [String],
  timestamps: true
}
```

### Booking Collection
```javascript
{
  _id: ObjectId,
  experienceId: ObjectId,
  experienceTitle: String,
  selectedDate: String,
  selectedTime: String,
  quantity: Number,
  customerName: String,
  customerEmail: String,
  customerPhone: String,
  promoCode: String,
  subtotal: Number,
  taxes: Number,
  discount: Number,
  total: Number,
  status: String,
  bookingDate: Date,
  timestamps: true
}
```

## 🎉 Ready to Go!

Both servers should now be running:
- Frontend: http://localhost:5173
- Backend: http://localhost:5000

Start exploring experiences and making bookings! 🚀
