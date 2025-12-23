import ProductImage from "../common/ProductImage";

const CornerRibbon = ({ text, color = "flatRed" }) => {
  return (
    <>
      <style
        dangerouslySetInnerHTML={{
          __html: `
          @keyframes fireFlicker {
            0%, 100% {
              opacity: 1;
              filter: brightness(1) drop-shadow(0 0 4px rgba(255, 69, 0, 0.8));
            }
            25% {
              opacity: 0.9;
              filter: brightness(1.2) drop-shadow(0 0 6px rgba(255, 100, 0, 1));
            }
            50% {
              opacity: 1;
              filter: brightness(1.1) drop-shadow(0 0 5px rgba(255, 50, 0, 0.9));
            }
            75% {
              opacity: 0.95;
              filter: brightness(1.15) drop-shadow(0 0 7px rgba(255, 80, 0, 1));
            }
          }
          @keyframes fireGlow {
            0%, 100% {
              background-position: 0% 50%;
            }
            50% {
              background-position: 100% 50%;
            }
          }
          @keyframes firePulse {
            0%, 100% {
              transform: scale(1);
            }
            50% {
              transform: scale(1.02);
            }
          }
          @keyframes flameFlicker {
            0% {
              transform: translateY(0) scaleY(1) scaleX(1);
              opacity: 1;
            }
            25% {
              transform: translateY(-2px) scaleY(1.1) scaleX(0.95);
              opacity: 0.9;
            }
            50% {
              transform: translateY(0) scaleY(0.95) scaleX(1.05);
              opacity: 1;
            }
            75% {
              transform: translateY(-1px) scaleY(1.05) scaleX(0.98);
              opacity: 0.95;
            }
            100% {
              transform: translateY(0) scaleY(1) scaleX(1);
              opacity: 1;
            }
          }
          @keyframes flameGlow {
            0%, 100% {
              filter: drop-shadow(0 0 3px rgba(255, 100, 0, 0.8)) drop-shadow(0 0 6px rgba(255, 69, 0, 0.6));
            }
            50% {
              filter: drop-shadow(0 0 5px rgba(255, 140, 0, 1)) drop-shadow(0 0 10px rgba(255, 100, 0, 0.8));
            }
          }
          @keyframes flameColorShift {
            0%, 100% {
              fill: #ff4500;
            }
            25% {
              fill: #ff6347;
            }
            50% {
              fill: #ff8c00;
            }
            75% {
              fill: #ff6b35;
            }
          }
          .fire-ribbon-animation {
            animation: fireFlicker 1.5s ease-in-out infinite,
                       firePulse 2.5s ease-in-out infinite;
            background: linear-gradient(
              90deg,
              #dc2626 0%,
              #ef4444 25%,
              #f97316 50%,
              #ef4444 75%,
              #dc2626 100%
            );
            background-size: 200% 100%;
            animation: fireFlicker 1.5s ease-in-out infinite,
                       fireGlow 4s ease infinite,
                       firePulse 2.5s ease-in-out infinite;
          }
          .fire-icon {
            animation: flameFlicker 1s ease-in-out infinite,
                       flameGlow 1.5s ease-in-out infinite;
          }
          .fire-icon path {
            animation: flameColorShift 2s ease-in-out infinite;
          }
        `,
        }}
      />
      <div className="absolute top-4 right-[-45px] rotate-45 z-10">
        <div className="fire-ribbon-animation relative text-white text-[10px] font-extrabold uppercase tracking-wider px-10 py-2 shadow-lg overflow-hidden flex items-center gap-1.5">
          {/* Animated Fire Icon */}
          <svg
            className="fire-icon w-5 h-5 flex-shrink-0"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12 2C12 2 8 6 8 10C8 12.5 9.5 14.5 12 14.5C14.5 14.5 16 12.5 16 10C16 6 12 2 12 2Z"
              fill="#ff4500"
              style={{
                animation: "flameColorShift 2s ease-in-out infinite",
              }}
            />
            <path
              d="M12 14.5C12 14.5 10 16 10 18C10 19.5 11 20.5 12 20.5C13 20.5 14 19.5 14 18C14 16 12 14.5 12 14.5Z"
              fill="#ff6347"
              style={{
                animation: "flameColorShift 2s ease-in-out infinite 0.5s",
              }}
            />
            <path
              d="M9 8C9 8 7 9 7 11C7 12 7.5 12.5 9 12.5C10.5 12.5 11 12 11 11C11 9 9 8 9 8Z"
              fill="#ff8c00"
              style={{
                animation: "flameColorShift 2s ease-in-out infinite 1s",
              }}
            />
            <path
              d="M15 8C15 8 17 9 17 11C17 12 16.5 12.5 15 12.5C13.5 12.5 13 12 13 11C13 9 15 8 15 8Z"
              fill="#ff8c00"
              style={{
                animation: "flameColorShift 2s ease-in-out infinite 1.5s",
              }}
            />
          </svg>
          {text}
          {/* Fire glow overlay */}
          <div
            className="absolute inset-0 opacity-30 pointer-events-none"
            style={{
              background:
                "radial-gradient(circle at 30% 50%, rgba(255, 165, 0, 0.6) 0%, transparent 50%), radial-gradient(circle at 70% 50%, rgba(255, 100, 0, 0.5) 0%, transparent 50%)",
              animation: "fireGlow 3s ease-in-out infinite alternate",
            }}
          />
        </div>
      </div>
    </>
  );
};

