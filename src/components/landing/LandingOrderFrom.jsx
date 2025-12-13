"use client";

import { updatePixelUserData } from "@/components/analytics/FacebookPixel";
import { updateTikTokPixelUserData } from "@/components/analytics/TikTokPixel";
import { getOrCreateAnonymousUserId } from "@/utils/anonymousUserId";
import { normalizePhoneToE164 } from "@/utils/phoneNormalizer";
import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import ShippingMethodRadio from "./ShippingMethodRadio";

const LandingOrderFrom = (
  {
    children,
    onOrderConfirm,
    onShippingChange,
    setPhoneNumber,
    setCustomerName,
    setCustomerAddress,
    setAddressField,
    phoneNumber,
    subTotal,
    deliveryRateInside,
    deliveryRateOutside,
  },
  ref
) => {
  const methods = useForm({
    defaultValues: {
      name: "",
      mobile: "",
      address: "",
      note: "",
      shippingMethod: "outside-dhaka",
      addressField: {
        division: "",
        district: "",
        upazila: "",
        union: "",
      },
    },
  });

  const {
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = methods;
  const shippingMethod = watch("shippingMethod");

  const [formData, setFormData] = useState({ name: "", phone: "", email: "" });

  useEffect(() => {
    const timer = setTimeout(() => {
      if (formData.phone || formData.name) {
        const e164Phone = formData.phone
          ? normalizePhoneToE164(formData.phone)
          : "";
        const anonymousId = getOrCreateAnonymousUserId();

        updatePixelUserData({
          name: formData.name || "",
          phone: e164Phone,
          email: formData.email || "",
          external_id: anonymousId || "",
        });

        updateTikTokPixelUserData({
          phone: e164Phone,
          email: formData.email || "",
          external_id: anonymousId || "",
        });
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [formData]);

  useEffect(() => {
    if (onShippingChange) {
      onShippingChange(shippingMethod);
    }
  }, [shippingMethod, onShippingChange]);

  // Automatically set shipping method to free-delivery when subtotal >= 1000
  useEffect(() => {
    if (subTotal >= 1000 && shippingMethod !== "free-delivery") {
      setValue("shippingMethod", "free-delivery");
    }
  }, [subTotal, shippingMethod, setValue]);

  // Set default shipping method when rates are same (সারা বাংলাদেশে)
  useEffect(() => {
    if (deliveryRateInside === deliveryRateOutside) {
      setValue("shippingMethod", "free-delivery", { shouldValidate: false });
    }
  }, [deliveryRateInside, deliveryRateOutside, setValue]);

  const address = watch("address");
  const addressFieldValue = watch("addressField");

  useEffect(() => {
    if (setCustomerAddress && address !== undefined) {
      setCustomerAddress(address);
    }
  }, [address, setCustomerAddress]);

  useEffect(() => {
    if (setAddressField && addressFieldValue) {
      setAddressField(addressFieldValue);
    }
  }, [addressFieldValue, setAddressField]);

  const onSubmit = (data) => {
    if (onOrderConfirm) {
      onOrderConfirm(data);
    }
  };

  useImperativeHandle(ref, () => ({
    submit: handleSubmit(onSubmit),
    formData: methods.getValues(),
    clear: () => {
      methods.reset();
    },
  }));

  return (
    <FormProvider {...methods}>
      <div
        className="container mx-auto px-3 sm:px-4 py-4 sm:py-6 max-w-7xl "
        id="checkout-now"
      >
        <div className="grid md:grid-cols-3 gap-4 sm:gap-6 ">
          <div className="md:col-span-2  shadow-sm bg-white rounded-lg p-3 sm:p-4">
            <h2 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4 border-b pb-2 font-hind">
              বিলিং ডিটেইল
            </h2>

            <form
              className="space-y-3 sm:space-y-4"
              onSubmit={handleSubmit(onSubmit)}
            >
              <div className="flex flex-col items-start">
                <label
                  className="block  font-medium mb-1 font-hind"
                  htmlFor="name"
                >
                  নাম
                </label>
                <input
                  type="text"
                  id="name"
                  {...methods.register("name", {
                    required: "এই ফিল্ডটি আবশ্যক",
                  })}
                  onChange={(e) => {
                    setCustomerName(e.target.value);
                    setFormData((prev) => ({ ...prev, name: e.target.value }));
                  }}
                  placeholder="নামটি লিখুন"
                  className="w-full font-hind border border-gray-300 rounded-md px-3 sm:px-4 py-2.5 sm:py-2  sm:text-base focus:outline-none focus:ring focus:ring-green-500"
                />
                {errors.name && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.name.message}
                  </p>
                )}
              </div>

              <div className="flex flex-col items-start font-hind">
                <label className="block  font-medium mb-1" htmlFor="mobile">
                  মোবাইল
                </label>
                <input
                  type="tel"
                  id="mobile"
                  {...methods.register("mobile", {
                    required: "এই ফিল্ডটি আবশ্যক",
                    pattern: {
                      value: /^(?:\+?88)?01[0-9]{9}$/,
                      message: "সঠিক বাংলাদেশের মোবাইল নম্বর দিন",
                    },
                  })}
                  value={phoneNumber}
                  onFocus={(e) => {
                    setPhoneNumber(e.target.value);
                  }}
                  onChange={(e) => {
                    setPhoneNumber(e.target.value);
                    setFormData((prev) => ({ ...prev, phone: e.target.value }));
                  }}
                  placeholder="১১ ডিজিটের মোবাইল নাম্বার লিখুন।"
                  className="w-full border border-gray-300 rounded-md px-3 sm:px-4 py-2.5 sm:py-2  sm:text-base focus:outline-none focus:ring focus:ring-green-500"
                />
                {errors.mobile && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.mobile.message}
                  </p>
                )}
              </div>

              <div className="flex flex-col items-start font-hind">
                <label className="block  font-medium mb-1" htmlFor="address">
                  সম্পূর্ণ ঠিকানা
                </label>
                <input
                  type="text"
                  id="address"
                  {...methods.register("address", {
                    required: "এই ফিল্ডটি আবশ্যক",
                  })}
                  placeholder="হাউস নাম্বার, রোড, ইউনিট/ফ্ল্যাট, জেলা"
                  className="w-full border border-gray-300 rounded-md px-3 sm:px-4 py-2.5 sm:py-2  sm:text-base focus:outline-none focus:ring focus:ring-green-500"
                />
                {errors.address && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.address.message}
                  </p>
                )}
              </div>
              <div className="flex flex-col items-start font-hind">
                <label className="block  font-medium mb-1" htmlFor="note">
                  আপনার মতামত থাকলে লিখুন
                </label>
                <textarea
                  id="note"
                  {...methods.register("note")}
                  placeholder=""
                  className="w-full border border-gray-300 rounded-md px-3 sm:px-4 py-2.5 sm:py-2  sm:text-base focus:outline-none focus:ring focus:ring-green-500"
                  rows="3"
                ></textarea>
              </div>

              {/* Use Case 1: Same delivery rates for inside and outside - Show single option */}
              {deliveryRateInside === deliveryRateOutside ? (
                <ShippingMethodRadio
                  register={methods.register}
                  value="free-delivery"
                  label="সারা বাংলাদেশে"
                  price={deliveryRateInside}
                />
              ) : (
                <>
                  {subTotal < 1000 && (
                    <>
                      {deliveryRateInside > 0 || deliveryRateOutside > 0 ? (
                        <div className="font-hind">
                          <label className="block  font-medium mb-3">
                            ডেলিভারি এলাকা *
                          </label>
                          <div className="space-y-2">
                            <ShippingMethodRadio
                              register={methods.register}
                              value="outside-dhaka"
                              label="ঢাকা শহরের বাইরে"
                              price={deliveryRateOutside}
                              priceColor="text-gray-700"
                            />
                            <ShippingMethodRadio
                              register={methods.register}
                              value="inside-dhaka"
                              label="ঢাকা শহরের ভিতরে"
                              price={deliveryRateInside}
                            />
                          </div>
                          {errors.shippingMethod && (
                            <p className="text-red-500 text-xs mt-1">
                              {errors.shippingMethod.message}
                            </p>
                          )}
                        </div>
                      ) : (
                        <ShippingMethodRadio
                          register={methods.register}
                          value="free-delivery"
                          label="ডেলিভারি চার্জ ফ্রি"
                          price={0}
                        />
                      )}
                    </>
                  )}

                  {subTotal >= 1000 && (
                    <ShippingMethodRadio
                      register={methods.register}
                      value="free-delivery"
                      label="ডেলিভারি চার্জ ফ্রি"
                      price={0}
                    />
                  )}
                </>
              )}

              {/* Shipping Method */}
            </form>
          </div>

          {/* order summary */}
          <>{children}</>
        </div>
      </div>
    </FormProvider>
  );
};

export default forwardRef(LandingOrderFrom);
