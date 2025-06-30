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
                <section>
                    {/* Heading */}
                    <div className="mb-8 text-center  p-6">
                        <h1 className="text-4xl font-bold text-gray-800 mb-2">All Products</h1>
                        <p className="text-gray-500 text-lg">Discover our latest arrivals and timeless pieces</p>
                    </div>

                    {/* Search Input */}
                    <div className="max-w-[600px] mx-auto mb-10 px-4">
                        <input
                            type="text"
                            placeholder="Search products..."
                            value={searchText}
                            onChange={(e) => setSearchText(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                </section>

                <section className="mb-10">
                    {/* Product Grid */}
                    {loading ? (
                        <div className="w-full h-40 flex justify-center items-center">
                            <div className="animate-spin rounded-full h-12 w-12 border-4 border-gray-200 border-b-blue-500" />
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


            <footer className="w-full">
                <Footer />
            </footer>
        </div>

    );
}
