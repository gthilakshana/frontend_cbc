import { FaShoppingCart, FaEye } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function ProductListCard({ product }) {
    return (
        <div className="bg-white border rounded-md shadow-sm flex flex-col sm:flex-row overflow-hidden w-full hover:shadow-md transition duration-200">
            {/* Image Section */}
            <Link
                to={`/productInfo/${product.productId}`}
                className="w-full sm:w-1/4 flex items-center justify-center p-4"
            >
                <img
                    src={product.images?.[0] || "/placeholder.jpg"}
                    alt={product.productName}
                    className="object-contain max-h-36"
                />
            </Link>

            {/* Details Section */}
            <div className="w-full sm:w-3/5 p-4 flex flex-col justify-center gap-1">
                <p className="text-sm text-gray-500 font-medium">{product.brands?.[0] || "Brand"}</p>
                <Link to={`/productInfo/${product.productId}`}>
                    <h2 className="text-lg font-semibold text-gray-800 line-clamp-2 hover:text-orange-600 transition">
                        {product.productName}
                    </h2>
                </Link>
                <p className="text-sm text-gray-600 line-clamp-2">{product.description}</p>
                <div className="mt-2">
                    <span className="text-lg font-bold text-gray-800">
                        Rs {product.price.toLocaleString()}
                    </span>
                    <span className="text-sm line-through text-gray-400 ml-2">
                        Rs {product.lastPrice.toLocaleString()}
                    </span>
                </div>
            </div>

            {/* Actions Section */}
            <div className="w-full sm:w-1/5 flex flex-col justify-center items-center gap-2 px-4 py-4 sm:py-0">
                <button className="w-full bg-orange-400 hover:bg-orange-600 text-white py-2 flex items-center justify-center gap-2">
                    <FaShoppingCart /> Add To Cart
                </button>
                <Link to={`/productInfo/${product.productId}`} className="w-full">
                    <button className="w-full bg-orange-400 hover:bg-orange-600 text-white py-2 flex items-center justify-center gap-2">
                        <FaEye /> Quick View
                    </button>
                </Link>
            </div>
        </div>
    );
}
