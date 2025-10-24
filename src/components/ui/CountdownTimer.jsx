/**
 * Countdown Timer Component
 * Refactored for better performance and readability
 */
import { useState, useEffect, useCallback } from 'react'
import styles from './CountdownTimer.module.css'

/**
 * Countdown timer with improved performance and error handling
 * @param {string} targetDate - Target date in ISO format
 * @param {Function} onExpired - Callback when countdown expires
 */
const CountdownTimer = ({ targetDate, onExpired }) => {
  // State management with better structure
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  })
  const [isActive, setIsActive] = useState(true)

  /**
   * Calculate time remaining with error handling
   * @param {string} target - Target date string
   * @returns {Object} Time components or null if invalid
   */
  const calculateTimeLeft = useCallback((target) => {
    try {
      const now = new Date().getTime()
      const targetTime = new Date(target).getTime()
      const difference = targetTime - now

      if (difference <= 0) {
        return null // Expired
      }

      const totalSeconds = Math.floor(difference / 1000)
      const days = Math.floor(totalSeconds / (24 * 60 * 60))
      const hours = Math.floor((totalSeconds % (24 * 60 * 60)) / (60 * 60))
      const minutes = Math.floor((totalSeconds % (60 * 60)) / 60)
      const seconds = totalSeconds % 60

      return { days, hours, minutes, seconds }
    } catch (error) {
      console.error('Error calculating time left:', error)
      return null
    }
  }, [])

  /**
   * Update countdown state
   */
  const updateCountdown = useCallback(() => {
    const newTimeLeft = calculateTimeLeft(targetDate)
    
    if (newTimeLeft === null) {
      setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 })
      setIsActive(false)
      if (onExpired) onExpired()
    } else {
      setTimeLeft(newTimeLeft)
      setIsActive(true)
    }
  }, [targetDate, onExpired, calculateTimeLeft])

  // Set up countdown timer with cleanup
  useEffect(() => {
    // Calculate immediately for initial render
    updateCountdown()
    
    // Set up interval for updates
    const timer = setInterval(updateCountdown, 1000)

    // Cleanup interval on unmount or dependency change
    return () => clearInterval(timer)
  }, [updateCountdown])

  /**
   * Format time value with leading zero
   * @param {number} value - Time value to format
   * @returns {string} Formatted time string
   */
  const formatTimeValue = (value) => {
    return String(value).padStart(2, '0')
  }

  return (
    <div 
      className={`${styles.countdownTimer} ${isActive ? styles.active : styles.expired}`}
      role="timer"
      aria-live="polite"
      aria-label={`Time remaining: ${timeLeft.days} days, ${timeLeft.hours} hours, ${timeLeft.minutes} minutes, ${timeLeft.seconds} seconds`}
    >
      <div className={styles.timeUnit}>
        <span className={styles.timeValue}>{formatTimeValue(timeLeft.days)}</span>
        <span className={styles.timeLabel}>days</span>
      </div>
      <div className={styles.timeUnit}>
        <span className={styles.timeValue}>{formatTimeValue(timeLeft.hours)}</span>
        <span className={styles.timeLabel}>hours</span>
      </div>
      <div className={styles.timeUnit}>
        <span className={styles.timeValue}>{formatTimeValue(timeLeft.minutes)}</span>
        <span className={styles.timeLabel}>minutes</span>
      </div>
      <div className={`${styles.timeUnit} ${styles.secondsUnit}`}>
        <span className={`${styles.timeValue} ${styles.secondsValue}`}>
          {formatTimeValue(timeLeft.seconds)}
        </span>
        <span className={styles.timeLabel}>seconds</span>
      </div>
    </div>
  )
}

export default CountdownTimer