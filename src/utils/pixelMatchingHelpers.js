/**
 * Facebook Pixel Advanced Matching Helpers
 *
 * These functions help improve Match Quality from 4.4/10 to 8-10/10
 * by storing and sending customer PII (hashed) to Facebook Pixel
 */

/**
 * Store customer data in localStorage for Advanced Matching
 * Call this when user fills checkout form or creates account
 *
 * @param {Object} customerData - Customer information
 * @param {string} customerData.name - Full name
 * @param {string} customerData.email - Email address (optional)
 * @param {string} customerData.phone - Phone number
 */
export const storeCustomerDataForPixel = (customerData) => {
  if (typeof window === "undefined") return;

  try {
    if (customerData.name) {
      localStorage.setItem("customer_name", customerData.name);
    }
    if (customerData.email) {
      localStorage.setItem("customer_email", customerData.email);
    }
    if (customerData.phone) {
      localStorage.setItem("customer_phone", customerData.phone);
    }
  } catch (error) {
    console.error("Error storing customer data:", error);
  }
};

/**
 * Clear customer data (call on logout or after order completion if needed)
 */
export const clearCustomerDataForPixel = () => {
  if (typeof window === "undefined") return;

  try {
    localStorage.removeItem("customer_name");
    localStorage.removeItem("customer_email");
    localStorage.removeItem("customer_phone");
  } catch (error) {
    console.error("Error clearing customer data:", error);
  }
};

/**
 * Get stored customer data
 */
export const getStoredCustomerData = () => {
  if (typeof window === "undefined") return {};

  return {
    name: localStorage.getItem("customer_name") || "",
    email: localStorage.getItem("customer_email") || "",
    phone: localStorage.getItem("customer_phone") || "",
  };
};
