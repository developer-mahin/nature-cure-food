import CategoryPageWrapper from "@/components/category/CategoryPageWrapper";

export const metadata = {
  title: "হার্টের ঔষধ | Nature Cure Food",
  description:
    "Herbal medicines for heart health and cardiovascular support. Natural heart care products.",
  keywords: "heart medicine, herbal, cardiovascular, heart health, natural",
};

export default function HerbalMedicinePage() {
  return <CategoryPageWrapper categorySlug="herbal-medicine" />;
}
