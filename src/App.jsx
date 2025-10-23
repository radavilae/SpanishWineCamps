import { useState, useEffect } from 'react'
import './App.css'

// Import components
import MobileMenu from './components/ui/MobileMenu'
import Hero from './components/sections/Hero'
import WhyTravel from './components/sections/WhyTravel'
import Journeys from './components/sections/Journeys'
import Included from './components/sections/Included'
import Guides from './components/sections/Guides'
import Footer from './components/sections/Footer'
import RegistrationModal from './components/ui/RegistrationModal'

function App() {
  const [activeSection, setActiveSection] = useState('hero')
  const [subscribers, setSubscribers] = useState([])
  const [currentUserSubscribed, setCurrentUserSubscribed] = useState(false)
  const [isRegOpen, setIsRegOpen] = useState(false)
  const [registrations, setRegistrations] = useState([])
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  
  // Camp data with dates and participant limits
  const campData = {
    launchDate: new Date(Date.now() + 8 * 24 * 60 * 60 * 1000).toISOString(), // 8 days from now
    currentParticipants: 8,
    maxParticipants: 12
  }

  // Load subscribers from localStorage on component mount
  useEffect(() => {
    const savedSubscribers = JSON.parse(localStorage.getItem('wineCampSubscribers') || '[]')
    setSubscribers(savedSubscribers)
    const savedRegistrations = JSON.parse(localStorage.getItem('wineCampRegistrations') || '[]')
    setRegistrations(savedRegistrations)
  }, [])

  const handleSubscribe = (email) => {
    setSubscribers(prev => [...prev, email])
    setCurrentUserSubscribed(true)
  }

  const handleRegistrationSubmit = (payload) => {
    const existing = JSON.parse(localStorage.getItem('wineCampRegistrations') || '[]')
    const updated = [...existing, payload]
    localStorage.setItem('wineCampRegistrations', JSON.stringify(updated))
    setIsRegOpen(false)
    setRegistrations(updated)
  }

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['hero', 'why-travel', 'journeys', 'included', 'guides']
      const scrollPosition = window.scrollY + 100

      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const { offsetTop, offsetHeight } = element
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
    setIsMobileMenuOpen(false)
  }

  const handleOpenRegistration = () => {
    setIsRegOpen(true)
  }

  const handleCloseMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  return (
    <div className="app">
      {/* Mobile Menu */}
      <MobileMenu 
        isOpen={isMobileMenuOpen}
        onClose={handleCloseMobileMenu}
        activeSection={activeSection}
        onScrollToSection={scrollToSection}
      />

      {/* Hero Section */}
      <Hero 
        onScrollToSection={scrollToSection}
        onOpenRegistration={handleOpenRegistration}
      />

      {/* Why Travel Deeper Section */}
      <WhyTravel />

      {/* Upcoming Journeys Section */}
      <Journeys 
        campData={campData}
        registrations={registrations}
        onOpenRegistration={handleOpenRegistration}
      />

      {/* What's Included Section */}
      <Included />

      {/* Our Guides & Hosts Section */}
      <Guides />

      {/* Footer */}
      <Footer />

      {/* Registration Modal */}
      <RegistrationModal 
        isOpen={isRegOpen}
        onClose={() => setIsRegOpen(false)}
        onSubmit={handleRegistrationSubmit}
      />
    </div>
  )
}

export default App