export async function fetchJson(url, options = {}, { revalidate = 300, tags = [] } = {}) {
  const res = await fetch(url, {
    ...options,
    // Leverage Next.js App Router caching
    next: { revalidate, tags },
  });
  if (!res.ok) {
    throw new Error(`Request failed: ${res.status}`);
  }
  return res.json();
}