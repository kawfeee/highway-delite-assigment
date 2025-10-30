# Highway Delite - Backend API

Node.js + Express + MongoDB backend for the Highway Delite travel experiences platform.

## Setup

### 1. Install dependencies:
```bash
npm install
```

### 2. MongoDB Atlas Configuration

**IMPORTANT:** Before running the server, you need to whitelist your IP address in MongoDB Atlas:

1. Go to [MongoDB Atlas Console](https://cloud.mongodb.com/)
2. Navigate to your cluster (Clusterdb)
3. Click on "Network Access" in the left sidebar
4. Click "Add IP Address"
5. Either:
   - Click "Add Current IP Address" to whitelist your current IP
   - OR Click "Allow Access from Anywhere" (0.0.0.0/0) for development
6. Click "Confirm"

Environment variables are already configured in `.env` with your connection string.

### 3. Seed the Database

Before starting the server for the first time, populate the database with sample data:

```bash
node seed.js
```

You should see output like:
```
🌱 Connecting to MongoDB...
✅ MongoDB Connected
🗑️  Clearing existing experiences...
✅ Cleared existing data
📝 Seeding experiences...
✅ Successfully seeded 8 experiences
```

### 4. Start the Server

```bash
# Development mode with auto-reload
npm run dev

# Production mode
npm start
```

Server will run on `http://localhost:5000`

## API Endpoints

### Health Check
- `GET /api/health` - Server health status

### Experiences
- `GET /api/experiences` - Get all experiences
- `GET /api/experiences/:id` - Get single experience by ID
- `POST /api/experiences` - Create new experience (for admin/testing)

### Bookings
- `POST /api/bookings` - Create a new booking
- `GET /api/bookings/:id` - Get booking details by ID

### Promo Codes
- `POST /api/bookings/promo/validate` - Validate promo code

**Available Promo Codes:**
- `SAVE10` - 10% discount
- `FLAT100` - ₹100 flat discount

## Testing the API

### Get all experiences
```bash
curl http://localhost:5000/api/experiences
```

### Get single experience
```bash
curl http://localhost:5000/api/experiences/<EXPERIENCE_ID>
```

### Validate promo code
```bash
curl -X POST http://localhost:5000/api/bookings/promo/validate \
  -H "Content-Type: application/json" \
  -d '{"promoCode": "SAVE10"}'
```

## Troubleshooting

### MongoDB Connection Error

If you see: `Could not connect to any servers in your MongoDB Atlas cluster`

**Solution:** You need to whitelist your IP address in MongoDB Atlas (see step 2 above)

### Port Already in Use

If port 5000 is already in use, you can change it in the `.env` file:
```
PORT=5001
```

## Database Schema

### Experience
```javascript
{
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
  images: [String]
}
```

### Booking
```javascript
{
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
  status: String, // 'pending', 'confirmed', 'cancelled', 'failed'
  bookingDate: Date
}
```

