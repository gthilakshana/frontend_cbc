import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import ImageSlider from "../components/imageSlider";

import Footer from "../components/footer";
import { FaShareAlt } from "react-icons/fa";

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
                <div className="w-full h-screen flex justify-center items-center">
                    <div className="animate-spin rounded-full h-20 w-20 border-4 border-gray-300 border-t-blue-500"></div>
                </div>
            )}

            {/* Not Found */}
            {status === "not-found" && (
                <div className="w-full min-h-screen flex flex-col justify-center items-center bg-gray-100 text-center px-4 py-12">
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
                <>
                    <div className="w-full min-h-screen flex flex-col md:flex-row items-start justify-center px-6 py-12 bg-gradient-to-br from-white via-gray-50 to-white gap-10">
                        {/* Image section */}
                        <div className="w-full md:w-1/2 max-w-xl">
                            <ImageSlider img={product.images} />
                        </div>

                        {/* Details section */}
                        <div className="w-full md:w-1/2 max-w-xl bg-white rounded-2xl p-6 shadow-md">
                            <div className="flex justify-between items-center">
                                <h1 className="text-2xl font-arial font-bold mb-2 text-gray-800">{product.productName}</h1>

                            </div>

                            <h2 className="text-md text-gray-500 mb-4">{product.altNames.join(" | ")}</h2>

                            <div className="mb-4 text-2xl font-semibold">
                                {product.price > product.lastPrice && (
                                    <span className="line-through text-red-500 mr-2">LKR. {product.price}</span>
                                )}
                                <span className="text-green-600">LKR. {product.lastPrice}</span>
                            </div>

                            <div className="flex flex-wrap gap-4 mb-6 mt-[120px]">
                                <button className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-300 shadow-md">
                                    Add to Cart
                                </button>
                                <button className="px-6 py-3 bg-gray-600 text-white font-semibold rounded-lg hover:bg-gray-700 transition duration-300 shadow-md">
                                    Buy Now
                                </button>
                                <button
                                    title="Share"
                                    className="px-4 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition duration-300 flex items-center gap-2 shadow-md"
                                >
                                    <FaShareAlt />
                                    <span className="hidden sm:inline">Share</span>
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Product Description Below */}
                    <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-md px-6 py-10 mt-10 mb-20">
                        <h2 className="text-3xl font-bold text-blue-800 mb-4">Product Description</h2>
                        <p className="text-gray-700 text-lg leading-relaxed">
                            {product.description}
                        </p>
                    </div>
                </>
            )}

            <Footer />
        </div>
    );
}