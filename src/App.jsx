/**
 * Main App Component
 * Refactored for better maintainability and clean code principles
 */
import { useState, useEffect } from 'react'
import './App.css'

// Component imports - organized by type
import MobileMenu from './components/ui/MobileMenu'
import RegistrationModal from './components/ui/RegistrationModal'
import Hero from './components/sections/Hero'
import WhyTravel from './components/sections/WhyTravel'
import Journeys from './components/sections/Journeys'
import Included from './components/sections/Included'
import Guides from './components/sections/Guides'
import Footer from './components/sections/Footer'

// Utility imports
import { useScrollNavigation } from './hooks/useScrollNavigation'
import { useLocalStorage } from './hooks/useLocalStorage'
import { getSubscribers, getRegistrations, addRegistration } from './utils/storage'
import { CAMP_CONFIG } from './constants/campData'

// Mobile optimization imports
import { 
  preloadCriticalResources, 
  lazyLoadImages, 
  optimizeViewport,
  getConnectionType,
  isMobileDevice 
} from './utils/mobilePerformance'

/**
 * Main App component with improved structure and error handling
 * Follows clean code principles with clear separation of concerns
 */
function App() {
  // State management with descriptive names
  const [isRegistrationModalOpen, setIsRegistrationModalOpen] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [currentUserSubscribed, setCurrentUserSubscribed] = useState(false)
  
  // Custom hooks for better logic separation
  const { activeSection, scrollToSection } = useScrollNavigation()
  const [subscribers, setSubscribers] = useLocalStorage(CAMP_CONFIG.STORAGE_KEYS.SUBSCRIBERS, [])
  const [registrations, setRegistrations] = useLocalStorage(CAMP_CONFIG.STORAGE_KEYS.REGISTRATIONS, [])

  // Camp data configuration - centralized and maintainable
  const campData = {
    launchDate: new Date(Date.now() + CAMP_CONFIG.LAUNCH_DATE_OFFSET_DAYS * 24 * 60 * 60 * 1000).toISOString(),
    currentParticipants: CAMP_CONFIG.CURRENT_PARTICIPANTS,
    maxParticipants: CAMP_CONFIG.MAX_PARTICIPANTS
  }

  // Load initial data from localStorage on component mount
  useEffect(() => {
    const loadInitialData = () => {
      try {
        const savedSubscribers = getSubscribers()
        const savedRegistrations = getRegistrations()
        
        setSubscribers(savedSubscribers)
        setRegistrations(savedRegistrations)
      } catch (error) {
        console.error('Error loading initial data:', error)
      }
    }

    loadInitialData()
  }, [setSubscribers, setRegistrations])

  // Mobile optimization setup
  useEffect(() => {
    const setupMobileOptimizations = () => {
      try {
        // Optimizar viewport para móviles
        optimizeViewport()
        
        // Detectar si es móvil
        const isMobile = isMobileDevice()
        const connectionType = getConnectionType()
        
        if (isMobile) {
          // Preload recursos críticos solo en conexiones rápidas
          if (connectionType === '4g' || connectionType === '5g') {
            preloadCriticalResources([
              { url: '/images/home-1.jpg', type: 'image' },
              { url: '/images/foto2.jpeg', type: 'image' },
              { url: '/images/foto 3.jpg', type: 'image' }
            ], connectionType)
          }
          
          // Lazy load de imágenes no críticas
          lazyLoadImages('img[data-src]', {
            rootMargin: '50px 0px',
            threshold: 0.1
          })
        }
      } catch (error) {
        console.error('Error setting up mobile optimizations:', error)
      }
    }

    setupMobileOptimizations()
  }, [])

  /**
   * Handle subscription with error handling
   * @param {string} email - Subscriber email
   */
  const handleSubscribe = (email) => {
    try {
    setSubscribers(prev => [...prev, email])
    setCurrentUserSubscribed(true)
    } catch (error) {
      console.error('Error handling subscription:', error)
    }
  }

  /**
   * Handle registration submission with validation
   * @param {Object} registrationData - Registration form data
   */
  const handleRegistrationSubmit = (registrationData) => {
    try {
      const success = addRegistration(registrationData)
      if (success) {
        setRegistrations(prev => [...prev, registrationData])
        setIsRegistrationModalOpen(false)
      } else {
        console.error('Failed to save registration')
      }
    } catch (error) {
      console.error('Error handling registration:', error)
    }
  }

  /**
   * Handle opening registration modal
   * Centralized modal state management
   */
  const handleOpenRegistration = () => {
    setIsRegistrationModalOpen(true)
  }

  /**
   * Handle closing registration modal
   * Centralized modal state management
   */
  const handleCloseRegistration = () => {
    setIsRegistrationModalOpen(false)
  }

  /**
   * Handle mobile menu toggle
   * Centralized menu state management
   */
  const handleToggleMobileMenu = () => {
    setIsMobileMenuOpen(prev => !prev)
  }

  /**
   * Handle navigation with mobile menu closure
   * @param {string} sectionId - Target section ID
   */
  const handleNavigation = (sectionId) => {
    scrollToSection(sectionId)
    setIsMobileMenuOpen(false)
  }

  return (
    <div className="app">
      {/* Mobile Navigation */}
      <MobileMenu 
        isOpen={isMobileMenuOpen}
        onClose={handleToggleMobileMenu}
        activeSection={activeSection}
        onScrollToSection={handleNavigation}
      />

      {/* Main Content Sections */}
      <Hero 
        onScrollToSection={scrollToSection}
        onOpenRegistration={handleOpenRegistration}
      />

      <WhyTravel />

      <Journeys 
        campData={campData}
        registrations={registrations}
        onOpenRegistration={handleOpenRegistration}
      />

      <Included />

      <Guides />

      <Footer />

      {/* Registration Modal */}
      <RegistrationModal 
        isOpen={isRegistrationModalOpen}
        onClose={handleCloseRegistration}
        onSubmit={handleRegistrationSubmit}
      />
    </div>
  )
}

export default App