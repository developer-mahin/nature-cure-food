/**
 * @deprecated This file is deprecated. Use @/services instead.
 *
 * For fetching products, use:
 * - getAllProducts() from '@/services/products.service'
 * - getProductById(id) from '@/services/products.service'
 * - getProductsByCategory(slug) from '@/services/products.service'
 *
 * See /src/services/README.md for more information.
 */

import { staticProducts } from "./staticProducts";

export async function getProducts() {
  // Use static dataset at build time for speed and reliability
  // NOTE: Consider migrating to @/services for SSR support
  console.warn("products.js is deprecated. Use @/services instead.");
  return staticProducts;
}
