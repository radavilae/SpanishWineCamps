import { useState } from 'react'
import styles from './Regions.module.css'
import regionsData from '../../data/regions.json'
import CataloniaMap from './CataloniaMap'

const Regions = () => {
  const [selectedRegion, setSelectedRegion] = useState('penedes')
  const regions = regionsData
  const currentRegion = regions.find(r => r.id === selectedRegion) || regions[0]

  return (
    <section id="regions" className={styles.regions}>
      <div className="responsive-container">
        <div className={styles.content}>
          <h2 className={styles.sectionTitle}>Regions</h2>
          <h1 className={styles.title}>Our Territory</h1>
          <p className={styles.subtitle}>
            Explore the Regions
            <br />
            From the sparkling heartland of Penedès to the dramatic slate slopes of Priorat
          </p>
          
          <div className={styles.mainBlock}>
            <div className={styles.mapColumn}>
              <CataloniaMap
                regions={regions}
                selectedRegion={selectedRegion}
                onSelectRegion={setSelectedRegion}
              />
            </div>
            
            {/* Columna derecha - Panel de información */}
            <div className={styles.infoColumn}>
              <div className={styles.infoPanel} key={selectedRegion}>
                <div className={styles.panelLabel}>WINE REGION</div>
                <h2 className={styles.regionTitle}>{currentRegion.label}</h2>
                
                <div className={styles.divider}></div>
                
                <div className={styles.descriptionBlock}>
                  <p>{currentRegion.description}</p>
                </div>
                
                <div className={styles.divider}></div>
                
                <div className={styles.featuresSection}>
                  <div className={styles.sectionLabel}>DEFINING FEATURES</div>
                  <div className={styles.featuresList}>
                    {currentRegion.features.map((feature, index) => (
                      <span key={index} className={styles.featureTag}>
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className={styles.divider}></div>
                
                <div className={styles.producersSection}>
                  <div className={styles.sectionLabel}>PRODUCERS WE VISIT</div>
                  <div className={styles.producersList}>
                    {currentRegion.producers.map((producer, index) => (
                      <div key={index} className={styles.producerItem}>
                        <span className={styles.producerNumber}>{index + 1}</span>
                        <span className={styles.producerName}>{producer}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Barra de pestañas */}
          <div className={styles.tabsBar}>
            {regions.map((region) => (
              <button
                key={region.id}
                className={`${styles.tabButton} ${selectedRegion === region.id ? styles.active : ''}`}
                onClick={() => setSelectedRegion(region.id)}
              >
                {region.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Regions
