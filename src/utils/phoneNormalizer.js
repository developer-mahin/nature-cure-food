/**
 * Phone Number Normalizer for E.164 Format
 * 
 * Converts Bangladesh phone numbers to international E.164 format
 * Required for TikTok and Facebook pixel matching
 * 
 * E.164 Format: +880XXXXXXXXXX (country code + 10 digits)
 */

/**
 * Normalize phone number to E.164 format (+880XXXXXXXXXX)
 * @param {string} phone - Phone number in any format
 * @returns {string} Phone number in E.164 format or empty string
 */
export const normalizePhoneToE164 = (phone) => {
  if (!phone) return "";
  
  // Remove all non-digits
  const digits = phone.replace(/\D/g, "");
  
  // If already starts with 880, add +
  if (digits.startsWith("880")) {
    return `+${digits}`;
  }
  
  // If starts with 0 (local format), replace with +880
  if (digits.startsWith("0")) {
    return `+880${digits.substring(1)}`;
  }
  
  // If 10 digits (without leading 0), add +880
  if (digits.length === 10) {
    return `+880${digits}`;
  }
  
  // If 11 digits starting with 1 (without country code), add +880
  if (digits.length === 11 && digits.startsWith("1")) {
    return `+880${digits}`;
  }
  
  // Default: assume it needs +880 prefix
  return `+880${digits}`;
};

/**
 * Validate if phone number is in correct E.164 format
 * @param {string} phone - Phone number to validate
 * @returns {boolean} True if valid E.164 format
 */
export const isValidE164 = (phone) => {
  if (!phone) return false;
  
  // E.164 format: +880 followed by 10 digits
  const e164Regex = /^\+880\d{10}$/;
  return e164Regex.test(phone);
};

/**
 * Format phone number for display (human-readable)
 * @param {string} phone - Phone number in any format
 * @returns {string} Formatted phone number (e.g., +880 1712-345678)
 */
export const formatPhoneForDisplay = (phone) => {
  const e164 = normalizePhoneToE164(phone);
  
  if (!e164) return "";
  
  // Format: +880 1712-345678
  const match = e164.match(/^\+880(\d{4})(\d{6})$/);
  if (match) {
    return `+880 ${match[1]}-${match[2]}`;
  }
  
  return e164;
};
