import styles from './MobileMenu.module.css'

const MobileMenu = ({ isOpen, onClose, activeSection, onScrollToSection }) => {
  return (
    <>
      {/* Floating Hamburger Menu */}
      <button 
        className={styles.floatingHamburgerMenu}
        onClick={onClose}
        aria-label="Toggle menu"
      >
        <span className={`${styles.hamburgerLine} ${isOpen ? styles.active : ''}`}></span>
        <span className={`${styles.hamburgerLine} ${isOpen ? styles.active : ''}`}></span>
        <span className={`${styles.hamburgerLine} ${isOpen ? styles.active : ''}`}></span>
      </button>
      
      {/* Mobile Menu Overlay */}
      <div className={`${styles.mobileMenuOverlay} ${isOpen ? styles.open : ''}`}>
        <ul className={styles.mobileNavMenu}>
          <li><a href="#hero" onClick={() => onScrollToSection('hero')} className={activeSection === 'hero' ? styles.active : ''}>Home</a></li>
          <li><a href="#why-travel" onClick={() => onScrollToSection('why-travel')} className={activeSection === 'why-travel' ? styles.active : ''}>Why Travel</a></li>
          <li><a href="#journeys" onClick={() => onScrollToSection('journeys')} className={activeSection === 'journeys' ? styles.active : ''}>Journeys</a></li>
          <li><a href="#included" onClick={() => onScrollToSection('included')} className={activeSection === 'included' ? styles.active : ''}>What's Included</a></li>
          <li><a href="#guides" onClick={() => onScrollToSection('guides')} className={activeSection === 'guides' ? styles.active : ''}>Guides</a></li>
        </ul>
      </div>
    </>
  )
}

export default MobileMenu
