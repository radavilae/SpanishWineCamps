/**
 * Available Spots Component
 * Refactored for better accessibility and clarity
 */
import styles from './AvailableSpots.module.css'

/**
 * Available spots indicator with improved accessibility
 * @param {number} current - Current number of participants
 * @param {number} max - Maximum number of participants
 */
const AvailableSpots = ({ current, max }) => {
  // Calculate spots information
  const spotsLeft = max - current
  const isFull = current >= max
  const percentage = Math.round((current / max) * 100)

  /**
   * Get appropriate status text and ARIA label
   * @returns {Object} Status information
   */
  const getStatusInfo = () => {
    if (isFull) {
      return {
        text: 'FULL',
        ariaLabel: `Camp is full with ${max} participants`,
        status: 'full'
      }
    }
    
    return {
      text: `${spotsLeft}/${max} spots available`,
      ariaLabel: `${spotsLeft} spots remaining out of ${max} total spots`,
      status: 'available'
    }
  }

  const statusInfo = getStatusInfo()

  return (
    <div 
      className={`${styles.availableSpots} ${styles[statusInfo.status]}`}
      role="status"
      aria-live="polite"
      aria-label={statusInfo.ariaLabel}
    >
      <span className={styles.spotsText}>
        {statusInfo.text}
      </span>
      {/* Hidden progress indicator for screen readers */}
      <div 
        className="sr-only"
        aria-hidden="true"
      >
        {percentage}% capacity filled
      </div>
    </div>
  )
}

export default AvailableSpots