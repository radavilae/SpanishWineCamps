import styles from './CataloniaMap.module.css'
import { geoToMapPosition } from '../../utils/mapGeo'

const BARCELONA = { lat: 41.387, lng: 2.168, label: 'Barcelona' }

const CompassRose = () => (
  <svg className={styles.compassRose} viewBox="0 0 80 80" aria-hidden="true">
    <circle cx="40" cy="40" r="36" fill="rgba(255,255,255,0.92)" stroke="#8b7355" strokeWidth="1.5" />
    <circle cx="40" cy="40" r="28" fill="none" stroke="#c4a574" strokeWidth="0.75" />
    <polygon points="40,8 44,36 40,32 36,36" fill="#2c3e50" />
    <polygon points="40,72 44,44 40,48 36,44" fill="#8b7355" />
    <polygon points="8,40 36,36 32,40 36,44" fill="#8b7355" />
    <polygon points="72,40 44,36 48,40 44,44" fill="#8b7355" />
    <text x="40" y="18" textAnchor="middle" className={styles.compassLabel}>N</text>
  </svg>
)

const CataloniaMap = ({ regions, selectedRegion, onSelectRegion }) => {
  const barcelonaPos = geoToMapPosition(BARCELONA.lat, BARCELONA.lng)

  return (
    <div className={styles.mapWrapper}>
      <div className={styles.mapFrame}>
        <div className={styles.mapInner}>
          <img
            src="/images/catalonia-relief-map.png"
            alt="Relief map of Catalonia showing terrain and wine regions"
            className={styles.mapImage}
            draggable={false}
          />

          <div className={styles.mapVignette} aria-hidden="true" />

          <div className={styles.markersLayer}>
            {regions.map((region) => {
              const isActive = selectedRegion === region.id
              const pos = geoToMapPosition(region.lat, region.lng, region.offset)

              return (
                <button
                  key={region.id}
                  type="button"
                  className={`${styles.mapPin} ${isActive ? styles.mapPinActive : ''}`}
                  style={{ left: pos.left, top: pos.top }}
                  onClick={() => onSelectRegion(region.id)}
                  aria-label={`Select ${region.label} wine region`}
                  aria-pressed={isActive}
                >
                  {isActive && <span className={styles.pinRing} aria-hidden="true" />}
                  <span className={styles.pinDot} aria-hidden="true" />
                  <span className={`${styles.pinLabel} ${isActive ? styles.pinLabelActive : ''}`}>
                    {region.label}
                  </span>
                </button>
              )
            })}

            <div
              className={styles.cityPin}
              style={{ left: barcelonaPos.left, top: barcelonaPos.top }}
              aria-hidden="true"
            >
              <span className={styles.cityDot} />
              <span className={styles.cityLabel}>{BARCELONA.label}</span>
            </div>
          </div>

          <CompassRose />

          <div className={styles.scaleBar} aria-hidden="true">
            <div className={styles.scaleLine} />
            <span>50 km</span>
          </div>
        </div>
      </div>

      <div className={styles.mapLegend}>
        <div className={styles.legendItem}>
          <span className={`${styles.legendDot} ${styles.legendSelected}`} />
          <span>Selected region</span>
        </div>
        <div className={styles.legendItem}>
          <span className={`${styles.legendDot} ${styles.legendDefault}`} />
          <span>Wine region</span>
        </div>
        <div className={styles.legendItem}>
          <span className={`${styles.legendDot} ${styles.legendCity}`} />
          <span>City</span>
        </div>
      </div>

      <p className={styles.attribution}>
        Relief map ©{' '}
        <a
          href="https://commons.wikimedia.org/wiki/File:Catalonia_relief_location_map.svg"
          target="_blank"
          rel="noopener noreferrer"
        >
          Wikimedia Commons
        </a>{' '}
        (CC BY-SA 4.0)
      </p>
    </div>
  )
}

export default CataloniaMap
