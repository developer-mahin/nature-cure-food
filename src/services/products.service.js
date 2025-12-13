import { API_CONFIG } from "./api.config";

export async function getAllProducts(options = {}) {
  const {
    page = 1,
    limit = 100,
    category = null,
    searchTerm = null,
    sort = null,
    useStatic = false,
  } = options;

  try {
    const params = new URLSearchParams();
    params.append("tenant", "Natural-cure-help");
    if (page) params.append("page", page);
    if (limit) params.append("limit", limit);
    if (category) params.append("category", category);
    if (searchTerm) params.append("searchTerm", searchTerm);
    if (sort) params.append("sort", sort);

    const url = `${API_CONFIG.BASE_URL}${
      API_CONFIG.ENDPOINTS.PRODUCTS
    }?${params.toString()}`;

    const shouldSkipCache = limit >= 50;

    const fetchOptions = {
      ...API_CONFIG.DEFAULT_OPTIONS,
    };

    if (!shouldSkipCache) {
      fetchOptions.next = {
        revalidate: 60,
        tags: ["products"],
      };
    }

    const data = await fetch(url, fetchOptions).then((res) => {
      if (!res.ok) throw new Error("Failed to fetch products");
      return res.json();
    });

    return Array.isArray(data?.data)
      ? data.data
      : Array.isArray(data)
      ? data
      : [];
  } catch (error) {
    console.error(
      "Error fetching products, falling back to static data:",
      error
    );
    return [];
  }
}

export async function getProductById(slug) {
  try {
    const url = `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.PRODUCT_BY_ID(
      slug
    )}`;

    const data = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
        authorization: `bypass_middleware`,
      },
      next: {
        revalidate: 60,
        tags: ["products", `product-${slug}`],
      },
    }).then((res) => {
      if (!res.ok) throw new Error("Failed to fetch product");
      return res.json();
    });

    return data.product || data;
  } catch (error) {
    console.error(
      `Error fetching product ${slug}, falling back to static data:`,
      error
    );
  }
}
