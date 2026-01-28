import { useGuides } from '../../hooks/useStrapiData'
import styles from './Guides.module.css'

const Guides = () => {
  const { guides, loading } = useGuides()

  return (
    <section id="guides" className={`${styles.guides} ${styles.guidesBg5} section`}>
        <div className={styles.sectionOverlay}>
        <div className={styles.sectionContent}>
          <h2 className={styles.guidesTitle}>The Makers</h2>
          <p className={styles.sectionIntro}>
            Our Guides & Hosts
          </p>
          <p className={styles.sectionIntro}>
            Meet the people who make the stories possible. Local viticulturists, sommelier storytellers, and cultural anchors who share food, music, lore, and each region&apos;s unique identity.
          </p>
          <div className={styles.makersList}>
            <div className={styles.makerCard}>
              <div className={styles.makerImage}>
                <img src="/images/recaredo.jpg" alt="Recaredo" className={styles.guideImage} />
              </div>
              <h3 className={styles.makerName}>Recaredo</h3>
              <p className={styles.makerBio}>
                Widely considered the gold standard of sparkling wine in Spain, producing &quot;Corpinnat&quot; wines that rival the finest Champagnes. Masters of long aging (often over 10 years) with strict biodynamic farming. Every bottle is disgorged by hand.
              </p>
              <p className={styles.makerTags}>Corpinnat · Biodynamic · 10+ Year Aging</p>
            </div>
            <div className={styles.makerCard}>
              <div className={styles.makerImage}>
                <img src="/images/nuria.jpg" alt="Nuria Renom" className={styles.guideImage} />
              </div>
              <h3 className={styles.makerName}>Nuria Renom</h3>
              <p className={styles.makerBio}>
                A rockstar of the Spanish natural wine world. A former sommelier turned nomad winemaker, she produces tiny batches that are as charismatic as she is. Electric, experimental, and alive.
              </p>
              <p className={styles.makerTags}>Natural Wine · Minimal Intervention · Cult Producer</p>
            </div>
            <div className={styles.makerCard}>
              <div className={styles.makerImage}>
                <img src="/images/Joan-Rubió.jpg" alt="Joan Rubió" className={`${styles.guideImage} ${styles.joanRubioImage}`} />
              </div>
              <h3 className={styles.makerName}>Joan Rubió</h3>
              <p className={styles.makerBio}>
                Often called a &quot;whisperer of the vines.&quot; Former technical director at Recaredo, his wines are masterclasses in structure and elegance. Working with skin contact and ancestral methods.
              </p>
              <p className={styles.makerTags}>Orange Wines · Ancestral Method · Elegant</p>
            </div>
            <div className={styles.makerCard}>
              <div className={styles.makerImage}>
                <img src="/images/Partida-Creus.jpg" alt="Partida Creus" className={styles.guideImage} />
              </div>
              <h3 className={styles.makerName}>Partida Creus</h3>
              <p className={styles.makerBio}>
                Antonella and Massimo are legends who turned an old warehouse in Bonastre into a temple of natural wine. Their distinctive &quot;PC&quot; labels are found in the world&apos;s best wine bars from Tokyo to NYC.
              </p>
              <p className={styles.makerTags}>Natural · International Acclaim · Wild &amp; Aromatic</p>
            </div>
            <div className={styles.makerCard}>
              <div className={styles.makerImage}>
                <img src="/images/closlentiscus.png" alt="Clos Lentiscus" className={styles.guideImage} />
              </div>
              <h3 className={styles.makerName}>Clos Lentiscus</h3>
              <p className={styles.makerBio}>
                Manel Aviñó, the &quot;Bubbleman,&quot; crafts some of the most soulful sparkling wines in the world. Using ancestral method and honey from his own bees, his wines are a direct link to the sea.
              </p>
              <p className={styles.makerTags}>Ancestral Method · Honey Fermentation · Coastal</p>
            </div>
            <div className={styles.makerCard}>
              <div className={styles.makerImage}>
                <img src="/images/alvaro-palacios.jpg" alt="Álvaro Palacios" className={styles.guideImage} />
              </div>
              <h3 className={styles.makerName}>Álvaro Palacios</h3>
              <p className={styles.makerBio}>
                The undisputed titan of Priorat. His bottles, from the accessible Camins to the legendary L&apos;Ermita, balance power with Mediterranean elegance. History, prestige, and world-class craftsmanship.
              </p>
              <p className={styles.makerTags}>Priorat Legend · L&apos;Ermita · World-Class</p>
            </div>
            <div className={styles.makerCard}>
              <div className={styles.makerImage}>
                <img src="/images/closmorgador.jpg" alt="Clos Mogador" className={styles.guideImage} />
              </div>
              <h3 className={styles.makerName}>Clos Mogador</h3>
              <p className={styles.makerBio}>
                René Barbier was crafting wines known as one of the &quot;Five Clos&quot; that put Priorat on the world map. This is a pilgrimage site for wine lovers—profound, world-class wines of incredible depth.
              </p>
              <p className={styles.makerTags}>Five Clos · Pilgrimage Site · Legendary</p>
            </div>
            <div className={styles.makerCard}>
              <div className={styles.makerImage}>
                <img src="/images/joandanguera.png" alt="Joan d'Anguera" className={styles.guideImage} />
              </div>
              <h3 className={styles.makerName}>Joan d&apos;Anguera</h3>
              <p className={styles.makerBio}>
                This seventh-generation family estate has transformed Montsant by championing delicate, biodynamic Garnatxa that feels more like fine Burgundy than heavy Spanish red.
              </p>
              <p className={styles.makerTags}>7th Generation · Biodynamic · Burgundian Style</p>
            </div>
          </div>
          {loading ? (
            <p className="text-white text-center">Loading...</p>
          ) : guides && guides.length > 0 ? (
            <div className={styles.guidesGrid}>
              {guides.map((guide) => (
                <div key={guide.id} className={styles.guideCard}>
                  {guide.image && (
                    <img
                      src={guide.image}
                      alt={guide.name}
                      className={styles.guideImage}
                    />
                  )}
                  <h3 className={styles.guideName}>{guide.name}</h3>
                  {guide.title && (
                    <p className={styles.guideTitle}>{guide.title}</p>
                  )}
                  {guide.bio && (
                    <p className={styles.guideBio}>{guide.bio}</p>
                  )}
                </div>
              ))}
            </div>
          ) : null}
        </div>
      </div>
    </section>
  )
}

export default Guides
