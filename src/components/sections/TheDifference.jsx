import styles from './TheDifference.module.css'
import theDifferenceData from '../../data/the-difference.json'

const TheDifference = () => {
  return (
    <section id="the-difference" className={styles.theDifference}>
      <div className="responsive-container">
        <div className={styles.content}>
          <h2 className={styles.sectionTitle}>{theDifferenceData.sectionTitle}</h2>
          <h1 className={styles.title}>{theDifferenceData.mainTitle}</h1>
          
          <div className={styles.twoColumnLayout}>
            {/* Columna izquierda - Imagen */}
            <div className={styles.imageColumn}>
              <div className={styles.imageContainer}>
                <img 
                  src={theDifferenceData.image} 
                  alt="Wine Journey Experience" 
                  className={styles.journeyImage}
                />
              </div>
            </div>
            
            {/* Columna derecha - Contenido */}
            <div className={styles.contentColumn}>
              <p className={styles.subtitle}>
                {theDifferenceData.subtitle}
              </p>
              
              <div className={styles.features}>
                {theDifferenceData.features.map((feature, index) => (
                  <div key={index} className={styles.feature}>
                    <div className={styles.featureNumber}>{String(index + 1).padStart(2, '0')}</div>
                    <div className={styles.featureContent}>
                      <h3 className={styles.featureTitle}>{feature.title}</h3>
                      <p className={styles.featureDescription}>
                        {feature.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default TheDifference
