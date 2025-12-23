"use client";

import ProductImage from "@/components/common/ProductImage";
import ProductCardServer from "@/components/main/Homepage/ProductSection/ProductCardServer";
import { getAllProducts } from "@/services/products.service";
import { Button, Divider } from "@mui/material";
import { CheckCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const ThankYouPage = () => {
  const router = useRouter();
  const [orderDetails, setOrderDetails] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get order details from session storage
    const storedOrderDetails = sessionStorage.getItem("orderDetails");

    if (!storedOrderDetails) {
      // If no order details, redirect to home
      router.push("/");
      return;
    }

    try {
      setOrderDetails(JSON.parse(storedOrderDetails));
    } catch (error) {
      console.error("Error parsing order details:", error);
      router.push("/");
    }

    // Fetch related products
    const fetchRelatedProducts = async () => {
      try {
        const products = await getAllProducts({ limit: 8 });

        setRelatedProducts(products);
      } catch (error) {
        console.error("Error fetching related products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRelatedProducts();
  }, [router]);

  if (loading || !orderDetails) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
      </div>
    );
  }

  console.log(relatedProducts, "relatedProducts");

  return (
    <div className="bg-gray-50 min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto space-y-8">
        {/* Thank You Card */}
        <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-sm p-6 sm:p-8 text-center">
          <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />
          <h1 className="text-2xl sm:text-3xl font-bold text-green-700 mb-2 font-hind">
            ধন্যবাদ!
          </h1>
          <p className="mb-6 font-hind">
            <span className="text-xl font-semibold">
              আপনার অর্ডার সফলভাবে গৃহীত হয়েছে{" "}
            </span>
            <br /> আমরা শীঘ্রই আপনার সাথে যোগাযোগ করব
          </p>
          <div className="bg-green-50 rounded-lg p-4 mb-6 inline-block">
            <p className="text-sm mb-1 font-hind">অর্ডার নম্বর</p>
            <p className="text-xl font-bold text-green-700">
              #{orderDetails.orderId}
            </p>
          </div>
          <div className="pb-8">
            <p>যেকোনো সহায়তার জন্য</p>
            <Button
              variant="contained"
              sx={{ py: 1.5, px: 8, mt: 1, fontSize: "20px" }}
            >
              <a href="tel:+8801335134988">01335-134988</a>
            </Button>
          </div>

          <Divider className="my-6" />

          <div className="text-left">
            <h2 className="text-lg font-bold text-gray-900 mb-4 font-hind">
              আপনার অর্ডারকৃত পণ্য
            </h2>

            <div className="space-y-4 grid lg:grid-cols-2 grid-cols-1 gap-x-6 ">
              {orderDetails?.items?.map((item, index) => {
                return (
                  <div
                    key={index}
                    className="flex gap-4 p-3 bg-gray-50 rounded-lg"
                  >
                    <div className="w-20 h-20 flex-shrink-0 rounded-md overflow-hidden bg-white border border-gray-100">
                      <ProductImage
                        src={item?.image}
                        alt={item?.name}
                        width={80}
                        height={80}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-gray-900 text-sm sm:text-base mb-1 font-hind">
                        {item.title || item?.name}
                        {item?.size && (
                          <span className="capitalize">
                            {" "}
                            ({item?.size} {item?.measurement})
                          </span>
                        )}
                      </h3>
                      <p className="text-sm text-gray-500 mb-1 font-hind">
                        পরিমাণ: {item?.quantity} × ৳{item?.price.toFixed(2)}
                      </p>
                      <p className="text-green-600 font-bold font-hind">
                        ৳{item?.total.toFixed(2)}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            <Divider className="my-6" />
          </div>

          <div className="mt-8">
            <Button
              onClick={() => router.push("/")}
              variant="contained"
              fullWidth
              className="font-hind"
              sx={{
                backgroundColor: "#097B35",
                "&:hover": {
                  backgroundColor: "#00662A",
                },
                py: 1.5,
                fontSize: "16px",
                fontWeight: 600,
                textTransform: "none",
                borderRadius: "8px",
              }}
            >
              আরো কেনাকাটা করুন
            </Button>
          </div>
        </div>

        {/* Related Products Section */}
        {relatedProducts?.length > 0 && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900 text-center font-hind">
              আরো পণ্য দেখুন
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {relatedProducts?.map((product) => {
                const variant = product.variant;
                const price = variant?.discountPrice || variant?.price || 0;

                return (
                  <ProductCardServer
                    key={product.id}
                    product={product}
                    variant={variant}
                    price={price}
                  />
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ThankYouPage;
