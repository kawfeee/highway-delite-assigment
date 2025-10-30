import React from 'react'
import { Link } from 'react-router-dom'
import { Experience } from '../services/api'

export default function ExperienceCard({ experience }: { experience: Experience }) {
  return (
    <div className="hd-card bg-white rounded-lg overflow-hidden" style={{ width: '295px', height: '312px' }} data-testid={`card-${experience._id}`}>
      <div className="hd-card-image h-40 bg-gray-200 overflow-hidden">
        <img src={experience.image} alt={experience.title} className="hd-card-img w-full h-full object-cover" data-testid={`card-${experience._id}-image`} />
      </div>
      <div className="hd-card-body p-4" style={{ backgroundColor: '#F0F0F0' }}>
        <div className="hd-card-meta flex items-start justify-between gap-3">
          <div>
            <h3 className="hd-card-title text-sm font-semibold" data-testid={`card-${experience._id}-title`}>{experience.title}</h3>
            <p className="hd-card-short text-xs text-gray-500 mt-1" data-testid={`card-${experience._id}-short`}>{experience.short}</p>
          </div>
          <div className="hd-card-location text-xs text-gray-700 px-2 py-1 rounded" style={{ backgroundColor: '#D6D6D6' }} data-testid={`card-${experience._id}-location`}>{experience.location}</div>
        </div>

        <div className="hd-card-footer mt-4 flex items-center justify-between">
          <div className="hd-price text-sm text-gray-700" data-testid={`card-${experience._id}-price`}>From <span className="font-semibold">₹{experience.price}</span></div>
          <Link to={`/experience/${experience._id}`}>
            <button className="hd-action-button bg-yellow-400 text-xs px-3 py-2 rounded shadow-sm font-semibold" data-testid={`card-${experience._id}-button`}>View Details</button>
          </Link>
        </div>
      </div>
    </div>
  )
}
