import ProductImage from "../common/ProductImage";

const ProductComponent = ({
  products,
  combos,
  isItemSelected,
  toggleItemSelection,
  decrementQuantity,
  incrementQuantity,
  quantities,
}) => {
  return (
    <div className="lg:w-[1280px] mx-auto px-3 sm:px-4 py-6 sm:py-8">
      <div className="flex items-center justify-between mb-4 sm:mb-6">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
          Select Product or Combo
        </h2>
      </div>
      <div className="space-y-3 sm:space-y-4 mb-8 sm:mb-12">
        {/* Products */}
        {products?.map((landingProduct) => {
          const product = landingProduct.product;
          const variant = landingProduct.variant;
          const isSelected = isItemSelected(landingProduct.id);

          return (
            <div
              key={`product-${landingProduct.id}`}
              onClick={() => toggleItemSelection(landingProduct.id, "product")}
              className={`bg-white rounded-2xl shadow-sm overflow-hidden cursor-pointer transition-all duration-300 border-2 flex flex-wrap sm:flex-nowrap items-start sm:items-center gap-4 sm:gap-6 p-4 relative ${
                isSelected
                  ? "border-green-500 shadow-md"
                  : "border-gray-200 hover:border-green-300"
              }`}
            >
              {/* Radio Button */}
              <div className="flex-shrink-0 order-1">
                <div
                  className={`w-5 h-5 sm:w-6 sm:h-6 rounded-full flex items-center justify-center border-2 ${
                    isSelected
                      ? "bg-green-500 border-green-600"
                      : "bg-white border-gray-300"
                  }`}
                >
                  {isSelected && (
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  )}
                </div>
              </div>

              {/* Product Image */}
              <div className="relative lg:w-32 lg:h-32 w-20 h-20 bg-gray-100 overflow-hidden rounded-xl flex-shrink-0 order-3 sm:order-2">
                {product.coverImg && (
                  <ProductImage
                    src={variant?.images[0]}
                    alt={product.name}
                    width={120}
                    height={120}
                    className="w-full h-full object-cover"
                  />
                )}
              </div>

              {/* Product Info */}
              <div className="flex-1 min-w-0 w-full order-2 sm:order-3">
                <h3 className="text-base sm:text-xl font-semibold text-gray-900 mb-2 break-words">
                  {product.name} (
                  <span className="capitalize">{variant?.size}</span>{" "}
                  {variant?.measurement})
                </h3>
                {/* Price and Quantity Row */}
                <div className="flex items-center justify-between gap-4 flex-wrap">
                  {/* Price */}
                  {variant && (
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center gap-2 ">
                        {variant.discountPrice &&
                          variant.discountPrice !== variant.price && (
                            <span className="text-sm text-gray-400 line-through">
                              ৳{parseFloat(variant.price).toFixed(2)}
                            </span>
                          )}
                        <span className="text-lg sm:text-xl font-bold text-gray-900">
                          ৳
                          {parseFloat(
                            variant.discountPrice || variant.price
                          ).toFixed(2)}
                        </span>{" "}
                        <span className="text-[10px] text-red-800 mb-1 bg-red-100 px-2 py-1.5 rounded-full">
                          Save ৳{variant.price - variant.discountPrice}
                        </span>
                      </div>
                    </div>
                  )}

                  {/* Quantity Controls */}
                  {isSelected && (
                    <div className="flex flex-col items-center gap-1">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            decrementQuantity(landingProduct.id);
                          }}
                          className="w-8 h-8 rounded-full cursor-pointer bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-600 transition-colors"
                          aria-label="Decrease quantity"
                        >
                          <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M20 12H4"
                            />
                          </svg>
                        </button>
                        <span className="min-w-[2rem] text-center font-semibold text-gray-900 text-lg">
                          {quantities[landingProduct.id] || 1}
                        </span>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            incrementQuantity(landingProduct.id);
                          }}
                          className="w-8 h-8 cursor-pointer rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-600 transition-colors"
                          aria-label="Increase quantity"
                        >
                          <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                            />
                          </svg>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}

        {/* Combos */}
        {combos?.map((landingCombo) => {
          const combo = landingCombo.combo;
          const isSelected = isItemSelected(landingCombo.id);

          return (
            <div
              key={`combo-${landingCombo.id}`}
              onClick={() => toggleItemSelection(landingCombo.id, "combo")}
              className={`bg-white rounded-2xl shadow-sm overflow-hidden cursor-pointer transition-all duration-300 border-2 flex flex-wrap sm:flex-nowrap items-start sm:items-center gap-4 sm:gap-6 p-4 relative ${
                isSelected
                  ? "border-green-500 shadow-md"
                  : "border-gray-200 hover:border-green-300"
              }`}
            >
              {/* Radio Button */}
              <div className="flex-shrink-0 order-1">
                <div
                  className={`w-5 h-5 sm:w-6 sm:h-6 rounded-full flex items-center justify-center border-2 ${
                    isSelected
                      ? "bg-green-500 border-green-600"
                      : "bg-white border-gray-300"
                  }`}
                >
                  {isSelected && (
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  )}
                </div>
              </div>

              {/* Combo Image */}
              <div className="relative lg:w-32 lg:h-32 w-20 h-20 bg-gray-100 overflow-hidden rounded-xl flex-shrink-0 order-3 sm:order-2">
                <ProductImage
                  src={combo.imageUrl || "/assets/products/product-1.png"}
                  alt={combo.name}
                  width={120}
                  height={120}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Combo Info */}
              <div className="flex-1 min-w-0 w-full order-2 sm:order-3">
                <h3 className="text-base sm:text-xl font-semibold text-gray-900 mb-1 break-words">
                  {combo.name}
                </h3>
                {combo.description && (
                  <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                    {combo.description}
                  </p>
                )}

                {/* Price and Quantity Row */}
                <div className="flex items-center justify-between gap-4 flex-wrap">
                  {/* Price */}
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-2 ">
                      {combo.discountPrice &&
                        combo.discountPrice !== combo.price && (
                          <span className="text-sm text-gray-400 line-through">
                            ৳{parseFloat(combo.price).toFixed(2)}
                          </span>
                        )}
                      <span className="text-lg sm:text-xl font-bold text-gray-900">
                        ৳
                        {parseFloat(combo.discountPrice || combo.price).toFixed(
                          2
                        )}
                      </span>
                      <span className="text-[10px] text-red-800 mb-1 bg-red-100 px-2 py-1.5 rounded-full">
                        Save ৳{combo.price - combo.discountPrice}
                      </span>
                    </div>
                  </div>

                  {/* Quantity Controls */}
                  {isSelected && (
                    <div className="flex flex-col items-center gap-1">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            decrementQuantity(landingCombo.id);
                          }}
                          className="w-8 h-8 rounded-full cursor-pointer bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-600 transition-colors"
                          aria-label="Decrease quantity"
                        >
                          <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M20 12H4"
                            />
                          </svg>
                        </button>
                        <span className="min-w-[2rem] text-center font-semibold text-gray-900 text-lg">
                          {quantities[landingCombo.id] || 1}
                        </span>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            incrementQuantity(landingCombo.id);
                          }}
                          className="w-8 h-8 rounded-full cursor-pointer bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-600 transition-colors"
                          aria-label="Increase quantity"
                        >
                          <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                            />
                          </svg>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProductComponent;

