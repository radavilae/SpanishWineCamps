import { useCallback, useMemo, useState } from 'react'
import TouchGestures from '../ui/TouchGestures'
import useMobileOptimization from '../../hooks/useMobileOptimization'
import CountdownTimer from '../ui/CountdownTimer'
import { useHero, useJourneys } from '../../hooks/useStrapiData'
import styles from './Hero.module.css'

const Hero = ({ onScrollToSection, onOpenRegistration, campData }) => {
  const { isMobile, optimizeScroll } = useMobileOptimization()
  const { hero, loading } = useHero()
  const { journeys } = useJourneys()
  const [showJourneyPreview, setShowJourneyPreview] = useState(false)
  const nextCampLabel = hero?.nextCampLabel || 'Next Wine Camp: Catalunya Revolution'

  const previewJourneys = useMemo(() => {
    if (journeys && journeys.length) {
      return journeys.map(journey => ({
        id: journey.sectionId || journey.id,
        sectionId: journey.sectionId || journey.id,
        title: journey.title,
        image: journey.image
      }))
    }
    return [
      { id: 'catalunya-priorat', sectionId: 'catalunya-priorat', title: 'Catalunya Priorat Revolution II', image: '/images/fotopaginados.jpg' },
      { id: 'catalunya-roussellon', sectionId: 'catalunya-roussellon', title: 'Catalunya/Rousellón Revolution III', image: '/images/fotopaginacuatro.jpeg' },
      { id: 'new-visions-rioja', sectionId: 'new-visions-rioja', title: 'New Visions of la Rioja', image: '/images/fotopaginacinco.jpg' },
      { id: 'bierzo-terroirs', sectionId: 'bierzo-terroirs', title: 'Bierzo, Crossroad of Terroirs', image: '/images/fotopaginaseis.jpg' },
      { id: 'ungrafited-canarias', sectionId: 'ungrafited-canarias', title: 'Ungrafited, Unrivaled Canarias', image: '/images/fotopaginasiete.jpg' }
    ]
  }, [journeys])

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
          {loading ? (
            <p className="text-white text-center">Loading...</p>
          ) : (
            <div className="flex flex-col items-center text-center gap-lg">
              <p className="text-lg">Wine Immersion Journeys</p>
              <h1 className={`${styles.mainTitle} text-white`}>Spanish Wine Camps</h1>
              <div className="flex flex-col gap-md text-white max-w-4xl">
                <p className="text-lg">
                  Journey alongside vignerons, cellar masters, and the singular new voices of Spanish winemaking
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
                  {hero?.secondaryButtonText || 'Explore Journeys'}
                </button>
                <div className={styles.heroPrimaryWrapper}>
                  <span className={styles.heroPrimaryBadge}>{nextCampLabel}</span>
                  <button
                    type="button"
                    className={styles.heroPrimaryButton}
                    onClick={onOpenRegistration}
                  >
                    {hero?.primaryButtonText || 'Sign Up'}
                  </button>
                  {campData?.launchDate && (
                    <div className={styles.heroCountdown}>
                      <CountdownTimer targetDate={campData.launchDate} />
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
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
