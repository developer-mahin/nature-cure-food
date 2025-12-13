const getBaseURL = () => {
  const backendUrl =
    process.env.NEXT_PUBLIC_BACKEND_URL || "https://api.dsit.app/api/v1";
  return backendUrl;
};

export const API_CONFIG = {
  BASE_URL: getBaseURL(),
  ENDPOINTS: {
    PRODUCTS: "/products",
    CREATE_ORDER: "/orders/create-order/public",
    CREATE_IN_COMPLETE_ORDER: "/orders/create-un-complete-order",
    PRODUCT_BY_ID: (id) => `/products/${id}`,
    CATEGORIES: "/categories",
    CATEGORY_PRODUCTS: (slug) => `/categories/${slug}/products`,
    LANDING_PAGE: "/landing",
    LANDING_PAGE_BY_SLUG: (slug) => `/landing/${slug}`,
  },
  DEFAULT_OPTIONS: {
    headers: {
      "Content-Type": "application/json",
      Authorization: "bypass_middleware",
    },
  },
};

export async function apiFetch(url, options = {}) {
  try {
    const response = await fetch(url, {
      ...API_CONFIG.DEFAULT_OPTIONS,
      ...options,
      headers: {
        ...API_CONFIG.DEFAULT_OPTIONS.headers,
        ...options.headers,
      },
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error("API Fetch Error:", error);
    throw error;
  }
}
