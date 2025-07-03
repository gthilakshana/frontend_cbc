import axios from "axios";
import { useEffect, useState } from "react";
import Footer from "../../components/footer";
import ProductCard from "../../components/productCard";

export default function Product() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchText, setSearchText] = useState("");

    useEffect(() => {
        axios
            .get(import.meta.env.VITE_BACKEND_URL + "/api/products")
            .then((res) => {
                setProducts(res.data || []);
                setLoading(false);
            })
            .catch((err) => {
                console.error("Failed to load products:", err);
                setLoading(false);
            });
    }, []);


    const filteredProducts = products.filter((product) =>
        product.productName.toLowerCase().includes(searchText.toLowerCase())
    );

    return (
        <div className="min-h-screen flex flex-col">
            {/* Main Content */}
            <main className="flex-grow w-full bg-gray-100 text-gray-800 font-body">
                <section className="bg-white py-16 px-4 sm:px-6 lg:px-8">

                    <div className="mb-10 text-center">
                        <h1 className="text-4xl sm:text-4xl  tracking-tight text-gray-800 ">
                            All PRODUCT
                        </h1>
                        <p className="mt-4 text-lg text-gray-500 font-light">
                            Discover our latest arrivals and timeless pieces
                        </p>
                    </div>

                    {/* Search Input */}
                    <div className="max-w-2xl mx-auto mb-12">
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Search for dresses, tops, etc..."
                                value={searchText}
                                onChange={(e) => setSearchText(e.target.value)}
                                className="w-full px-5 py-3 border border-gray-300 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-800 focus:border-gray-800 transition duration-300 placeholder-gray-400 text-sm sm:text-base"
                            />
                            <svg
                                className="w-5 h-5 text-gray-400 absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-5.2-5.2m0 0A7.2 7.2 0 1010 17.8a7.2 7.2 0 005.8-1.9z" />
                            </svg>
                        </div>
                    </div>
                </section>


                <section className="mb-10">
                    {/* Product Grid */}
                    {loading ? (
                        <div className="w-full h-screen flex justify-center items-center">
                            <div className="animate-spin rounded-full h-12 w-12 border-4 border-gray-200 border-b-orange-500" />
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-5 place-items-center px-4">
                            {filteredProducts.length > 0 ? (
                                filteredProducts.map((product) => (
                                    <ProductCard key={product.productId} product={product} />
                                ))
                            ) : (
                                <p className="text-gray-500 col-span-full text-center">No products found.</p>
                            )}
                        </div>
                    )}
                </section>


            </main>

            <Footer />

        </div>

    );
}
