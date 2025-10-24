import styles from './Footer.module.css'

const Footer = () => {
  return (
    <footer className={`${styles.footer} bg-gray-900 border-t border-gray-600`}>
      <div className="responsive-container">
        <div className="flex-grid">
          <div className="col-1 col-2">
            <div className="flex flex-col gap-sm">
              <h3 className="heading-3 text-white">Spanish Wine Camps</h3>
              <p className="text-base text-gray-300">Catalunya Natural Revolution</p>
            </div>
          </div>
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
