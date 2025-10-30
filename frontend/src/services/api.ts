const API_BASE_URL = 'http://localhost:5000/api'

export interface TimeSlot {
  time: string
  available: number
  soldOut: boolean
}

export interface Experience {
  _id: string
  title: string
  location: string
  price: number
  image: string
  short: string
  description: string
  availableDates: string[]
  timeSlots: TimeSlot[]
  minAge: number | null
  aboutText: string
  images?: string[]
}

export interface BookingData {
  experienceId: string
  selectedDate: string
  selectedTime: string
  quantity: number
  customerName: string
  customerEmail: string
  customerPhone?: string
  promoCode?: string
  subtotal: number
  taxes: number
  discount: number
  total: number
}

export interface PromoValidation {
  discount: number
  type: 'percentage' | 'fixed'
}

class ApiService {
  // Get all experiences
  async getExperiences(): Promise<Experience[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/experiences`)
      const data = await response.json()
      if (data.success) {
        return data.data
      }
      throw new Error(data.message || 'Failed to fetch experiences')
    } catch (error) {
      console.error('Error fetching experiences:', error)
      throw error
    }
  }

  // Get single experience by ID
  async getExperienceById(id: string): Promise<Experience> {
    try {
      const response = await fetch(`${API_BASE_URL}/experiences/${id}`)
      const data = await response.json()
      if (data.success) {
        return data.data
      }
      throw new Error(data.message || 'Failed to fetch experience')
    } catch (error) {
      console.error('Error fetching experience:', error)
      throw error
    }
  }

  // Create booking
  async createBooking(bookingData: BookingData) {
    try {
      const response = await fetch(`${API_BASE_URL}/bookings`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bookingData),
      })
      const data = await response.json()
      if (data.success) {
        return data.data
      }
      throw new Error(data.message || 'Failed to create booking')
    } catch (error) {
      console.error('Error creating booking:', error)
      throw error
    }
  }

  // Validate promo code
  async validatePromoCode(promoCode: string): Promise<{ valid: boolean; promo?: PromoValidation; message?: string }> {
    try {
      const response = await fetch(`${API_BASE_URL}/bookings/promo/validate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ promoCode }),
      })
      const data = await response.json()
      if (data.success) {
        return {
          valid: data.valid,
          promo: data.promo,
          message: data.message
        }
      }
      throw new Error(data.message || 'Failed to validate promo code')
    } catch (error) {
      console.error('Error validating promo code:', error)
      throw error
    }
  }
}

export default new ApiService()
