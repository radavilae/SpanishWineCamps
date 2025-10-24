/**
 * Mobile Menu Component
 * Refactored for better accessibility and performance
 */
import styles from './MobileMenu.module.css'

/**
 * Mobile navigation menu with improved accessibility
 * @param {boolean} isOpen - Whether menu is open
 * @param {Function} onClose - Close menu callback
 * @param {string} activeSection - Currently active section
 * @param {Function} onScrollToSection - Navigation callback
 */
const MobileMenu = ({ isOpen, onClose, activeSection, onScrollToSection }) => {
  /**
   * Handle navigation with proper event handling
   * @param {Event} event - Click event
   * @param {string} sectionId - Target section ID
   */
  const handleNavigation = (event, sectionId) => {
    event.preventDefault()
    onScrollToSection(sectionId)
  }

  /**
   * Handle menu toggle with proper accessibility
   * @param {Event} event - Click event
   */
  const handleMenuToggle = (event) => {
    event.preventDefault()
    onClose()
  }

  return (
    <>
      {/* Floating Hamburger Menu Button - Optimizado para móviles */}
      <button 
        className={`mobile-hamburger ${isOpen ? 'active' : ''}`}
        onClick={handleMenuToggle}
        aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
        aria-expanded={isOpen}
        aria-controls="mobile-nav-menu"
        type="button"
      >
        <span 
          className={`hamburger-line ${isOpen ? 'active' : ''}`}
          aria-hidden="true"
        />
        <span 
          className={`hamburger-line ${isOpen ? 'active' : ''}`}
          aria-hidden="true"
        />
        <span 
          className={`hamburger-line ${isOpen ? 'active' : ''}`}
          aria-hidden="true"
        />
      </button>
      
      {/* Mobile Menu Overlay - Optimizado para táctil */}
      <div 
        className={`mobile-menu-overlay ${isOpen ? 'open' : ''}`}
        id="mobile-nav-menu"
        role="navigation"
        aria-label="Main navigation"
        aria-hidden={!isOpen}
      >
        <nav className="mobile-optimized">
          <ul className="mobile-nav-list">
            <li className="mobile-nav-item">
              <a 
                href="#hero" 
                onClick={(e) => handleNavigation(e, 'hero')} 
                className={`mobile-nav-link ${activeSection === 'hero' ? 'active' : ''}`}
                aria-current={activeSection === 'hero' ? 'page' : undefined}
              >
                Home
              </a>
            </li>
            <li className="mobile-nav-item">
              <a 
                href="#why-travel" 
                onClick={(e) => handleNavigation(e, 'why-travel')} 
                className={`mobile-nav-link ${activeSection === 'why-travel' ? 'active' : ''}`}
                aria-current={activeSection === 'why-travel' ? 'page' : undefined}
              >
                Why Travel
              </a>
            </li>
            <li className="mobile-nav-item">
              <a 
                href="#journeys" 
                onClick={(e) => handleNavigation(e, 'journeys')} 
                className={`mobile-nav-link ${activeSection === 'journeys' ? 'active' : ''}`}
                aria-current={activeSection === 'journeys' ? 'page' : undefined}
              >
                Journeys
              </a>
            </li>
            <li className="mobile-nav-item">
              <a 
                href="#included" 
                onClick={(e) => handleNavigation(e, 'included')} 
                className={`mobile-nav-link ${activeSection === 'included' ? 'active' : ''}`}
                aria-current={activeSection === 'included' ? 'page' : undefined}
              >
                What's Included
              </a>
            </li>
            <li className="mobile-nav-item">
              <a 
                href="#guides" 
                onClick={(e) => handleNavigation(e, 'guides')} 
                className={`mobile-nav-link ${activeSection === 'guides' ? 'active' : ''}`}
                aria-current={activeSection === 'guides' ? 'page' : undefined}
              >
                Guides
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </>
  )
}

export default MobileMenu