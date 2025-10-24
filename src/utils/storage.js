/**
 * Local storage utility functions
 * Centralized storage management with error handling
 */
import { CAMP_CONFIG } from '../constants/campData'

/**
 * Safely get data from localStorage with fallback
 * @param {string} key - Storage key
 * @param {*} defaultValue - Default value if key doesn't exist
 * @returns {*} Parsed data or default value
 */
export const getStorageData = (key, defaultValue = []) => {
  try {
    const data = localStorage.getItem(key)
    return data ? JSON.parse(data) : defaultValue
  } catch (error) {
    console.error(`Error reading from localStorage for key ${key}:`, error)
    return defaultValue
  }
}

/**
 * Safely set data to localStorage
 * @param {string} key - Storage key
 * @param {*} data - Data to store
 * @returns {boolean} Success status
 */
export const setStorageData = (key, data) => {
  try {
    localStorage.setItem(key, JSON.stringify(data))
    return true
  } catch (error) {
    console.error(`Error writing to localStorage for key ${key}:`, error)
    return false
  }
}

/**
 * Get subscribers from storage
 * @returns {Array} List of subscriber emails
 */
export const getSubscribers = () => {
  return getStorageData(CAMP_CONFIG.STORAGE_KEYS.SUBSCRIBERS, [])
}

/**
 * Add new subscriber to storage
 * @param {string} email - Subscriber email
 * @returns {boolean} Success status
 */
export const addSubscriber = (email) => {
  const subscribers = getSubscribers()
  if (!subscribers.includes(email)) {
    subscribers.push(email)
    return setStorageData(CAMP_CONFIG.STORAGE_KEYS.SUBSCRIBERS, subscribers)
  }
  return true // Already exists, consider it successful
}

/**
 * Get registrations from storage
 * @returns {Array} List of registrations
 */
export const getRegistrations = () => {
  return getStorageData(CAMP_CONFIG.STORAGE_KEYS.REGISTRATIONS, [])
}

/**
 * Add new registration to storage
 * @param {Object} registration - Registration data
 * @returns {boolean} Success status
 */
export const addRegistration = (registration) => {
  const registrations = getRegistrations()
  registrations.push(registration)
  return setStorageData(CAMP_CONFIG.STORAGE_KEYS.REGISTRATIONS, registrations)
}
