# Quick Verification Steps

## How to Verify Booking Persistence is Working

### Step 1: Create a Test Booking
1. Open http://localhost:5173 in your browser
2. Click on any experience (e.g., "Kayaking")
3. Select a date and time slot
4. Note the "X left" count for the selected slot
5. Fill in customer details and complete the booking
6. You should see the booking confirmation page

### Step 2: Check Current State
Open a new PowerShell terminal and run:
```powershell
cd c:\Users\kaifa\OneDrive\Desktop\work\highway-delite\backend
node test-persistence.js
```

You should see:
- ✅ The booking you just created
- ✅ Updated availability calculation
- ✅ Confirmation that bookings are persisted

### Step 3: Restart Servers
```powershell
# Stop all Node processes
taskkill /F /IM node.exe

# Start backend (Terminal 1)
cd c:\Users\kaifa\OneDrive\Desktop\work\highway-delite\backend
npm start

# Start frontend (Terminal 2)
cd c:\Users\kaifa\OneDrive\Desktop\work\highway-delite\frontend
npm run dev
```

### Step 4: Verify Persistence
1. Open http://localhost:5173 again
2. Navigate to the same experience
3. Check the same time slot you booked
4. **Expected:** The "X left" count should be reduced by your booking quantity
5. **Before fix:** Would show original count (reset to seed data)
6. **After fix:** Shows reduced count (reflects your booking)

## Expected Behavior

### Before the Fix ❌
- Restart → Availability resets to seed values
- Bookings exist in DB but don't affect availability
- Could book the same slot multiple times beyond capacity

### After the Fix ✅
- Restart → Availability reflects actual bookings
- Bookings permanently affect availability
- Cannot double-book beyond capacity
- Assignment requirements met

## Troubleshooting

### If availability still resets:
1. Verify migration ran:
   ```powershell
   cd backend
   node migrate-capacity.js
   ```
2. Check backend logs for errors when fetching experiences
3. Verify both servers restarted with new code

### If you want to start fresh:
1. Delete experiences collection in MongoDB Compass or Atlas
2. Run: `cd backend; node seed.js`
3. This will create fresh experiences with `capacity` field

## Assignment Compliance Checklist
- ✅ Store data in the database (bookings persist)
- ✅ Prevent double-booking (validates against real bookings)
- ✅ Ensure validation for required fields (unchanged)
- ✅ Data is dynamic (availability computed from bookings)
- ✅ Full flow works: Home → Details → Checkout → Result

You're all set! 🎉
