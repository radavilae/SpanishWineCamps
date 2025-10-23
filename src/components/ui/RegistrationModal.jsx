import { useState, useEffect } from 'react'
import styles from './RegistrationModal.module.css'

const RegistrationModal = ({ isOpen, onClose, onSubmit }) => {
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

  useEffect(() => {
    if (!isOpen) {
      setFormData({ name: '', email: '', partySize: '1', phone: '', message: '' })
      setError('')
      setIsSubmitting(false)
      setSubmitted(false)
    }
  }, [isOpen])

  const validate = () => {
    if (!formData.name.trim()) return 'Please enter your name'
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(formData.email)) return 'Please enter a valid email'
    const size = Number(formData.partySize)
    if (!Number.isInteger(size) || size < 1 || size > 12) return 'Group size must be 1–12'
    return ''
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const validationError = validate()
    if (validationError) {
      setError(validationError)
      return
    }
    setError('')
    setIsSubmitting(true)
    try {
      await new Promise(r => setTimeout(r, 600))
      onSubmit({ ...formData, createdAt: new Date().toISOString() })
      setSubmitted(true)
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!isOpen) return null

  return (
    <div className={styles.modalOverlay} role="dialog" aria-modal="true">
      <div className={styles.modal}>
        <div className={styles.modalHeader}>
          <h3>Sign up for our next Wine Camp</h3>
          <button className={styles.modalClose} onClick={onClose} aria-label="Close">×</button>
        </div>

        {submitted ? (
          <div className={styles.modalSuccess}>
            <div className={styles.successIcon}>✓</div>
            <h4>Sign-up received</h4>
            <p>We'll email you with confirmation and details shortly.</p>
            <button className={styles.primaryButton} onClick={onClose}>Close</button>
          </div>
        ) : (
          <form className={styles.modalForm} onSubmit={handleSubmit}>
            <div className={styles.formRow}>
              <div className={styles.formField}>
                <label htmlFor="reg-name">Full name</label>
                <input id="reg-name" name="name" type="text" value={formData.name} onChange={handleChange} placeholder="Your name" />
              </div>
              <div className={styles.formField}>
                <label htmlFor="reg-email">Email</label>
                <input id="reg-email" name="email" type="email" value={formData.email} onChange={handleChange} placeholder="you@example.com" />
              </div>
            </div>
            <div className={styles.formRow}>
              <div className={styles.formField}>
                <label htmlFor="reg-party">Group size</label>
                <select id="reg-party" name="partySize" value={formData.partySize} onChange={handleChange}>
                  {Array.from({ length: 12 }).map((_, i) => (
                    <option key={i + 1} value={String(i + 1)}>{i + 1}</option>
                  ))}
                </select>
              </div>
              <div className={styles.formField}>
                <label htmlFor="reg-phone">Phone (optional)</label>
                <input id="reg-phone" name="phone" type="tel" value={formData.phone} onChange={handleChange} placeholder="+34 600 000 000" />
              </div>
            </div>
            <div className={styles.formField}>
              <label htmlFor="reg-message">Message (optional)</label>
              <textarea id="reg-message" name="message" rows="3" value={formData.message} onChange={handleChange} placeholder="Dietary needs, preferred dates, etc."></textarea>
            </div>

            {error && <p className={styles.formError}>{error}</p>}

            <div className={styles.modalActions}>
              <button type="button" className={styles.secondaryButton} onClick={onClose}>Cancel</button>
              <button type="submit" className={styles.primaryButton} disabled={isSubmitting}>
                {isSubmitting ? 'Submitting…' : 'Sign up'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  )
}

export default RegistrationModal
