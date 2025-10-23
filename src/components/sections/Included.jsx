import styles from './Included.module.css'

const Included = () => {
  return (
    <section id="included" className={`${styles.included} ${styles.includedBg4} min-h-screen flex items-center relative bg-cover bg-center bg-no-repeat`}>
      <div className={styles.sectionOverlay}>
        <div className={`${styles.container} max-w-6xl mx-auto px-8 relative z-10 w-full`}>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-light text-center mb-8 mt-8 tracking-wider text-white">What's Included</h2>
          <div className={`${styles.includedGrid} grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12`}>
            <div className={`${styles.includedItem} text-center p-8 border border-gray-600 bg-white/5 transition-all duration-300 hover:-translate-y-1`}>
              <h3 className="text-xl font-normal mb-4 text-white">Accommodation</h3>
              <p className="text-gray-300 leading-relaxed">Hotels (casa rural, etc)</p>
            </div>
            <div className={`${styles.includedItem} text-center p-8 border border-gray-600 bg-white/5 transition-all duration-300 hover:-translate-y-1`}>
              <h3 className="text-xl font-normal mb-4 text-white">All Meals</h3>
              <p className="text-gray-300 leading-relaxed">Including dinners paired with local wines (comidas o cenas también en gastronómicos en línea con el perfil de las bodegas)</p>
            </div>
            <div className={`${styles.includedItem} text-center p-8 border border-gray-600 bg-white/5 transition-all duration-300 hover:-translate-y-1`}>
              <h3 className="text-xl font-normal mb-4 text-white">Guided Tours</h3>
              <p className="text-gray-300 leading-relaxed">Vineyards, cellars, barrel rooms</p>
            </div>
            <div className={`${styles.includedItem} text-center p-8 border border-gray-600 bg-white/5 transition-all duration-300 hover:-translate-y-1`}>
              <h3 className="text-xl font-normal mb-4 text-white">Private Tastings</h3>
              <p className="text-gray-300 leading-relaxed">Masterclasses with local winemakers / sommeliers</p>
            </div>
            <div className={`${styles.includedItem} text-center p-8 border border-gray-600 bg-white/5 transition-all duration-300 hover:-translate-y-1`}>
              <h3 className="text-xl font-normal mb-4 text-white">Transportation</h3>
              <p className="text-gray-300 leading-relaxed">During the journey</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Included
