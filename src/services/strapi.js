/**
 * Strapi API Service
 * Handles all API calls to Strapi CMS backend
 */

const STRAPI_URL = import.meta.env.VITE_STRAPI_URL || 'http://localhost:1337/api'
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
    const url = `${STRAPI_URL}${endpoint}`
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
    const data = await fetchStrapi('/hero?populate=*')
    return {
      ...data.data,
      backgroundImage: getStrapiImageUrl(data.data?.backgroundImage?.data?.attributes),
    }
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
    const data = await fetchStrapi('/journeys?populate=*&sort=order:asc')
    return data.data?.map(journey => ({
      ...journey.attributes,
      id: journey.id,
      image: getStrapiImageUrl(journey.attributes?.image?.data?.attributes),
      guests: journey.attributes?.guests?.map(guest => ({
        name: guest.name,
        image: getStrapiImageUrl(guest.image?.data?.attributes),
      })) || [],
      includedItems: journey.attributes?.includedItems || [],
    })) || []
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
    const data = await fetchStrapi('/partners?populate=*&sort=order:asc')
    return data.data?.map(partner => ({
      ...partner.attributes,
      id: partner.id,
      logo: getStrapiImageUrl(partner.attributes?.logo?.data?.attributes),
    })) || []
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
    const data = await fetchStrapi('/guides?populate=*&sort=order:asc')
    return data.data?.map(guide => ({
      ...guide.attributes,
      id: guide.id,
      image: getStrapiImageUrl(guide.attributes?.image?.data?.attributes),
    })) || []
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
    const data = await fetchStrapi('/camp-config')
    return data.data?.attributes || {}
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
