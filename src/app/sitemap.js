export default async function sitemap() {
  const base = process.env.NEXT_PUBLIC_SITE_URL || "https://www.naturalcurehelp.com";
  const routes = ["/", "/cart", "/landing"].map((route) => ({
    url: `${base}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: route === "/" ? 1 : 0.7,
  }));
  return routes;
}