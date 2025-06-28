import { Link } from "react-router-dom";

export default function ProductCard({ product }) {
    return (
        <Link to={`/productInfo/${product.productId}`} className="group">
            <div className="w-[300px] h-[450px] bg-white  overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100">
                {/* Image */}
                <div className="w-full h-[250px] overflow-hidden">
                    <img
                        src={product.images[0]}
                        alt={product.productName}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                </div>

                {/* Details */}
                <div className="p-4 flex flex-col gap-2">
                    <h1 className="text-lg font-semibold text-gray-800 truncate">
                        {product.productName}
                    </h1>

                    <div className="text-gray-500 text-sm truncate">
                        {product.altNames?.join(" | ")}
                    </div>

                    <div className="mt-2">
                        {product.price > product.lastPrice ? (
                            <div className="text-md">
                                <span className="line-through text-red-500 mr-2">
                                    LKR. {product.price}
                                </span>
                                <span className="text-green-600 font-bold">
                                    LKR. {product.lastPrice}
                                </span>
                            </div>
                        ) : (
                            <div className="text-green-600 font-bold text-md">
                                LKR. {product.lastPrice}
                            </div>
                        )}
                    </div>

                    {/* CTA or Stock Status */}
                    <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700 transition">
                        View Details
                    </button>
                </div>
            </div>
        </Link>
    );
}
