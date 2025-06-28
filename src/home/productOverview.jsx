import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import ImageSlider from "../components/ImageSlider"; // Adjust path as needed

export default function ProductOverview() {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [status, setStatus] = useState("loading");

    useEffect(() => {
        axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/products/${id}`)
            .then((res) => {
                if (res.data) {
                    setProduct(res.data);
                    setStatus("found");
                } else {
                    setStatus("not-found");
                }
            })
            .catch(() => setStatus("not-found"));
    }, [id]);

    return (
        <div className="w-full bg-gray-100 text-gray-800 font-body">
            {/* Loading */}
            {status === "loading" && (
                <div className="w-full h-full flex justify-center items-center">
                    <div className="animate-spin rounded-full h-24 w-24 border-4 border-gray-300 border-t-blue-500"></div>
                </div>
            )}

            {/* Not Found */}
            {status === "not-found" && (
                <div className="w-full h-full flex flex-col justify-center items-center bg-gray-100 text-center px-4 py-12">
                    <h1 className="text-6xl font-extrabold text-blue-600 mb-4">404</h1>
                    <h2 className="text-2xl font-semibold mb-2">Product Not Found</h2>
                    <p className="text-gray-600 mb-6 max-w-md">
                        Sorry, the product you’re looking for doesn’t seem to exist or may have been removed.
                    </p>
                    <a
                        href="/product"
                        className="px-6 py-3 bg-blue-600 text-white text-lg rounded-lg hover:bg-blue-700 transition"
                    >
                        Go Back to Products
                    </a>
                </div>
            )}

            {/* Product Found */}
            {status === "found" && (
                <div className="w-full min-h-screen flex flex-col md:flex-row items-start justify-center px-6 py-12 bg-gray-50 gap-10">
                    {/* Image section */}
                    <div className="w-full md:w-1/2 max-w-xl">
                        <ImageSlider img={product.images} />
                    </div>

                    {/* Details section */}
                    <div className="w-full md:w-1/2 max-w-xl">
                        <h1 className="text-4xl font-bold mb-2">{product.productName}</h1>
                        <h2 className="text-lg text-gray-400 mb-4">{product.altNames.join(" | ")}</h2>

                        <div className="mb-4 text-2xl font-semibold">
                            {product.price > product.lastPrice && (
                                <span className="line-through text-red-500 mr-2">LKR. {product.price}</span>
                            )}
                            <span className="text-green-600">LKR. {product.lastPrice}</span>
                        </div>

                        <p className="text-lg text-gray-700 mb-8">{product.description}</p>

                        <button className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition">
                            Add to Cart
                        </button>
                    </div>
                </div>
            )}


        </div>
    );
}
