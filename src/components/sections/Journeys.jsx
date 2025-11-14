import { useState } from 'react'
import styles from './Journeys.module.css'

const Journeys = ({ campData, registrations, onOpenRegistration }) => {
  const [selectedJourney, setSelectedJourney] = useState(null)

  const journeys = [
    {
      id: 1,
      sectionId: 'catalunya-priorat',
      title: 'Catalunya Priorat Revolution II',
      image: '/images/fotopaginados.jpg',
      date: 'Coming Soon',
      description: 'Two days on the chalky, sun-drenched Mediterranean slopes, tasting the region\'s most interesting producers.',
      guests: [
        { name: 'Name', image: '/images/foto 2.jpeg' },
        { name: 'Name', image: '/images/foto 3.jpg' },
        { name: 'Name', image: '/images/foto 4.jpg' },
        { name: 'Name', image: '/images/foto 5.jpg' }
      ]
    },
    {
      id: 2,
      sectionId: 'catalunya-roussellon',
      title: 'Catalunya/Rousellón Revolution III',
      image: '/images/fotopaginacuatro.jpeg',
      date: 'Coming Soon',
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
            backgroundImage: `url("${journey.image}")`,
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
                <span className={styles.journeyDate}>{journey.date}</span>
              </div>
              <p className={styles.journeyDescription}>{journey.description}</p>
              {journey.guests && (
                <div className={styles.guestsSection}>
                  {journey.guests.map((guest, index) => (
                    <div key={index} className={styles.guestCircle}>
                      <div className={styles.guestImage} />
                      <p className={styles.guestName}>{guest.name}</p>
                    </div>
                  ))}
                </div>
              )}
              <div className={styles.journeyActions}>
                <button 
                  className={styles.inquireButton}
                  onClick={onOpenRegistration}
                >
                  Inquire Now
                </button>
                <button 
                  className={styles.itineraryButton}
                  onClick={() => handleJourneyClick(journey)}
                >
                  What's Included
                </button>
              </div>
            </div>
          </div>
        </section>
      ))}

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
            <h4 className={styles.includedTitle}>What's Included</h4>
            <div className={styles.includedItems}>
              <div className={styles.includedItem}>
                <h5>Accommodation</h5>
                <p>Hotels (casa rural, etc)</p>
              </div>
              <div className={styles.includedItem}>
                <h5>All Meals</h5>
                <p>Including dinners paired with local wines</p>
              </div>
              <div className={styles.includedItem}>
                <h5>Guided Tours</h5>
                <p>Vineyards, cellars, barrel rooms</p>
              </div>
              <div className={styles.includedItem}>
                <h5>Private Tastings</h5>
                <p>Masterclasses with local winemakers / sommeliers</p>
              </div>
              <div className={styles.includedItem}>
                <h5>Transportation</h5>
                <p>During the journey</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default Journeys
