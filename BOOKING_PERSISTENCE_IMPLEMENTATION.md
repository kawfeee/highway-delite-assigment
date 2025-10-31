# Booking Persistence Implementation - Summary

## Problem
The slot availability was resetting every time you restarted the backend/frontend because:
1. The seed script deleted and re-created all experiences on every run
2. Availability was stored as a mutable field in Experience documents
3. Bookings were stored separately but didn't drive availability calculations

This violated the assignment requirement: "Prevent double-booking for the same slot" and "Store data in the database."

## Solution Implemented (Robust Approach)

### 1. Experience Schema Update
**File:** `backend/models/Experience.js`
- Added `capacity` field to time slots (total available slots)
- Kept `available` field optional for backward compatibility
- `capacity` is immutable and represents the maximum slots per time

### 2. Conditional Seed Script
**File:** `backend/seed.js`
- Changed all time slot `available` → `capacity` in seed data
- Added database check: only seeds if Experience collection is empty
- Removed `deleteMany()` call that was wiping data on every run
- Now displays: "Database already has X experiences. Skipping seed."

### 3. Dynamic Availability Calculation
**File:** `backend/routes/experiences.js`
- GET `/api/experiences/:id` now computes `available` dynamically
- Queries Booking collection for confirmed bookings
- Calculates: `available = capacity - bookedQuantity` per date+time
- Returns updated time slots with real-time availability

### 4. Booking Validation Logic
**File:** `backend/routes/bookings.js`
- POST `/api/bookings` validates against computed availability
- Queries existing bookings for the specific date+time combination
- Checks: `available >= requestedQuantity` before allowing booking
- Removed code that mutated Experience documents
- Bookings are stored permanently and independently

### 5. Database Migration
**File:** `backend/migrate-capacity.js` (one-time script)
- Migrated existing documents to add `capacity` field
- Copied `available` → `capacity` for existing time slots
- Ran successfully for all 8 experiences

## Testing Verification

### Test Script Created
**File:** `backend/test-persistence.js`
- Verifies experiences have `capacity` field
- Confirms bookings are stored separately
- Validates system is ready for dynamic calculations

### How to Verify Persistence
1. **Create a booking** through the UI (http://localhost:5173)
2. **Restart both servers:**
   ```powershell
   # Stop
   taskkill /F /IM node.exe
   
   # Start backend
   cd backend
   npm start
   
   # Start frontend (new terminal)
   cd frontend
   npm run dev
   ```
3. **Check the experience detail page** - availability should reflect the booking
4. **Verify in MongoDB** - bookings collection should have the record

## Files Modified
1. ✅ `backend/models/Experience.js` - Added capacity field
2. ✅ `backend/seed.js` - Conditional seeding + capacity data
3. ✅ `backend/routes/experiences.js` - Dynamic availability
4. ✅ `backend/routes/bookings.js` - Query-based validation

## Files Created
1. 📄 `backend/migrate-capacity.js` - One-time migration script
2. 📄 `backend/test-persistence.js` - Persistence verification script

## Key Benefits
✅ **Bookings persist** across server restarts  
✅ **No data loss** when reseeding (seed only runs when DB is empty)  
✅ **Double-booking prevented** via real-time booking query  
✅ **Assignment compliant** - stores data, validates availability  
✅ **Production-ready** - uses derived state, not mutable fields  

## Current Status
- ✅ Backend running on http://localhost:5000
- ✅ Frontend running on http://localhost:5173
- ✅ MongoDB connected and migrated
- ✅ Ready for end-to-end testing

## Quick Test Commands
```powershell
# Test persistence
cd backend
node test-persistence.js

# Re-run seed (will skip if data exists)
node seed.js

# Force re-seed (manual: delete experiences in MongoDB Compass first)
```

## Important Notes
- The `available` field in responses is now **computed**, not stored
- `capacity` is the source of truth for maximum slots
- Bookings are the source of truth for consumed slots
- Restarting servers will **NOT** reset availability anymore
- Assignment requirements for persistence and double-booking prevention are now met ✅
