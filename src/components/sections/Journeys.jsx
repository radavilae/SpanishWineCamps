import { useMemo, useState } from 'react'
import { useJourneys } from '../../hooks/useStrapiData'
import styles from './Journeys.module.css'

const Journeys = ({ onOpenRegistration }) => {
  const [selectedJourney, setSelectedJourney] = useState(null)
  const [showMap, setShowMap] = useState(false)
  const [activeMapId, setActiveMapId] = useState(null)
  const { journeys: strapiJourneys, loading } = useJourneys()

  // Fallback journeys if Strapi is not available
  const fallbackJourneys = [
    {
      id: 1,
      sectionId: 'catalunya-priorat',
      title: 'Catalunya Revolution',
      image: '/images/fotopaginados.jpg',
      date: 'Join our Wine Camp',
      description: 'Two days on the chalky, sun-drenched Mediterranean slopes, tasting the region\'s most interesting producers.',
      guests: [
        { name: 'Name', image: '/images/foto 2.jpeg' },
        { name: 'Name', image: '/images/foto 3.jpg' },
        { name: 'Name', image: '/images/foto 4.jpg' },
        { name: 'Name', image: '/images/foto 5.jpg' }
      ]
    },
        {
      id: 3,
      sectionId: 'new-visions-rioja',
      title: 'New Visions of la Rioja',
      image: '/images/fotopaginacinco.jpg',
      date: 'Coming Soon',
      description: 'Discover the authenticity and fierce independence of a generation reclaiming their landscape, one biodynamic vine at a time.',
      guests: [
        { name: 'Name', image: '/images/foto 2.jpeg' },
        { name: 'Name', image: '/images/foto 3.jpg' },
        { name: 'Name', image: '/images/foto 4.jpg' },
        { name: 'Name', image: '/images/foto 5.jpg' }
      ]
    },
    {
      id: 4,
      sectionId: 'bierzo-terroirs',
      title: 'Bierzo, Crossroad of Terroirs',
      image: '/images/fotopaginaseis.jpg',
      date: 'Coming Soon',
      description: 'From the granite slopes of Gredos to the salt-laced fog of the Atlantic coast, experience intimate, ethical, and intense wine experiences.',
      guests: [
        { name: 'Name', image: '/images/foto 2.jpeg' },
        { name: 'Name', image: '/images/foto 3.jpg' },
        { name: 'Name', image: '/images/foto 4.jpg' },
        { name: 'Name', image: '/images/foto 5.jpg' }
      ]
    },
    {
      id: 5,
      sectionId: 'ungrafited-canarias',
      title: 'Ungrafited, Unrivaled Canarias',
      image: '/images/fotopaginasiete.jpg',
      date: 'Coming Soon',
      description: 'These are intimate, ethical, intense, and unlike any other wine experience of their kind. Space is limited.',
      guests: [
        { name: 'Name', image: '/images/foto 2.jpeg' },
        { name: 'Name', image: '/images/foto 3.jpg' },
        { name: 'Name', image: '/images/foto 4.jpg' },
        { name: 'Name', image: '/images/foto 5.jpg' }
      ]
    }
  ]

  // Use Strapi journeys if available, otherwise use fallback
  const journeys = loading || !strapiJourneys || strapiJourneys.length === 0 
    ? fallbackJourneys 
    : strapiJourneys.map(journey => ({
        ...journey,
        date: journey.dateText || (journey.date ? new Date(journey.date).toLocaleDateString() : 'Coming Soon'),
        guests: journey.guests || [],
        includedItems: journey.includedItems || [
          { title: 'Accommodation in boutique hotels & casa rurales', description: '' },
          { title: 'All meals paired with local wines', description: '' },
          { title: 'Dinners at gastronomic restaurants aligned with producer profiles', description: '' },
          { title: 'Guided tours of vineyards, cellars & barrel rooms', description: '' },
          { title: 'Private tastings & masterclasses with winemakers', description: '' },
          { title: 'All transportation during the journey', description: '' },
        ],
      }))

  const mapLocations = useMemo(() => (
    journeys.map(journey => ({
      id: journey.sectionId || journey.id,
      title: journey.title,
      query: journey.mapQuery || journey.location || `${journey.title} Spain`,
    }))
  ), [journeys])

  const activeMap = useMemo(() => {
    if (!mapLocations.length) return null
    return mapLocations.find(location => location.id === activeMapId) || mapLocations[0]
  }, [activeMapId, mapLocations])

  const handleJourneyClick = (journey) => {
    setSelectedJourney(journey)
  }

  const handleCloseIncluded = () => {
    setSelectedJourney(null)
  }

  return (
    <>
      {journeys.map((journey) => (
        <section 
          key={journey.id}
          id={journey.sectionId}
          className={`${styles.journeySection} ${!journey.image ? styles.noImage : ''} ${journey.image ? styles.cinematic : ''}`}
          style={journey.image ? { 
            backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.95) 0%, rgba(0, 0, 0, 0.6) 55%, rgba(0, 0, 0, 0.2) 100%), url("${journey.image}")`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            backgroundColor: '#000000',
            backgroundAttachment: 'fixed'
          } : { backgroundColor: '#000000' }}
        >
          <div className={styles.journeyOverlay}>
            <div className={styles.journeyContent}>
              <div className={styles.journeyHeader}>
                <h3 className={styles.journeyTitle}>{journey.title}</h3>
                {journey.date === 'Join our Wine Camp' ? (
                  <button 
                    className={`${styles.journeyDate} ${styles.joinWineCamp} ${styles.joinButton}`}
                    onClick={onOpenRegistration}
                  >
                    {journey.date}
                  </button>
                ) : (
                  <span className={styles.journeyDate}>{journey.date}</span>
                )}
              </div>
              <p className={styles.journeyDescription}>{journey.description}</p>
              <div className={styles.journeyActions}>
                <button 
                  className={styles.itineraryButton}
                  onClick={() => handleJourneyClick(journey)}
                >
                  What's Included
                </button>
                <button
                  className={styles.mapButton}
                  onClick={() => {
                    setActiveMapId(journey.sectionId || journey.id)
                    setShowMap(true)
                  }}
                  type="button"
                >
                  MAP
                </button>
              </div>
            </div>
          </div>
        </section>
      ))}
      <div className={styles.journeysBottomSpacer} aria-hidden="true" />

      {/* What's Included Modal */}
      {selectedJourney && (
        <div className={styles.includedModal} onClick={handleCloseIncluded}>
          <div className={styles.includedModalContent} onClick={(e) => e.stopPropagation()}>
            <button 
              className={styles.closeButton}
              onClick={handleCloseIncluded}
              aria-label="Close"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 6L6 18M6 6l12 12"/>
              </svg>
            </button>
            <h3 className={styles.modalJourneyTitle}>{selectedJourney.title}</h3>
            {selectedJourney.price && (
              <div className={styles.journeyPrice}>
                <span className={styles.priceLabel}>Price:</span>
                <span className={styles.priceValue}>
                  {selectedJourney.price} {selectedJourney.priceCurrency || 'EUR'}
                </span>
              </div>
            )}
            <h4 className={styles.includedTitle}>What's Included</h4>
            <div className={styles.includedItems}>
              {selectedJourney.includedItems && selectedJourney.includedItems.length > 0 ? (
                selectedJourney.includedItems.map((item, index) => (
                  <div key={index} className={styles.includedItem}>
                    <h5>{item.title}</h5>
                    <p>{item.description}</p>
                  </div>
                ))
              ) : (
                <>
                  <div className={styles.includedItem}>
                    <h5>Accommodation in boutique hotels & casa rurales</h5>
                    <p></p>
                  </div>
                  <div className={styles.includedItem}>
                    <h5>All meals paired with local wines</h5>
                    <p></p>
                  </div>
                  <div className={styles.includedItem}>
                    <h5>Dinners at gastronomic restaurants aligned with producer profiles</h5>
                    <p></p>
                  </div>
                  <div className={styles.includedItem}>
                    <h5>Guided tours of vineyards, cellars & barrel rooms</h5>
                    <p></p>
                  </div>
                  <div className={styles.includedItem}>
                    <h5>Private tastings & masterclasses with winemakers</h5>
                    <p></p>
                  </div>
                  <div className={styles.includedItem}>
                    <h5>All transportation during the journey</h5>
                    <p></p>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}
      {showMap && (
        <div className={styles.mapModal} onClick={() => setShowMap(false)}>
          <div className={styles.mapModalContent} onClick={(event) => event.stopPropagation()}>
            <div className={styles.mapHeader}>
              <h3 className={styles.mapTitle}>Camp Locations</h3>
              <button
                type="button"
                className={styles.mapClose}
                onClick={() => setShowMap(false)}
              >
                Close
              </button>
            </div>
            <div className={styles.mapLayout}>
              <div className={styles.mapList}>
                {mapLocations.map(location => (
                  <button
                    key={location.id}
                    type="button"
                    className={`${styles.mapListButton} ${activeMap?.id === location.id ? styles.mapListButtonActive : ''}`}
                    onClick={() => setActiveMapId(location.id)}
                  >
                    {location.title}
                  </button>
                ))}
              </div>
              <div className={styles.mapFrame}>
                {activeMap && (
                  <iframe
                    title={`Map for ${activeMap.title}`}
                    src={`https://www.google.com/maps?q=${encodeURIComponent(activeMap.query)}&output=embed`}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default Journeys
