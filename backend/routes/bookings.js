import express from 'express'
import Booking from '../models/Booking.js'
import Experience from '../models/Experience.js'

const router = express.Router()

// POST /api/bookings - Create a new booking
router.post('/', async (req, res) => {
  try {
    const {
      experienceId,
      selectedDate,
      selectedTime,
      quantity,
      customerName,
      customerEmail,
      customerPhone,
      promoCode,
      subtotal,
      taxes,
      discount,
      total
    } = req.body

    // Validate experience exists
    const experience = await Experience.findById(experienceId)
    if (!experience) {
      return res.status(404).json({
        success: false,
        message: 'Experience not found'
      })
    }

    // Find the time slot and get capacity
    const timeSlot = experience.timeSlots.find(slot => slot.time === selectedTime)
    if (!timeSlot) {
      return res.status(400).json({
        success: false,
        message: 'Invalid time slot'
      })
    }

    const capacity = timeSlot.capacity || 0

    // Calculate already booked quantity for this specific date+time
    const existingBookings = await Booking.find({
      experienceId,
      selectedDate,
      selectedTime,
      status: 'confirmed'
    })

    const bookedQuantity = existingBookings.reduce((sum, booking) => sum + booking.quantity, 0)
    const available = capacity - bookedQuantity

    // Check availability
    if (available < quantity) {
      return res.status(400).json({
        success: false,
        message: `Only ${available} slot(s) available for the selected time. Requested: ${quantity}`
      })
    }

    // Create booking (no need to mutate experience document)
    const booking = await Booking.create({
      experienceId,
      experienceTitle: experience.title,
      selectedDate,
      selectedTime,
      quantity,
      customerName,
      customerEmail,
      customerPhone,
      promoCode,
      subtotal,
      taxes,
      discount,
      total,
      status: 'confirmed'
    })

    res.status(201).json({
      success: true,
      message: 'Booking created successfully',
      data: booking
    })
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error creating booking',
      error: error.message
    })
  }
})

// GET /api/bookings/:id - Get booking by ID
router.get('/:id', async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id).populate('experienceId')
    
    if (!booking) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found'
      })
    }

    res.json({
      success: true,
      data: booking
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching booking',
      error: error.message
    })
  }
})

// POST /api/bookings/promo/validate - Validate promo code
router.post('/promo/validate', async (req, res) => {
  try {
    const { promoCode } = req.body
    
    // Simple promo code validation (you can enhance this)
    const validPromoCodes = {
      'SAVE10': { discount: 10, type: 'percentage' },
      'FLAT100': { discount: 100, type: 'fixed' }
    }

    if (validPromoCodes[promoCode]) {
      res.json({
        success: true,
        valid: true,
        promo: validPromoCodes[promoCode]
      })
    } else {
      res.json({
        success: true,
        valid: false,
        message: 'Invalid promo code'
      })
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error validating promo code',
      error: error.message
    })
  }
})

export default router
