import { useState } from 'react'
import { useElements, CardElement, useStripe } from '@stripe/react-stripe-js'
import { useAuth } from '../../contexts/AuthContext'
import { supabase } from '../../services/supabaseClient'
import styles from './PaymentForm.module.css'

const PaymentForm = ({ amount = 100, onSuccess }) => {
  const stripe = useStripe()
  const elements = useElements()
  const { user } = useAuth()
  const [error, setError] = useState(null)
  const [processing, setProcessing] = useState(false)
  const [succeeded, setSucceeded] = useState(false)

  const handleSubmit = async (event) => {
    event.preventDefault()
    setProcessing(true)
    setError(null)

    if (!stripe || !elements) {
      setProcessing(false)
      return
    }

    const cardElement = elements.getElement(CardElement)

    // Obtener el access_token de la sesión actual
    const { data: { session } } = await supabase.auth.getSession()
    const accessToken = session?.access_token

    if (!accessToken) {
      setError('Authentication required. Please log in again.')
      setProcessing(false)
      return
    }

    // Crear PaymentIntent a través de la Edge Function
    try {
      const response = await fetch(
        `https://nevocsrctnngiyxppejk.supabase.co/functions/v1/create-payment-intent`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify({
            amount,
            currency: 'eur',
            user_id: user.id,
          }),
        }
      )

      const { clientSecret } = await response.json()

      // Confirmar el pago con Stripe
      const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardElement,
          billing_details: {
            email: user.email,
          },
        },
      })

      if (error) {
        setError(error.message)
        setProcessing(false)
      } else if (paymentIntent.status === 'succeeded') {
        setSucceeded(true)
        setProcessing(false)
        if (onSuccess) {
          onSuccess(paymentIntent)
        }
      }
    } catch (err) {
      setError(err.message)
      setProcessing(false)
    }
  }

  if (succeeded) {
    return (
      <div className={styles.successMessage}>
        <div className={styles.successIcon}>✓</div>
        <h2 className={styles.successTitle}>Payment Successful!</h2>
        <p className={styles.successText}>Thank you for your payment.</p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className={styles.paymentForm}>
      <div className={styles.amountDisplay}>
        <span className={styles.amountLabel}>Amount:</span>
        <span className={styles.amountValue}>€{amount.toFixed(2)}</span>
      </div>

      <div className={styles.cardElement}>
        <CardElement
          options={{
            style: {
              base: {
                fontSize: '16px',
                color: '#424770',
                '::placeholder': {
                  color: '#aab7c4',
                },
              },
              invalid: {
                color: '#9e2146',
              },
            },
          }}
        />
      </div>

      {error && <div className={styles.errorMessage}>{error}</div>}

      <button
        type="submit"
        disabled={!stripe || processing}
        className={styles.submitButton}
      >
        {processing ? 'Processing...' : `Pay €${amount.toFixed(2)}`}
      </button>
    </form>
  )
}

export default PaymentForm
