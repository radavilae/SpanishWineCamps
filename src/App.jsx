import { useState, useEffect } from 'react'
import './App.css'

// Countdown Timer Component
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
    <div className={`countdown-timer ${isActive ? 'active' : 'expired'}`}>
      <div className="time-unit">
        <span className="time-value">{String(timeLeft.days).padStart(2, '0')}</span>
        <span className="time-label">days</span>
      </div>
      <div className="time-unit">
        <span className="time-value">{String(timeLeft.hours).padStart(2, '0')}</span>
        <span className="time-label">hours</span>
      </div>
      <div className="time-unit">
        <span className="time-value">{String(timeLeft.minutes).padStart(2, '0')}</span>
        <span className="time-label">minutes</span>
      </div>
      <div className="time-unit seconds-unit">
        <span className="time-value seconds-value">{String(timeLeft.seconds).padStart(2, '0')}</span>
        <span className="time-label">seconds</span>
      </div>
    </div>
  )
}

// Available Spots Component
const AvailableSpots = ({ current, max }) => {
  const isFull = current >= max
  const spotsLeft = max - current
  
  return (
    <div className={`available-spots ${isFull ? 'full' : 'available'}`}>
      <span className="spots-text">
        {isFull ? 'FULL' : `${spotsLeft}/${max} spots available`}
      </span>
    </div>
  )
}

// Subscription Form Component
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
      <div className="subscription-success">
        <div className="success-icon">✓</div>
        <p>You're signed up! We'll notify you about updates.</p>
      </div>
    )
  }

  return (
    <form className="subscription-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          className="email-input"
          disabled={isLoading}
        />
        <button 
          type="submit" 
          className="subscribe-button"
          disabled={isLoading}
        >
          {isLoading ? 'Signing up...' : 'Sign up'}
        </button>
      </div>
      {error && <p className="error-message">{error}</p>}
    </form>
  )
}

