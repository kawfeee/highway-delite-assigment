import mongoose from 'mongoose'

const bookingSchema = new mongoose.Schema({
  experienceId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Experience',
    required: true
  },
  experienceTitle: {
    type: String,
    required: true
  },
  selectedDate: {
    type: String,
    required: true
  },
  selectedTime: {
    type: String,
    required: true
  },
  quantity: {
    type: Number,
    required: true,
    min: 1
  },
  customerName: {
    type: String,
    required: true,
    trim: true
  },
  customerEmail: {
    type: String,
    required: true,
    trim: true,
    lowercase: true
  },
  customerPhone: {
    type: String,
    required: false
  },
  promoCode: {
    type: String,
    trim: true
  },
  subtotal: {
    type: Number,
    required: true
  },
  taxes: {
    type: Number,
    required: true
  },
  discount: {
    type: Number,
    default: 0
  },
  total: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'cancelled', 'failed'],
    default: 'pending'
  },
  bookingDate: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
})

const Booking = mongoose.model('Booking', bookingSchema)

export default Booking
