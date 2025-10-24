import styles from './WhyTravel.module.css'

const WhyTravel = () => {
  return (
    <section id="why-travel" className={`${styles.whyTravel} ${styles.whyTravelBg2} section`}>
      <div className={styles.sectionOverlay}>
        <div className="section-content">
          <div className="flex flex-col items-center text-center gap-lg">
            <h2 className="heading-1 text-white">Why Travel Deeper</h2>
            <p className="text-lg text-white max-w-4xl">Every wine has a story. We bring you the hand-picked vineyard and their winemakers, the hidden cellars, and the dramatic landscapes. Our voyages are:</p>
            
            <div className="flex-grid">
              <div className="col-1 col-2 col-3">
                <div className="card text-center">
                  <h3 className="heading-3 text-white">Boutique & Intimate</h3>
                  <p className="text-base text-white">Only small groups, never more than 12 guests.</p>
                </div>
              </div>
              <div className="col-1 col-2 col-3">
                <div className="card text-center">
                  <h3 className="heading-3 text-white">Authentic & Immersive</h3>
                  <p className="text-base text-white">From vine to bottle, full access to producers, solo barrel rooms, tastings not open to the general public.</p>
                </div>
              </div>
              <div className="col-1 col-2 col-3">
                <div className="card text-center">
                  <h3 className="heading-3 text-white">Story-led Travel</h3>
                  <p className="text-base text-white">Learned guides, regional experts, winemaking families, tasting traditions passed down generations.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default WhyTravel
