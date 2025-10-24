/**
 * Mobile Optimization Hook
 * Hook personalizado para optimizaciones específicas de móviles
 */
import { useState, useEffect, useCallback } from 'react'

/**
 * Hook para optimizaciones móviles
 * @returns {object} Objeto con utilidades de optimización móvil
 */
const useMobileOptimization = () => {
  const [isMobile, setIsMobile] = useState(false)
  const [isTouchDevice, setIsTouchDevice] = useState(false)
  const [connectionType, setConnectionType] = useState('unknown')
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)
  const [prefersReducedData, setPrefersReducedData] = useState(false)

  // Detectar si es móvil
  useEffect(() => {
    const checkIsMobile = () => {
      const userAgent = navigator.userAgent || navigator.vendor || window.opera
      const isMobileDevice = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(userAgent)
      const isSmallScreen = window.innerWidth <= 768
      setIsMobile(isMobileDevice || isSmallScreen)
    }

    checkIsMobile()
    window.addEventListener('resize', checkIsMobile)
    return () => window.removeEventListener('resize', checkIsMobile)
  }, [])

  // Detectar dispositivo táctil
  useEffect(() => {
    const checkIsTouchDevice = () => {
      const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0
      setIsTouchDevice(isTouch)
    }

    checkIsTouchDevice()
  }, [])

  // Detectar tipo de conexión
  useEffect(() => {
    const checkConnection = () => {
      if ('connection' in navigator) {
        const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection
        setConnectionType(connection.effectiveType || 'unknown')
      }
    }

    checkConnection()
    if ('connection' in navigator) {
      const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection
      connection.addEventListener('change', checkConnection)
      return () => connection.removeEventListener('change', checkConnection)
    }
  }, [])

  // Detectar preferencias de accesibilidad
  useEffect(() => {
    const checkPreferences = () => {
      setPrefersReducedMotion(window.matchMedia('(prefers-reduced-motion: reduce)').matches)
      setPrefersReducedData(window.matchMedia('(prefers-reduced-data: reduce)').matches)
    }

    checkPreferences()
    
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    const dataQuery = window.matchMedia('(prefers-reduced-data: reduce)')
    
    motionQuery.addEventListener('change', checkPreferences)
    dataQuery.addEventListener('change', checkPreferences)
    
    return () => {
      motionQuery.removeEventListener('change', checkPreferences)
      dataQuery.removeEventListener('change', checkPreferences)
    }
  }, [])

  // Optimizar scroll para móviles
  const optimizeScroll = useCallback((element, options = {}) => {
    if (!element) return

    const defaultOptions = {
      behavior: 'smooth',
      block: 'start',
      inline: 'nearest'
    }

    const scrollOptions = { ...defaultOptions, ...options }

    // En móviles, usar scroll nativo más suave
    if (isMobile) {
      element.scrollIntoView(scrollOptions)
    } else {
      element.scrollIntoView(scrollOptions)
    }
  }, [isMobile])

  // Optimizar imágenes según conexión
  const getOptimizedImageSrc = useCallback((src, options = {}) => {
    if (!src) return src

    const { quality = 'auto', format = 'auto' } = options
    
    // Para conexiones lentas, usar imágenes más pequeñas
    if (connectionType === 'slow-2g' || connectionType === '2g') {
      return `${src}?q=60&w=400`
    }
    
    // Para conexiones 3G, calidad media
    if (connectionType === '3g') {
      return `${src}?q=80&w=600`
    }
    
    // Para conexiones rápidas, calidad alta
    return `${src}?q=90&w=800`
  }, [connectionType])

  // Lazy loading optimizado
  const createLazyObserver = useCallback((callback, options = {}) => {
    if (!('IntersectionObserver' in window)) {
      // Fallback para navegadores que no soportan IntersectionObserver
      callback()
      return null
    }

    const defaultOptions = {
      rootMargin: isMobile ? '50px 0px' : '100px 0px',
      threshold: 0.1
    }

    const observerOptions = { ...defaultOptions, ...options }
    
    return new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          callback(entry)
          observer.unobserve(entry.target)
        }
      })
    }, observerOptions)
  }, [isMobile])

  // Preload crítico para móviles
  const preloadCritical = useCallback((urls) => {
    if (!isMobile || prefersReducedData) return

    urls.forEach(url => {
      const link = document.createElement('link')
      link.rel = 'preload'
      link.href = url
      link.as = url.endsWith('.css') ? 'style' : 'image'
      document.head.appendChild(link)
    })
  }, [isMobile, prefersReducedData])

  // Optimizar animaciones según preferencias
  const getAnimationClasses = useCallback((baseClasses) => {
    if (prefersReducedMotion) {
      return baseClasses.replace(/animate-|transition-/g, '')
    }
    return baseClasses
  }, [prefersReducedMotion])

  // Detectar orientación
  const [orientation, setOrientation] = useState('portrait')
  
  useEffect(() => {
    const checkOrientation = () => {
      setOrientation(window.innerHeight > window.innerWidth ? 'portrait' : 'landscape')
    }

    checkOrientation()
    window.addEventListener('resize', checkOrientation)
    window.addEventListener('orientationchange', checkOrientation)
    
    return () => {
      window.removeEventListener('resize', checkOrientation)
      window.removeEventListener('orientationchange', checkOrientation)
    }
  }, [])

  return {
    // Estado
    isMobile,
    isTouchDevice,
    connectionType,
    prefersReducedMotion,
    prefersReducedData,
    orientation,
    
    // Utilidades
    optimizeScroll,
    getOptimizedImageSrc,
    createLazyObserver,
    preloadCritical,
    getAnimationClasses,
    
    // Helpers
    isSlowConnection: connectionType === 'slow-2g' || connectionType === '2g',
    isFastConnection: connectionType === '4g' || connectionType === '5g',
    shouldReduceAnimations: prefersReducedMotion,
    shouldReduceData: prefersReducedData
  }
}

export default useMobileOptimization
