import styles from './WhyTravel.module.css'

const WhyTravel = () => {
  return (
    <section id="why-travel" className={`${styles.whyTravel} section`}>
      <div className={styles.sectionOverlay}>
        <div className="section-content">
          <div className={`${styles.differenceContainer} flex flex-col items-center gap-xl`}>
            <h2 className={`${styles.mainTitle} text-white`}>The Difference</h2>
            
            <div className={`${styles.ventureSection} text-center mb-xl`}>
              <h3 className={`${styles.ventureTitle} text-white mb-md`}>Venture into the Vine</h3>
              <p className={`${styles.ventureDescription} text-white max-w-3xl mx-auto`}>
                Every wine has a story. We bring you the hand-picked vineyards and their winemakers, the hidden cellars, and the dramatic landscapes.
              </p>
            </div>

            <div className={`${styles.featuresContainer} max-w-5xl mx-auto`}>
              <div className={`${styles.featuresGrid} grid grid-cols-1 md:grid-cols-3 gap-xl mb-xl`}>
                <div className={`${styles.featureCard} text-center p-lg`}>
                  <h4 className={`${styles.featureTitle} text-white text-lg mb-sm`}>Boutique & Intimate</h4>
                  <p className={`${styles.featureDescription} text-white text-sm`}>
                    Only small groups, never more than 12 guests. Personal connections, not crowds.
                  </p>
                </div>

                <div className={`${styles.featureCard} text-center p-lg`}>
                  <h4 className={`${styles.featureTitle} text-white text-lg mb-sm`}>Authentic & Immersive</h4>
                  <p className={`${styles.featureDescription} text-white text-sm`}>
                    From vine to bottle, full access to producers, solo barrel rooms, tastings not open to the general public.
                  </p>
                </div>

                <div className={`${styles.featureCard} text-center p-lg`}>
                  <h4 className={`${styles.featureTitle} text-white text-lg mb-sm`}>Story-led Travel</h4>
                  <p className={`${styles.featureDescription} text-white text-sm`}>
                    Learned guides, regional experts, winemaking families, tasting traditions passed down generations.
                  </p>
                </div>
              </div>
            </div>

            <div className={`${styles.quoteContainer} max-w-6xl mx-auto text-center mt-2xl pb-4xl`}>
              <div className={`${styles.separatorLine} w-24 h-px bg-white/30 mx-auto mb-xl`}></div>
              <blockquote className={`${styles.quote} text-white text-3xl md:text-5xl leading-relaxed font-light`}>
                "We don't just visit vineyards; we work the land, taste from barrels deep within the bodegas, and sit at the kitchen tables of the families rewriting the rules of Spanish viticulture."
              </blockquote>
              <div className={`${styles.separatorLine} w-24 h-px bg-white/30 mx-auto mt-xl`}></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default WhyTravel

