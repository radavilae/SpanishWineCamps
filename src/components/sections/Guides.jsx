import { useGuides } from '../../hooks/useStrapiData'
import styles from './Guides.module.css'

const Guides = () => {
  const { guides, loading } = useGuides()

  return (
    <section id="guides" className={`${styles.guides} ${styles.guidesBg5} section`}>
      <div className={styles.sectionOverlay}>
        <div className={styles.sectionContent}>
          <h2 className={styles.guidesTitle}>Our Guides & Hosts</h2>
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
