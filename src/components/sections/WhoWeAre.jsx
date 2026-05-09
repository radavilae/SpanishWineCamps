import styles from './WhoWeAre.module.css'

const WhoWeAre = () => {
  const founders = [
    {
      name: 'Victor Costas',
      initials: 'VC',
      role: 'Co-Founder & Wine Educator',
      background: 'Rioja Wine Academy Educator & Professional Sommelier',
      expertise: 'Deep knowledge of Spanish viticulture and wine science',
      specialties: ['Wine Education', 'Sommelier Expertise', 'Viticulture Science']
    },
    {
      name: 'Atair Barros',
      initials: 'AB',
      role: 'Co-Founder & Experience Curator',
      background: 'High-end hospitality specialist',
      expertise: 'Finding hidden gems and exclusive wine experiences',
      specialties: ['Hospitality', 'Exclusive Experiences', 'Hidden Gems Discovery']
    }
  ]

  const story = {
    title: 'Our Story',
    content: 'Born from a passion for authentic Spanish wine culture, Spanish Wine Camps bridges the gap between curious wine lovers and the dedicated artisans who craft Spain\'s most remarkable wines. We believe that the best way to understand wine is through the people who make it, the places where it grows, and the stories that give it meaning.'
  }

  return (
    <section id="who-we-are" className={styles.whoWeAre}>
      <div className="responsive-container">
        <div className={styles.content}>
          {/* Cabecera de sección */}
          <div className={styles.sectionHeader}>
            <div className={styles.sectionLabel}>WHO WE ARE</div>
            <h2 className={styles.sectionTitle}>
              The <span className={styles.italic}>Passionate</span> Team
            </h2>
            <p className={styles.sectionDescription}>
              Meet the founders and visionaries behind Spanish Wine Camps, dedicated to bringing you authentic wine experiences through deep connections with Spain's most remarkable wine regions and producers.
            </p>
            <div className={styles.divider}></div>
          </div>

          {/* Our Story */}
          <div className={styles.storySection}>
            <div className={styles.storyContent}>
              <h3 className={styles.storyTitle}>{story.title}</h3>
              <p className={styles.storyText}>{story.content}</p>
            </div>
          </div>

          {/* Founders Grid */}
          <div className={styles.foundersSection}>
            <h3 className={styles.foundersTitle}>Our Founders</h3>
            <div className={styles.foundersGrid}>
              {founders.map((founder, index) => (
                <div key={index} className={styles.founderCard}>
                  <div className={styles.founderHeader}>
                    <div className={styles.founderAvatar}>{founder.initials}</div>
                    <div className={styles.founderInfo}>
                      <h4 className={styles.founderName}>{founder.name}</h4>
                      <span className={styles.founderRole}>{founder.role}</span>
                    </div>
                  </div>
                  <div className={styles.founderContent}>
                    <p className={styles.founderBackground}>{founder.background}</p>
                    <p className={styles.founderExpertise}>
                      <strong>Expertise:</strong> {founder.expertise}
                    </p>
                    <div className={styles.founderSpecialties}>
                      {founder.specialties.map((specialty, idx) => (
                        <span key={idx} className={styles.specialtyTag}>
                          {specialty}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Contact Section */}
          <div className={styles.contactSection}>
            <div className={styles.contactContent}>
              <h3 className={styles.contactTitle}>Join Our Journey</h3>
              <p className={styles.contactText}>
                Ready to discover authentic Spain through its wines? Connect with us to learn about upcoming wine camps and exclusive experiences.
              </p>
              <div className={styles.contactInfo}>
                <div className={styles.contactItem}>
                  <span className={styles.contactLabel}>Email</span>
                  <span className={styles.contactValue}>info@spanishwinecamps.com</span>
                </div>
                <div className={styles.contactItem}>
                  <span className={styles.contactLabel}>Follow</span>
                  <span className={styles.contactValue}>@spanishwinecamps</span>
                </div>
              </div>
              <button className={styles.contactButton}>Get in Touch</button>
            </div>
          </div>

          {/* Exclusivity Section */}
          <div className={styles.exclusivitySection}>
            <div className={styles.exclusivityContent}>
              <div className={styles.exclusivityBadge}>
                <span className={styles.badgeText}>Limited to 12 Guests</span>
              </div>
              <h3 className={styles.exclusivityTitle}>Ready to Journey Deeper?</h3>
              <p className={styles.exclusivityDescription}>
                These are intimate, ethical, intense experiences unlike any other. Space is limited—never more than 12 guests per journey.
              </p>
              <button className={styles.inquireButton}>Inquire About Availability</button>
            </div>
          </div>

          {/* Footer */}
          <footer className={styles.footer}>
            <div className={styles.footerContent}>
              <div className={styles.footerBrand}>
                <span className={styles.footerName}>Spanish Wine Camp</span>
                <span className={styles.footerTagline}>Journeys</span>
              </div>
              <nav className={styles.footerNav}>
                <a href="#home" className={styles.footerLink}>Home</a>
                <a href="#journeys" className={styles.footerLink}>Journeys</a>
                <a href="#regions" className={styles.footerLink}>Regions</a>
                <a href="#who-we-are" className={styles.footerLink}>Contact</a>
              </nav>
              <div className={styles.footerCopyright}>
                2026 Spanish Wine Camp
              </div>
            </div>
          </footer>
        </div>
      </div>
    </section>
  )
}

export default WhoWeAre
