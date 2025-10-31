import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import apiService from '../services/api'
import logo from '../assets/logoimg.png'
import checkIcon from '../assets/svg/check.svg'
import leftArrowIcon from '../assets/svg/left-arrow.svg'

interface BookingData {
  experienceId: string
  experienceTitle: string
  selectedDate: string
  selectedTime: string
  quantity: number
  subtotal: number
  taxes: number
  total: number
}

export default function Checkout() {
  const navigate = useNavigate()
  const [bookingData, setBookingData] = useState<BookingData | null>(null)
  const [customerName, setCustomerName] = useState('')
  const [customerEmail, setCustomerEmail] = useState('')
  const [customerPhone, setCustomerPhone] = useState('')
  const [promoCode, setPromoCode] = useState('')
  const [promoApplied, setPromoApplied] = useState(false)
  const [discount, setDiscount] = useState(0)
  const [promoError, setPromoError] = useState('')
  const [processing, setProcessing] = useState(false)
  const [termsAccepted, setTermsAccepted] = useState(false)

  useEffect(() => {
    // Load booking data from sessionStorage
    const storedData = sessionStorage.getItem('bookingData')
    if (storedData) {
      setBookingData(JSON.parse(storedData))
    } else {
      // Redirect to home if no booking data
      navigate('/')
    }
  }, [navigate])

  if (!bookingData) {
    return null
  }

  const handleApplyPromo = async () => {
    if (!promoCode.trim()) {
      setPromoError('Please enter a promo code')
      return
    }

    try {
      const result = await apiService.validatePromoCode(promoCode.trim())
      
      if (result.valid && result.promo) {
        let discountAmount = 0
        if (result.promo.type === 'percentage') {
          discountAmount = Math.round((bookingData.subtotal * result.promo.discount) / 100)
        } else {
          discountAmount = result.promo.discount
        }
        
        setDiscount(discountAmount)
        setPromoApplied(true)
        setPromoError('')
      } else {
        setPromoError(result.message || 'Invalid promo code')
        setDiscount(0)
        setPromoApplied(false)
      }
    } catch (error) {
      setPromoError('Failed to validate promo code')
      console.error(error)
    }
  }

  const finalTotal = bookingData.total - discount

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!customerName.trim() || !customerEmail.trim()) {
      alert('Please fill in all required fields')
      return
    }

    try {
      setProcessing(true)
      const booking = await apiService.createBooking({
        experienceId: bookingData.experienceId,
        selectedDate: bookingData.selectedDate,
        selectedTime: bookingData.selectedTime,
        quantity: bookingData.quantity,
        customerName,
        customerEmail,
        customerPhone,
        promoCode: promoApplied ? promoCode : undefined,
        subtotal: bookingData.subtotal,
        taxes: bookingData.taxes,
        discount,
        total: finalTotal
      })

      // Store booking ID and navigate to result page
      sessionStorage.setItem('bookingId', booking._id)
      sessionStorage.removeItem('bookingData')
      navigate('/result')
    } catch (error) {
      alert('Failed to create booking. Please try again.')
      console.error(error)
    } finally {
      setProcessing(false)
    }
  }

  return (
    <div className="hd-checkout-page min-h-screen bg-white font-sans">
      {/* Header */}
      <header className="hd-header border-b" style={{ height: '87px', backgroundColor: '#F9F9F9' }}>
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
      <main className="hd-checkout-main max-w-6xl mx-auto px-6 py-6">
        {/* Back Button */}
        <Link to={`/experience/${bookingData.experienceId}`} className="hd-back-link inline-flex items-center gap-2 mb-6 hover:opacity-70">
          <img src={leftArrowIcon} alt="back" className="hd-back-arrow w-5 h-5" />
          <span style={{ fontWeight: 500, fontSize: '14px', color: '#000000' }}>Checkout</span>
        </Link>

        <div className="hd-checkout-grid grid grid-cols-1 lg:grid-cols-[1.5fr,1fr] gap-8">
          {/* Left Column - Customer Form */}
          <div className="hd-checkout-form-section space-y-6">
            <div className="hd-form-container bg-[#EFEFEF] rounded-lg p-6">
              <form onSubmit={handleSubmit} className="hd-customer-form space-y-5">
                {/* Full Name and Email - Same Line */}
                <div className="hd-name-email-row grid grid-cols-2 gap-4">
                  <div className="hd-form-field hd-fullname-field">
                    <label className="hd-field-label block text-sm text-gray-700 mb-2">
                      Full name
                    </label>
                    <input
                      type="text"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      placeholder="Your name"
                      required
                      className="hd-fullname-input w-full border border-gray-300 rounded px-4 py-2.5 text-sm focus:outline-none focus:border-gray-400 bg-[#DDDDDD]"
                    />
                  </div>

                  <div className="hd-form-field hd-email-field">
                    <label className="hd-field-label block text-sm text-gray-700 mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      value={customerEmail}
                      onChange={(e) => setCustomerEmail(e.target.value)}
                      placeholder="Your name"
                      required
                      className="hd-email-input w-full border border-gray-300 rounded px-4 py-2.5 text-sm focus:outline-none focus:border-gray-400 bg-[#DDDDDD]"
                    />
                  </div>
                </div>

                {/* Promo Code */}
                <div className="hd-form-field hd-promo-field">
                  <label className="hd-field-label block text-sm text-gray-700 mb-2">
                    Promo code
                  </label>
                  <div className="hd-promo-input-group flex gap-2">
                    <input
                      type="text"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value.toUpperCase())}
                      placeholder=""
                      disabled={promoApplied}
                      className="hd-promo-input flex-1 border border-gray-300 rounded px-4 py-2.5 text-sm focus:outline-none focus:border-gray-400 bg-[#DDDDDD] disabled:opacity-60"
                    />
                    <button
                      type="button"
                      onClick={handleApplyPromo}
                      disabled={promoApplied}
                      className="hd-promo-apply-button bg-black text-white text-sm px-6 py-2.5 rounded-lg font-medium hover:bg-gray-800 disabled:bg-gray-400 disabled:cursor-not-allowed"
                    >
                      Apply
                    </button>
                  </div>
                  {promoError && <p className="hd-promo-error text-red-600 text-xs mt-1.5">{promoError}</p>}
                  {promoApplied && <p className="hd-promo-success text-green-600 text-xs mt-1.5">Promo code applied successfully!</p>}
                </div>

                {/* Terms and Conditions */}
                <div className="hd-terms-field flex items-start gap-2 pt-2">
                  <div 
                    className="hd-checkbox-wrapper relative cursor-pointer"
                    onClick={() => setTermsAccepted(!termsAccepted)}
                  >
                    <input
                      type="checkbox"
                      id="terms"
                      required
                      checked={termsAccepted}
                      onChange={(e) => setTermsAccepted(e.target.checked)}
                      className="hd-terms-checkbox sr-only"
                    />
                    {termsAccepted ? (
                      <img src={checkIcon} alt="checked" className="hd-check-icon w-4 h-4" />
                    ) : (
                      <div className="hd-unchecked-box w-4 h-4 border border-gray-400 rounded bg-white"></div>
                    )}
                  </div>
                  <label 
                    htmlFor="terms" 
                    className="hd-terms-label text-xs text-gray-600 cursor-pointer"
                    onClick={() => setTermsAccepted(!termsAccepted)}
                  >
                    I agree to the terms and safety policy
                  </label>
                </div>

                {/* Hidden submit button - actual button is outside form but triggers submit */}
                <button type="submit" className="hidden" id="hidden-submit"></button>
              </form>
            </div>
          </div>

          {/* Right Column - Booking Summary Card */}
          <div className="hd-summary-section">
            <div className="hd-booking-summary rounded-lg p-6" style={{ backgroundColor: '#EFEFEF' }}>
              <div className="hd-summary-content space-y-4">
                {/* Experience */}
                <div className="hd-summary-row hd-experience-row flex justify-between items-start">
                  <span className="hd-summary-label text-sm text-gray-600">Experience</span>
                  <span className="hd-summary-value text-sm font-semibold text-right">{bookingData.experienceTitle}</span>
                </div>

                {/* Date */}
                <div className="hd-summary-row hd-date-row flex justify-between items-start">
                  <span className="hd-summary-label text-sm text-gray-600">Date</span>
                  <span className="hd-summary-value text-sm font-semibold">
                    {new Date(bookingData.selectedDate).toLocaleDateString('en-US', { 
                      year: 'numeric',
                      month: '2-digit',
                      day: '2-digit'
                    })}
                  </span>
                </div>

                {/* Time */}
                <div className="hd-summary-row hd-time-row flex justify-between items-start">
                  <span className="hd-summary-label text-sm text-gray-600">Time</span>
                  <span className="hd-summary-value text-sm font-semibold">{bookingData.selectedTime.split(' - ')[0]}</span>
                </div>

                {/* Quantity */}
                <div className="hd-summary-row hd-quantity-row flex justify-between items-start">
                  <span className="hd-summary-label text-sm text-gray-600">Qty</span>
                  <span className="hd-summary-value text-sm font-semibold">{bookingData.quantity}</span>
                </div>

                {/* Subtotal */}
                <div className="hd-summary-row hd-subtotal-row flex justify-between items-start">
                  <span className="hd-summary-label text-sm text-gray-600">Subtotal</span>
                  <span className="hd-summary-value text-sm font-semibold">₹{bookingData.subtotal}</span>
                </div>

                {/* Taxes */}
                <div className="hd-summary-row hd-taxes-row flex justify-between items-start">
                  <span className="hd-summary-label text-sm text-gray-600">Taxes</span>
                  <span className="hd-summary-value text-sm font-semibold">₹{bookingData.taxes}</span>
                </div>

                {/* Discount if applied */}
                {discount > 0 && (
                  <div className="hd-summary-row hd-discount-row flex justify-between items-start">
                    <span className="hd-summary-label text-sm text-green-600">Discount</span>
                    <span className="hd-summary-value text-sm font-semibold text-green-600">-₹{discount}</span>
                  </div>
                )}

                {/* Divider */}
                <div className="hd-summary-divider border-t border-gray-300 pt-4">
                  {/* Total */}
                  <div className="hd-summary-row hd-total-row flex justify-between items-start mb-6">
                    <span className="hd-summary-label text-base font-semibold">Total</span>
                    <span className="hd-summary-value hd-total-amount text-xl font-bold">₹{finalTotal}</span>
                  </div>

                  {/* Pay and Confirm Button */}
                  <button
                    onClick={(e) => {
                      e.preventDefault()
                      document.getElementById('hidden-submit')?.click()
                    }}
                    disabled={processing}
                    className="hd-pay-button w-full py-3 disabled:bg-gray-300 disabled:cursor-not-allowed"
                    style={{
                      backgroundColor: '#FFD643',
                      borderRadius: '8px',
                      fontWeight: 500,
                      fontSize: '16px',
                      color: '#161616'
                    }}
                  >
                    {processing ? 'Processing...' : 'Pay and Confirm'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
