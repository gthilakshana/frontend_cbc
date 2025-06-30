import { useEffect, useState } from "react";
import axios from "axios";
import {
    AiOutlinePlus,
    AiOutlineMinus,
    AiOutlineDelete,
    AiOutlineHeart,
} from "react-icons/ai";

export default function CartCard({ productId, qty, onDelete }) {
    const [product, setProduct] = useState(null);

    useEffect(() => {
        axios
            .get(import.meta.env.VITE_BACKEND_URL + `/api/products/${productId}`)
            .then((res) => setProduct(res.data))
            .catch((err) => console.error("Failed to load product:", err));
    }, [productId]);

    if (!product) {
        return (
            <div className="p-4 bg-white border-b w-full text-sm text-gray-500">
                Loading product: {productId}
            </div>
        );
    }

    return (
        <div className="flex w-full bg-white border-b py-4 px-6 items-start space-x-4">
            <input type="checkbox" className="mt-3" />


            <img
                src={product.images[0]}

                className="w-20 h-20 object-cover rounded"
            />


            <div className="flex-1 space-y-1">
                <h2 className="font-semibold text-gray-800 text-sm">{product.productName}</h2>
                <p className="text-xs text-gray-600">
                    No Brand, Color Family: {product.colors ?? "N/A"}, Size:{" "}
                    {product.sizes ?? "N/A"}
                </p>
                <p className="text-xs text-red-600 font-medium">
                    Only {product.stock ?? 0} item(s) in stock
                </p>


                <div className="flex items-center justify-between mt-2">
                    <div className="flex items-center space-x-2 text-orange-600 font-bold text-lg">
                        <span>Rs. {product.lastPrice}</span>
                        {product.lastPrice && (
                            <span className="text-gray-400 line-through text-sm">
                                Rs. {product.price}
                            </span>
                        )}
                    </div>


                    <div className="flex items-center space-x-2 border rounded px-2 py-1">
                        <button>
                            <AiOutlineMinus />
                        </button>
                        <span>{qty}</span>
                        <button>
                            <AiOutlinePlus />
                        </button>
                    </div>
                </div>


                <div className="flex space-x-4 mt-2 text-gray-500 text-lg">
                    <AiOutlineHeart className="cursor-pointer" />
                    <AiOutlineDelete
                        className="cursor-pointer"
                        onClick={() => {
                            console.log("Deleting:", productId);
                            onDelete(productId);
                        }}
                    />
                </div>
            </div>
        </div>
    );
}
