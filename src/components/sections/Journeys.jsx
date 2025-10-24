import { useState } from 'react'
import CountdownTimer from '../ui/CountdownTimer'
import AvailableSpots from '../ui/AvailableSpots'
import styles from './Journeys.module.css'

const Journeys = ({ campData, registrations, onOpenRegistration }) => {
  const [showJourneyDetails, setShowJourneyDetails] = useState(false)

  return (
    <section id="journeys" className={`${styles.journeys} ${styles.journeysBg3} section`}>
      <div className={styles.sectionOverlay}>
        <div className="section-content">
          <div className="flex flex-col items-center text-center gap-lg">
            <h2 className="heading-1 text-white">Upcoming Journeys</h2>
            
            {!showJourneyDetails ? (
              <div className="flex flex-col items-center text-center gap-lg max-w-4xl">
                <h3 className="heading-1 text-white">The Penedés Rebellion</h3>
                <p className="text-lg text-gray-300 italic">Catalonia's Heartland | <em>The New Guard and the Resurrection of Xarel·lo</em></p>
                <button 
                  className="btn btn-secondary" 
                  onClick={() => setShowJourneyDetails(true)}
                >
                  Discover This Journey
                </button>
              </div>
          ) : (
            <div className={styles.journeyCard}>
              <div className={styles.journeyHeader}>
                <h3>The Penedés Rebellion</h3>
                <p className={styles.journeySubtitle}>Catalonia's Heartland | <em>The New Guard and the Resurrection of Xarel·lo</em></p>
                
                {/* Countdown Timer and Available Spots */}
                <div className={styles.campStatus}>
                  <div className={styles.statusRow}>
                    <AvailableSpots 
                      current={campData.currentParticipants + registrations.length} 
                      max={campData.maxParticipants} 
                    />
                    <div className={styles.countdownContainer}>
                      <span className={styles.countdownLabel}>
                        Time remaining: <span className={styles.liveIndicator}>●</span>
                      </span>
                      <CountdownTimer targetDate={campData.launchDate} />
                    </div>
                  </div>
                  
                  {/* Registration CTA */}
                  <div className={styles.regCta}>
                    <button className={styles.primaryButton} onClick={onOpenRegistration}>Sign up for our next Wine Camp</button>
                  </div>
                </div>
              </div>
              
              <div className={styles.journeyContent}>
                <div className={styles.journeyText}>
                  <p>This is not the Penedés of industrial giants; this is a journey into the heart of a <strong>Rebellion</strong>. We travel alongside Nuria Renom, a second-generation <em>vigneron</em> who has turned her back on the established norms of Cava and Penedés DOs to embrace ancestral methods and radical minimal intervention.</p>
                  
                  <p>This weekend is an intimate exploration of the revolutionary shift toward still wines and <em>Mètode Ancestral</em> sparklers, centered entirely on the often-misunderstood <strong>Xarel·lo</strong> grape.</p>
                  
                  <p>We'll spend two days on the chalky, sun-drenched slopes, learning to read the subtle signals of the Mediterranean-influenced terroir. The access here is absolute: from visiting the region's most interesting producers to a deep-dive tasting session in her subterranean cellar focusing on <strong>skin-contact wines</strong> and the pure, unfiltered essence of her single-parcel cuvées.</p>
                  
                  <p>Discover the <strong>authenticity and fierce independence</strong> of a generation reclaiming their landscape, one biodynamic vine at a time. It's a taste of the future, delivered with the grit of the past.</p>
                </div>
                
                <div className={styles.journeyDetails}>
                  <div className={styles.guideInfo}>
                    <h4>Local Guide</h4>
                    <p><strong>Nuria Renom</strong><br/>
                    <em>Rebel Vigneron, Natural Wine Architect</em></p>
                  </div>
                  
                  <div className={styles.experienceInfo}>
                    <h4>The Experience</h4>
                    <p>Exclusive tasting of <strong>different Penedès</strong> served alongside with Catalan-Italian fusion cuisine by Partida Creus deep within the vineyard.</p>
                  </div>
                  
                  <div className={styles.itinerary}>
                    <h4>Itinerary</h4>
                    <div className={styles.day}>
                      <strong>Day 1:</strong> Joan Ribó, Nuria Renom, Amós Bañeras and Partida Creus
                    </div>
                    <div className={styles.day}>
                      <strong>Day 2:</strong> Bodegas más de Burbujas tipo Corpinnat y Ancestrales
                    </div>
                    <div className={styles.day}>
                      <strong>Day 3:</strong> Clos Lentiscus, Mas Candí, Ton Rimbau, Recaredo and Esteve Gisbert
                    </div>
                  </div>
                </div>
              </div>
              
              <div className={styles.journeyMap}>
                <iframe
                  className={styles.mapEmbed}
                  title="Penedès Region Topographic Map"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3070.5!2d1.7!3d41.4!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12a4c8b8b8b8b8b8%3A0x12a4c8b8b8b8b8b8!2sPened%C3%A8s%2C%20Catalonia%2C%20Spain!5e0!3m2!1sen!2sus!4v1234567890!5m2!1sen!2sus&t=k"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  allowFullScreen
                />
              </div>
              
              <div className={styles.journeyActions}>
                <button 
                  className={`${styles.ctaButton} ${styles.secondary}`} 
                  onClick={() => setShowJourneyDetails(false)}
                >
                  Back to Overview
                </button>
              </div>
            </div>
          )}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Journeys
