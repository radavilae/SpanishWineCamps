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
          setError('Las contraseñas no coinciden')
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
            <h2 className={styles.confirmationTitle}>¡Registro Exitoso!</h2>
            <p className={styles.confirmationText}>
              Por favor, revisa tu cuenta de correo electrónico y confirma tu dirección para activar tu cuenta.
            </p>
            <p className={styles.confirmationSubtext}>
              Si no recibes el correo en unos minutos, revisa tu carpeta de spam.
            </p>
            <button
              className={styles.submitButton}
              onClick={() => handleSwitchMode(true)}
            >
              Ir a Iniciar Sesión
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className={styles.authContainer}>
      <div className={styles.authBox}>
        {/* Tabs */}
        <div className={styles.tabs}>
          <button
            type="button"
            className={`${styles.tab} ${isLogin ? styles.active : ''}`}
            onClick={() => handleSwitchMode(true)}
          >
            Iniciar Sesión
          </button>
          <button
            type="button"
            className={`${styles.tab} ${!isLogin ? styles.active : ''}`}
            onClick={() => handleSwitchMode(false)}
          >
            Registrarse
          </button>
        </div>

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
              placeholder="tu@email.com"
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="password" className={styles.label}>
              Contraseña
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
                Confirmar Contraseña
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
            {loading ? 'Procesando...' : isLogin ? 'Iniciar Sesión' : 'Registrarse'}
          </button>
        </form>
      </div>
    </div>
  )
}

export default AuthForm
