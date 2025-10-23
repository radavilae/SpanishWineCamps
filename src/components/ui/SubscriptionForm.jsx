import { useState } from 'react'
import styles from './SubscriptionForm.module.css'

const SubscriptionForm = ({ onSubscribe, isSubscribed }) => {
  const [email, setEmail] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    
    if (!email.trim()) {
      setError('Please enter your email address')
      return
    }
    
    if (!validateEmail(email)) {
      setError('Please enter a valid email address')
      return
    }

    setIsLoading(true)
    
    try {
      // Simulate API call - in real implementation, this would save to backend
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Save to localStorage for demo purposes
      const subscribers = JSON.parse(localStorage.getItem('wineCampSubscribers') || '[]')
      if (!subscribers.includes(email)) {
        subscribers.push(email)
        localStorage.setItem('wineCampSubscribers', JSON.stringify(subscribers))
      }
      
      onSubscribe(email)
      setEmail('')
    } catch (err) {
      setError('Something went wrong. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  if (isSubscribed) {
    return (
      <div className={styles.subscriptionSuccess}>
        <div className={styles.successIcon}>✓</div>
        <p>You're signed up! We'll notify you about updates.</p>
      </div>
    )
  }

  return (
    <form className={styles.subscriptionForm} onSubmit={handleSubmit}>
      <div className={styles.formGroup}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          className={styles.emailInput}
          disabled={isLoading}
        />
        <button 
          type="submit" 
          className={styles.subscribeButton}
          disabled={isLoading}
        >
          {isLoading ? 'Signing up...' : 'Sign up'}
        </button>
      </div>
      {error && <p className={styles.errorMessage}>{error}</p>}
    </form>
  )
}

export default SubscriptionForm
