import partnersData from '../../data/partners.json'
import styles from './Partners.module.css'

const Partners = () => {
  if (!partnersData || partnersData.length === 0) {
    return null
  }

  return (
    <section id="partners" className={styles.partners}>
      <div className="responsive-container">
        <div className="flex flex-col items-center text-center gap-lg">
          <h2 className="heading-2 text-white">Partners</h2>
          <div className={styles.partnersGrid}>
            {partnersData.map((partner) => (
              <div key={partner.id} className={styles.partnerItem}>
                {partner.logo ? (
                  <a
                    href={partner.website || '#'}
                    target={partner.website ? '_blank' : undefined}
                    rel={partner.website ? 'noopener noreferrer' : undefined}
                    className={styles.partnerLink}
                  >
                    <img
                      src={partner.logo}
                      alt={partner.name}
                      className={styles.partnerLogo}
                    />
                  </a>
                ) : (
                  <div className={styles.partnerLogo}>{partner.name}</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Partners
