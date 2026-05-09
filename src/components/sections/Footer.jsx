import SubscriptionForm from '../ui/SubscriptionForm'
import styles from './Footer.module.css'

const Footer = ({ onSubscribe, isSubscribed }) => {
  const founders = [
    {
      id: 'victor-costas',
      name: 'Victor Costas',
      role: 'Rioja Wine Academy Educator & Sommelier',
      photo: null,
      bio: 'An official Rioja Wine Academy Educator and a professional sommelier, Victor brings the technical soul to the team. His deep knowledge of Spanish viticulture—from the complex soils of Galicia to the unique gypsum-rich terrains of Penedès—allows him to translate the science of winemaking into a story anyone can appreciate.'
    },
    {
      id: 'atair-barros',
      name: 'Atair Barros',
      role: 'Co-Founder',
      photo: null,
      bio: 'With a background rooted in high-end hospitality and a relentless passion for discovery, Atair makes sure Spanish Wine Camps become more than a regular experience. His expertise lies in finding the "unfindable"—the small-batch producers and hidden gems that haven\'t yet reached the mainstream.'
    }
  ]
  return (
    <footer id="contact" className={`${styles.footer} bg-gray-900`}>
      <div className="responsive-container">
        <div className={`${styles.aboutSection} flex flex-col gap-sm mb-lg items-center text-center`}>
          <h3 className="heading-2 text-white">The Souls Behind the Vines</h3>
          <p className="text-base text-gray-300">Welcome to Spanish Wine Camps. We aren’t just tour guides; we are curators of culture, liquid history, and the human stories found inside every bottle.</p>
          <h4 className="heading-3 text-white">Our Vision</h4>
          <p className="text-base text-gray-300">Spanish Wine Camps was born from a simple realization: there is an unknown Spain awaiting to be discovered—from new natural wine artisans from Penedès, to the high-altitude producers of Ribeira Sacra, and the hidden family garages of La Rioja. We created this project to take you beyond the tasting room and into the heart of the "New Spain"—a movement defined by natural farming, ancestral methods, and a deep respect for the land.</p>
          <h4 className="heading-3 text-white">Why We Do It</h4>
          <p className="text-base text-gray-300">We believe that wine is a living liquid. It’s a conversation between the past and the future. Whether we are visiting a titan like Álvaro Palacios or a rockstar nomad like Nuria Renom, our goal is to show you the authenticity of Spain.</p>
          <h4 className="heading-3 text-white">Meet the Founders</h4>
          <div className={styles.founderShowcase}>
            {founders.map((founder) => (
              <div
                key={founder.id}
                className={styles.founderCard}
              >
                <span
                  className={styles.founderAvatar}
                  style={{ backgroundImage: `url("${founder.photo}")` }}
                  role="img"
                  aria-label={founder.name}
                />
                <span className={styles.founderMeta}>
                  <span className={styles.founderName}>{founder.name}</span>
                  <span className={styles.founderRole}>{founder.role}</span>
                  <span className={styles.founderBioText}>{founder.bio}</span>
                </span>
              </div>
            ))}
          </div>
        </div>
        <div className="flex-grid">
          <div className="col-1 col-2" />
          <div className="col-1 col-2">
            <div className="flex flex-col gap-sm">
              <h4 className="heading-3 text-white">Contact</h4>
              <p className="text-base text-gray-300">Space is limited. Scroll to learn more.</p>
            </div>
          </div>
        </div>
        <div className="flex justify-center items-center pt-lg border-t border-gray-600 mt-lg">
          <p className="text-sm text-gray-500">&copy; 2024 Spanish Wine Camps. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
