import { FaShoppingCart, FaEye } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function ProductListCard({ product }) {
    return (
        <div className="bg-white  shadow-md overflow-hidden border transition hover:shadow-lg w-full flex flex-col sm:flex-row">

            <Link
                to={`/productInfo/${product.productId}`}
                className="w-full sm:w-1/4 bg-gray-100 flex items-center justify-center p-4"
            >
                <img
                    src={product.images?.[0] || "/placeholder.jpg"}
                    alt={product.productName}
                    className="object-contain h-36 sm:h-40"
                />
            </Link>


            <div className="w-full sm:w-2/4 px-4 py-3 flex flex-col justify-center gap-2">
                <p className="text-xs text-gray-500 uppercase tracking-wide">
                    {product.brands?.[0] || "Brand"}
                </p>
                <Link to={`/productInfo/${product.productId}`}>
                    <h2 className="sm:text-[16px] font-semibold text-gray-900 hover:text-orange-500 transition line-clamp-2 ">
                        {product.productName}
                    </h2>
                </Link>
                <p className="text-sm text-gray-600 line-clamp-2">{product.description}</p>
                <div className="mt-1 flex items-center gap-2">
                    <span className="text-lg font-bold text-gray-800">
                        Rs {product.price.toLocaleString()}
                    </span>
                    {product.lastPrice && (
                        <span className="text-sm text-gray-400 line-through">
                            Rs {product.lastPrice.toLocaleString()}
                        </span>
                    )}
                </div>
            </div>


            <div className="w-full sm:w-1/4 flex flex-col justify-center items-center gap-3 px-4 py-4 sm:py-0">
                <button className="w-full bg-orange-500 text-white hover:bg-orange-600 rounded-md py-2 flex items-center justify-center gap-2 text-sm transition">
                    <FaShoppingCart /> Add to Cart
                </button>
                <Link to={`/productInfo/${product.productId}`} className="w-full">
                    <button className="w-full border border-gray-300 hover:bg-gray-100 rounded-md py-2 flex items-center justify-center gap-2 text-sm transition">
                        <FaEye /> Quick View
                    </button>
                </Link>
            </div>
        </div>
    );
}
