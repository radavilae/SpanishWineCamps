/**
 * Custom hook to fetch and manage Strapi CMS data
 */
import { useState, useEffect } from 'react'
import { getHero, getJourneys, getPartners, getGuides, getCampConfig } from '../services/strapi'

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

  useEffect(() => {
    const fetchData = async () => {
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
    }

    fetchData()
  }, [])

  return { data, loading, error }
}

/**
 * Hook to fetch only hero data
 */
export const useHero = () => {
  const [hero, setHero] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getHero().then(data => {
      setHero(data)
      setLoading(false)
    })
  }, [])

  return { hero, loading }
}

/**
 * Hook to fetch only journeys
 */
export const useJourneys = () => {
  const [journeys, setJourneys] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getJourneys().then(data => {
      setJourneys(data)
      setLoading(false)
    })
  }, [])

  return { journeys, loading }
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
