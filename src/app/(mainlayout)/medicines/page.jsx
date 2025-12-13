import CategoryPageWrapper from "@/components/category/CategoryPageWrapper";

export const metadata = {
  title: "মেডিসিন | Nature Cure Food",
  description:
    "General medicines and health supplements. Complete range of health and wellness products.",
  keywords:
    "medicine, health supplements, vitamins, general health, wellness products",
};

export default function MedicinesPage() {
  return <CategoryPageWrapper categorySlug="medicines" />;
}
