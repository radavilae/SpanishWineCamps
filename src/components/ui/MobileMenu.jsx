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
      {/* Floating Hamburger Menu Button */}
      <button 
        className={`${styles.floatingHamburgerMenu} btn`}
        onClick={handleMenuToggle}
        aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
        aria-expanded={isOpen}
        aria-controls="mobile-nav-menu"
      >
        <span 
          className={`${styles.hamburgerLine} ${isOpen ? styles.active : ''}`}
          aria-hidden="true"
        />
        <span 
          className={`${styles.hamburgerLine} ${isOpen ? styles.active : ''}`}
          aria-hidden="true"
        />
        <span 
          className={`${styles.hamburgerLine} ${isOpen ? styles.active : ''}`}
          aria-hidden="true"
        />
      </button>
      
      {/* Mobile Menu Overlay */}
      <div 
        className={`nav-mobile ${isOpen ? 'open' : ''}`}
        id="mobile-nav-menu"
        role="navigation"
        aria-label="Main navigation"
        aria-hidden={!isOpen}
      >
        <nav>
          <ul className="nav-list">
            <li className="nav-item">
              <a 
                href="#hero" 
                onClick={(e) => handleNavigation(e, 'hero')} 
                className={`nav-link ${activeSection === 'hero' ? 'active' : ''}`}
                aria-current={activeSection === 'hero' ? 'page' : undefined}
              >
                Home
              </a>
            </li>
            <li className="nav-item">
              <a 
                href="#why-travel" 
                onClick={(e) => handleNavigation(e, 'why-travel')} 
                className={`nav-link ${activeSection === 'why-travel' ? 'active' : ''}`}
                aria-current={activeSection === 'why-travel' ? 'page' : undefined}
              >
                Why Travel
              </a>
            </li>
            <li className="nav-item">
              <a 
                href="#journeys" 
                onClick={(e) => handleNavigation(e, 'journeys')} 
                className={`nav-link ${activeSection === 'journeys' ? 'active' : ''}`}
                aria-current={activeSection === 'journeys' ? 'page' : undefined}
              >
                Journeys
              </a>
            </li>
            <li className="nav-item">
              <a 
                href="#included" 
                onClick={(e) => handleNavigation(e, 'included')} 
                className={`nav-link ${activeSection === 'included' ? 'active' : ''}`}
                aria-current={activeSection === 'included' ? 'page' : undefined}
              >
                What's Included
              </a>
            </li>
            <li className="nav-item">
              <a 
                href="#guides" 
                onClick={(e) => handleNavigation(e, 'guides')} 
                className={`nav-link ${activeSection === 'guides' ? 'active' : ''}`}
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