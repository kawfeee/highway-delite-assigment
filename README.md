# Highway Delite - Travel Experience Booking Platform

> **Live Demo:** https://highway-delite-frontend-qvwl.onrender.com

A full-stack travel booking application where users can explore travel experiences, select available slots, and complete bookings. Built with React + TypeScript (frontend) and Node.js + Express + MongoDB (backend).

---

## 📦 Prerequisites

Before running this project, ensure you have:

- **Node.js** (v18+) - [Download](https://nodejs.org/)
- **npm** (comes with Node.js)
- **MongoDB Atlas Account** - [Sign Up Free](https://www.mongodb.com/cloud/atlas)
- **Git** - [Download](https://git-scm.com/)

---

## 🚀 Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/kawfeee/highway-delite-assigment.git
cd highway-delite-assigment
```

### 2. Install Dependencies

**Backend:**
```bash
cd backend
npm install
```

**Frontend:**
```bash
cd ../frontend
npm install
```

### 3. Configure Environment Variables

**Create `backend/.env` file:**
```env
MONGODB_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/highway-delite?retryWrites=true&w=majority
PORT=5000
NODE_ENV=development
```

**Get MongoDB URI:**
1. Go to [MongoDB Atlas](https://cloud.mongodb.com)
2. Create a free M0 cluster
3. Click "Connect" → "Connect your application"
4. Copy connection string and replace `<username>`, `<password>`, `<cluster>`
5. In Atlas, go to **Network Access** → Add IP `0.0.0.0/0` (allow all IPs for testing)

### 4. Seed the Database

```bash
cd backend
node seed.js
```

Expected output:
```
✅ Successfully seeded 8 experiences
```

### 5. Run the Application

**Terminal 1 - Backend:**
```bash
cd backend
npm start
```
Backend runs on: http://localhost:5000

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```
Frontend runs on: http://localhost:5173

---

## ✨ Features

- Browse 8 travel experiences (Kayaking, Hiking, Camping, etc.)
- Real-time search functionality
- Dynamic availability based on bookings
- Complete booking flow with validation
- Promo code support (`SAVE10`, `FLAT100`)
- Persistent bookings (survives server restarts)
- Prevents double-booking
- Responsive design with Tailwind CSS

---

## 🛠 Tech Stack

**Frontend:** React 18, TypeScript, Vite, React Router, Tailwind CSS  
**Backend:** Node.js, Express, MongoDB, Mongoose  
**Deployment:** Render (Static Site + Web Service)

---

## 🧪 Testing the Application

1. Open http://localhost:5173
2. Browse experiences on home page
3. Click "View Details" on any card
4. Select date, time, and quantity
5. Click "Proceed to Checkout"
6. Fill in customer details
7. Try promo code `SAVE10` for 10% off
8. Complete booking
9. View confirmation with booking reference ID

**To Verify Persistence:**
- Restart both servers
- Navigate to the same experience
- Availability should be reduced by your booking

---

## 📁 Project Structure

```
highway-delite-assigment/
├── backend/
│   ├── config/database.js       # MongoDB connection
│   ├── models/                  # Mongoose schemas
│   ├── routes/                  # API endpoints
│   ├── seed.js                  # Database seeding
│   └── server.js                # Express server
│
├── frontend/
│   ├── public/images/           # Experience images
│   ├── src/
│   │   ├── components/          # React components
│   │   ├── pages/               # Page components
│   │   ├── services/api.ts      # API service
│   │   └── App.tsx              # Main app
│   └── vite.config.ts           # Vite configuration
│
└── README.md
```

---

## 🔌 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/experiences` | Get all experiences |
| GET | `/api/experiences/:id` | Get single experience (with dynamic availability) |
| POST | `/api/bookings` | Create new booking |
| POST | `/api/bookings/promo/validate` | Validate promo code |
| GET | `/api/health` | Health check |

**Promo Codes:**
- `SAVE10` → 10% discount
- `FLAT100` → ₹100 flat discount

---

## 🐛 Troubleshooting

### Backend won't start
- Check MongoDB URI in `.env`
- Whitelist your IP in MongoDB Atlas (Network Access → `0.0.0.0/0`)
- Ensure port 5000 is free

### Frontend shows blank page
- Verify backend is running on port 5000
- Check browser console (F12) for errors
- Hard refresh: Ctrl+Shift+R

### Images not loading
```bash
cd backend
node fix-images.js
```

### "Already has X experiences" when seeding
This is normal! Seed script prevents duplicates. To re-seed:
1. Delete `experiences` collection in MongoDB Atlas
2. Run `node seed.js` again

---

## 🌐 Deployment

**Live Application:** https://highway-delite-frontend-qvwl.onrender.com

Deployed on Render:
- **Backend:** Web Service (Node.js)
- **Frontend:** Static Site (Vite build)

To deploy your own:
1. Push to GitHub
2. Create Render Web Service for backend
3. Create Render Static Site for frontend
4. Add environment variables

---

## 📝 Key Implementation Highlights

### Booking Persistence
- Bookings stored permanently in MongoDB
- Availability = `capacity - booked_quantity` (computed dynamically)
- Survives server restarts
- Prevents double-booking through real-time validation

### Conditional Seeding
- Seed script only runs if database is empty
- Preserves existing bookings and experiences

### Dynamic Availability
- Each time slot has immutable `capacity`
- Available slots calculated from bookings on every request
- Real-time accuracy

---

## 👨‍💻 Author

**Kaif Ali khan**  
GitHub: [@kawfeee](https://github.com/kawfeee)  
Repository: [highway-delite-assigment](https://github.com/kawfeee/highway-delite-assigment)

---

## 🎯 Quick Commands

```bash
# Clone & Install
git clone https://github.com/kawfeee/highway-delite-assigment.git
cd highway-delite-assigment
cd backend && npm install
cd ../frontend && npm install

# Seed Database
cd backend && node seed.js

# Run Application
cd backend && npm start          # Terminal 1
cd frontend && npm run dev       # Terminal 2

# Access
open http://localhost:5173
```

---

**Made with ❤️ for Highway Delite Fullstack Assignment**
