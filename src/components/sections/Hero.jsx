import styles from './Hero.module.css'

const Hero = ({ onScrollToSection, onOpenRegistration }) => {
  return (
    <section id="hero" className={`${styles.hero} ${styles.heroBg1} min-h-screen flex items-center`}>
      <div className={styles.heroOverlay}>
        <div className={`${styles.heroContent} max-w-6xl mx-auto flex flex-col items-center text-center relative z-10 w-full px-8`}>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-light text-white mb-8 italic">Catalunya Natural Revolution</h2>
          <div className={styles.heroText}>
            <p>Journey alongside <strong>vignerons</strong>, cellar masters, and the singular new voices of Spanish winemaking for the deepest exploration of unparalleled terroirs.</p>
            <p>Created with professional rigor and unparalleled access, Spanish Wine Camps moves beyond the classical tourist route, bringing small, intimate groups together to discover Spain through its most <strong>defiant and delicious wines</strong>.</p>
            <p>We don't just visit vineyards; we work the land, taste from barrels deep within the <em>bodegas</em>, and sit at the kitchen tables of the families rewriting the rules of Spanish viticulture, from the granite slopes of Gredos to the salt-laced fog of the Atlantic coast.</p>
            <p className={styles.ctaText}>These are intimate, ethical, intense, and unlike any other wine experience of their kind. <strong>Space is limited.</strong></p>
          </div>
          <div className={`${styles.heroButtons} flex gap-4 mt-8 flex-wrap justify-center`}>
            <button className={`${styles.ctaButton} bg-transparent border-2 border-white text-white px-8 py-4 text-base font-light tracking-wider cursor-pointer transition-all duration-300 uppercase hover:bg-white hover:text-black`} onClick={() => onScrollToSection('journeys')}>
              Discover Our Journeys
            </button>
            <button className={`${styles.ctaButton} ${styles.primary} bg-white text-black border-white px-8 py-4 text-base font-light tracking-wider cursor-pointer transition-all duration-300 uppercase hover:bg-gray-100 ml-4`} onClick={onOpenRegistration}>
              Sign up for our next Wine Camp
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
