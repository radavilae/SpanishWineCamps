/**
 * Main App Component - Simplified Architecture
 */
import { useState } from 'react'
import './App.css'

// Component imports
import Navbar from './components/ui/Navbar'

// Section components
import Home from './components/sections/Home'
import TheDifference from './components/sections/TheDifference'
import Journeys from './components/sections/Journeys'
import Regions from './components/sections/Regions'
import TheMakers from './components/sections/TheMakers'
import WhoWeAre from './components/sections/WhoWeAre'

// Utility imports
import { useScrollNavigation } from './hooks/useScrollNavigation'

// Auth imports
import { AuthProvider } from './contexts/AuthContext'

/**
 * Main App component with simplified structure
 */
function App() {
  // Custom hook for navigation
  const { activeSection, scrollToSection } = useScrollNavigation()

  /**
   * Handle navigation
   * @param {string} sectionId - Target section ID
   */
  const handleNavigation = (sectionId) => {
    scrollToSection(sectionId)
  }

  return (
    <AuthProvider>
      <div className="app">
        {/* Navigation Bar */}
        <Navbar
          activeSection={activeSection}
          onScrollToSection={handleNavigation}
        />

        {/* Main Content Sections */}
        <Home />

        <TheDifference />

        <Journeys />

        <Regions />

        <TheMakers />

        <WhoWeAre />
      </div>
    </AuthProvider>
  )
}

export default App