import { useState } from 'react'
import styles from './TheMakers.module.css'

const TheMakers = () => {
  const [expandedProducers, setExpandedProducers] = useState(new Set())

  const producers = [
    { initials: "R",  name: "Recaredo",       tags: ["Corpinat", "Biodynamic", "10+ Year Aging"] },
    { initials: "NR", name: "Nuria Renom",     tags: ["Natural Wine", "Minimal Intervention", "Cult Producer"] },
    { initials: "JR", name: "Joan Rubió",      tags: ["Orange Wines", "Ancestral Method", "Elegant"] },
    { initials: "PC", name: "Partida Creus",   tags: ["Natural", "International Acclaim", "Wild & Aromatic"] },
    { initials: "CL", name: "Clos Lentiscus",  tags: ["Ancestral Method", "Honey Fermentation", "Coastal"] },
    { initials: "ÁP", name: "Álvaro Palacios", tags: ["Priorat Legend", "L'Ermita", "World-Class"] },
    { initials: "CM", name: "Clos Mogador",    tags: ["Five Clos", "Pilgrimage Site", "Legendary"] },
    { initials: "JA", name: "Joan d'Anguera",  tags: ["7th Generation", "Biodynamic", "Burgundian Style"] },
  ]

  const featured = [
    { name: "Mas Candí",        desc: "reviving extinct grape varieties" },
    { name: "La Salada",        desc: "Toni Carbó's emotional tribute" },
    { name: "Escoda-Sanahuja",  desc: "no sulfites pioneer" },
    { name: "Jordi Llorens",    desc: "high-altitude purity" },
    { name: "Mendall",          desc: "Laureano Serres' poetic wines" },
    { name: "Alfredo Arribas",  desc: "architect-winemaker" },
  ]

  const toggleProducer = (index) => {
    const newExpanded = new Set(expandedProducers)
    if (newExpanded.has(index)) {
      newExpanded.delete(index)
    } else {
      newExpanded.add(index)
    }
    setExpandedProducers(newExpanded)
  }

  return (
    <section id="the-makers" className={styles.theMakers}>
      <div className="responsive-container">
        <div className={styles.content}>
          {/* Cabecera de sección */}
          <div className={styles.sectionHeader}>
            <div className={styles.sectionLabel}>THE MAKERS</div>
            <h2 className={styles.sectionTitle}>
              Our Guides & <span className={styles.italic}>Hosts</span>
            </h2>
            <p className={styles.sectionDescription}>
              Meet the people who make the stories possible. Local viticulturists, sommelier storytellers, and cultural anchors who share food, music, lore, and each region's unique identity.
            </p>
            <div className={styles.divider}></div>
          </div>

          {/* Grid principal de productores */}
          <div className={styles.producersGrid}>
            <div className={styles.gridContainer}>
              {producers.map((producer, index) => (
                <div key={index} className={styles.producerRow}>
                  <div className={styles.producerCell}>
                    <div className={styles.producerContent}>
                      <div className={styles.avatar}>{producer.initials}</div>
                      <div className={styles.producerInfo}>
                        <h3 className={styles.producerName}>{producer.name}</h3>
                        <div className={styles.producerTags}>
                          {producer.tags.map((tag, tagIndex) => (
                            <span key={tagIndex} className={styles.tag}>
                              {tag}
                              {tagIndex < producer.tags.length - 1 && " · "}
                            </span>
                          ))}
                        </div>
                      </div>
                      <button 
                        className={styles.expandButton}
                        onClick={() => toggleProducer(index)}
                      >
                        {expandedProducers.has(index) ? '−' : '+'}
                      </button>
                    </div>
                  </div>
                  
                  {index + 1 < producers.length && (
                    <div className={styles.producerCell}>
                      <div className={styles.producerContent}>
                        <div className={styles.avatar}>{producers[index + 1].initials}</div>
                        <div className={styles.producerInfo}>
                          <h3 className={styles.producerName}>{producers[index + 1].name}</h3>
                          <div className={styles.producerTags}>
                            {producers[index + 1].tags.map((tag, tagIndex) => (
                              <span key={tagIndex} className={styles.tag}>
                                {tag}
                                {tagIndex < producers[index + 1].tags.length - 1 && " · "}
                              </span>
                            ))}
                          </div>
                        </div>
                        <button 
                          className={styles.expandButton}
                          onClick={() => toggleProducer(index + 1)}
                        >
                          {expandedProducers.has(index + 1) ? '−' : '+'}
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Sección "Also Featured" */}
          <div className={styles.featuredSection}>
            <h3 className={styles.featuredTitle}>Also Featured</h3>
            <div className={styles.featuredGrid}>
              {featured.map((item, index) => (
                <div key={index} className={styles.featuredCard}>
                  <h4 className={styles.featuredName}>{item.name}</h4>
                  <p className={styles.featuredDesc}>{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default TheMakers
