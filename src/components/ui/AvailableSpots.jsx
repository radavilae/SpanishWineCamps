import styles from './AvailableSpots.module.css'

const AvailableSpots = ({ current, max }) => {
  const isFull = current >= max
  const spotsLeft = max - current
  
  return (
    <div className={`${styles.availableSpots} ${isFull ? styles.full : styles.available}`}>
      <span className={styles.spotsText}>
        {isFull ? 'FULL' : `${spotsLeft}/${max} spots available`}
      </span>
    </div>
  )
}

export default AvailableSpots
