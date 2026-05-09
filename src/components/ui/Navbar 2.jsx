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
    { id: 'hero', label: 'Home' },
    { id: 'why-travel', label: 'Travel Deeper' },
    { id: 'catalunya-priorat', label: 'Journeys' },
    { id: 'guides', label: 'Guides' },
    { id: 'contact', label: 'About Us' }
  ]

  return (
    <nav className={styles.navbar} role="navigation" aria-label="Main navigation">
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
      </ul>
    </nav>
  )
}

export default Navbar


