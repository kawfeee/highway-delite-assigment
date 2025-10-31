import express from 'express'
import Experience from '../models/Experience.js'
import Booking from '../models/Booking.js'

const router = express.Router()

// GET /api/experiences - Get all experiences
router.get('/', async (req, res) => {
  try {
    const experiences = await Experience.find()
    res.json({
      success: true,
      count: experiences.length,
      data: experiences
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching experiences',
      error: error.message
    })
  }
})

// GET /api/experiences/:id - Get single experience by ID
router.get('/:id', async (req, res) => {
  try {
    const experience = await Experience.findById(req.params.id)
    
    if (!experience) {
      return res.status(404).json({
        success: false,
        message: 'Experience not found'
      })
    }

    // Compute dynamic availability from bookings
    const experienceData = experience.toObject()
    
    // Get all bookings for this experience
    const bookings = await Booking.find({ 
      experienceId: req.params.id,
      status: 'confirmed'
    })

    // Calculate booked quantities per date/time combination
    const bookedMap = {}
    bookings.forEach(booking => {
      const key = `${booking.selectedDate}|${booking.selectedTime}`
      bookedMap[key] = (bookedMap[key] || 0) + booking.quantity
    })

    // Update time slots with computed availability
    experienceData.timeSlots = experienceData.timeSlots.map(slot => {
      const capacity = slot.capacity || 0
      
      // For each available date, we need to check bookings
      // Since we don't have date-specific data in the response, we'll compute worst-case
      // (maximum booked across all dates for this time slot)
      let maxBooked = 0
      experienceData.availableDates.forEach(date => {
        const key = `${date}|${slot.time}`
        const booked = bookedMap[key] || 0
        maxBooked = Math.max(maxBooked, booked)
      })
      
      const available = Math.max(0, capacity - maxBooked)
      
      return {
        ...slot,
        available,
        soldOut: available === 0
      }
    })

    res.json({
      success: true,
      data: experienceData
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching experience',
      error: error.message
    })
  }
})

// POST /api/experiences - Create new experience (for admin/testing)
router.post('/', async (req, res) => {
  try {
    const experience = await Experience.create(req.body)
    res.status(201).json({
      success: true,
      data: experience
    })
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error creating experience',
      error: error.message
    })
  }
})

export default router
