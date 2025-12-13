"use client";

import { Person, Phone } from "@mui/icons-material";
import CheckoutCard from "../ui/CheckoutCard";
import IconTextField from "../ui/IconTextField";
import RadioGroupField from "../ui/RadioGroupField";
import StandaloneAddressSelect from "./StandaloneAddressSelect";

const shippingMethods = [
  { id: "inside-tangail", name: "Inside Tangail City", price: 70 },
  { id: "inside-dhaka", name: "Inside Dhaka City", price: 0 },
  { id: "outside-dhaka", name: "Outside Dhaka City", price: 100 },
];

const DeliveryForm = ({ formData, onInputChange, onRadioChange }) => {
  return (
    <CheckoutCard title="Delivery">
      <IconTextField
        label="আপনার নাম*"
        name="name"
        value={formData.name}
        onChange={onInputChange}
        placeholder="আপনার নাম"
        icon={Person}
        required
        sx={{ mb: 2 }}
      />

      <IconTextField
        label="ফোন নাম্বর*"
        name="phoneNumber"
        value={formData.phoneNumber}
        onChange={onInputChange}
        placeholder="ফোন নাম্বর"
        type="tel"
        icon={Phone}
        required
        sx={{ mb: 2 }}
      />
      <div className="space-y-2 text-start">
        <label className="text-sm flex items-center font-semibold text-slate-700">
          Select Address *
        </label>

        <StandaloneAddressSelect
          value={formData.addressField || { district: "", upazila: "" }}
          onChange={(addressValue) => {
            // Create a synthetic event for consistency
            const syntheticEvent = {
              target: {
                name: "addressField",
                value: addressValue,
              },
            };
            onInputChange(syntheticEvent);
          }}
          name="addressField"
        />
      </div>

      <div className="flex flex-col items-start my-3">
        <label className="block text-sm font-medium mb-1" htmlFor="address">
          সম্পূর্ণ ঠিকানা *
        </label>
        <input
          type="text"
          id="address"
          name="address"
          value={formData.address || ""}
          onChange={onInputChange}
          placeholder="হাউস নাম্বার, রোড, ইউনিট/ফ্ল্যাট, পোস্ট কোড, জেলা"
          className="w-full border border-gray-300 rounded-md px-3 sm:px-4 py-2.5 sm:py-2 text-sm sm:text-base focus:outline-none focus:ring focus:ring-green-500"
          required
        />
      </div>
      <div className="flex flex-col items-start mb-3">
        <label className="block text-sm font-medium mb-1" htmlFor="note">
          নোট (ঐচ্ছিক)
        </label>
        <textarea
          id="note"
          name="note"
          value={formData.note || ""}
          onChange={onInputChange}
          placeholder="আপনার স্পেশাল কোনো রিকোয়্যারমেন্ট থাকলে এখানে লিখুন।"
          className="w-full border border-gray-300 rounded-md px-3 sm:px-4 py-2.5 sm:py-2 text-sm sm:text-base focus:outline-none focus:ring focus:ring-green-500"
          rows="3"
        ></textarea>
      </div>

      <div className="mt-5">
        <RadioGroupField
          label="শিপিং মেথড*"
          name="shippingMethod"
          value={formData.shippingMethod}
          onChange={onRadioChange}
          options={shippingMethods}
        />
      </div>
    </CheckoutCard>
  );
};

export default DeliveryForm;
