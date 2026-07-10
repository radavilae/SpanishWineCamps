import { useCallback, useMemo, useState } from 'react'
import TouchGestures from '../ui/TouchGestures'
import useMobileOptimization from '../../hooks/useMobileOptimization'
import CountdownTimer from '../ui/CountdownTimer'
import heroData from '../../data/hero.json'
import journeysData from '../../data/journeys.json'
import styles from './Hero.module.css'

const Hero = ({ onScrollToSection, onOpenRegistration, campData }) => {
  const { isMobile, optimizeScroll } = useMobileOptimization()
  const [showJourneyPreview, setShowJourneyPreview] = useState(false)
  const nextCampLabel = heroData.nextCampLabel

  const previewJourneys = useMemo(() => {
    return journeysData.map(journey => ({
      id: journey.sectionId || journey.id,
      sectionId: journey.sectionId || journey.id,
      title: journey.title,
      image: journey.image
    }))
  }, [])

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
            <p className="text-lg">{heroData.title}</p>
            <h1 className={`${styles.mainTitle} text-white`}>Spanish Wine Camps</h1>
            <div className="flex flex-col gap-md text-white max-w-4xl">
              <p className="text-lg">
                {heroData.subtitle}
              </p>
              <p className="text-lg">
                Created with professional rigor and unparalleled access, Spanish Wine Camps moves beyond the classical tourist route, bringing small, intimate groups together to discover Spain through its most defiant and delicious wines.
              </p>
            </div>
            <div className={`flex flex-col flex-row-tablet gap-md justify-center items-center ${styles.heroButtonsRow}`}>
              <button
                className={`touch-button btn-secondary mobile-p-lg ${styles.heroSecondaryButton}`}
                onClick={() => setShowJourneyPreview(true)}
                type="button"
              >
                {heroData.secondaryButtonText}
              </button>
              <div className={styles.heroPrimaryWrapper}>
                <span className={styles.heroPrimaryBadge}>{nextCampLabel}</span>
                <button
                  type="button"
                  className={styles.heroPrimaryButton}
                  onClick={onOpenRegistration}
                >
                  {heroData.ctaText}
                </button>
                {campData?.launchDate && (
                  <div className={styles.heroCountdown}>
                    <CountdownTimer targetDate={campData.launchDate} />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        </div>
      </section>
      {showJourneyPreview && (
        <div className={styles.journeyPreviewBackdrop} onClick={() => setShowJourneyPreview(false)}>
          <div className={styles.journeyPreviewPanel} onClick={(event) => event.stopPropagation()}>
            <div className={styles.journeyPreviewHeader}>
              <h3 className={styles.journeyPreviewTitle}>Journeys</h3>
              <button
                type="button"
                className={styles.journeyPreviewClose}
                onClick={() => setShowJourneyPreview(false)}
              >
                Close
              </button>
            </div>
            <div className={styles.journeyPreviewScroll} role="list">
              {previewJourneys.map((journey) => (
                <button
                  key={journey.id}
                  type="button"
                  className={styles.journeyPreviewCard}
                  onClick={() => {
                    setShowJourneyPreview(false)
                    onScrollToSection(journey.sectionId || journey.id)
                  }}
                >
                  {journey.image && (
                    <div
                      className={styles.journeyPreviewThumb}
                      style={{ backgroundImage: `url("${journey.image}")` }}
                    >
                      <span className={styles.journeyPreviewCardTitle}>{journey.title}</span>
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </TouchGestures>
  )
}

export default Hero
