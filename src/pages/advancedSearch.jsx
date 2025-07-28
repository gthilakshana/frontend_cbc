import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { FaTh, FaList } from "react-icons/fa";
import ProductListCard from "../components/ProductListCard";
import ProductCard from "../components/productCard";
import axios from "axios";

export default function AdvancedSearch() {
    const { category, subcategory, term } = useParams();
    const navigate = useNavigate();

    const [viewMode, setViewMode] = useState("grid");
    const [showFilters, setShowFilters] = useState(false);
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    const displayTitle = term || subcategory || category || "Search";

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 768);
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setLoading(true);
                const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/products`);
                let allProducts = res.data;

                if (!Array.isArray(allProducts)) {
                    console.error("Expected array from /api/products but got:", allProducts);
                    allProducts = [];
                }

                let filtered = [];

                if (term) {
                    const searchTerm = term.toLowerCase().trim();
                    filtered = allProducts.filter(
                        (product) =>
                            (product.productName &&
                                product.productName.toLowerCase().includes(searchTerm)) ||
                            (Array.isArray(product.altNames) &&
                                product.altNames.some((alt) =>
                                    alt?.toLowerCase().includes(searchTerm)
                                ))
                    );
                } else if (category && subcategory) {
                    const catLower = category.toLowerCase().trim();
                    const subLower = subcategory.toLowerCase().trim();

                    filtered = allProducts.filter(
                        (product) =>
                            Array.isArray(product.categories) &&
                            product.categories.some(
                                (cat) =>
                                    cat?.title?.toLowerCase().trim() === catLower &&
                                    (
                                        cat?.subCategory?.toLowerCase().trim() === subLower ||
                                        (Array.isArray(cat?.subCategories) &&
                                            cat.subCategories.some(
                                                (s) => s?.toLowerCase().trim() === subLower
                                            ))
                                    )
                            )
                    );
                } else if (category) {
                    const catLower = category.toLowerCase().trim();

                    filtered = allProducts.filter(
                        (product) =>
                            Array.isArray(product.categories) &&
                            product.categories.some(
                                (cat) =>
                                    cat?.title?.toLowerCase().trim() === catLower
                            )
                    );
                }

                setProducts(filtered);
            } catch (err) {
                console.error("Error fetching products:", err);
                setProducts([]);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, [category, subcategory, term]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-white">
                <div className="animate-spin h-12 w-12 border-4 border-gray-300 border-t-gray-800 rounded-full" />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 px-4 md:px-8 py-6">
            {/* Breadcrumb */}
            <div className="text-sm text-gray-600 mb-4">
                <span
                    className="cursor-pointer hover:underline"
                    onClick={() => navigate("/")}
                >
                    Home
                </span>{" "}
                &gt; {displayTitle}
            </div>

            {/* Title */}
            <h1 className="text-2xl md:text-4xl font-bold uppercase text-center mb-8">
                {displayTitle}
            </h1>

            {/* Mobile Filters */}
            {isMobile && (
                <div className="mb-4 flex justify-center">
                    <button
                        className="text-sm px-4 py-2 border rounded font-medium bg-white"
                        onClick={() => setShowFilters(!showFilters)}
                    >
                        {showFilters ? "Hide Filters" : "Show Filters"}
                    </button>
                </div>
            )}

            {/* Main Grid */}
            <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
                {/* Sidebar */}
                <aside
                    className={`bg-white p-4 border rounded space-y-6 ${showFilters || !isMobile ? "block" : "hidden"
                        } md:block md:col-span-1`}
                >
                    <h2 className="text-base font-semibold uppercase mb-4">Filters</h2>

                    <div>
                        <h3 className="text-xs font-semibold uppercase mb-2">Availability</h3>
                        <label className="block text-sm mb-1">
                            <input type="checkbox" className="mr-2" /> In Stock
                        </label>
                        <label className="block text-sm mb-1">
                            <input type="checkbox" className="mr-2" /> Out Of Stock
                        </label>
                    </div>

                    <div>
                        <h3 className="text-xs font-semibold uppercase mb-2">Price</h3>
                        <div className="flex gap-2">
                            <input
                                type="number"
                                placeholder="From"
                                className="w-full border px-2 py-1 text-sm"
                            />
                            <input
                                type="number"
                                placeholder="To"
                                className="w-full border px-2 py-1 text-sm"
                            />
                        </div>
                    </div>

                    <div>
                        <h3 className="text-xs font-semibold uppercase mb-2">Brand</h3>
                        {["Puma", "Adidas", "Nike"].map((brand) => (
                            <label key={brand} className="block text-sm mb-1">
                                <input type="checkbox" className="mr-2" /> {brand}
                            </label>
                        ))}
                    </div>
                </aside>

                {/* Main Content */}
                <main className="md:col-span-4 bg-white p-4 md:p-6 border rounded space-y-6">
                    <div className="flex flex-col md:flex-row md:justify-between gap-4 items-center">
                        <div className="flex gap-2">
                            <button
                                onClick={() => setViewMode("grid")}
                                className={`p-2 border rounded ${viewMode === "grid" ? "text-black" : "text-gray-400"}`}
                            >
                                <FaTh />
                            </button>
                            <button
                                onClick={() => setViewMode("list")}
                                className={`p-2 border rounded ${viewMode === "list" ? "text-black" : "text-gray-400"}`}
                            >
                                <FaList />
                            </button>
                        </div>

                        <div className="flex items-center gap-4 text-sm">
                            <span>Sort by:</span>
                            <select className="border px-2 py-1 rounded">
                                <option>Featured</option>
                                <option>Lowest Price</option>
                                <option>Highest Price</option>
                            </select>
                            <span className="text-gray-600">
                                {products.length} product{products.length !== 1 && "s"}
                            </span>
                        </div>
                    </div>

                    <div
                        className={`${viewMode === "grid"
                            ? "grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6"
                            : "space-y-4"
                            }`}
                    >
                        {products.length > 0 ? (
                            products.map((product) =>
                                viewMode === "list" ? (
                                    <ProductListCard key={product._id} product={product} />
                                ) : (
                                    <ProductCard key={product._id} product={product} />
                                )
                            )
                        ) : (
                            <p className="text-center text-gray-500 col-span-full">
                                No products found.
                            </p>
                        )}
                    </div>
                </main>
            </div>
        </div>
    );
}
