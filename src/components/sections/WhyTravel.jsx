import styles from './WhyTravel.module.css'

const WhyTravel = () => {
  return (
    <section id="why-travel" className={`${styles.whyTravel} section`}>
      <div className={styles.sectionOverlay}>
        <div className="section-content">
          <div className="flex flex-col items-center text-center gap-lg">
            <h2 className="heading-1 text-white">Why Travel Deeper</h2>
            <p className="text-lg text-white max-w-4xl">This is the definitive insider's journey into the country´s wine regions, built on years of professional connections and rigorous planning. We move intimate groups past the classical route, taking you directly into the cellars to meet the pioneering vignerons reshaping the map.</p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default WhyTravel