const ProductComponent = ({
  products,
  combos,
  page,
  isItemSelected,
  toggleItemSelection,
  decrementQuantity,
  incrementQuantity,
  quantities,
  deselectedItems = new Set(),
}) => {
  const isMultipleMode = page?.isMultiple;

  return (
    <div className="lg:w-[1280px] mx-auto px-3 sm:px-4 py-6 sm:py-8">
      <div className="flex items-center justify-between mb-4 sm:mb-6">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
          {isMultipleMode
            ? "Select Products or Combos"
            : "Select Product or Combo"}
        </h2>
      </div>
      <div className="space-y-3 sm:space-y-4 mb-8 sm:mb-12">
        {/* Products */}
        {products?.map((landingProduct) => {
          const product = landingProduct.product;
          const variant = landingProduct.variant;

          const isSelected =
            !deselectedItems.has(landingProduct.id) &&
            (isItemSelected(landingProduct.id, "product") ||
              (isMultipleMode && landingProduct.isSelected === true));

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
                <CornerRibbon text={landingProduct.badge} variant="flatRed" />
              )}

              {/* Selection Indicator - Checkbox or Radio Button */}
              <div className="flex-shrink-0 order-1">
                {isMultipleMode ? (
                  // Checkbox for multiple selection
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
                ) : (
                  // Radio button for single selection
                  <div
                    className={`w-5 h-5 sm:w-6 sm:h-6 rounded-full flex items-center justify-center border-2 transition-colors ${
                      isSelected
                        ? "bg-green-500 border-green-600"
                        : "bg-white border-gray-300"
                    }`}
                  >
                    {isSelected && (
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    )}
                  </div>
                )}
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
                  <span className="capitalize">{variant?.measurement}</span>{" "}
                  <span className="capitalize">{variant?.size}</span>)
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

          const isSelected =
            !deselectedItems.has(landingCombo.id) &&
            (isItemSelected(landingCombo.id, "combo") ||
              (isMultipleMode && landingCombo.isSelected === true));

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
                <CornerRibbon text={landingCombo.badge} variant="orange" />
              )}

              {/* Selection Indicator - Checkbox or Radio Button */}
              <div className="flex-shrink-0 order-1">
                {isMultipleMode ? (
                  // Checkbox for multiple selection
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
                ) : (
                  // Radio button for single selection
                  <div
                    className={`w-5 h-5 sm:w-6 sm:h-6 rounded-full flex items-center justify-center border-2 transition-colors ${
                      isSelected
                        ? "bg-green-500 border-green-600"
                        : "bg-white border-gray-300"
                    }`}
                  >
                    {isSelected && (
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    )}
                  </div>
                )}
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
                  {landingCombo.title || combo.name}
                </h3>
                {combo.description && (
                  <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                    {landingCombo.description || combo.description}
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
