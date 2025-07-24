import { FaShoppingCart, FaEye } from "react-icons/fa";

export default function ProductListCard({ product }) {
    return (
        <div className="bg-white border rounded-md shadow-sm flex flex-col sm:flex-row overflow-hidden w-full">
            {/* Image Section */}
            <div className="w-full sm:w-1/4 flex items-center justify-center p-4">
                <img
                    src={product.images?.[0] || "/placeholder.jpg"}
                    alt={product.productName}
                    className="object-contain max-h-36"
                />
            </div>

            {/* Details Section */}
            <div className="w-full sm:w-3/5 p-4 flex flex-col justify-center gap-1">
                <p className="text-sm text-gray-500 font-medium">{product.brands?.[0] || "Brand"}</p>
                <h2 className="text-lg font-semibold text-gray-800 line-clamp-2">{product.productName}</h2>
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
                <button className="w-full bg-orange-400 hover:bg-orange-600 text-white py-2  flex items-center justify-center gap-2">
                    <FaShoppingCart /> Add To Cart
                </button>
                <button className="w-full bg-orange-400 hover:bg-orange-600 text-white py-2  flex items-center justify-center gap-2">
                    <FaEye /> Quick View
                </button>
            </div>
        </div>
    );
}
