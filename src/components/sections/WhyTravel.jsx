import styles from './WhyTravel.module.css'

const WhyTravel = () => {
  return (
    <section id="why-travel" className={`${styles.whyTravel} ${styles.whyTravelBg2} min-h-screen flex items-start relative bg-cover bg-center bg-no-repeat`}>
      <div className={styles.sectionOverlay}>
        <div className={`${styles.container} max-w-6xl mx-auto px-8 relative z-10 w-full`}>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-light text-center mb-8 mt-8 tracking-wider text-white">Why Travel Deeper</h2>
          <p className={`${styles.sectionIntro} text-center text-xl text-white mb-12 max-w-4xl mx-auto`}>Every wine has a story. We bring you the hand-picked vineyard and their winemakers, the hidden cellars, and the dramatic landscapes. Our voyages are:</p>
          
          <div className={`${styles.featuresGrid} grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8`}>
            <div className={`${styles.feature} text-center p-8 border border-white/50 bg-transparent transition-all duration-300 hover:-translate-y-2 hover:border-white/80 hover:bg-black/20`}>
              <h3 className="text-2xl font-normal mb-4 text-white">Boutique & Intimate</h3>
              <p className="text-white leading-relaxed">Only small groups, never more than 12 guests.</p>
            </div>
            <div className={`${styles.feature} text-center p-8 border border-white/50 bg-transparent transition-all duration-300 hover:-translate-y-2 hover:border-white/80 hover:bg-black/20`}>
              <h3 className="text-2xl font-normal mb-4 text-white">Authentic & Immersive</h3>
              <p className="text-white leading-relaxed">From vine to bottle, full access to producers, solo barrel rooms, tastings not open to the general public.</p>
            </div>
            <div className={`${styles.feature} text-center p-8 border border-white/50 bg-transparent transition-all duration-300 hover:-translate-y-2 hover:border-white/80 hover:bg-black/20`}>
              <h3 className="text-2xl font-normal mb-4 text-white">Story-led Travel</h3>
              <p className="text-white leading-relaxed">Learned guides, regional experts, winemaking families, tasting traditions passed down generations.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default WhyTravel
