/**
 * Touch Gestures Component
 * Componente para manejar gestos táctiles en móviles
 */
import { useState, useRef, useEffect, useCallback } from 'react'
import styles from './TouchGestures.module.css'

/**
 * Componente para manejar gestos táctiles
 * @param {React.ReactNode} children - Contenido del componente
 * @param {Function} onSwipeLeft - Callback para swipe izquierda
 * @param {Function} onSwipeRight - Callback para swipe derecha
 * @param {Function} onSwipeUp - Callback para swipe arriba
 * @param {Function} onSwipeDown - Callback para swipe abajo
 * @param {Function} onTap - Callback para tap
 * @param {Function} onDoubleTap - Callback para doble tap
 * @param {number} swipeThreshold - Umbral mínimo para detectar swipe
 * @param {number} tapTimeout - Timeout para detectar tap vs swipe
 */
const TouchGestures = ({
  children,
  onSwipeLeft,
  onSwipeRight,
  onSwipeUp,
  onSwipeDown,
  onTap,
  onDoubleTap,
  swipeThreshold = 50,
  tapTimeout = 300
}) => {
  const [touchStart, setTouchStart] = useState(null)
  const [touchEnd, setTouchEnd] = useState(null)
  const [lastTap, setLastTap] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const containerRef = useRef(null)

  // Detectar el tipo de dispositivo
  const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0

  // Manejar inicio del toque
  const handleTouchStart = useCallback((e) => {
    if (!isTouchDevice) return
    
    const touch = e.touches[0]
    setTouchStart({
      x: touch.clientX,
      y: touch.clientY,
      time: Date.now()
    })
    setTouchEnd(null)
    setIsDragging(false)
  }, [isTouchDevice])

  // Manejar movimiento del toque
  const handleTouchMove = useCallback((e) => {
    if (!isTouchDevice || !touchStart) return
    
    const touch = e.touches[0]
    const deltaX = touch.clientX - touchStart.x
    const deltaY = touch.clientY - touchStart.y
    
    // Si el movimiento es significativo, es un drag
    if (Math.abs(deltaX) > 10 || Math.abs(deltaY) > 10) {
      setIsDragging(true)
    }
    
    setTouchEnd({
      x: touch.clientX,
      y: touch.clientY,
      time: Date.now()
    })
  }, [isTouchDevice, touchStart])

  // Manejar fin del toque
  const handleTouchEnd = useCallback((e) => {
    if (!isTouchDevice || !touchStart) return

    const touch = e.changedTouches[0]
    const endTouch = {
      x: touch.clientX,
      y: touch.clientY,
      time: Date.now()
    }
    
    setTouchEnd(endTouch)
    
    // Calcular distancias y tiempo
    const deltaX = endTouch.x - touchStart.x
    const deltaY = endTouch.y - touchStart.y
    const deltaTime = endTouch.time - touchStart.time
    const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY)
    
    // Determinar si es swipe o tap
    if (distance < swipeThreshold && deltaTime < tapTimeout) {
      // Es un tap
      const currentTime = Date.now()
      const tapLength = currentTime - lastTap
      
      if (tapLength < 500 && tapLength > 0) {
        // Doble tap
        onDoubleTap?.(e)
        setLastTap(0)
      } else {
        // Tap simple
        onTap?.(e)
        setLastTap(currentTime)
      }
    } else if (distance >= swipeThreshold && deltaTime < 1000) {
      // Es un swipe
      const absDeltaX = Math.abs(deltaX)
      const absDeltaY = Math.abs(deltaY)
      
      if (absDeltaX > absDeltaY) {
        // Swipe horizontal
        if (deltaX > 0) {
          onSwipeRight?.(e)
        } else {
          onSwipeLeft?.(e)
        }
      } else {
        // Swipe vertical
        if (deltaY > 0) {
          onSwipeDown?.(e)
        } else {
          onSwipeUp?.(e)
        }
      }
    }
    
    // Reset después de un delay
    setTimeout(() => {
      setTouchStart(null)
      setTouchEnd(null)
      setIsDragging(false)
    }, 100)
  }, [isTouchDevice, touchStart, touchEnd, swipeThreshold, tapTimeout, lastTap, onSwipeLeft, onSwipeRight, onSwipeUp, onSwipeDown, onTap, onDoubleTap])

  // Manejar clics del mouse (fallback)
  const handleClick = useCallback((e) => {
    if (isTouchDevice) return
    
    const currentTime = Date.now()
    const tapLength = currentTime - lastTap
    
    if (tapLength < 500 && tapLength > 0) {
      // Doble click
      onDoubleTap?.(e)
      setLastTap(0)
    } else {
      // Click simple
      onTap?.(e)
      setLastTap(currentTime)
    }
  }, [isTouchDevice, lastTap, onTap, onDoubleTap])

  // Prevenir scroll en ciertos gestos
  useEffect(() => {
    if (!isTouchDevice) return

    const preventScroll = (e) => {
      if (isDragging) {
        e.preventDefault()
      }
    }

    document.addEventListener('touchmove', preventScroll, { passive: false })
    return () => document.removeEventListener('touchmove', preventScroll)
  }, [isTouchDevice, isDragging])

  return (
    <div
      ref={containerRef}
      className={`${styles.touchContainer} ${isDragging ? styles.dragging : ''}`}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onClick={handleClick}
      style={{
        touchAction: isDragging ? 'none' : 'auto'
      }}
    >
      {children}
    </div>
  )
}

export default TouchGestures
