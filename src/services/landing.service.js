import { API_CONFIG } from "./api.config";

const getLandingPage = async () => {
  try {
    const url = `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.LANDING_PAGE}`;

    const data = await fetch(url, {
      ...API_CONFIG.DEFAULT_OPTIONS,
      next: {
        revalidate: 60,
        tags: ["landing-pages"],
      },
    }).then((res) => {
      if (!res.ok) throw new Error("Failed to fetch landing pages");
      return res.json();
    });

    return data;
  } catch (error) {
    console.error("Error fetching landing pages:", error);
    return null;
  }
};

const getLandingPageBySlug = async (slug) => {
  try {
    const url = `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.LANDING_PAGE}/${slug}`;

    const data = await fetch(url, {
      ...API_CONFIG.DEFAULT_OPTIONS,
      next: {
        revalidate: 60,
        tags: ["landing-pages", `landing-page-${slug}`],
      },
    }).then(async (res) => {
      if (!res.ok) {
        const errorText = await res.text();
        console.error(
          `API Error ${res.status} ${res.statusText}:`,
          errorText.substring(0, 200)
        );
        throw new Error(
          `Failed to fetch landing page: ${res.status} ${res.statusText}`
        );
      }
      return res.json();
    });

    return data;
  } catch (error) {
    console.error(`Error fetching landing page ${slug}:`, error.message);
    return null;
  }
};

const getDynamicPage = async (slug) => {
  return getLandingPageBySlug(slug);
};

export default getLandingPage;
export { getDynamicPage, getLandingPageBySlug };
