import { Link } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";

export default function ProductCard({ product }) {
    return (
        <div className="w-[300px] bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-200 overflow-hidden flex flex-col">
            {/* Image */}
            <Link to={`/productInfo/${product.productId}`} className="block overflow-hidden h-[250px] rounded-t-lg">
                <img
                    src={product.images[0]}
                    alt={product.productName}
                    className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500"
                />
            </Link>

            {/* Details */}
            <div className="p-5 flex flex-col flex-grow">
                <Link to={`/productInfo/${product.productId}`} className="hover:underline">
                    <h2 className="text-xl font-semibold text-gray-900 truncate">{product.productName}</h2>
                </Link>

                <p className="text-sm text-gray-500 mt-1 truncate">
                    {product.altNames?.join(" | ")}
                </p>

                <div className="mt-3">
                    {product.price > product.lastPrice ? (
                        <div className="text-md">
                            <span className="line-through text-red-500 mr-2">LKR. {product.price}</span>
                            <span className="text-green-700 font-bold">LKR. {product.lastPrice}</span>
                        </div>
                    ) : (
                        <div className="text-green-700 font-bold text-md">LKR. {product.lastPrice}</div>
                    )}
                </div>

                {/* Actions */}
                <div className="mt-auto flex items-center justify-between pt-6">
                    <button
                        type="button"
                        className="flex items-center gap-2 px-5 py-3 rounded-md bg-blue-600 text-white font-semibold shadow-md hover:bg-blue-700 transition duration-300"
                        title="Add to Cart"
                    >
                        <FaShoppingCart className="text-lg" /> Add to Cart
                    </button>

                    <Link
                        to={`/productInfo/${product.productId}`}
                        className="text-blue-600 font-semibold hover:underline transition duration-300"
                        title="View Details"
                    >
                        View Details
                    </Link>
                </div>
            </div>
        </div>
    );
}
