import ProductViewTracker from "@/components/analytics/ProductViewTracker";
import ProductDetailsWrapper from "@/components/products/ProductDetailsWrapper";
import { getAllProducts, getProductById } from "@/services";
import { notFound } from "next/navigation";

export async function generateMetadata({ params }) {
  try {
    const product = await getProductById(params.id);

    return {
      title: `${product.name} | Nature Cure Food`,
      description:
        product.description || `Buy ${product.name} - ${product.category}`,
      openGraph: {
        title: product.name,
        description: product.description,
        images: [product.image],
      },
    };
  } catch (error) {
    return {
      title: "Product Not Found | Nature Cure Food",
    };
  }
}

export async function generateStaticParams() {
  try {
    const response = await getAllProducts({
      useStatic: true,
      limit: 100,
    });

    let products = [];

    if (Array.isArray(response)) {
      products = response;
    } else if (response && typeof response === "object") {
      if (Array.isArray(response.data)) {
        products = response.data;
      } else if (Array.isArray(response.products)) {
        products = response.products;
      } else if (Array.isArray(response.items)) {
        products = response.items;
      }
    }

    if (!Array.isArray(products)) {
      console.warn(
        "generateStaticParams: products is not an array, returning empty array"
      );
      return [];
    }

    const params = products
      .slice(0, 100)
      .map((product) => ({
        id:
          product?.id?.toString() ||
          product?._id?.toString() ||
          String(product?.id || product?._id || ""),
      }))
      .filter((param) => param.id);

    return params;
  } catch (error) {
    console.error("Error generating static params:", error);

    return [];
  }
}

export default async function ProductDetailSSRPage({ params }) {
  try {
    const product = await getProductById(params.id);

    if (!product) {
      notFound();
    }

    const relatedProducts = await getAllProducts({
      category: product.category,
      limit: 4,
    });

    return (
      <>
        <ProductViewTracker product={product} />
        <ProductDetailsWrapper product={product} />
      </>
    );
  } catch (error) {
    console.error("Error loading product:", error);
    notFound();
  }
}

export const revalidate = 600;
