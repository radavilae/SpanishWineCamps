import styles from './Guides.module.css'

const Guides = () => {
  return (
    <section id="guides" className={`${styles.guides} ${styles.guidesBg5} section`}>
      <div className={styles.sectionOverlay}>
        <div className="section-content">
          <div className="flex flex-col items-center text-center gap-lg">
            <h2 className="heading-1 text-white">Our Guides & Hosts</h2>
            <p className="text-lg text-white max-w-4xl">Meet the people who make the stories possible.</p>
            
            <div className="flex-grid">
              <div className="col-1 col-2 col-3">
                <div className="card text-center">
                  <h3 className="heading-3 text-white">Local Viticulturists & Winemakers</h3>
                  <p className="text-base text-gray-300">People who live the soil; from Rioja's old vine keepers to innovators in Catalunya.</p>
                </div>
              </div>
              <div className="col-1 col-2 col-3">
                <div className="card text-center">
                  <h3 className="heading-3 text-white">Sommelier Storytellers</h3>
                  <p className="text-base text-gray-300">Helping you taste, understand, and remember every bottle.</p>
                </div>
              </div>
              <div className="col-1 col-2 col-3">
                <div className="card text-center">
                  <h3 className="heading-3 text-white">Cultural Anchors</h3>
                  <p className="text-base text-gray-300">Historians, chefs, elder locals who share food, music, lore, and each region's unique identity.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Guides
