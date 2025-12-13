const ShippingMethodRadio = ({
  register,
  value,
  label,
  price,
  priceColor = "text-green-600",
  required = true,
}) => {
  return (
    <label className="flex  font-hind items-center p-3 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
      <input
        type="radio"
        {...register("shippingMethod", {
          required: required ? "একটি ডেলিভারি এলাকা নির্বাচন করুন" : false,
        })}
        value={value}
        className="w-4 h-4 text-green-600 focus:ring-green-500"
      />
      <div className="ml-3 flex-1">
        <div className="flex justify-between items-center">
          <span className="text-sm font-medium text-gray-900 font-hind">{label}</span>
          <span className={`text-sm font-semibold font-hind ${priceColor}`}>
            {price === 0 ? "ফ্রি" : `৳${price}`}
          </span>
        </div>
      </div>
    </label>
  );
};

export default ShippingMethodRadio;
