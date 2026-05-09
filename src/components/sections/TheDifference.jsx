import { useState, useEffect } from 'react'
import styles from './TheDifference.module.css'

const TheDifference = () => {
  return (
    <section id="the-difference" className={styles.theDifference}>
      <div className="responsive-container">
        <div className={styles.content}>
          <h2 className={styles.sectionTitle}>The Difference</h2>
          <h1 className={styles.title}>Venture into the Vine</h1>
          
          <div className={styles.twoColumnLayout}>
            {/* Columna izquierda - Imagen */}
            <div className={styles.imageColumn}>
              <div className={styles.imageContainer}>
                <img 
                  src="/hero-vineyard.jpg" 
                  alt="Wine Journey Experience" 
                  className={styles.journeyImage}
                />
              </div>
            </div>
            
            {/* Columna derecha - Contenido */}
            <div className={styles.contentColumn}>
              <p className={styles.subtitle}>
                Every wine has a story. We bring you the hand-picked vineyards and their winemakers, the hidden cellars, and the dramatic landscapes.
              </p>
              
              <div className={styles.features}>
                <div className={styles.feature}>
                  <div className={styles.featureNumber}>01</div>
                  <div className={styles.featureContent}>
                    <h3 className={styles.featureTitle}>Boutique & Intimate</h3>
                    <p className={styles.featureDescription}>
                      Only small groups, never more than 12 guests. Personal connections, not crowds.
                    </p>
                  </div>
                </div>
                
                <div className={styles.feature}>
                  <div className={styles.featureNumber}>02</div>
                  <div className={styles.featureContent}>
                    <h3 className={styles.featureTitle}>Authentic & Immersive</h3>
                    <p className={styles.featureDescription}>
                      From vine to bottle, full access to producers, solo barrel rooms, tastings not open to the general public.
                    </p>
                  </div>
                </div>
                
                <div className={styles.feature}>
                  <div className={styles.featureNumber}>03</div>
                  <div className={styles.featureContent}>
                    <h3 className={styles.featureTitle}>Story-led Travel</h3>
                    <p className={styles.featureDescription}>
                      Learned guides, regional experts, winemaking families, tasting traditions passed down generations.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default TheDifference
