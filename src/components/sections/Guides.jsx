import styles from './Guides.module.css'

const Guides = () => {
  return (
    <section id="guides" className={`${styles.guides} ${styles.guidesBg5} min-h-screen flex items-center relative bg-cover bg-center bg-no-repeat`}>
      <div className={styles.sectionOverlay}>
        <div className={`${styles.container} max-w-6xl mx-auto px-8 relative z-10 w-full`}>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-light text-center mb-8 mt-8 tracking-wider text-white">Our Guides & Hosts</h2>
          <p className={`${styles.sectionIntro} text-center text-xl text-white mb-12 max-w-4xl mx-auto`}>Meet the people who make the stories possible.</p>
          
          <div className={`${styles.guidesGrid} grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12`}>
            <div className={`${styles.guideCategory} text-center p-8 border border-gray-600 bg-white/5 transition-all duration-300 hover:-translate-y-2`}>
              <h3 className="text-2xl font-normal mb-4 text-white">Local Viticulturists & Winemakers</h3>
              <p className="text-gray-300 leading-relaxed">People who live the soil; from Rioja's old vine keepers to innovators in Catalunya.</p>
            </div>
            <div className={`${styles.guideCategory} text-center p-8 border border-gray-600 bg-white/5 transition-all duration-300 hover:-translate-y-2`}>
              <h3 className="text-2xl font-normal mb-4 text-white">Sommelier Storytellers</h3>
              <p className="text-gray-300 leading-relaxed">Helping you taste, understand, and remember every bottle.</p>
            </div>
            <div className={`${styles.guideCategory} text-center p-8 border border-gray-600 bg-white/5 transition-all duration-300 hover:-translate-y-2`}>
              <h3 className="text-2xl font-normal mb-4 text-white">Cultural Anchors</h3>
              <p className="text-gray-300 leading-relaxed">Historians, chefs, elder locals who share food, music, lore, and each region's unique identity.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Guides
