import { Link } from "react-router-dom";

export default function ProductCard({ product }) {
    const isInStock = product.stock > 0;

    return (
        <div
            className={`w-full h-full bg-white border shadow overflow-hidden flex flex-col relative transition duration-300 
        ${!isInStock ? "opacity-60 grayscale pointer-events-none" : "hover:shadow-lg"}`}
        >
            {/* Stock Badge */}
            <div
                className={`absolute top-2 left-2 text-xs px-2 py-1 rounded-md z-10 font-semibold 
          ${isInStock ? "bg-gray-800 text-white" : "bg-orange-600 text-white"}`}
            >
                {isInStock ? "In Stock" : "Out of Stock"}
            </div>

            {/* Product Image */}
            <Link to={`/productInfo/${product.productId}`} className="block">
                <img
                    src={product.images?.[0] || "/placeholder.jpg"}
                    alt={product.productName}
                    className="w-full h-[300px] object-cover transition-transform duration-300 hover:scale-105"
                />
            </Link>

            {/* Info */}
            <div className="flex-1 p-4 flex flex-col justify-between">
                <Link to={`/productInfo/${product.productId}`} className="hover:underline mb-1">
                    <h2 className="text-sm font-medium text-gray-800 line-clamp-2 leading-tight uppercase">
                        {product.productName}
                    </h2>
                </Link>

                <div className="mt-1 mb-1">
                    <p className="text-lg font-semibold text-gray-900">
                        Rs {product.lastPrice?.toLocaleString() || "0.00"}
                    </p>
                </div>

                <div className="mt-2 flex gap-2 flex-wrap">
                    {product.sizes?.map((size, idx) => (
                        <span
                            key={idx}
                            className="border border-orange-500 px-2 py-1 text-xs text-orange-600 rounded"
                        >
                            {size}
                        </span>
                    ))}
                </div>

            </div>
        </div>
    );
}
