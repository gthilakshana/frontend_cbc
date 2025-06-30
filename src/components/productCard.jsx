import { Link } from "react-router-dom";
import { addToCart } from "../utils/cartFunction";
import { toast } from "react-hot-toast";


export default function ProductCard({ product }) {

    function onAddtoCartClick() {
        addToCart(product.productId, 1);
        toast.success("Product added to cart");
        console.log(product.productName);
    }

    return (
        <div className="w-[270px] bg-white border border-gray-200 shadow-md hover:shadow-lg transition duration-300  overflow-hidden flex flex-col">

            <Link to={`/productInfo/${product.productId}`} className="block">
                <img
                    src={product.images[0]}
                    alt={product.productName}
                    className="w-full h-[330px] object-cover transform hover:scale-105 transition-transform duration-500"
                />
            </Link>


            <div className="p-4 flex flex-col flex-grow">
                <Link to={`/productInfo/${product.productId}`} className="hover:underline">
                    <h2 className="text-lg font-semibold text-gray-900 truncate">{product.productName}</h2>
                </Link>

                {product.altNames?.length > 0 && (
                    <p className="text-sm text-gray-500 mt-1 truncate">
                        {product.altNames.join(" | ")}
                    </p>
                )}

                <span className="text-gray-400 text-sm mt-1">ID: {product.productId}</span>


                <div className="mt-3">
                    {product.price > product.lastPrice ? (
                        <div className="text-md">
                            <span className="line-through text-red-400 mr-2">LKR. {product.price}</span>
                            <span className="text-green-600 font-bold">LKR. {product.lastPrice}</span>
                        </div>
                    ) : (
                        <div className="text-green-600 font-bold text-md">LKR. {product.lastPrice}</div>
                    )}
                </div>


                <div className="mt-auto pt-6 flex items-center justify-between">
                    <button
                        onClick={onAddtoCartClick}
                        type="button"
                        className="px-4 py-2 w-[120px] bg-blue-500 text-white text-sm font-medium  hover:bg-blue-600 transition"
                        title="Add to Cart"
                    >
                        Add to Cart
                    </button>

                    <Link
                        to={`/productInfo/${product.productId}`}
                        className="text-blue-600 font-semibold text-sm hover:underline transition"
                        title="View Details"
                    >
                        View
                    </Link>
                </div>
            </div>
        </div>
    );
}
