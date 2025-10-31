import mongoose from 'mongoose'

const timeSlotSchema = new mongoose.Schema({
  time: {
    type: String,
    required: true
  },
  capacity: {
    type: Number,
    required: true,
    default: 0
  },
  available: {
    type: Number,
    required: false,
    default: 0
  },
  soldOut: {
    type: Boolean,
    default: false
  }
})

const experienceSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  location: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  image: {
    type: String,
    required: true
  },
  short: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  availableDates: [{
    type: String,
    required: true
  }],
  timeSlots: [timeSlotSchema],
  minAge: {
    type: Number,
    default: null
  },
  aboutText: {
    type: String,
    required: true
  },
  images: [{
    type: String
  }]
}, {
  timestamps: true
})

const Experience = mongoose.model('Experience', experienceSchema)

export default Experience
