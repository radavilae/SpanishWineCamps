/**
 * Mobile Performance Utilities
 * Utilidades para optimizar el rendimiento en móviles
 */

/**
 * Preload crítico de recursos
 * @param {Array} resources - Array de recursos a precargar
 * @param {string} connectionType - Tipo de conexión del usuario
 */
export const preloadCriticalResources = (resources, connectionType = '4g') => {
  // Solo precargar en conexiones rápidas
  if (connectionType === 'slow-2g' || connectionType === '2g') {
    return
  }

  resources.forEach(resource => {
    const link = document.createElement('link')
    link.rel = 'preload'
    link.href = resource.url
    link.as = resource.type || 'image'
    
    if (resource.crossorigin) {
      link.crossOrigin = 'anonymous'
    }
    
    if (resource.media) {
      link.media = resource.media
    }
    
    document.head.appendChild(link)
  })
}

/**
 * Lazy load de imágenes con Intersection Observer
 * @param {string} selector - Selector de imágenes
 * @param {object} options - Opciones del observer
 */
export const lazyLoadImages = (selector = 'img[data-src]', options = {}) => {
  if (!('IntersectionObserver' in window)) {
    // Fallback para navegadores que no soportan IntersectionObserver
    const images = document.querySelectorAll(selector)
    images.forEach(img => {
      if (img.dataset.src) {
        img.src = img.dataset.src
        img.removeAttribute('data-src')
      }
    })
    return
  }

  const defaultOptions = {
    rootMargin: '50px 0px',
    threshold: 0.1
  }

  const observerOptions = { ...defaultOptions, ...options }
  
  const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target
        if (img.dataset.src) {
          img.src = img.dataset.src
          img.removeAttribute('data-src')
          img.classList.add('loaded')
        }
        imageObserver.unobserve(img)
      }
    })
  }, observerOptions)

  const images = document.querySelectorAll(selector)
  images.forEach(img => imageObserver.observe(img))
}

/**
 * Optimizar scroll para móviles
 * @param {Element} element - Elemento a hacer scroll
 * @param {object} options - Opciones de scroll
 */
export const smoothScrollTo = (element, options = {}) => {
  if (!element) return

  const defaultOptions = {
    behavior: 'smooth',
    block: 'start',
    inline: 'nearest'
  }

  const scrollOptions = { ...defaultOptions, ...options }
  
  // Usar scroll nativo optimizado
  element.scrollIntoView(scrollOptions)
}

/**
 * Debounce para optimizar eventos
 * @param {Function} func - Función a debounce
 * @param {number} wait - Tiempo de espera
 * @param {boolean} immediate - Ejecutar inmediatamente
 */
export const debounce = (func, wait, immediate = false) => {
  let timeout
  return function executedFunction(...args) {
    const later = () => {
      timeout = null
      if (!immediate) func(...args)
    }
    const callNow = immediate && !timeout
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
    if (callNow) func(...args)
  }
}

/**
 * Throttle para optimizar eventos
 * @param {Function} func - Función a throttle
 * @param {number} limit - Límite de tiempo
 */
export const throttle = (func, limit) => {
  let inThrottle
  return function(...args) {
    if (!inThrottle) {
      func.apply(this, args)
      inThrottle = true
      setTimeout(() => inThrottle = false, limit)
    }
  }
}

/**
 * Optimizar animaciones según preferencias del usuario
 * @param {string} className - Clase CSS de la animación
 * @param {boolean} prefersReducedMotion - Si el usuario prefiere movimiento reducido
 */
export const getOptimizedAnimationClass = (className, prefersReducedMotion = false) => {
  if (prefersReducedMotion) {
    return className.replace(/animate-|transition-/g, '')
  }
  return className
}

/**
 * Detectar si el dispositivo es móvil
 * @returns {boolean} Si es dispositivo móvil
 */
export const isMobileDevice = () => {
  const userAgent = navigator.userAgent || navigator.vendor || window.opera
  return /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(userAgent)
}

/**
 * Detectar si es dispositivo táctil
 * @returns {boolean} Si es dispositivo táctil
 */
export const isTouchDevice = () => {
  return 'ontouchstart' in window || navigator.maxTouchPoints > 0
}

/**
 * Obtener tipo de conexión
 * @returns {string} Tipo de conexión
 */
export const getConnectionType = () => {
  if ('connection' in navigator) {
    const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection
    return connection.effectiveType || 'unknown'
  }
  return 'unknown'
}

/**
 * Optimizar imágenes según conexión
 * @param {string} src - URL de la imagen
 * @param {string} connectionType - Tipo de conexión
 * @returns {string} URL optimizada
 */
export const getOptimizedImageUrl = (src, connectionType = '4g') => {
  if (!src) return src

  const params = new URLSearchParams()
  
  switch (connectionType) {
    case 'slow-2g':
    case '2g':
      params.set('q', '60')
      params.set('w', '400')
      break
    case '3g':
      params.set('q', '80')
      params.set('w', '600')
      break
    case '4g':
    default:
      params.set('q', '90')
      params.set('w', '800')
      break
  }

  return `${src}?${params.toString()}`
}

/**
 * Preload de fuentes críticas
 * @param {Array} fonts - Array de fuentes a precargar
 */
export const preloadFonts = (fonts) => {
  fonts.forEach(font => {
    const link = document.createElement('link')
    link.rel = 'preload'
    link.href = font.url
    link.as = 'font'
    link.type = 'font/woff2'
    link.crossOrigin = 'anonymous'
    document.head.appendChild(link)
  })
}

/**
 * Optimizar CSS crítico
 * @param {string} css - CSS crítico
 */
export const injectCriticalCSS = (css) => {
  const style = document.createElement('style')
  style.textContent = css
  document.head.appendChild(style)
}

/**
 * Lazy load de CSS no crítico
 * @param {string} href - URL del CSS
 * @param {string} media - Media query
 */
export const lazyLoadCSS = (href, media = 'all') => {
  const link = document.createElement('link')
  link.rel = 'stylesheet'
  link.href = href
  link.media = media
  document.head.appendChild(link)
}

/**
 * Optimizar viewport para móviles
 */
export const optimizeViewport = () => {
  const viewport = document.querySelector('meta[name="viewport"]')
  if (viewport) {
    viewport.content = 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no'
  } else {
    const meta = document.createElement('meta')
    meta.name = 'viewport'
    meta.content = 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no'
    document.head.appendChild(meta)
  }
}

/**
 * Optimizar touch events
 * @param {Element} element - Elemento a optimizar
 */
export const optimizeTouchEvents = (element) => {
  if (!element) return

  element.style.touchAction = 'manipulation'
  element.style.webkitTapHighlightColor = 'transparent'
  element.style.webkitTouchCallout = 'none'
  element.style.webkitUserSelect = 'none'
  element.style.userSelect = 'none'
}

/**
 * Detectar orientación del dispositivo
 * @returns {string} Orientación actual
 */
export const getDeviceOrientation = () => {
  return window.innerHeight > window.innerWidth ? 'portrait' : 'landscape'
}

/**
 * Optimizar scroll para móviles
 * @param {Element} container - Contenedor de scroll
 */
export const optimizeScrollContainer = (container) => {
  if (!container) return

  container.style.webkitOverflowScrolling = 'touch'
  container.style.overflowScrolling = 'touch'
  container.style.overscrollBehavior = 'contain'
}
