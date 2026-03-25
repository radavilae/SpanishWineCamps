/**
 * Custom hook to fetch and manage Strapi CMS data
 */
import { useState, useEffect, useCallback } from 'react'
import { getHero, getJourneys, getPartners, getGuides, getCampConfig, initPreviewServer, disconnectPreviewServer } from '../services/strapi'

/**
 * Hook to fetch all CMS data
 * @returns {Object} CMS data and loading state
 */
export const useStrapiData = () => {
  const [data, setData] = useState({
    hero: null,
    journeys: [],
    partners: [],
    guides: [],
    campConfig: null,
  })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Function to refresh data from Strapi
  const refreshData = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)

      // Fetch all data in parallel
      const [hero, journeys, partners, guides, campConfig] = await Promise.all([
        getHero(),
        getJourneys(),
        getPartners(),
        getGuides(),
        getCampConfig(),
      ])

      setData({
        hero,
        journeys,
        partners,
        guides,
        campConfig,
      })
    } catch (err) {
      // Strapi no está disponible, usar datos de fallback silenciosamente
      setError(err)
      // Fallback to empty data structure
      setData({
        hero: null,
        journeys: [],
        partners: [],
        guides: [],
        campConfig: {
          launchDateOffsetDays: 8,
          defaultMaxParticipants: 12,
          defaultCurrentParticipants: 8,
        },
      })
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    // Initial data fetch
    refreshData()

    // Initialize preview server connection for real-time updates
    const handleContentUpdate = () => {
      console.log('📡 Actualizando datos desde Preview Server')
      refreshData()
    }

    initPreviewServer(handleContentUpdate)

    // Cleanup
    return () => {
      disconnectPreviewServer()
    }
  }, [refreshData])

  return { data, loading, error, refreshData }
}

/**
 * Hook to fetch only hero data
 */
export const useHero = () => {
  const [hero, setHero] = useState(null)
  const [loading, setLoading] = useState(true)

  const refreshHero = useCallback(async () => {
    try {
      const data = await getHero()
      setHero(data)
    } catch (error) {
      console.log('Hero data not available from Strapi')
      setHero(null)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    refreshHero()

    // Initialize preview server connection for real-time updates
    const handleContentUpdate = () => {
      console.log('📡 Actualizando hero desde Preview Server')
      refreshHero()
    }

    initPreviewServer(handleContentUpdate)

    return () => {
      disconnectPreviewServer()
    }
  }, [refreshHero])

  return { hero, loading, refreshHero }
}

/**
 * Hook to fetch only journeys
 */
export const useJourneys = () => {
  const [journeys, setJourneys] = useState([])
  const [loading, setLoading] = useState(true)

  const refreshJourneys = useCallback(async () => {
    try {
      const data = await getJourneys()
      setJourneys(data)
    } catch (error) {
      console.log('Journeys data not available from Strapi')
      setJourneys([])
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    refreshJourneys()

    // Initialize preview server connection for real-time updates
    const handleContentUpdate = () => {
      console.log('📡 Actualizando journeys desde Preview Server')
      refreshJourneys()
    }

    initPreviewServer(handleContentUpdate)

    return () => {
      disconnectPreviewServer()
    }
  }, [refreshJourneys])

  return { journeys, loading, refreshJourneys }
}

/**
 * Hook to fetch only partners
 */
export const usePartners = () => {
  const [partners, setPartners] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getPartners().then(data => {
      setPartners(data)
      setLoading(false)
    })
  }, [])

  return { partners, loading }
}

/**
 * Hook to fetch only guides
 */
export const useGuides = () => {
  const [guides, setGuides] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getGuides().then(data => {
      setGuides(data)
      setLoading(false)
    })
  }, [])

  return { guides, loading }
}
