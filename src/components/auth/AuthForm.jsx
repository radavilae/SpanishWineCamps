import { useState, useEffect } from 'react'
import { useAuth } from '../../contexts/AuthContext'
import styles from './AuthForm.module.css'

const AuthForm = ({ defaultMode = 'login' }) => {
  const [isLogin, setIsLogin] = useState(defaultMode === 'login')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [showConfirmation, setShowConfirmation] = useState(false)

  const { signIn, signUp } = useAuth()

  useEffect(() => {
    setIsLogin(defaultMode === 'login')
  }, [defaultMode])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      if (isLogin) {
        await signIn(email, password)
      } else {
        // Validar que las contraseñas coincidan
        if (password !== confirmPassword) {
          setError('Passwords do not match')
          setLoading(false)
          return
        }

        const result = await signUp(email, password)

        // Si el registro requiere confirmación de email
        if (result.user && !result.session) {
          setShowConfirmation(true)
        }
      }
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleSwitchMode = (mode) => {
    setIsLogin(mode)
    setError('')
    setShowConfirmation(false)
    setPassword('')
    setConfirmPassword('')
  }

  if (showConfirmation) {
    return (
      <div className={styles.authContainer}>
        <div className={styles.authBox}>
          <div className={styles.confirmationMessage}>
            <div className={styles.confirmationIcon}>✓</div>
            <h2 className={styles.confirmationTitle}>Registration Successful!</h2>
            <p className={styles.confirmationText}>
              Please check your email and confirm your address to activate your account.
            </p>
            <p className={styles.confirmationSubtext}>
              If you don't receive the email within a few minutes, check your spam folder.
            </p>
            <button
              className={styles.submitButton}
              onClick={() => handleSwitchMode(true)}
            >
              Go to Log In
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className={styles.authContainer}>
      <div className={styles.authBox}>
        {/* Title */}
        <h2 className={styles.formTitle}>
          {isLogin ? 'Log In' : 'Sign Up'}
        </h2>

        {/* Form */}
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formGroup}>
            <label htmlFor="email" className={styles.label}>
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={styles.input}
              required
              placeholder="your@email.com"
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="password" className={styles.label}>
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={styles.input}
              required
              placeholder="••••••••"
              minLength={6}
            />
          </div>

          {!isLogin && (
            <div className={styles.formGroup}>
              <label htmlFor="confirmPassword" className={styles.label}>
                Confirm Password
              </label>
              <input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className={styles.input}
                required
                placeholder="••••••••"
                minLength={6}
              />
            </div>
          )}

          {error && <div className={styles.error}>{error}</div>}

          <button type="submit" className={styles.submitButton} disabled={loading}>
            {loading ? 'Processing...' : isLogin ? 'Log In' : 'Sign Up'}
          </button>
        </form>
      </div>
    </div>
  )
}

export default AuthForm
