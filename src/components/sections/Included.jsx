import styles from './Included.module.css'

const Included = () => {
  return (
    <section id="included" className={`${styles.included} ${styles.includedBg4} section`}>
      <div className={styles.sectionOverlay}>
        <div className="section-content">
          <div className="flex flex-col items-center text-center gap-lg">
            <h2 className="heading-1 text-white">What's Included</h2>
            <div className="flex-grid">
              <div className="col-1 col-2 col-3">
                <div className="card text-center">
                  <h3 className="heading-3 text-white">Accommodation</h3>
                  <p className="text-base text-gray-300">Hotels (casa rural, etc)</p>
                </div>
              </div>
              <div className="col-1 col-2 col-3">
                <div className="card text-center">
                  <h3 className="heading-3 text-white">All Meals</h3>
                  <p className="text-base text-gray-300">Including dinners paired with local wines (comidas o cenas también en gastronómicos en línea con el perfil de las bodegas)</p>
                </div>
              </div>
              <div className="col-1 col-2 col-3">
                <div className="card text-center">
                  <h3 className="heading-3 text-white">Guided Tours</h3>
                  <p className="text-base text-gray-300">Vineyards, cellars, barrel rooms</p>
                </div>
              </div>
              <div className="col-1 col-2 col-3">
                <div className="card text-center">
                  <h3 className="heading-3 text-white">Private Tastings</h3>
                  <p className="text-base text-gray-300">Masterclasses with local winemakers / sommeliers</p>
                </div>
              </div>
              <div className="col-1 col-2 col-3">
                <div className="card text-center">
                  <h3 className="heading-3 text-white">Transportation</h3>
                  <p className="text-base text-gray-300">During the journey</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Included
