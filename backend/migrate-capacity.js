import mongoose from 'mongoose'
import dotenv from 'dotenv'
import Experience from './models/Experience.js'

dotenv.config()

const migrateCapacity = async () => {
  try {
    console.log('🌱 Connecting to MongoDB...')
    await mongoose.connect(process.env.MONGODB_URI)
    console.log('✅ MongoDB Connected')

    const experiences = await Experience.find()
    console.log(`Found ${experiences.length} experiences`)

    let updated = 0
    for (const exp of experiences) {
      let modified = false
      
      exp.timeSlots = exp.timeSlots.map(slot => {
        // If capacity doesn't exist but available does, copy available to capacity
        if (!slot.capacity && slot.available !== undefined) {
          slot.capacity = slot.available
          modified = true
        }
        // If neither exists, set capacity to 0
        else if (!slot.capacity) {
          slot.capacity = 0
          modified = true
        }
        return slot
      })

      if (modified) {
        await exp.save()
        updated++
        console.log(`✅ Updated ${exp.title}`)
      }
    }

    console.log(`\n✨ Migration complete! Updated ${updated} experiences.`)
    process.exit(0)
  } catch (error) {
    console.error('❌ Error:', error)
    process.exit(1)
  }
}

migrateCapacity()
