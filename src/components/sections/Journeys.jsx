import styles from './Journeys.module.css'
import { useState } from 'react'

const Journeys = () => {
  const [selectedDay, setSelectedDay] = useState(null)

  const dayDetails = {
    1: {
      title: "Sparkling Paradise",
      location: "Day 1 · Penedès",
      overnight: "Night in Vilafranca",
      region: "Penedès",
      visits: "4 experiences",
      experiences: [
        "Recaredo + Celler Credo",
        "Mambo Taberna",
        "Joan Rubió + Nuria Renom",
        "Cena Guapa"
      ]
    },
    2: {
      title: "Natural Penedès",
      location: "Day 2 · Penedès",
      overnight: "Night in Vilafranca",
      region: "Penedès",
      visits: "3 experiences",
      experiences: [
        "Celler Pardas",
        "Julià Heritage",
        "Dinner at Can Boneta"
      ]
    },
    3: {
      title: "Conca de Barberà",
      location: "Day 3 · Conca de Barberà",
      overnight: "Night in Montblanc",
      region: "Conca de Barberà",
      visits: "4 experiences",
      experiences: [
        "Cava Origen",
        "Mas Foraster",
        "Celler del Masroig",
        "Winery Lunch"
      ]
    },
    4: {
      title: "Priorat",
      location: "Day 4 · Priorat",
      overnight: "Night in Falset",
      region: "Priorat",
      visits: "3 experiences",
      experiences: [
        "Clos Mogador",
        "Sangre de Terra",
        "Priorat Dinner"
      ]
    },
    5: {
      title: "Priorat",
      location: "Day 5 · Priorat",
      overnight: "Departure",
      region: "Priorat",
      visits: "2 experiences",
      experiences: [
        "Scala Dei",
        "Farewell Lunch"
      ]
    }
  }

  const openDayModal = (dayNumber) => {
    setSelectedDay(dayDetails[dayNumber])
  }

  const closeModal = () => {
    setSelectedDay(null)
  }

  return (
    <section id="journeys" className={styles.journeys}>
      <div className="responsive-container">
        <div className={styles.content}>
          <div className={styles.header}>
            <h1 className={styles.sectionTitle}>Journeys</h1>
            <p className={styles.sectionSubtitle}>Discover Our Wine Tours</p>
          </div>

          <div className={styles.journeysGrid}>
            {/* Featured Journey */}
            <div className={styles.featuredJourney}>
              <div className={styles.journeyCard}>
                <div className={styles.cardImage}>
                  <img 
                    src="/src/assets/images/hero-vineyard.jpg" 
                    alt="Catalunya Wine Journey" 
                  />
                  <div className={styles.featuredBadge}>FEATURED</div>
                </div>
                <div className={styles.cardContent}>
                  <h3 className={styles.journeyTitle}>Catalunya Revolution</h3>
                  <p className={styles.journeyRegion}>Catalonia's Heartland</p>
                  <p className={styles.journeyDuration}>5 Days</p>
                  <p className={styles.journeyDescription}>
                    Embark on an exclusive journey through the rugged landscapes of Catalonia, where tradition meets the avant-garde. From the prestigious "Corpinnat" sparkling houses of Penedès to the ancient slate terraces of Priorat, this 5-day tour offers a deep dive into the world's most exciting wine frontier.
                  </p>
                  
                  <div className={styles.itinerarySection}>
                    <h4 className={styles.itineraryTitle}>The Itinerary</h4>
                    <p className={styles.itinerarySubtitle}>Five days of discovery through Catalonia's most exciting wine territories</p>
                    
                    <div className={styles.dayButtons}>
                      <button className={styles.dayButton} onClick={() => openDayModal(1)}>
                        <span className={styles.dayNumber}>Day 1</span>
                        <span className={styles.dayTitle}>Sparkling Paradise</span>
                      </button>
                      <button className={styles.dayButton} onClick={() => openDayModal(2)}>
                        <span className={styles.dayNumber}>Day 2</span>
                        <span className={styles.dayTitle}>Natural Penedès</span>
                      </button>
                      <button className={styles.dayButton} onClick={() => openDayModal(3)}>
                        <span className={styles.dayNumber}>Day 3</span>
                        <span className={styles.dayTitle}>Conca de Barberà</span>
                      </button>
                      <button className={styles.dayButton} onClick={() => openDayModal(4)}>
                        <span className={styles.dayNumber}>Day 4</span>
                        <span className={styles.dayTitle}>Priorat</span>
                      </button>
                      <button className={styles.dayButton} onClick={() => openDayModal(5)}>
                        <span className={styles.dayNumber}>Day 5</span>
                        <span className={styles.dayTitle}>Priorat</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Additional Journeys */}
            <div className={styles.additionalJourneys}>
              {/* Future journeys can be added here */}
            </div>
          </div>
        </div>
      </div>

      {/* Day Details Modal */}
      {selectedDay && (
        <div className={styles.modalOverlay} onClick={closeModal}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <button className={styles.closeButton} onClick={closeModal}>×</button>
            
            <div className={styles.modalHeader}>
              <h2 className={styles.modalTitle}>{selectedDay.title}</h2>
              <p className={styles.modalLocation}>{selectedDay.location}</p>
            </div>

            <div className={styles.modalBody}>
              <div className={styles.modalSection}>
                <h3 className={styles.modalSectionTitle}>Experiences & Visits</h3>
                <div className={styles.experienceList}>
                  {selectedDay.experiences.map((experience, index) => (
                    <div key={index} className={styles.experienceItem}>
                      <span className={styles.experienceNumber}>{index + 1}</span>
                      <span className={styles.experienceName}>{experience}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className={styles.modalInfo}>
                <div className={styles.infoItem}>
                  <span className={styles.infoIcon}>•</span>
                  <div>
                    <p className={styles.infoLabel}>Overnight</p>
                    <p className={styles.infoValue}>{selectedDay.overnight}</p>
                  </div>
                </div>

                <div className={styles.infoItem}>
                  <span className={styles.infoIcon}>•</span>
                  <div>
                    <p className={styles.infoLabel}>Region</p>
                    <p className={styles.infoValue}>{selectedDay.region}</p>
                  </div>
                </div>

                <div className={styles.infoItem}>
                  <span className={styles.infoIcon}>•</span>
                  <div>
                    <p className={styles.infoLabel}>Visits</p>
                    <p className={styles.infoValue}>{selectedDay.visits}</p>
                  </div>
                </div>
              </div>

              <div className={styles.modalSection}>
                <h3 className={styles.modalSectionTitle}>What's Included</h3>
                <p className={styles.modalSectionSubtitle}>Everything you need for an unforgettable journey</p>
                
                <div className={styles.includedList}>
                  <div className={styles.includedItem}>
                    <span className={styles.includedIcon}>•</span>
                    <span className={styles.includedText}>Accommodation in boutique hotels & casa rurales</span>
                  </div>
                  <div className={styles.includedItem}>
                    <span className={styles.includedIcon}>•</span>
                    <span className={styles.includedText}>All meals paired with local wines</span>
                  </div>
                  <div className={styles.includedItem}>
                    <span className={styles.includedIcon}>•</span>
                    <span className={styles.includedText}>Dinners at gastronomic restaurants aligned with producer profiles</span>
                  </div>
                  <div className={styles.includedItem}>
                    <span className={styles.includedIcon}>•</span>
                    <span className={styles.includedText}>Guided tours of vineyards, cellars & barrel rooms</span>
                  </div>
                  <div className={styles.includedItem}>
                    <span className={styles.includedIcon}>•</span>
                    <span className={styles.includedText}>Private tastings & masterclasses with winemakers</span>
                  </div>
                  <div className={styles.includedItem}>
                    <span className={styles.includedIcon}>•</span>
                    <span className={styles.includedText}>All transportation during the journey</span>
                  </div>
                </div>
              </div>
            </div>

            <div className={styles.modalFooter}>
              <button className={styles.navButton} onClick={closeModal}>←</button>
              <span className={styles.pagination}>1 / 5</span>
              <button className={styles.navButton}>→</button>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}

export default Journeys
