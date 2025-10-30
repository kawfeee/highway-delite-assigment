# Quick Start Script for Highway Delite

Write-Host "🚀 Highway Delite - Quick Start Guide" -ForegroundColor Cyan
Write-Host "=====================================" -ForegroundColor Cyan
Write-Host ""

Write-Host "📋 Prerequisites Check:" -ForegroundColor Yellow
Write-Host "   ✓ Node.js installed"
Write-Host "   ✓ npm installed"
Write-Host "   ✓ MongoDB Atlas IP whitelisted (CRITICAL!)"
Write-Host ""

Write-Host "⚠️  IMPORTANT: Before continuing..." -ForegroundColor Red
Write-Host "   Have you whitelisted your IP in MongoDB Atlas?" -ForegroundColor Red
Write-Host "   If NO, follow these steps:" -ForegroundColor Yellow
Write-Host "   1. Go to https://cloud.mongodb.com/" -ForegroundColor White
Write-Host "   2. Navigate to: Network Access → Add IP Address" -ForegroundColor White
Write-Host "   3. Click 'Add Current IP Address' → Confirm" -ForegroundColor White
Write-Host "   4. Wait 1-2 minutes for activation" -ForegroundColor White
Write-Host ""
Write-Host "   See MONGODB_SETUP.md for detailed instructions" -ForegroundColor Cyan
Write-Host ""

$response = Read-Host "Have you whitelisted your IP? (yes/no)"
if ($response -ne "yes") {
    Write-Host ""
    Write-Host "❌ Please whitelist your IP first, then run this script again." -ForegroundColor Red
    Write-Host "   See: MONGODB_SETUP.md" -ForegroundColor Yellow
    exit
}

Write-Host ""
Write-Host "✅ Great! Let's get started..." -ForegroundColor Green
Write-Host ""

# Backend Setup
Write-Host "📦 STEP 1: Setting up Backend..." -ForegroundColor Cyan
Write-Host "   → Installing backend dependencies..." -ForegroundColor White
Set-Location -Path ".\backend"
npm install
if ($LASTEXITCODE -ne 0) {
    Write-Host "   ❌ Backend installation failed!" -ForegroundColor Red
    exit
}
Write-Host "   ✅ Backend dependencies installed" -ForegroundColor Green

Write-Host ""
Write-Host "   → Seeding database with sample data..." -ForegroundColor White
node seed.js
if ($LASTEXITCODE -ne 0) {
    Write-Host "   ❌ Database seeding failed!" -ForegroundColor Red
    Write-Host "   → Check MongoDB connection and IP whitelist" -ForegroundColor Yellow
    exit
}
Write-Host "   ✅ Database seeded successfully" -ForegroundColor Green

# Frontend Setup
Write-Host ""
Write-Host "📦 STEP 2: Setting up Frontend..." -ForegroundColor Cyan
Set-Location -Path "..\frontend"
Write-Host "   → Installing frontend dependencies..." -ForegroundColor White
npm install
if ($LASTEXITCODE -ne 0) {
    Write-Host "   ❌ Frontend installation failed!" -ForegroundColor Red
    exit
}
Write-Host "   ✅ Frontend dependencies installed" -ForegroundColor Green

Write-Host ""
Write-Host "✅ Setup Complete!" -ForegroundColor Green
Write-Host ""
Write-Host "🎯 Next Steps:" -ForegroundColor Cyan
Write-Host ""
Write-Host "   1️⃣  Start Backend (Terminal 1):" -ForegroundColor Yellow
Write-Host "      cd backend" -ForegroundColor White
Write-Host "      npm run dev" -ForegroundColor White
Write-Host ""
Write-Host "   2️⃣  Start Frontend (Terminal 2):" -ForegroundColor Yellow
Write-Host "      cd frontend" -ForegroundColor White
Write-Host "      npm run dev" -ForegroundColor White
Write-Host ""
Write-Host "   3️⃣  Access Application:" -ForegroundColor Yellow
Write-Host "      Frontend: http://localhost:5173" -ForegroundColor White
Write-Host "      Backend:  http://localhost:5000/api" -ForegroundColor White
Write-Host ""
Write-Host "🎉 Happy coding! Explore travel experiences!" -ForegroundColor Cyan
Write-Host ""
Write-Host "📚 Documentation:" -ForegroundColor Yellow
Write-Host "   • README.md - Project overview" -ForegroundColor White
Write-Host "   • MONGODB_SETUP.md - Database setup guide" -ForegroundColor White
Write-Host "   • PROJECT_SUMMARY.md - Complete project details" -ForegroundColor White
Write-Host ""

Set-Location -Path ".."
