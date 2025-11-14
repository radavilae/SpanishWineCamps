/**
 * Custom hook for scroll-based navigation
 * Encapsulates scroll detection logic for better reusability
 */
import { useState, useEffect, useRef } from 'react'
import { NAVIGATION_SECTIONS } from '../constants/campData'

/**
 * Hook to track active section based on scroll position
 * Uses Intersection Observer for more reliable detection
 * @returns {Object} Active section and scroll handler
 */
export const useScrollNavigation = () => {
  const [activeSection, setActiveSection] = useState('hero')
  const programmaticScrollEndTime = useRef(0)

  useEffect(() => {
    /**
     * Handle scroll events to determine active section
     * Uses scroll position to find the section closest to viewport center
     */
    const sections = NAVIGATION_SECTIONS.map(id => ({
      id,
      element: document.getElementById(id)
    })).filter(section => section.element !== null)

    if (sections.length === 0) return

    let scrollTimeout = null

    const updateActiveSection = () => {
      // Don't update if we just scrolled programmatically
      if (Date.now() < programmaticScrollEndTime.current) return
      
      const viewportCenter = window.scrollY + window.innerHeight / 2
      let closestSection = null
      let minDistance = Infinity

      sections.forEach(section => {
        if (section.element) {
          const rect = section.element.getBoundingClientRect()
          const sectionTop = window.scrollY + rect.top
          const sectionCenter = sectionTop + rect.height / 2
          const distance = Math.abs(viewportCenter - sectionCenter)
          
          // Section must be at least partially visible
          if (rect.bottom > 0 && rect.top < window.innerHeight) {
            if (distance < minDistance) {
              minDistance = distance
              closestSection = section.id
            }
          }
        }
      })

      if (closestSection) {
        setActiveSection(prev => prev !== closestSection ? closestSection : prev)
      }
    }

    const handleScroll = () => {
      clearTimeout(scrollTimeout)
      scrollTimeout = setTimeout(updateActiveSection, 100)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })

    // Check initial position
    updateActiveSection()

    // Cleanup
    return () => {
      window.removeEventListener('scroll', handleScroll)
      clearTimeout(scrollTimeout)
    }
  }, [])

  /**
   * Scroll to specific section with smooth behavior
   * @param {string} sectionId - Target section ID
   */
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId)
    if (element) {
      // Set active section immediately when clicking
      setActiveSection(sectionId)
      
      // Mark that we're doing programmatic scroll (block updates for 1.5 seconds)
      programmaticScrollEndTime.current = Date.now() + 1500
      
      // Calculate position with offset to show the title
      const navbarHeight = 80 // Approximate navbar height
      const offset = 40 // Additional offset for better visibility
      const elementPosition = element.getBoundingClientRect().top + window.scrollY
      const offsetPosition = elementPosition - navbarHeight - offset
      
      // Scroll to position with smooth behavior
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      })
    }
  }

  return {
    activeSection,
    scrollToSection
  }
}
