import mongoose from 'mongoose'
import dotenv from 'dotenv'
import Experience from './models/Experience.js'

dotenv.config()

const fixImages = async () => {
  try {
    console.log('🌱 Connecting to MongoDB...')
    await mongoose.connect(process.env.MONGODB_URI)
    console.log('✅ MongoDB Connected')

    // Update Coffee Trail image path
    const coffeeTrail = await Experience.findOne({ title: "Coffee Trail" })
    if (coffeeTrail) {
      coffeeTrail.image = "/images/coffee-trail.jpg"
      await coffeeTrail.save()
      console.log('✅ Updated Coffee Trail image')
    }

    // Update Wildlife Safari image path
    const wildlifeSafari = await Experience.findOne({ title: "Wildlife Safari" })
    if (wildlifeSafari) {
      wildlifeSafari.image = "/images/wildlife.jpg"
      await wildlifeSafari.save()
      console.log('✅ Updated Wildlife Safari image')
    }

    console.log('✨ Image paths fixed!')
    process.exit(0)
  } catch (error) {
    console.error('❌ Error:', error)
    process.exit(1)
  }
}

fixImages()
