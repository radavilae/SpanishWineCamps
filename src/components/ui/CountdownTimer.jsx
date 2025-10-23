import { useState, useEffect } from 'react'
import styles from './CountdownTimer.module.css'

const CountdownTimer = ({ targetDate, onExpired }) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  })
  const [isActive, setIsActive] = useState(true)

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date().getTime()
      const target = new Date(targetDate).getTime()
      const difference = target - now

      if (difference > 0) {
        const totalSeconds = Math.floor(difference / 1000)
        const days = Math.floor(totalSeconds / (24 * 60 * 60))
        const hours = Math.floor((totalSeconds % (24 * 60 * 60)) / (60 * 60))
        const minutes = Math.floor((totalSeconds % (60 * 60)) / 60)
        const seconds = totalSeconds % 60

        setTimeLeft({ days, hours, minutes, seconds })
        setIsActive(true)
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 })
        setIsActive(false)
        if (onExpired) onExpired()
      }
    }

    // Calculate immediately to show correct time on load
    calculateTimeLeft()
    
    // Set up interval for real-time updates every second
    const timer = setInterval(calculateTimeLeft, 1000)

    return () => clearInterval(timer)
  }, [targetDate, onExpired])

  return (
    <div className={`${styles.countdownTimer} ${isActive ? styles.active : styles.expired}`}>
      <div className={styles.timeUnit}>
        <span className={styles.timeValue}>{String(timeLeft.days).padStart(2, '0')}</span>
        <span className={styles.timeLabel}>days</span>
      </div>
      <div className={styles.timeUnit}>
        <span className={styles.timeValue}>{String(timeLeft.hours).padStart(2, '0')}</span>
        <span className={styles.timeLabel}>hours</span>
      </div>
      <div className={styles.timeUnit}>
        <span className={styles.timeValue}>{String(timeLeft.minutes).padStart(2, '0')}</span>
        <span className={styles.timeLabel}>minutes</span>
      </div>
      <div className={`${styles.timeUnit} ${styles.secondsUnit}`}>
        <span className={`${styles.timeValue} ${styles.secondsValue}`}>{String(timeLeft.seconds).padStart(2, '0')}</span>
        <span className={styles.timeLabel}>seconds</span>
      </div>
    </div>
  )
}

export default CountdownTimer
