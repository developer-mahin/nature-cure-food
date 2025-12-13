import MedicineShop from "@/components/AllProducts/MedicineShop";
import HomepageProductViewTracker from "@/components/analytics/HomepageProductViewTracker";
import { getAllProducts } from "@/services";

export const metadata = {
  title: "All Products | Nature Cure Food",
  description: "Browse our complete collection of herbal and natural medicines",
};

export default async function AllProductsSSRPage({ searchParams }) {
  const products = await getAllProducts({
    page: searchParams.page || 1,
    limit: searchParams.limit || 12,
    category: searchParams.category,
    search: searchParams.search,
    sort: searchParams.sort || "featured",
    useStatic: false,
  });

  return (
    <div>
      <HomepageProductViewTracker products={products?.data} />
      <MedicineShop initialProducts={products} />
    </div>
  );
}
