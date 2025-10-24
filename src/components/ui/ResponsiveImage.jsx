/**
 * Responsive Image Component
 * Optimizado para móviles con lazy loading y diferentes tamaños
 */
import { useState, useRef, useEffect } from 'react'
import styles from './ResponsiveImage.module.css'

/**
 * Componente de imagen responsiva con lazy loading
 * @param {string} src - Ruta de la imagen
 * @param {string} alt - Texto alternativo
 * @param {string} className - Clases CSS adicionales
 * @param {object} sizes - Tamaños responsivos
 * @param {boolean} lazy - Si debe cargar de forma lazy
 * @param {string} placeholder - Imagen placeholder mientras carga
 */
const ResponsiveImage = ({ 
  src, 
  alt, 
  className = '', 
  sizes = '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw',
  lazy = true,
  placeholder = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMSIgaGVpZ2h0PSIxIiB2aWV3Qm94PSIwIDAgMSAxIiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxyZWN0IHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGZpbGw9IiNmZmYiLz48L3N2Zz4='
}) => {
  const [isLoaded, setIsLoaded] = useState(false)
  const [isInView, setIsInView] = useState(!lazy)
  const [hasError, setHasError] = useState(false)
  const imgRef = useRef(null)

  // Intersection Observer para lazy loading
  useEffect(() => {
    if (!lazy || isInView) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true)
            observer.disconnect()
          }
        })
      },
      {
        rootMargin: '50px 0px', // Cargar 50px antes de que sea visible
        threshold: 0.1
      }
    )

    if (imgRef.current) {
      observer.observe(imgRef.current)
    }

    return () => observer.disconnect()
  }, [lazy, isInView])

  const handleLoad = () => {
    setIsLoaded(true)
  }

  const handleError = () => {
    setHasError(true)
    setIsLoaded(true)
  }

  return (
    <div 
      ref={imgRef}
      className={`${styles.responsiveImageContainer} ${className}`}
    >
      {/* Placeholder mientras carga */}
      {!isLoaded && (
        <div className={styles.imagePlaceholder}>
          <div className={styles.loadingSpinner} />
        </div>
      )}
      
      {/* Imagen principal */}
      {isInView && (
        <img
          src={hasError ? placeholder : src}
          alt={alt}
          className={`${styles.responsiveImage} ${isLoaded ? styles.loaded : ''}`}
          onLoad={handleLoad}
          onError={handleError}
          loading={lazy ? 'lazy' : 'eager'}
          decoding="async"
          sizes={sizes}
        />
      )}
      
      {/* Fallback para errores */}
      {hasError && (
        <div className={styles.errorFallback}>
          <span>Image unavailable</span>
        </div>
      )}
    </div>
  )
}

export default ResponsiveImage