// Registration Modal Component
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
    <div className="modal-overlay" role="dialog" aria-modal="true">
      <div className="modal">
        <div className="modal-header">
          <h3>Sign up for our next Wine Camp</h3>
          <button className="modal-close" onClick={onClose} aria-label="Close">×</button>
        </div>

        {submitted ? (
          <div className="modal-success">
            <div className="success-icon">✓</div>
            <h4>Sign-up received</h4>
            <p>We'll email you with confirmation and details shortly.</p>
            <button className="primary-button" onClick={onClose}>Close</button>
          </div>
        ) : (
          <form className="modal-form" onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="form-field">
                <label htmlFor="reg-name">Full name</label>
                <input id="reg-name" name="name" type="text" value={formData.name} onChange={handleChange} placeholder="Your name" />
              </div>
              <div className="form-field">
                <label htmlFor="reg-email">Email</label>
                <input id="reg-email" name="email" type="email" value={formData.email} onChange={handleChange} placeholder="you@example.com" />
              </div>
            </div>
            <div className="form-row">
              <div className="form-field">
                <label htmlFor="reg-party">Group size</label>
                <select id="reg-party" name="partySize" value={formData.partySize} onChange={handleChange}>
                  {Array.from({ length: 12 }).map((_, i) => (
                    <option key={i + 1} value={String(i + 1)}>{i + 1}</option>
                  ))}
                </select>
              </div>
              <div className="form-field">
                <label htmlFor="reg-phone">Phone (optional)</label>
                <input id="reg-phone" name="phone" type="tel" value={formData.phone} onChange={handleChange} placeholder="+34 600 000 000" />
              </div>
            </div>
            <div className="form-field">
              <label htmlFor="reg-message">Message (optional)</label>
              <textarea id="reg-message" name="message" rows="3" value={formData.message} onChange={handleChange} placeholder="Dietary needs, preferred dates, etc."></textarea>
            </div>

            {error && <p className="form-error">{error}</p>}

            <div className="modal-actions">
              <button type="button" className="secondary-button" onClick={onClose}>Cancel</button>
              <button type="submit" className="primary-button" disabled={isSubmitting}>
                {isSubmitting ? 'Submitting…' : 'Sign up'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  )
}

function App() {
  const [activeSection, setActiveSection] = useState('hero')
  const [subscribers, setSubscribers] = useState([])
  const [currentUserSubscribed, setCurrentUserSubscribed] = useState(false)
  const [isRegOpen, setIsRegOpen] = useState(false)
  const [registrations, setRegistrations] = useState([])
  const [showJourneyDetails, setShowJourneyDetails] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  
  // Camp data with dates and participant limits
  const campData = {
    launchDate: new Date(Date.now() + 8 * 24 * 60 * 60 * 1000).toISOString(), // 8 days from now
    currentParticipants: 8,
    maxParticipants: 12
  }

  // Load subscribers from localStorage on component mount
  useEffect(() => {
    const savedSubscribers = JSON.parse(localStorage.getItem('wineCampSubscribers') || '[]')
    setSubscribers(savedSubscribers)
    const savedRegistrations = JSON.parse(localStorage.getItem('wineCampRegistrations') || '[]')
    setRegistrations(savedRegistrations)
  }, [])

  const handleSubscribe = (email) => {
    setSubscribers(prev => [...prev, email])
    setCurrentUserSubscribed(true)
  }

  const handleRegistrationSubmit = (payload) => {
    const existing = JSON.parse(localStorage.getItem('wineCampRegistrations') || '[]')
    const updated = [...existing, payload]
    localStorage.setItem('wineCampRegistrations', JSON.stringify(updated))
    setIsRegOpen(false)
    setRegistrations(updated)
  }

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['hero', 'why-travel', 'journeys', 'included', 'guides']
      const scrollPosition = window.scrollY + 100

      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const { offsetTop, offsetHeight } = element
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Handle click outside to close journey details
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (showJourneyDetails) {
        const journeyCard = document.querySelector('.journey-card')
        if (journeyCard && !journeyCard.contains(event.target)) {
          setShowJourneyDetails(false)
        }
      }
    }

    if (showJourneyDetails) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [showJourneyDetails])

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <div className="app">
      {/* Floating Hamburger Menu */}
      <button 
        className="floating-hamburger-menu"
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        aria-label="Toggle menu"
      >
        <span className={`hamburger-line ${isMobileMenuOpen ? 'active' : ''}`}></span>
        <span className={`hamburger-line ${isMobileMenuOpen ? 'active' : ''}`}></span>
        <span className={`hamburger-line ${isMobileMenuOpen ? 'active' : ''}`}></span>
      </button>
      
      {/* Mobile Menu Overlay */}
      <div className={`mobile-menu-overlay ${isMobileMenuOpen ? 'open' : ''}`}>
        <ul className="mobile-nav-menu">
          <li><a href="#hero" onClick={() => scrollToSection('hero')} className={activeSection === 'hero' ? 'active' : ''}>Home</a></li>
          <li><a href="#why-travel" onClick={() => scrollToSection('why-travel')} className={activeSection === 'why-travel' ? 'active' : ''}>Why Travel</a></li>
          <li><a href="#journeys" onClick={() => scrollToSection('journeys')} className={activeSection === 'journeys' ? 'active' : ''}>Journeys</a></li>
          <li><a href="#included" onClick={() => scrollToSection('included')} className={activeSection === 'included' ? 'active' : ''}>What's Included</a></li>
          <li><a href="#guides" onClick={() => scrollToSection('guides')} className={activeSection === 'guides' ? 'active' : ''}>Guides</a></li>
        </ul>
      </div>

      {/* Hero Section */}
      <section id="hero" className="hero hero-bg-1">
        <div className="hero-overlay">
          <div className="hero-content">
            <h2>Catalunya Natural Revolution</h2>
            <div className="hero-text">
              <p>Journey alongside <strong>vignerons</strong>, cellar masters, and the singular new voices of Spanish winemaking for the deepest exploration of unparalleled terroirs.</p>
              <p>Created with professional rigor and unparalleled access, Spanish Wine Camps moves beyond the classical tourist route, bringing small, intimate groups together to discover Spain through its most <strong>defiant and delicious wines</strong>.</p>
              <p>We don't just visit vineyards; we work the land, taste from barrels deep within the <em>bodegas</em>, and sit at the kitchen tables of the families rewriting the rules of Spanish viticulture, from the granite slopes of Gredos to the salt-laced fog of the Atlantic coast.</p>
              <p className="cta-text">These are intimate, ethical, intense, and unlike any other wine experience of their kind. <strong>Space is limited.</strong></p>
            </div>
            <div className="hero-buttons">
              <button className="cta-button" onClick={() => scrollToSection('journeys')}>
                Discover Our Journeys
              </button>
              <button className="cta-button primary" onClick={() => setIsRegOpen(true)}>
                Sign up for our next Wine Camp
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Why Travel Deeper Section */}
      <section id="why-travel" className="why-travel why-travel-bg-2">
        <div className="section-overlay">
          <div className="container">
            <h2>Why Travel Deeper</h2>
            <p className="section-intro">Every wine has a story. We bring you the hand-picked vineyard and their winemakers, the hidden cellars, and the dramatic landscapes. Our voyages are:</p>
            
            <div className="features-grid">
              <div className="feature">
                <h3>Boutique & Intimate</h3>
                <p>Only small groups, never more than 12 guests.</p>
              </div>
              <div className="feature">
                <h3>Authentic & Immersive</h3>
                <p>From vine to bottle, full access to producers, solo barrel rooms, tastings not open to the general public.</p>
              </div>
              <div className="feature">
                <h3>Story-led Travel</h3>
                <p>Learned guides, regional experts, winemaking families, tasting traditions passed down generations.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Upcoming Journeys Section */}
      <section id="journeys" className="journeys journeys-bg-3">
        <div className="section-overlay">
          <div className="container">
            <h2>Upcoming Journeys</h2>
            
            {!showJourneyDetails ? (
              <div className="journey-preview">
                <h3>The Penedés Rebellion</h3>
                <p className="journey-subtitle">Catalonia's Heartland | <em>The New Guard and the Resurrection of Xarel·lo</em></p>
                <button 
                  className="cta-button" 
                  onClick={() => setShowJourneyDetails(true)}
                >
                  Discover This Journey
                </button>
              </div>
            ) : (
              <div className="journey-card">
            <div className="journey-header">
              <h3>The Penedés Rebellion</h3>
              <p className="journey-subtitle">Catalonia's Heartland | <em>The New Guard and the Resurrection of Xarel·lo</em></p>
              
              {/* Countdown Timer and Available Spots */}
              <div className="camp-status">
                <div className="status-row">
                  <AvailableSpots 
                    current={campData.currentParticipants + registrations.length} 
                    max={campData.maxParticipants} 
                  />
                  <div className="countdown-container">
                    <span className="countdown-label">
                      Time remaining: <span className="live-indicator">●</span>
                    </span>
                    <CountdownTimer targetDate={campData.launchDate} />
                  </div>
                </div>
                
                {/* Subscription Section */}
                <div className="subscription-section">
                  <h4>Sign up for our next Wine Camp</h4>
                  <div className="reg-cta">
                    <button className="primary-button" onClick={() => setIsRegOpen(true)}>Sign up for our next Wine Camp</button>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="journey-content">
              <div className="journey-text">
                <p>This is not the Penedés of industrial giants; this is a journey into the heart of a <strong>Rebellion</strong>. We travel alongside Nuria Renom, a second-generation <em>vigneron</em> who has turned her back on the established norms of Cava and Penedés DOs to embrace ancestral methods and radical minimal intervention.</p>
                
                <p>This weekend is an intimate exploration of the revolutionary shift toward still wines and <em>Mètode Ancestral</em> sparklers, centered entirely on the often-misunderstood <strong>Xarel·lo</strong> grape.</p>
                
                <p>We'll spend two days on the chalky, sun-drenched slopes, learning to read the subtle signals of the Mediterranean-influenced terroir. The access here is absolute: from visiting the region's most interesting producers to a deep-dive tasting session in her subterranean cellar focusing on <strong>skin-contact wines</strong> and the pure, unfiltered essence of her single-parcel cuvées.</p>
                
                <p>Discover the <strong>authenticity and fierce independence</strong> of a generation reclaiming their landscape, one biodynamic vine at a time. It's a taste of the future, delivered with the grit of the past.</p>
              </div>
              
              <div className="journey-details">
                <div className="guide-info">
                  <h4>Local Guide</h4>
                  <p><strong>Nuria Renom</strong><br/>
                  <em>Rebel Vigneron, Natural Wine Architect</em></p>
                </div>
                
                <div className="experience-info">
                  <h4>The Experience</h4>
                  <p>Exclusive tasting of <strong>different Penedès</strong> served alongside with Catalan-Italian fusion cuisine by Partida Creus deep within the vineyard.</p>
                </div>
                
                <div className="itinerary">
                  <h4>Itinerary</h4>
                  <div className="day">
                    <strong>Day 1:</strong> Joan Ribó, Nuria Renom, Amós Bañeras and Partida Creus
                  </div>
                  <div className="day">
                    <strong>Day 2:</strong> Bodegas más de Burbujas tipo Corpinnat y Ancestrales
                  </div>
                  <div className="day">
                    <strong>Day 3:</strong> Clos Lentiscus, Mas Candí, Ton Rimbau, Recaredo and Esteve Gisbert
                  </div>
                </div>
              </div>
            </div>
            
            <div className="journey-map">
              <iframe
                className="map-embed"
                title="Penedès Region Topographic Map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3070.5!2d1.7!3d41.4!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12a4c8b8b8b8b8b8%3A0x12a4c8b8b8b8b8b8!2sPened%C3%A8s%2C%20Catalonia%2C%20Spain!5e0!3m2!1sen!2sus!4v1234567890!5m2!1sen!2sus&t=k"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            </div>
            
            <div className="journey-actions">
              <button 
                className="cta-button secondary" 
                onClick={() => setShowJourneyDetails(false)}
              >
                Back to Overview
              </button>
            </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* What's Included Section */}
      <section id="included" className="included included-bg-4">
        <div className="section-overlay">
          <div className="container">
          <h2>What's Included</h2>
          <div className="included-grid">
            <div className="included-item">
              <h3>Accommodation</h3>
              <p>Hotels (casa rural, etc)</p>
            </div>
            <div className="included-item">
              <h3>All Meals</h3>
              <p>Including dinners paired with local wines (comidas o cenas también en gastronómicos en línea con el perfil de las bodegas)</p>
            </div>
            <div className="included-item">
              <h3>Guided Tours</h3>
              <p>Vineyards, cellars, barrel rooms</p>
            </div>
            <div className="included-item">
              <h3>Private Tastings</h3>
              <p>Masterclasses with local winemakers / sommeliers</p>
            </div>
            <div className="included-item">
              <h3>Transportation</h3>
              <p>During the journey</p>
            </div>
          </div>
        </div>
        </div>
      </section>

      {/* Our Guides & Hosts Section */}
      <section id="guides" className="guides guides-bg-5">
        <div className="section-overlay">
          <div className="container">
          <h2>Our Guides & Hosts</h2>
          <p className="section-intro">Meet the people who make the stories possible.</p>
          
          <div className="guides-grid">
            <div className="guide-category">
              <h3>Local Viticulturists & Winemakers</h3>
              <p>People who live the soil; from Rioja's old vine keepers to innovators in Catalunya.</p>
            </div>
            <div className="guide-category">
              <h3>Sommelier Storytellers</h3>
              <p>Helping you taste, understand, and remember every bottle.</p>
            </div>
            <div className="guide-category">
              <h3>Cultural Anchors</h3>
              <p>Historians, chefs, elder locals who share food, music, lore, and each region's unique identity.</p>
            </div>
          </div>
        </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-section">
              <h3>Spanish Wine Camps</h3>
              <p>Catalunya Natural Revolution</p>
            </div>
            <div className="footer-section">
              <h4>Contact</h4>
              <p>Space is limited. Scroll to learn more.</p>
            </div>
          </div>
          <div className="footer-bottom">
            <p>&copy; 2024 Spanish Wine Camps. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Registration Modal */}
      <RegistrationModal 
        isOpen={isRegOpen}
        onClose={() => setIsRegOpen(false)}
        onSubmit={handleRegistrationSubmit}
      />
    </div>
  )
}

export default App
