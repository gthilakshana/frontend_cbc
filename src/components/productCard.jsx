import { Link } from "react-router-dom";
// import { addToCart } from "../utils/cartFunction";
// import { toast } from "react-hot-toast";

export default function ProductCard({ product }) {
    const isInStock = product.stock > 0;

    // function onAddtoCartClick() {
    //     if (!isInStock) {
    //         toast.error("Product is out of stock");
    //         return;
    //     }
    //     addToCart(product.productId, 1);
    //     toast.success("Product added to cart");
    // }

    return (
        <div
            className={`w-[270px] h-[470px] bg-white border shadow  overflow-hidden flex flex-col relative transition duration-300 
            ${!isInStock ? "opacity-60 grayscale pointer-events-none" : "hover:shadow-lg"}`}
        >
            {/* Stock Badge */}
            <div
                className={`absolute top-2 left-2 text-xs px-2 py-1 rounded-md z-10 font-semibold ${isInStock ? "bg-gray-800 text-white" : "bg-orange-600 text-white"
                    }`}
            >
                {isInStock ? "In Stock" : "Out of Stock"}
            </div>

            {/* Product Image */}
            <Link to={`/productInfo/${product.productId}`} className="block">
                <img
                    src={product.images?.[0] || "/placeholder.jpg"}
                    alt={product.productName}
                    className="w-full h-[320px] object-cover transition-transform duration-300 hover:scale-105"
                />
            </Link>

            {/* Info */}
            <div className="flex-1 p-4 flex flex-col">
                <Link to={`/productInfo/${product.productId}`} className="hover:underline mb-1">
                    <h2 className="text-sm font-medium text-gray-800 line-clamp-2 leading-tight uppercase">
                        {product.productName}
                    </h2>
                </Link>

                {/* Price and EMI */}
                <div className="mt-1 mb-1">
                    <p className="text-lg font-semibold text-gray-900">
                        Rs {product.lastPrice?.toLocaleString() || "0.00"}
                    </p>

                </div>

                {/* Sizes */}
                <div className="mt-2 flex gap-2 flex-wrap">
                    {product.sizes?.map((size, idx) => (
                        <span
                            key={idx}
                            className="border border-gray-300 px-2 py-1 text-xs text-gray-700 rounded"
                        >
                            {size}
                        </span>
                    ))}
                </div>
            </div>
        </div>
    );
}
