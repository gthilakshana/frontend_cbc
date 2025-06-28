import axios from "axios"
import { useEffect } from "react"
import { useState } from "react"
import Footer from "../components/footer";

import ProductCard from "../components/productCard";

export default function Product() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);



    useEffect(() => {
        axios.get(import.meta.env.VITE_BACKEND_URL + "/api/products")
            .then((res) => {
                setProducts(res.data || []);
                setLoading(false);
            })
            .catch((err) => {
                console.error("Failed to load products:", err);
                setLoading(false);
            });
    }, []);

    return (
        <div className="w-full bg-gray-100 text-gray-800 font-body mt-5">
            {/* Heading */}
            <div className="mb-8 text-center">
                <h1 className="text-4xl font-bold text-gray-800 mb-2">All Products</h1>
                <p className="text-gray-500 text-lg">Discover our latest arrivals and timeless pieces</p>
            </div>

            {/* Optional: Filter or search (just UI placeholder) */}
            <div className="max-w-2xl mx-auto mb-10">
                <input
                    type="text"
                    placeholder="Search products..."
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>

            {/* Product Grid */}
            {loading ? (
                <div className="w-full h-40 flex justify-center items-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-4 border-gray-200 border-b-blue-500" />
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 place-items-center">
                    {products.length > 0 ? (
                        products.map((product) => (
                            <ProductCard key={product.productId} product={product} />
                        ))
                    ) : (
                        <p className="text-gray-500 col-span-full">No products found.</p>
                    )}
                </div>
            )}

            <div className="mt-8">
                <Footer />
            </div>
        </div>
    );

}