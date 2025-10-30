import express from 'express'
import Experience from '../models/Experience.js'

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

    res.json({
      success: true,
      data: experience
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
