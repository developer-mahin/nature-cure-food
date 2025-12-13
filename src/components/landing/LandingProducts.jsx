"use client";

const LandingProducts = ({
  products = [],
  selectedProduct,
  setSelectedProduct,
}) => {
  // handle product select
  const handleProductSelect = (product) => {
    setSelectedProduct((pre) =>
      pre.some((p) => p._id === product._id)
        ? pre.filter((p) => p._id !== product._id)
        : [...pre, product]
    );
  };

  return (
    <div className="space-y-3">
      {products.map((product) => {
        const selected = selectedProduct.some((p) => p._id === product._id);

        return (
          <div
            key={product._id}
            onClick={() => handleProductSelect(product)}
            className={`flex items-start gap-4 p-4 py-6 border rounded-sm cursor-pointer ${
              selected ? "border-green-500" : "border-gray-300"
            }`}
          >
            <input type="checkbox" checked={selected} />

            <div className="size-16">
              <img src={product.img} alt="product" />
            </div>

            <div>
              <h3 className="text-lg text-[#566376] font-semibold">
                {product.title}
              </h3>

              <p className="text-md mt-1 text-[#7e8896]">{product.price}</p>

              <p className="text-md font-semibold mt-2 text-[#566376]">
                {product.dis_price && (
                  <span className="line-through text-gray-400 mr-2">
                    {product.dis_price}৳
                  </span>
                )}
                {product.price}৳
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default LandingProducts;
