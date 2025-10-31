import React, { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import apiService, { Experience } from '../services/api'
import logo from '../assets/logoimg.png'
import leftArrowIcon from '../assets/svg/left-arrow.svg'

export default function ExperienceDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [experience, setExperience] = useState<Experience | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  
  const [selectedDate, setSelectedDate] = useState('')
  const [selectedTime, setSelectedTime] = useState('')
  const [quantity, setQuantity] = useState(1)

  useEffect(() => {
    const fetchExperience = async () => {
      if (!id) return
      
      try {
        setLoading(true)
        const data = await apiService.getExperienceById(id)
        setExperience(data)
        setError(null)
      } catch (err) {
        setError('Failed to load experience details.')
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchExperience()
  }, [id])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600">Loading experience...</p>
      </div>
    )
  }

  if (error || !experience) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">{error || 'Experience not found'}</p>
          <Link to="/" className="text-yellow-500 hover:underline">← Back to home</Link>
        </div>
      </div>
    )
  }

  const subtotal = experience.price * quantity
  const taxes = Math.round(subtotal * 0.06) // 6% tax
  const total = subtotal + taxes

  const handleBookNow = () => {
    if (!selectedDate || !selectedTime) {
      alert('Please select a date and time slot')
      return
    }

    // Store booking data in sessionStorage and navigate to checkout
    const bookingData = {
      experienceId: experience._id,
      experienceTitle: experience.title,
      selectedDate,
      selectedTime,
      quantity,
      subtotal,
      taxes,
      total
    }
    sessionStorage.setItem('bookingData', JSON.stringify(bookingData))
    navigate('/checkout')
  }

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      {/* Header */}
      <header className="hd-header shadow-sm" style={{ height: '87px', backgroundColor: '#F9F9F9' }}>
        <div className="hd-header-inner max-w-7xl mx-auto px-6 pt-1 pb-3 flex items-center gap-6">
          <Link to="/" className="hd-logo flex items-center gap-3">
            <div className="hd-logo-icon w-20 h-20 rounded-full flex items-center justify-center overflow-hidden">
              <img src={logo} alt="Highway Delite" className="w-full h-full object-contain" />
            </div>
            
          </Link>
          <div className="flex-1"></div>
          <div className="hd-search-area flex items-center gap-2 w-full md:w-1/3">
            <input
              type="text"
              placeholder="Search experiences"
              className="hd-search-input w-full border rounded px-3 md:px-4 py-2 text-sm focus:outline-none bg-[#EDEDED]"
            />
            <button className="hd-search-button bg-yellow-400 text-xs px-3 md:px-4 py-2 rounded shadow-sm font-semibold whitespace-nowrap">Search</button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-6">
        {/* Back Button */}
        <Link to="/" className="inline-flex items-center gap-2 text-sm mb-4 hover:opacity-70">
          <img src={leftArrowIcon} alt="back" className="w-5 h-5" />
          <span style={{ fontWeight: 500, fontSize: '14px', color: '#000000' }}>Details</span>
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Experience Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Main Image */}
            <div className="hd-detail-image rounded-lg overflow-hidden h-80 bg-gray-200">
              <img 
                src={experience.image} 
                alt={experience.title} 
                className="w-full h-full object-cover"
              />
            </div>

            {/* Title & Description */}
            <div>
              <h1 className="hd-detail-title text-2xl font-semibold mb-2">{experience.title}</h1>
              <p className="hd-detail-description" style={{ color: '#6C6C6C', fontWeight: 400, fontSize: '16px' }}>{experience.description}</p>
            </div>

            {/* Choose Date */}
            <div className="hd-date-section">
              <h2 className="mb-3" style={{ fontWeight: 500, fontSize: '18px', color: '#161616' }}>Choose date</h2>
              <div className="flex gap-2 flex-wrap">
                {experience.availableDates.map((date) => {
                  const dateObj = new Date(date)
                  const month = dateObj.toLocaleDateString('en-US', { month: 'short' })
                  const day = dateObj.getDate()
                  const isSelected = selectedDate === date
                  
                  return (
                    <button
                      key={date}
                      onClick={() => setSelectedDate(date)}
                      className={`hd-date-button px-4 py-2 text-sm border rounded ${
                        isSelected 
                          ? 'bg-yellow-400 border-yellow-400 font-semibold' 
                          : 'bg-white border-gray-300 hover:border-gray-400 text-[#838383]'
                      }`}
                    >
                      {month} {day}
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Choose Time */}
            <div className="hd-time-section">
              <h2 className="mb-2" style={{ fontWeight: 500, fontSize: '18px', color: '#161616' }}>Choose time</h2>
              
              <div className="flex gap-2 flex-wrap">
                {experience.timeSlots.map((slot) => {
                  const isSelected = selectedTime === slot.time
                  const isSoldOut = slot.soldOut || slot.available === 0
                  
                  return (
                    <button
                      key={slot.time}
                      onClick={() => !isSoldOut && setSelectedTime(slot.time)}
                      disabled={isSoldOut}
                      className={`hd-time-button px-4 py-2 text-sm rounded flex items-center gap-2 ${
                        isSoldOut
                          ? 'bg-gray-200 border border-gray-300 text-gray-400 cursor-not-allowed'
                          : isSelected
                          ? 'bg-yellow-400 font-semibold'
                          : 'bg-white border border-gray-300 hover:border-gray-400 text-[#838383]'
                      }`}
                    >
                      <span>{slot.time}</span>
                      {!isSoldOut && <span className="text-xs text-red-500">{slot.available} left</span>}
                      {isSoldOut && <span className="text-xs">Sold out</span>}
                    </button>
                  )
                })}
              </div>
              <p className="text-xs text-gray-500 mb-3 pt-4">All times are in IST (GMT +5:30)</p>
            </div>

            {/* About */}
            <h2 className="mb-1" style={{ fontWeight: 500, fontSize: '18px', color: '#161616', marginBottom: '6px' }}>About</h2>
            <div className="hd-about-section bg-gray-100 p-4 rounded" style={{ marginTop: 0 }}>
              <p className="text-sm text-[#838383]">{experience.aboutText}</p>
            </div>
          </div>

          {/* Right Column - Booking Summary */}
          <div className="lg:col-span-1">
            <div className="hd-booking-summary bg-gray-100 p-6 rounded-lg sticky top-6">
              <div className="space-y-4">
                {/* Starts at */}
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Starts at</span>
                  <span className="text-base font-semibold">₹{experience.price}</span>
                </div>

                {/* Quantity */}
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Quantity</span>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="w-6 h-6 flex items-center justify-center border rounded hover:bg-gray-200"
                    >
                      −
                    </button>
                    <span className="text-sm font-semibold w-4 text-center">{quantity}</span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="w-6 h-6 flex items-center justify-center border rounded hover:bg-gray-200"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Subtotal */}
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Subtotal</span>
                  <span className="text-sm font-semibold">₹{subtotal}</span>
                </div>

                {/* Taxes */}
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Taxes</span>
                  <span className="text-sm font-semibold">₹{taxes}</span>
                </div>

                {/* Divider */}
                <hr className="border-gray-300" />

                {/* Total */}
                <div className="flex justify-between items-center">
                  <span className="text-base font-semibold">Total</span>
                  <span className="text-xl font-bold">₹{total}</span>
                </div>

                {/* Confirm Button */}
                <button 
                  onClick={handleBookNow}
                  className="hd-confirm-button w-full bg-yellow-400 text-gray-900 py-3 rounded font-semibold hover:bg-yellow-500"
                >
                  Book Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
