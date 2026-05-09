import { useState } from 'react'
import styles from './Regions.module.css'

const Regions = () => {
  const [selectedRegion, setSelectedRegion] = useState('penedes')

  const regions = [
    {
      id: "penedes", 
      label: "Penedès",
      description: "Catalonia's heartland and the birthplace of Cava. Home to revolutionary winemakers championing Xarel·lo and ancestral methods.",
      features: ["Xarel·lo Revival", "Mètode Ancestral", "Biodynamic Vineyards"],
      producers: ["Recaredo", "Joan Rubió", "Nuria Renom", "Mas Candí", "Partida Creus"],
      x: 38, 
      y: 62
    },
    {
      id: "priorat", 
      label: "Priorat",
      description: "Dramatic slate terraces producing powerful, mineral Garnacha and Cariñena from century-old vines.",
      features: ["Llicorella Slate", "Old Vines", "Minimal Intervention"],
      producers: ["Clos Mogador", "Álvaro Palacios", "Terroir al Límit", "Mas Doix", "Clos Erasmus"],
      x: 50, 
      y: 55
    },
    {
      id: "montsant", 
      label: "Montsant",
      description: "A hidden gem encircling Priorat, offering similar terroir at exceptional value with bold, expressive reds.",
      features: ["Value Wines", "Garnacha Blanca", "Natural Winemaking"],
      producers: ["Venus La Universal", "Acústic Celler", "Celler Capçanes", "Joan d'Anguera", "Orto Vins"],
      x: 53, 
      y: 48
    },
    {
      id: "terra-alta", 
      label: "Terra Alta",
      description: "Remote high-altitude plateau producing extraordinary Garnacha Blanca and increasingly celebrated reds.",
      features: ["Garnacha Blanca", "High Altitude", "Indigenous Varieties"],
      producers: ["Herència Altés", "Bàrbara Forés", "Edetària", "Celler Piñol", "Pagos de Híbera"],
      x: 65, 
      y: 50
    },
    {
      id: "conca", 
      label: "Conca de Barberà",
      description: "Cool limestone plateau, birthplace of Pinot Noir in Spain and source of exceptional Trepat rosé.",
      features: ["Trepat Variety", "Limestone Soils", "Cool Climate"],
      producers: ["Gramona", "Jané Ventura", "Carles Andreu", "Celler Mas Foraster", "Concavins"],
      x: 47, 
      y: 38
    }
  ]

  const currentRegion = regions.find(r => r.id === selectedRegion)

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
            {/* Columna izquierda - Mapa interactivo */}
            <div className={styles.mapColumn}>
              <div className={styles.mapContainer}>
                <div className={styles.cataloniaOval}>
                  {regions.map((region) => (
                    <button
                      key={region.id}
                      className={`${styles.mapPoint} ${selectedRegion === region.id ? styles.active : ''}`}
                      style={{ left: `${region.x}%`, top: `${region.y}%` }}
                      onClick={() => setSelectedRegion(region.id)}
                    >
                      <span className={styles.pointLabel}>{region.label}</span>
                    </button>
                  ))}
                  <div className={styles.barcelonaMarker}>
                    <span className={styles.barcelonaLabel}>Barcelona</span>
                  </div>
                  <div className={styles.seaLabel}>Mediterranean Sea</div>
                </div>
                <div className={styles.mapLegend}>
                  <div className={styles.legendItem}>
                    <span className={`${styles.legendDot} ${styles.selected}`}></span>
                    <span>Selected</span>
                  </div>
                  <div className={styles.legendItem}>
                    <span className={`${styles.legendDot} ${styles.region}`}></span>
                    <span>Region</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Columna derecha - Panel de información */}
            <div className={styles.infoColumn}>
              <div className={styles.infoPanel}>
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
