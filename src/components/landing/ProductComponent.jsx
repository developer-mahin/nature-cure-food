import ProductImage from "../common/ProductImage";

const badgeVariants = {
  red: {
    main: "bg-gradient-to-r from-red-500 via-red-600 to-red-700",
    top: "bg-gradient-to-b from-red-300/90 via-red-400/50 to-transparent",
    bottom: "bg-gradient-to-t from-red-900/90 via-red-800/50 to-transparent",
    corner: "bg-gradient-to-tl from-red-900/80 via-red-800/40 to-transparent",
  },
  blue: {
    main: "bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700",
    top: "bg-gradient-to-b from-blue-300/90 via-blue-400/50 to-transparent",
    bottom: "bg-gradient-to-t from-blue-900/90 via-blue-800/50 to-transparent",
    corner: "bg-gradient-to-tl from-blue-900/80 via-blue-800/40 to-transparent",
  },
  purple: {
    main: "bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700",
    top: "bg-gradient-to-b from-purple-300/90 via-purple-400/50 to-transparent",
    bottom:
      "bg-gradient-to-t from-purple-900/90 via-purple-800/50 to-transparent",
    corner:
      "bg-gradient-to-tl from-purple-900/80 via-purple-800/40 to-transparent",
  },
  emerald: {
    main: "bg-gradient-to-r from-emerald-500 via-emerald-600 to-emerald-700",
    top: "bg-gradient-to-b from-emerald-300/90 via-emerald-400/50 to-transparent",
    bottom:
      "bg-gradient-to-t from-emerald-900/90 via-emerald-800/50 to-transparent",
    corner:
      "bg-gradient-to-tl from-emerald-900/80 via-emerald-800/40 to-transparent",
  },
  orange: {
    main: "bg-gradient-to-r from-orange-500 via-orange-600 to-orange-700",
    top: "bg-gradient-to-b from-orange-300/90 via-orange-400/50 to-transparent",
    bottom:
      "bg-gradient-to-t from-orange-900/90 via-orange-800/50 to-transparent",
    corner:
      "bg-gradient-to-tl from-orange-900/80 via-orange-800/40 to-transparent",
  },
};

const CornerRibbon = ({ text, variant = "red" }) => {
  const color = badgeVariants[variant] || badgeVariants.red;

  return (
    <div className="absolute top-4 right-[-45px] rotate-45 z-10">
      <div
        className={`relative ${color.main} text-white text-[10px] font-extrabold uppercase tracking-wider px-10 py-2 shadow-lg overflow-hidden`}
      >
        {text}

        {/* Top Highlight */}
        <div
          className={`absolute top-0 left-0 right-0 h-2/5 ${color.top} pointer-events-none`}
        />

        {/* Bottom Shadow */}
        <div
          className={`absolute bottom-0 left-0 right-0 h-2/5 ${color.bottom} pointer-events-none`}
        />

        {/* Right Bottom Corner Depth */}
        <div
          className={`absolute bottom-0 right-0 w-2/5 h-2/5 ${color.corner} pointer-events-none`}
        />
      </div>
    </div>
  );
};

