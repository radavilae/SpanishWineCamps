/**
 * Camp configuration constants
 * Centralized data management for better maintainability
 */
export const CAMP_CONFIG = {
  LAUNCH_DATE_OFFSET_DAYS: 8,
  CURRENT_PARTICIPANTS: 8,
  MAX_PARTICIPANTS: 12,
  STORAGE_KEYS: {
    SUBSCRIBERS: 'wineCampSubscribers',
    REGISTRATIONS: 'wineCampRegistrations'
  }
}

/**
 * Navigation sections configuration
 * Centralized section management for consistent navigation
 */
export const NAVIGATION_SECTIONS = [
  'hero',
  'why-travel', 
  'journeys',
  'included',
  'guides'
]

/**
 * Form validation rules
 * Centralized validation for consistent user experience
 */
export const VALIDATION_RULES = {
  EMAIL_REGEX: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  MIN_PARTY_SIZE: 1,
  MAX_PARTY_SIZE: 12,
  REQUIRED_FIELDS: ['name', 'email']
}
