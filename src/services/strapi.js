/**
 * Strapi API Service
 * Handles all API calls to Strapi CMS backend
 */

const STRAPI_URL = import.meta.env.VITE_API_URL || 'http://localhost:1337'
const PREVIEW_SERVER_URL = import.meta.env.VITE_PREVIEW_SERVER_URL || 'http://localhost:3001'

/**
 * Helper function to get full image URL from Strapi
 * @param {Object} image - Strapi image object
 * @returns {string} Full image URL
 */
export const getStrapiImageUrl = (image) => {
  if (!image) return null
  if (typeof image === 'string') return image
  if (image.url) {
    return image.url.startsWith('http') 
      ? image.url 
      : `${STRAPI_URL.replace('/api', '')}${image.url}`
  }
  return null
}

/**
 * Fetch data from Strapi API
 * @param {string} endpoint - API endpoint
 * @param {Object} options - Fetch options
 * @returns {Promise} API response
 */
const fetchStrapi = async (endpoint, options = {}) => {
  try {
    // Limpiar endpoint para evitar doble /api/
    const cleanEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`
    const url = `${STRAPI_URL}${cleanEndpoint}`
    const response = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    })

    if (!response.ok) {
      throw new Error(`Strapi API error: ${response.statusText}`)
    }

    const data = await response.json()
    return data
  } catch (error) {
    // Solo mostrar error si no es un error de conexión (Strapi no está corriendo)
    if (error.message && !error.message.includes('Failed to fetch') && !error.message.includes('ERR_CONNECTION_REFUSED')) {
      console.error('Strapi fetch error:', error)
    }
    throw error
  }
}

/**
 * Get Hero content
 * @returns {Promise<Object>} Hero data
 */
export const getHero = async () => {
  try {
    const data = await fetchStrapi('/api/hero?populate=*')
    // Hero no existe, devolver null para usar fallback
    return null
  } catch {
    // Strapi no está disponible, usar datos de fallback
    return null
  }
}

/**
 * Get all Journeys
 * @returns {Promise<Array>} Journeys array
 */
export const getJourneys = async () => {
  try {
    const data = await fetchStrapi('/api/journeys?populate=*&sort=order:asc')
    // Defensa de datos: comprobar si data existe antes de mapear
    if (!data.data || !Array.isArray(data.data)) {
      return []
    }
    return data.data.map(journey => ({
      ...journey, // Strapi 5: datos en la raíz, sin .attributes
      id: journey.id,
      image: getStrapiImageUrl(journey?.image),
      guests: journey?.guests?.map(guest => ({
        name: guest.name,
        image: null, // guests no tienen image en los datos
      })) || [],
      includedItems: journey?.includedItems || [],
    }))
  } catch (error) {
    // Strapi no está disponible, usar datos de fallback
    return []
  }
}

/**
 * Get all Partners
 * @returns {Promise<Array>} Partners array
 */
export const getPartners = async () => {
  try {
    const data = await fetchStrapi('/api/partners?populate=*&sort=order:asc')
    // Defensa de datos: comprobar si data existe antes de mapear
    if (!data.data || !Array.isArray(data.data)) {
      return []
    }
    return data.data.map(partner => ({
      ...partner, // Strapi 5: datos en la raíz, sin .attributes
      id: partner.id,
      logo: partner.logo || null, // logo es null en los datos
    }))
  } catch (error) {
    // Strapi no está disponible, usar datos de fallback
    return []
  }
}

/**
 * Get all Guides
 * @returns {Promise<Array>} Guides array
 */
export const getGuides = async () => {
  try {
    const data = await fetchStrapi('/api/guides?populate=*&sort=order:asc')
    // Defensa de datos: comprobar si data existe antes de mapear
    if (!data.data || !Array.isArray(data.data)) {
      return []
    }
    return data.data.map(guide => ({
      ...guide, // Strapi 5: datos en la raíz, sin .attributes
      id: guide.id,
      image: getStrapiImageUrl(guide?.image),
    }))
  } catch (error) {
    // Strapi no está disponible, usar datos de fallback
    return []
  }
}

/**
 * Get Camp Config
 * @returns {Promise<Object>} Camp configuration
 */
export const getCampConfig = async () => {
  try {
    const data = await fetchStrapi('/api/camp-config?populate=*')
    // Strapi 5: datos en la raíz, sin .attributes
    return data.data || {}
  } catch (error) {
    // Strapi no está disponible, usar valores por defecto
    return {
      launchDateOffsetDays: 8,
      defaultMaxParticipants: 12,
      defaultCurrentParticipants: 8,
    }
  }
}

/**
 * Preview Server Integration
 * Real-time updates from Strapi preview server
 */

let socket = null
let updateCallbacks = []

/**
 * Initialize connection to preview server
 * @param {Function} callback - Function to call when content updates
 */
export const initPreviewServer = (callback) => {
  if (callback) updateCallbacks.push(callback)

  // Deshabilitar preview server temporalmente para evitar errores CORS
  console.log('⚠️ Preview Server deshabilitado temporalmente')
  return
  
  // Load socket.io dynamically
  import('socket.io-client').then(({ io }) => {
    socket = io(PREVIEW_SERVER_URL)

    socket.on('connect', () => {
      console.log('🟢 Conectado al Preview Server')
    })

    socket.on('disconnect', () => {
      console.log('🔴 Desconectado del Preview Server')
    })

    socket.on('content-update', (content) => {
      console.log('📡 Contenido actualizado desde Preview Server')
      updateCallbacks.forEach(callback => callback(content))
    })

    socket.on('connect_error', (error) => {
      console.log('⚠️ Error conectando al Preview Server:', error.message)
    })
  }).catch(error => {
    console.log('⚠️ Socket.IO no disponible, modo offline')
  })
}

/**
 * Disconnect from preview server
 */
export const disconnectPreviewServer = () => {
  if (socket) {
    socket.disconnect()
    socket = null
  }
  updateCallbacks = []
}

/**
 * Manual refresh from preview server
 */
export const refreshPreviewContent = async () => {
  try {
    const response = await fetch(`${PREVIEW_SERVER_URL}/api/refresh`, { 
      method: 'POST' 
    })
    return await response.json()
  } catch (error) {
    console.error('Error refreshing preview content:', error)
    throw error
  }
}
