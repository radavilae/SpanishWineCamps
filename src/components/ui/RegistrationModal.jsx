/**
 * Registration Modal Component
 * Refactored for better validation and user experience
 */
import { useState, useEffect } from 'react'
import { validateRegistration } from '../../utils/validation'
import styles from './RegistrationModal.module.css'

/**
 * Registration modal with improved form handling and validation
 * @param {boolean} isOpen - Whether modal is open
 * @param {Function} onClose - Close modal callback
 * @param {Function} onSubmit - Submit callback
 */
const RegistrationModal = ({ isOpen, onClose, onSubmit }) => {
  // Form state with better structure
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    partySize: '1',
    phone: '',
    message: ''
  })
  const [error, setError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  // Reset form when modal opens/closes
  useEffect(() => {
    if (!isOpen) {
      setFormData({ name: '', email: '', partySize: '1', phone: '', message: '' })
      setError('')
      setIsSubmitting(false)
      setSubmitted(false)
    }
  }, [isOpen])

  /**
   * Handle form field changes with validation
   * @param {Event} event - Input change event
   */
  const handleFieldChange = (event) => {
    const { name, value } = event.target
    setFormData(prev => ({ ...prev, [name]: value }))
    // Clear error when user starts typing
    if (error) setError('')
  }

  /**
   * Handle form submission with comprehensive validation
   * @param {Event} event - Form submit event
   */
  const handleSubmit = async (event) => {
    event.preventDefault()
    
    // Validate form data
    const validation = validateRegistration(formData)
    if (!validation.isValid) {
      setError(validation.error)
      return
    }

    setError('')
    setIsSubmitting(true)
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 600))
      
      // Submit with timestamp
      onSubmit({ 
        ...formData, 
        createdAt: new Date().toISOString() 
      })
      setSubmitted(true)
    } catch (error) {
      console.error('Registration error:', error)
      setError('Failed to submit registration. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  // Don't render if modal is closed
  if (!isOpen) return null

  return (
    <div className={styles.modalOverlay} role="dialog" aria-modal="true" aria-labelledby="modal-title">
      <div className={styles.modal}>
        <div className={styles.modalHeader}>
          <h3 id="modal-title">Sign up for our next Wine Camp</h3>
          <button 
            className={styles.modalClose} 
            onClick={onClose} 
            aria-label="Close registration modal"
          >
            ×
          </button>
        </div>

        {submitted ? (
          <div className={styles.modalSuccess}>
            <div className={styles.successIcon}>✓</div>
            <h4>Sign-up received</h4>
            <p>We'll email you with confirmation and details shortly.</p>
            <button className={styles.primaryButton} onClick={onClose}>
              Close
            </button>
          </div>
        ) : (
          <form className={styles.modalForm} onSubmit={handleSubmit}>
            <div className={styles.formRow}>
              <div className={styles.formField}>
                <label htmlFor="reg-name">Full name *</label>
                <input 
                  id="reg-name" 
                  name="name" 
                  type="text" 
                  value={formData.name} 
                  onChange={handleFieldChange} 
                  placeholder="Your name" 
                  required
                  aria-describedby={error ? "form-error" : undefined}
                />
              </div>
              <div className={styles.formField}>
                <label htmlFor="reg-email">Email *</label>
                <input 
                  id="reg-email" 
                  name="email" 
                  type="email" 
                  value={formData.email} 
                  onChange={handleFieldChange} 
                  placeholder="you@example.com" 
                  required
                  aria-describedby={error ? "form-error" : undefined}
                />
              </div>
            </div>
            
            <div className={styles.formRow}>
              <div className={styles.formField}>
                <label htmlFor="reg-party">Group size *</label>
                <select 
                  id="reg-party" 
                  name="partySize" 
                  value={formData.partySize} 
                  onChange={handleFieldChange}
                  required
                >
                  {Array.from({ length: 12 }, (_, i) => (
                    <option key={i + 1} value={String(i + 1)}>
                      {i + 1}
                    </option>
                  ))}
                </select>
              </div>
              <div className={styles.formField}>
                <label htmlFor="reg-phone">Phone (optional)</label>
                <input 
                  id="reg-phone" 
                  name="phone" 
                  type="tel" 
                  value={formData.phone} 
                  onChange={handleFieldChange} 
                  placeholder="+34 600 000 000" 
                />
              </div>
            </div>
            
            <div className={styles.formField}>
              <label htmlFor="reg-message">Message (optional)</label>
              <textarea 
                id="reg-message" 
                name="message" 
                rows="3" 
                value={formData.message} 
                onChange={handleFieldChange} 
                placeholder="Dietary needs, preferred dates, etc."
              />
            </div>

            {error && (
              <p id="form-error" className={styles.formError} role="alert">
                {error}
              </p>
            )}

            <div className={styles.modalActions}>
              <button 
                type="button" 
                className={styles.secondaryButton} 
                onClick={onClose}
              >
                Cancel
              </button>
              <button 
                type="submit" 
                className={styles.primaryButton} 
                disabled={isSubmitting}
                aria-describedby={isSubmitting ? "submitting-text" : undefined}
              >
                {isSubmitting ? 'Submitting…' : 'Sign up'}
                {isSubmitting && <span id="submitting-text" className="sr-only">Please wait while we process your registration</span>}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  )
}

export default RegistrationModal