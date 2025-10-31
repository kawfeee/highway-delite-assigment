import mongoose from 'mongoose'
import dotenv from 'dotenv'
import Experience from './models/Experience.js'

// Load environment variables
dotenv.config()

const experiencesData = [
  {
    title: "Kayaking",
    location: "Udupi",
    price: 1299,
    image: "/images/kayaking.jpg",
    short: "Curated small-group experience. Certified guide. Safety first with gear included.",
    description: "Paddle through serene waters surrounded by lush greenery and scenic landscapes.",
    availableDates: ["2025-10-22", "2025-10-23", "2025-10-24", "2025-10-25", "2025-10-26"],
    timeSlots: [
      { time: "06:00 AM - 08:00 AM", capacity: 10, soldOut: false },
      { time: "08:30 AM - 10:30 AM", capacity: 8, soldOut: false },
      { time: "11:00 AM - 01:00 PM", capacity: 0, soldOut: true },
      { time: "02:00 PM - 04:00 PM", capacity: 12, soldOut: false }
    ],
    minAge: 12,
    aboutText: "Experience the thrill of kayaking in one of Karnataka's most beautiful reservoirs. This guided tour includes all equipment and safety training."
  },
  {
    title: "Nandi Hills Sunrise",
    location: "Bangalore",
    price: 899,
    image: "/images/nandi-hills.jpg",
    short: "Curated small-group experience. Certified guide. Safety first with gear included.",
    description: "Trek through ancient paths and watch the sun paint the sky in stunning colors.",
    availableDates: ["2025-10-22", "2025-10-23", "2025-10-24", "2025-10-25", "2025-10-26"],
    timeSlots: [
      { time: "04:00 AM - 07:00 AM", capacity: 20, soldOut: false },
      { time: "04:30 AM - 07:30 AM", capacity: 15, soldOut: false }
    ],
    minAge: 10,
    aboutText: "A magical morning trek to one of South India's most iconic viewpoints. Includes guide, refreshments, and transportation."
  },
  {
    title: "Coffee Trail",
    location: "Coorg",
    price: 1599,
    image: "/images/coffee-trail.jpg",
    short: "Curated small-group experience. Certified guide. Safety first with gear included.",
    description: "Walk through lush coffee estates, learn about coffee cultivation, and taste fresh brews.",
    availableDates: ["2025-10-22", "2025-10-23", "2025-10-24", "2025-10-25", "2025-10-26"],
    timeSlots: [
      { time: "09:00 AM - 12:00 PM", capacity: 15, soldOut: false },
      { time: "02:00 PM - 05:00 PM", capacity: 10, soldOut: false }
    ],
    minAge: null,
    aboutText: "Immerse yourself in the world of coffee cultivation. Learn from local experts and enjoy authentic Coorg hospitality."
  },
  {
    title: "Mangrove Camping",
    location: "Savandurga",
    price: 2199,
    image: "/images/camping.jpg",
    short: "Curated small-group experience. Certified guide. Safety first with gear.",
    description: "Enjoy campfire, stargazing, and outdoor activities in a scenic wilderness setting.",
    availableDates: ["2025-10-22", "2025-10-23", "2025-10-24", "2025-10-25", "2025-10-26"],
    timeSlots: [
      { time: "04:00 PM - 09:00 AM (Next Day)", capacity: 8, soldOut: false }
    ],
    minAge: 15,
    aboutText: "An overnight camping experience with tents, meals, campfire, and adventure activities. Perfect for nature lovers."
  },
  {
    title: "Water Rafting",
    location: "Bheemeshwari",
    price: 1799,
    image: "/images/rafting.jpg",
    short: "Curated small-group experience. Certified guide. Safety first with",
    description: "Navigate through rapids and enjoy the thrill of river rafting in Bheemeshwari.",
    availableDates: ["2025-10-22", "2025-10-23", "2025-10-24", "2025-10-25", "2025-10-26"],
    timeSlots: [
      { time: "08:00 AM - 11:00 AM", capacity: 12, soldOut: false },
      { time: "11:30 AM - 02:30 PM", capacity: 10, soldOut: false },
      { time: "03:00 PM - 06:00 PM", capacity: 5, soldOut: false }
    ],
    minAge: 14,
    aboutText: "Professional guides and safety equipment provided. Experience the rush of conquering river rapids."
  },
  {
    title: "Cycling Tour",
    location: "Bangalore",
    price: 699,
    image: "/images/cycling.jpg",
    short: "Curated small-group experience. Certified guide. Safety first with gear included.",
    description: "Pedal through historical landmarks, parks, and hidden gems of the Garden City.",
    availableDates: ["2025-10-22", "2025-10-23", "2025-10-24", "2025-10-25", "2025-10-26"],
    timeSlots: [
      { time: "06:00 AM - 09:00 AM", capacity: 18, soldOut: false },
      { time: "04:00 PM - 07:00 PM", capacity: 15, soldOut: false }
    ],
    minAge: 12,
    aboutText: "Guided cycling tour covering 15km through Bangalore's most iconic locations. Bicycles and helmets provided."
  },
  {
    title: "Rock Climbing",
    location: "Ramanagara",
    price: 1499,
    image: "/images/rock-climbing.jpg",
    short: "Curated small-group experience. Certified guide. Safety first with",
    description: "Scale natural rock formations with expert guidance and safety equipment.",
    availableDates: ["2025-10-22", "2025-10-23", "2025-10-24", "2025-10-25", "2025-10-26"],
    timeSlots: [
      { time: "07:00 AM - 11:00 AM", capacity: 10, soldOut: false },
      { time: "02:00 PM - 06:00 PM", capacity: 8, soldOut: false }
    ],
    minAge: 13,
    aboutText: "Professional climbing instructors, all safety gear included. Perfect for beginners and experienced climbers."
  },
  {
    title: "Wildlife Safari",
    location: "Bannerghatta",
    price: 999,
    image: "/images/wildlife.jpg",
    short: "Curated small-group experience. Certified guide. Safety first",
    description: "Spot tigers, lions, and other wildlife in their natural habitat.",
    availableDates: ["2025-10-22", "2025-10-23", "2025-10-24", "2025-10-25", "2025-10-26"],
    timeSlots: [
      { time: "09:00 AM - 12:00 PM", capacity: 25, soldOut: false },
      { time: "02:00 PM - 05:00 PM", capacity: 20, soldOut: false }
    ],
    minAge: null,
    aboutText: "Guided safari tour through the national park. Family-friendly experience with opportunities for wildlife photography."
  }
]

const seedDatabase = async () => {
  try {
    console.log('🌱 Connecting to MongoDB...')
    await mongoose.connect(process.env.MONGODB_URI)
    console.log('✅ MongoDB Connected')

    // Check if experiences already exist
    const existingCount = await Experience.countDocuments()
    
    if (existingCount > 0) {
      console.log(`ℹ️  Database already has ${existingCount} experiences. Skipping seed.`)
      console.log('💡 To re-seed, delete the experiences collection manually or set FORCE_SEED=true')
      process.exit(0)
      return
    }

    console.log('📝 Seeding experiences...')
    const experiences = await Experience.insertMany(experiencesData)
    console.log(`✅ Successfully seeded ${experiences.length} experiences`)

    console.log('\n📋 Seeded Experiences:')
    experiences.forEach(exp => {
      console.log(`   - ${exp.title} (${exp.location}) - ₹${exp.price}`)
    })

    console.log('\n✨ Database seeding completed successfully!')
    process.exit(0)
  } catch (error) {
    console.error('❌ Error seeding database:', error)
    process.exit(1)
  }
}

seedDatabase()
