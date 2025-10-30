import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import logo from '../assets/logoimg.png'
import confirmIcon from '../assets/svg/confirm.svg'
import backToHomeIcon from '../assets/svg/backtohome.svg'

export default function Result() {
  const navigate = useNavigate()
  const [bookingId, setBookingId] = useState<string | null>(null)

  useEffect(() => {
    const storedBookingId = sessionStorage.getItem('bookingId')
    if (storedBookingId) {
      setBookingId(storedBookingId)
    } else {
      // Redirect to home if no booking ID
      navigate('/')
    }
  }, [navigate])

  if (!bookingId) {
    return null
  }

  return (
    <div className="hd-result-page min-h-screen bg-white font-sans">
      {/* Header */}
      <header className="hd-header shadow-sm" style={{ height: '87px', backgroundColor: '#F9F9F9' }}>
        <div className="hd-header-inner max-w-7xl mx-auto px-6 pt-1 pb-3 flex items-center gap-6">
          <Link to="/" className="hd-logo flex items-center gap-3">
            <div className="hd-logo-icon w-20 h-20 rounded-full flex items-center justify-center overflow-hidden">
              <img src={logo} alt="Highway Delite" className="w-full h-full object-contain" />
            </div>
            
          </Link>
          <div className="flex-1"></div>
          <div className="hd-search-area flex items-center gap-3 w-1/3">
            <input
              type="text"
              placeholder="Search experiences"
              className="hd-search-input w-full border rounded px-4 py-2 text-sm focus:outline-none bg-[#EDEDED]"
            />
            <button className="hd-search-button bg-yellow-400 text-xs px-4 py-2 rounded shadow-sm font-semibold">Search</button>
          </div>
        </div>
      </header>

      {/* Main Content - Centered */}
  <main className="hd-result-main flex items-start justify-center pt-16" style={{ minHeight: 'calc(100vh - 80px)' }}>
        <div className="hd-result-content text-center">
          {/* Success Icon */}
          <div className="hd-success-icon-wrapper flex justify-center mb-6">
            <img src={confirmIcon} alt="Booking Confirmed" className="hd-success-icon w-20 h-20" />
          </div>

          {/* Heading */}
          <h1 className="hd-result-heading text-3xl font-semibold mb-4 text-gray-900">Booking Confirmed</h1>
          
          {/* Reference ID */}
          <p className="hd-booking-ref mb-8" style={{ fontWeight: 400, fontSize: '20px', color: '#656565' }}>
            Ref ID: <span className="hd-booking-id" style={{ fontWeight: 400, fontSize: '20px', color: '#656565' }}>{bookingId}</span>
          </p>

          {/* Back to Home Button */}
          <div className="hd-home-link flex justify-center">
            <Link to="/" className="inline-block">
              <img src={backToHomeIcon} alt="Back to Home" className="hd-home-button cursor-pointer hover:opacity-80 transition-opacity" />
            </Link>
          </div>
        </div>
      </main>
    </div>
  )
}
