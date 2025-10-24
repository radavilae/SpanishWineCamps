/**
 * Subscription Form Component
 * Refactored for better error handling and validation
 */
import { useState } from 'react'
import { isValidEmail } from '../../utils/validation'
import { addSubscriber } from '../../utils/storage'
import styles from './SubscriptionForm.module.css'

/**
 * Subscription form with improved validation and error handling
 * @param {Function} onSubscribe - Callback when subscription is successful
 * @param {boolean} isSubscribed - Whether user is already subscribed
 */
const SubscriptionForm = ({ onSubscribe, isSubscribed }) => {
  // Form state management
  const [email, setEmail] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  /**
   * Handle form submission with improved validation
   * @param {Event} event - Form submit event
   */
  const handleSubmit = async (event) => {
    event.preventDefault()
    setError('')
    
    // Input validation
    if (!email.trim()) {
      setError('Please enter your email address')
      return
    }
    
    if (!isValidEmail(email)) {
      setError('Please enter a valid email address')
      return
    }

    setIsLoading(true)
    
    try {
      // Simulate API call with proper error handling
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Save to storage with error handling
      const success = addSubscriber(email)
      if (success) {
        onSubscribe(email)
        setEmail('')
      } else {
        setError('Failed to save subscription. Please try again.')
      }
    } catch (error) {
      console.error('Subscription error:', error)
      setError('Something went wrong. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  /**
   * Handle input change with validation
   * @param {Event} event - Input change event
   */
  const handleEmailChange = (event) => {
    setEmail(event.target.value)
    // Clear error when user starts typing
    if (error) setError('')
  }

  // Success state component
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
          onChange={handleEmailChange}
          placeholder="Enter your email"
          className={styles.emailInput}
          disabled={isLoading}
          aria-label="Email address"
          required
        />
        <button 
          type="submit" 
          className={styles.subscribeButton}
          disabled={isLoading}
          aria-label={isLoading ? 'Signing up...' : 'Sign up'}
        >
          {isLoading ? 'Signing up...' : 'Sign up'}
        </button>
      </div>
      {error && (
        <p className={styles.errorMessage} role="alert">
          {error}
        </p>
      )}
    </form>
  )
}

export default SubscriptionForm