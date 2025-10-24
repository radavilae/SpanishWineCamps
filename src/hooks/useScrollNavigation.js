/**
 * Custom hook for scroll-based navigation
 * Encapsulates scroll detection logic for better reusability
 */
import { useState, useEffect } from 'react'
import { NAVIGATION_SECTIONS } from '../constants/campData'

/**
 * Hook to track active section based on scroll position
 * @returns {Object} Active section and scroll handler
 */
export const useScrollNavigation = () => {
  const [activeSection, setActiveSection] = useState('hero')

  useEffect(() => {
    /**
     * Handle scroll events to determine active section
     * Uses intersection-based detection for better performance
     */
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 100

      for (const sectionId of NAVIGATION_SECTIONS) {
        const element = document.getElementById(sectionId)
        if (element) {
          const { offsetTop, offsetHeight } = element
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(sectionId)
            break
          }
        }
      }
    }

    // Add scroll listener with passive option for better performance
    window.addEventListener('scroll', handleScroll, { passive: true })
    
    // Cleanup listener on unmount
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  /**
   * Scroll to specific section with smooth behavior
   * @param {string} sectionId - Target section ID
   */
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return {
    activeSection,
    scrollToSection
  }
}
