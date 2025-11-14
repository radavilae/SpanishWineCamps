import styles from './Guides.module.css'

const Guides = () => {
  return (
    <section id="guides" className={`${styles.guides} ${styles.guidesBg5} section`}>
      <div className={styles.sectionOverlay}>
        <div className={styles.sectionContent}>
          <h2 className={styles.guidesTitle}>Our Guides & Hosts</h2>
        </div>
      </div>
    </section>
  )
}

export default Guides