const ProductComponent = ({
  products,
  combos,
  isItemSelected,
  toggleItemSelection,
  decrementQuantity,
  incrementQuantity,
  quantities,
  deselectedItems = new Set(),
}) => {
  return (
    <div className="lg:w-[1280px] mx-auto px-3 sm:px-4 py-6 sm:py-8">
      <div className="flex items-center justify-between mb-4 sm:mb-6">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
          Select Products or Combos
        </h2>
      </div>
      <div className="space-y-3 sm:space-y-4 mb-8 sm:mb-12">
        {/* Products */}
        {products?.map((landingProduct) => {
          const product = landingProduct.product;
          const variant = landingProduct.variant;
          // Check if item is selected via state OR has isSelected property
          // But respect explicit deselection (even if it has isSelected: true)
          const isSelected =
            !deselectedItems.has(landingProduct.id) &&
            (isItemSelected(landingProduct.id) ||
              landingProduct.isSelected === true);

          return (
            <div
              key={`product-${landingProduct.id}`}
              onClick={() => toggleItemSelection(landingProduct.id, "product")}
              className={`bg-white rounded-2xl shadow-sm overflow-hidden cursor-pointer transition-all duration-300 border-2 flex flex-wrap sm:flex-nowrap items-start sm:items-center gap-4 sm:gap-6 p-4 relative ${
                isSelected
                  ? "border-green-500 shadow-md"
                  : landingProduct.highlightColor
                  ? "border-gray-300 hover:border-gray-400"
                  : "border-gray-200 hover:border-green-300"
              }`}
            >
              {/* Highlight Color Overlay - 10% opacity */}
              {landingProduct.highlightColor && (
                <div
                  className="absolute inset-0 rounded-2xl pointer-events-none z-0"
                  style={{
                    backgroundColor: landingProduct.highlightColor,
                    opacity: 0.05,
                  }}
                />
              )}

              {/* Badge - Modern Corner Ribbon */}
              {landingProduct.badge && (
                <CornerRibbon text={landingProduct.badge} variant="emerald" />
              )}

              {/* Checkbox */}
              <div className="flex-shrink-0 order-1">
                <div
                  className={`w-5 h-5 sm:w-6 sm:h-6 rounded flex items-center justify-center border-2 transition-colors ${
                    isSelected
                      ? "bg-green-500 border-green-600"
                      : "bg-white border-gray-300"
                  }`}
                >
                  {isSelected && (
                    <svg
                      className="w-3 h-3 sm:w-4 sm:h-4 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={3}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
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
                  {landingProduct.title || product.name} (
                  <span className="capitalize">{variant?.size}</span>{" "}
                  {variant?.measurement})
                </h3>
                {landingProduct.description && (
                  <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                    {landingProduct.description}
                  </p>
                )}
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
                        {variant.price - variant.discountPrice > 0 && (
                          <span className="text-[10px] text-red-800 mb-1 bg-red-100 px-2 py-1.5 rounded-full">
                            Save ৳{variant.price - variant.discountPrice}
                          </span>
                        )}
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
          // Check if item is selected via state OR has isSelected property
          // But respect explicit deselection (even if it has isSelected: true)
          const isSelected =
            !deselectedItems.has(landingCombo.id) &&
            (isItemSelected(landingCombo.id) ||
              landingCombo.isSelected === true);

          return (
            <div
              key={`combo-${landingCombo.id}`}
              onClick={() => toggleItemSelection(landingCombo.id, "combo")}
              className={`bg-white rounded-2xl shadow-sm overflow-hidden cursor-pointer transition-all duration-300 border-2 flex flex-wrap sm:flex-nowrap items-start sm:items-center gap-4 sm:gap-6 p-4 relative ${
                isSelected
                  ? "border-green-500 shadow-md"
                  : landingCombo.highlightColor
                  ? "border-gray-300 hover:border-gray-400"
                  : "border-gray-200 hover:border-green-300"
              }`}
            >
              {/* Highlight Color Overlay - 10% opacity */}
              {landingCombo.highlightColor && (
                <div
                  className="absolute inset-0 rounded-2xl pointer-events-none z-0"
                  style={{
                    backgroundColor: landingCombo.highlightColor,
                    opacity: 0.08,
                  }}
                />
              )}

              {/* Badge - Modern Corner Ribbon */}
              {landingCombo.badge && (
                <CornerRibbon text={landingCombo.badge} variant="emerald" />
              )}

              {/* Checkbox */}
              <div className="flex-shrink-0 order-1">
                <div
                  className={`w-5 h-5 sm:w-6 sm:h-6 rounded flex items-center justify-center border-2 transition-colors ${
                    isSelected
                      ? "bg-green-500 border-green-600"
                      : "bg-white border-gray-300"
                  }`}
                >
                  {isSelected && (
                    <svg
                      className="w-3 h-3 sm:w-4 sm:h-4 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={3}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
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
                      {combo.price - combo.discountPrice > 0 && (
                        <span className="text-[10px] text-red-800 mb-1 bg-red-100 px-2 py-1.5 rounded-full">
                          Save ৳{combo.price - combo.discountPrice}
                        </span>
                      )}
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
