import styles from './Footer.module.css'

const Footer = () => {
  return (
    <footer className={`${styles.footer} bg-gray-900 border-t border-gray-600 py-12`}>
      <div className={`${styles.container} max-w-6xl mx-auto px-8`}>
        <div className={`${styles.footerContent} grid grid-cols-1 md:grid-cols-2 gap-8 mb-8`}>
          <div className={styles.footerSection}>
            <h3 className="text-white mb-4 font-normal text-xl">Spanish Wine Camps</h3>
            <p className="text-gray-300 leading-relaxed">Catalunya Natural Revolution</p>
          </div>
          <div className={styles.footerSection}>
            <h4 className="text-white mb-4 font-normal text-lg">Contact</h4>
            <p className="text-gray-300 leading-relaxed">Space is limited. Scroll to learn more.</p>
          </div>
        </div>
        <div className={`${styles.footerBottom} text-center pt-8 border-t border-gray-600`}>
          <p className="text-gray-500 text-sm">&copy; 2024 Spanish Wine Camps. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
