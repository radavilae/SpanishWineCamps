/**
 * Navigation Bar Component
 * Horizontal navigation bar for desktop layout
 */
import styles from './Navbar.module.css'

/**
 * Horizontal navigation bar
 * @param {string} activeSection - Currently active section
 * @param {Function} onScrollToSection - Navigation callback
 */
const Navbar = ({ activeSection, onScrollToSection }) => {
  /**
   * Handle navigation with proper event handling
   * @param {Event} event - Click event
   * @param {string} sectionId - Target section ID
   */
  const handleNavigation = (event, sectionId) => {
    event.preventDefault()
    onScrollToSection(sectionId)
  }

  const navItems = [
    { id: 'the-difference', label: 'The Difference' },
    { id: 'journeys', label: 'Journeys' },
    { id: 'regions', label: 'Regions' },
    { id: 'the-makers', label: 'The Makers' },
    { id: 'who-we-are', label: 'Who We Are' }
  ]

  return (
    <nav className={styles.navbar} role="navigation" aria-label="Main navigation">
      <div className={styles.navBrand}>
        <button 
          className={styles.brandButton}
          onClick={() => onScrollToSection('home')}
          aria-label="Go to home"
        >
          <div className={styles.brandContainer}>
            <span className={styles.brandMain}>
              <span style={{ color: 'hsl(42, 78%, 52%)', fontStyle: 'italic' }}>Spanish</span> Wine Camps
            </span>
            <span className={styles.brandSub}>Immersion Journeys</span>
          </div>
        </button>
      </div>
      <ul className={styles.navList}>
        {navItems.map((item) => (
          <li key={item.id} className={styles.navItem}>
            <a
              href={`#${item.id}`}
              onClick={(e) => handleNavigation(e, item.id)}
              className={`${styles.navLink} ${activeSection === item.id ? styles.active : ''}`}
              aria-current={activeSection === item.id ? 'page' : undefined}
            >
              {item.label}
            </a>
          </li>
        ))}
        <li className={styles.navItem}>
          <button className={styles.signUpButton} onClick={() => onScrollToSection('who-we-are')}>
            Sign Up
          </button>
        </li>
      </ul>
    </nav>
  )
}

export default Navbar


