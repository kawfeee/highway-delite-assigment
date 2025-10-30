import React from 'react'
import ExperienceCard from './components/ExperienceCard'
import experiences from './data/experiences'
import logo from './assets/svg/logo.svg'

export default function App() {
  return (
    <div className="hd-app-root min-h-screen bg-gray-50 font-sans" data-testid="app-root">
      <header className="hd-header bg-white shadow-sm" data-testid="header">
        <div className="hd-header-inner max-w-7xl mx-auto px-6 py-3 flex items-center gap-6">
          <div className="hd-logo flex items-center gap-3" data-testid="logo">
            <div className="hd-logo-icon w-14 h-14 rounded-full flex items-center justify-center overflow-hidden">
              <img src={logo} alt="Highway Delite" className="w-full h-full object-contain" />
            </div>
          </div>
          <div className="flex-1"></div>
          <div className="hd-search-area flex items-center gap-3 w-1/3" data-testid="search-area">
            <input
              type="text"
              placeholder="Search experiences"
              className="hd-search-input w-full border rounded px-4 py-2 text-sm focus:outline-none"
              data-testid="search-input"
            />
            <button className="hd-search-button bg-yellow-400 text-xs px-4 py-2 rounded shadow-sm font-semibold" data-testid="search-button">Search</button>
          </div>
        </div>
      </header>

      <main className="hd-main max-w-7xl mx-auto px-6 py-8" data-testid="main">
        <div className="hd-grid grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6" data-testid="experience-grid">
          {experiences.map((exp) => (
            <ExperienceCard key={exp.id} experience={exp} />
          ))}
        </div>
      </main>
    </div>
  )
}
