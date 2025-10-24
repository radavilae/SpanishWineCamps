import { useCallback } from 'react'
import TouchGestures from '../ui/TouchGestures'
import useMobileOptimization from '../../hooks/useMobileOptimization'
import styles from './Hero.module.css'

const Hero = ({ onScrollToSection, onOpenRegistration }) => {
  const { isMobile, optimizeScroll } = useMobileOptimization()

  // Gestos táctiles para navegación
  const handleSwipeUp = useCallback(() => {
    if (isMobile) {
      optimizeScroll(document.getElementById('why-travel'))
    }
  }, [isMobile, optimizeScroll])

  const handleSwipeDown = useCallback(() => {
    if (isMobile) {
      optimizeScroll(document.getElementById('journeys'))
    }
  }, [isMobile, optimizeScroll])

  const handleDoubleTap = useCallback(() => {
    if (isMobile) {
      onOpenRegistration()
    }
  }, [isMobile, onOpenRegistration])

  return (
    <TouchGestures
      onSwipeUp={handleSwipeUp}
      onSwipeDown={handleSwipeDown}
      onDoubleTap={handleDoubleTap}
    >
      <section id="hero" className={`${styles.hero} ${styles.heroBg1} section`}>
        <div className={styles.heroOverlay}>
          <div className="section-content">
            <div className="flex flex-col items-center text-center gap-lg">
              <h2 className="heading-1 text-white italic">Catalunya Natural Revolution</h2>
              <div className="flex flex-col gap-md text-white max-w-4xl">
                <p className="text-lg">Journey alongside <strong>vignerons</strong>, cellar masters, and the singular new voices of Spanish winemaking for the deepest exploration of unparalleled terroirs.</p>
                <p className="text-lg">Created with professional rigor and unparalleled access, Spanish Wine Camps moves beyond the classical tourist route, bringing small, intimate groups together to discover Spain through its most <strong>defiant and delicious wines</strong>.</p>
                <p className="text-lg">We don't just visit vineyards; we work the land, taste from barrels deep within the <em>bodegas</em>, and sit at the kitchen tables of the families rewriting the rules of Spanish viticulture, from the granite slopes of Gredos to the salt-laced fog of the Atlantic coast.</p>
                <p className="text-xl font-semibold">These are intimate, ethical, intense, and unlike any other wine experience of their kind. <strong>Space is limited.</strong></p>
              </div>
              <div className="flex flex-col flex-row-tablet gap-md justify-center items-center">
                <button 
                  className="touch-button btn-secondary mobile-p-lg"
                  onClick={() => onScrollToSection('journeys')}
                  type="button"
                >
                  Discover Our Journeys
                </button>
                <button 
                  className="touch-button-large btn-primary mobile-p-lg"
                  onClick={onOpenRegistration}
                  type="button"
                >
                  Sign up for our next Wine Camp
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </TouchGestures>
  )
}

export default Hero
