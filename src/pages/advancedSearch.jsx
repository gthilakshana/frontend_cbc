// src/pages/AdvancedSearch.jsx
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
    const [isMobile, setIsMobile] = useState(false);
    const [products, setProducts] = useState([]);

    // Resize check
    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 768);
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const displayTitle = term
        ? term.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())
        : subcategory
            ? subcategory.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())
            : category
                ? category.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())
                : "Search";

    // Fetch & filter products
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get("/api/products");
                const allProducts = response.data;

                const filtered = allProducts.filter((product) => {
                    if (term) {
                        const termLower = term.toLowerCase();
                        return (
                            product.productName.toLowerCase().includes(termLower) ||
                            product.altNames?.some((name) =>
                                name.toLowerCase().includes(termLower)
                            )
                        );
                    } else if (category && subcategory) {
                        return product.categories?.some(
                            (c) =>
                                c.title?.toLowerCase() === category.toLowerCase() &&
                                c.subCategory?.toLowerCase() === subcategory.toLowerCase()
                        );
                    } else if (category) {
                        return product.categories?.some(
                            (c) => c.title?.toLowerCase() === category.toLowerCase()
                        );
                    }
                    return false;
                });

                setProducts(filtered);
            } catch (error) {
                console.error("Fetch failed:", error);
            }
        };

        fetchProducts();
    }, [category, subcategory, term]);

    const handleCardClick = (productId) => {
        if (productId) {
            navigate(`/productinfo/${productId}`);
        }
    };

    return (
        <div className="min-h-screen flex flex-col bg-gray-50">
            {/* Breadcrumb */}
            <div className="px-4 pt-4 text-sm text-gray-600">
                <span className="hover:underline cursor-pointer" onClick={() => navigate("/")}>
                    Home
                </span>{" "}
                &gt; {displayTitle}
            </div>

            {/* Title */}
            <div className="px-4 md:px-6 py-6">
                <h1 className="text-2xl md:text-4xl font-semibold text-center uppercase">
                    {displayTitle}
                </h1>
            </div>

            {/* Mobile Filters */}
            {isMobile && (
                <div className="px-4 mb-4">
                    <button
                        className="border px-4 py-2 rounded text-sm font-semibold"
                        onClick={() => setShowFilters(!showFilters)}
                    >
                        {showFilters ? "Hide Filters" : "Show Filters"}
                    </button>
                </div>
            )}

            {/* Main Section */}
            <div className="px-4 md:px-6 pb-8 grid grid-cols-1 md:grid-cols-5 gap-6">
                {/* Filter Sidebar */}
                <div className={`${showFilters ? "block" : "hidden"} md:block md:col-span-1 space-y-6`}>
                    <h2 className="font-bold text-base uppercase tracking-wide mb-4">Filter:</h2>

                    {/* Availability */}
                    <div>
                        <h3 className="font-semibold text-xs uppercase tracking-wide mb-2">Availability</h3>
                        <label className="block text-sm mb-2">
                            <input type="checkbox" className="mr-2" /> In Stock
                        </label>
                        <label className="block text-sm mb-2">
                            <input type="checkbox" className="mr-2" /> Out Of Stock
                        </label>
                    </div>

                    {/* Price */}
                    <div className="mt-6">
                        <h3 className="font-semibold text-xs uppercase tracking-wide mb-2">Price</h3>
                        <p className="text-sm text-gray-500 mb-2">Set your desired price range</p>
                        <div className="flex gap-2">
                            <input placeholder="From" className="border px-2 py-1 w-full text-sm" type="number" />
                            <input placeholder="To" className="border px-2 py-1 w-full text-sm" type="number" />
                        </div>
                    </div>

                    {/* Brand */}
                    <div className="mt-6">
                        <h3 className="font-semibold text-xs uppercase tracking-wide mb-2">Brand</h3>
                        <label className="block text-sm mb-2">
                            <input type="checkbox" className="mr-2" /> Puma
                        </label>
                        <label className="block text-sm mb-2">
                            <input type="checkbox" className="mr-2" /> Adidas
                        </label>
                        <label className="block text-sm mb-2">
                            <input type="checkbox" className="mr-2" /> Nike
                        </label>
                    </div>
                </div>

                {/* Product Grid/List */}
                <div className="md:col-span-4 space-y-6">
                    {/* Controls */}
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                        <div className="flex gap-2">
                            <button
                                className={`border p-2 rounded ${viewMode === "grid" ? "text-black" : "text-gray-400"}`}
                                onClick={() => setViewMode("grid")}
                            >
                                <FaTh />
                            </button>
                            <button
                                className={`border p-2 rounded ${viewMode === "list" ? "text-black" : "text-gray-400"}`}
                                onClick={() => setViewMode("list")}
                            >
                                <FaList />
                            </button>
                        </div>

                        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 text-sm">
                            <div className="flex items-center gap-2">
                                <span>Sort by:</span>
                                <select className="border px-2 py-1 text-sm">
                                    <option>Featured</option>
                                    <option>Lowest Price</option>
                                    <option>Highest Price</option>
                                </select>
                            </div>
                            <div className="text-gray-600">{products.length} products</div>
                        </div>
                    </div>

                    {/* Product Display */}
                    {viewMode === "grid" ? (
                        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 px-1">
                            {products.map((product) => (
                                <div
                                    key={product._id}
                                    onClick={() => handleCardClick(product.productId)}
                                    className="cursor-pointer"
                                >
                                    <ProductCard product={product} />
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="space-y-4 px-2">
                            {products.map((product) => (
                                <div
                                    key={product._id}
                                    onClick={() => handleCardClick(product.productId)}
                                    className="cursor-pointer"
                                >
                                    <ProductListCard product={product} />
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
