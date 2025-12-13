import CategoryPageWrapper from "@/components/category/CategoryPageWrapper";

export const metadata = {
  title: "কম্বো অফার | Nature Cure Food",
  description:
    "Special combo offers with multiple products at discounted prices. Get the best deals on health products.",
  keywords: "combo offer, health products, discount, bundle deals",
};

export default function ComboOfferPage() {
  return <CategoryPageWrapper categorySlug="combo-offer" />;
}
