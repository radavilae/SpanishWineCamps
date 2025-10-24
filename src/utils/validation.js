/**
 * Validation utility functions
 * Centralized validation logic for consistent form handling
 */
import { VALIDATION_RULES } from '../constants/campData'

/**
 * Validate email format
 * @param {string} email - Email to validate
 * @returns {boolean} Valid email format
 */
export const isValidEmail = (email) => {
  return VALIDATION_RULES.EMAIL_REGEX.test(email)
}

/**
 * Validate party size
 * @param {number} size - Party size to validate
 * @returns {boolean} Valid party size
 */
export const isValidPartySize = (size) => {
  const numSize = Number(size)
  return Number.isInteger(numSize) && 
         numSize >= VALIDATION_RULES.MIN_PARTY_SIZE && 
         numSize <= VALIDATION_RULES.MAX_PARTY_SIZE
}

/**
 * Validate required fields
 * @param {Object} formData - Form data to validate
 * @param {Array} requiredFields - Fields that are required
 * @returns {Object} Validation result with isValid and error message
 */
export const validateRequiredFields = (formData, requiredFields = VALIDATION_RULES.REQUIRED_FIELDS) => {
  for (const field of requiredFields) {
    if (!formData[field]?.trim()) {
      return {
        isValid: false,
        error: `Please enter your ${field}`
      }
    }
  }
  return { isValid: true, error: '' }
}

/**
 * Validate registration form data
 * @param {Object} formData - Registration form data
 * @returns {Object} Validation result
 */
export const validateRegistration = (formData) => {
  // Check required fields
  const requiredValidation = validateRequiredFields(formData)
  if (!requiredValidation.isValid) {
    return requiredValidation
  }

  // Validate email format
  if (!isValidEmail(formData.email)) {
    return {
      isValid: false,
      error: 'Please enter a valid email address'
    }
  }

  // Validate party size
  if (!isValidPartySize(formData.partySize)) {
    return {
      isValid: false,
      error: `Group size must be ${VALIDATION_RULES.MIN_PARTY_SIZE}-${VALIDATION_RULES.MAX_PARTY_SIZE}`
    }
  }

  return { isValid: true, error: '' }
}
