import React, { useState, useEffect } from 'react'
import ExperienceCard from '../components/ExperienceCard'
import apiService, { Experience } from '../services/api'
import logo from '../assets/logoimg.png'

export default function Home() {
  const [experiences, setExperiences] = useState<Experience[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    const fetchExperiences = async () => {
      try {
        setLoading(true)
        const data = await apiService.getExperiences()
        setExperiences(data)
        setError(null)
      } catch (err) {
        setError('Failed to load experiences. Please try again later.')
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchExperiences()
  }, [])

  return (
    <div className="hd-app-root min-h-screen bg-gray-50 font-sans" data-testid="app-root">
      <header className="hd-header shadow-sm" style={{ height: '87px', backgroundColor: '#F9F9F9' }} data-testid="header">
        <div className="hd-header-inner max-w-7xl mx-auto px-6 pt-1 pb-3 flex items-center gap-6">
          <div className="hd-logo flex items-center gap-3" data-testid="logo">
            <div className="hd-logo-icon w-20 h-20 rounded-full flex items-center justify-center overflow-hidden">
              <img src={logo} alt="Highway Delite" className="w-full h-full object-contain" />
            </div>
            
          </div>
          <div className="flex-1"></div>
          <div className="hd-search-area flex items-center gap-2 w-full md:w-1/3" data-testid="search-area">
            <input
              type="text"
              placeholder="Search experiences"
              className="hd-search-input w-full border rounded px-3 md:px-4 py-2 text-sm focus:outline-none bg-[#EDEDED]"
              data-testid="search-input"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Escape') setSearchTerm('')
              }}
            />
            <button
              className="hd-search-button bg-yellow-400 text-xs px-3 md:px-4 py-2 rounded shadow-sm font-semibold whitespace-nowrap"
              data-testid="search-button"
              onClick={() => { /* no-op: filtering happens live as you type */ }}
            >
              Search
            </button>
          </div>
        </div>
      </header>

      <main className="hd-main max-w-7xl mx-auto px-6 py-8" data-testid="main">
        {loading && (
          <div className="text-center py-12">
            <p className="text-gray-600">Loading experiences...</p>
          </div>
        )}
        
        {error && (
          <div className="text-center py-12">
            <p className="text-red-600">{error}</p>
          </div>
        )}

        {!loading && !error && (
          <div className="hd-grid grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6" data-testid="experience-grid">
            {(
              searchTerm.trim()
                ? experiences.filter((exp) =>
                    exp.title.toLowerCase().startsWith(searchTerm.trim().toLowerCase())
                  )
                : experiences
            ).map((exp) => (
              <ExperienceCard key={exp._id} experience={exp} />
            ))}
          </div>
        )}
      </main>
    </div>
  )
}
