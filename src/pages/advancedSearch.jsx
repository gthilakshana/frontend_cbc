// src/pages/AdvancedSearch.jsx
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { FaTh, FaList } from "react-icons/fa";
import ProductCard from "../components/ProductCard";
import ProductListCard from "../components/ProductListCard";
import Footer from "../components/Footer";

export default function AdvancedSearch() {
    const { sub } = useParams();
    const [viewMode, setViewMode] = useState("grid");
    const [showFilters, setShowFilters] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 768);
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const subCategoryName = sub
        ?.replace(/-/g, " ")
        .replace(/\b\w/g, (c) => c.toUpperCase());

    const dummyProducts = [...Array(8)].map((_, idx) => ({
        id: idx,
        productId: idx + 1,
        productName: `${subCategoryName} Product ${idx + 1}`,
        lastPrice: 5900 + idx * 100,
        price: 5300 + idx * 100,
        stock: idx % 2 === 0 ? 5 : 0,
        sizes: ["S", "M", "L"],
        brands: ["Puma"],
        description:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.",
        images: ["/images/sample-product.jpg"],
    }));

    return (
        <div className="min-h-screen flex flex-col bg-gray-50 ">
            <div className="px-4 pt-4 text-sm text-gray-600">
                <span className="hover:underline cursor-pointer">Home</span> {'>'} {subCategoryName}
            </div>

            <div className="px-4 md:px-6 py-6">
                <h1 className="text-2xl md:text-4xl font-semibold text-center uppercase">
                    {subCategoryName}
                </h1>
            </div>

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

            <div className="px-4 md:px-6 pb-8 grid grid-cols-1 md:grid-cols-5 gap-6">
                <div className={`${showFilters ? "block" : "hidden"} md:block md:col-span-1 space-y-6`}>
                    <h2 className="font-bold text-base uppercase tracking-wide mb-4">Filter:</h2>
                    <div>
                        <h3 className="font-semibold text-xs uppercase tracking-wide mb-2">Availability</h3>
                        <label className="block text-sm mb-2">
                            <input type="checkbox" className="mr-2" /> In Stock (11)
                        </label>
                        <label className="block text-sm mb-2">
                            <input type="checkbox" className="mr-2" /> Out Of Stock (1)
                        </label>
                    </div>
                    <div className="mt-6">
                        <h3 className="font-semibold text-xs uppercase tracking-wide mb-2">Price</h3>
                        <p className="text-sm text-gray-500 mb-2">The highest price is Rs 31,815.00</p>
                        <div className="flex gap-2">
                            <input placeholder="From" className="border px-2 py-1 w-full text-sm" type="number" />
                            <input placeholder="To" className="border px-2 py-1 w-full text-sm" type="number" />
                        </div>
                    </div>
                    <div className="mt-6">
                        <h3 className="font-semibold text-xs uppercase tracking-wide mb-2">Brand</h3>
                        <label className="block text-sm mb-2">
                            <input type="checkbox" className="mr-2" /> Cetaphil (1)
                        </label>
                        <label className="block text-sm mb-2">
                            <input type="checkbox" className="mr-2" /> Dr. Rashel (3)
                        </label>
                        <label className="block text-sm mb-2">
                            <input type="checkbox" className="mr-2" /> Egyptian Magic (2)
                        </label>
                        <label className="block text-sm mb-2">
                            <input type="checkbox" className="mr-2" /> Fadeout (2)
                        </label>
                    </div>
                </div>

                <div className="md:col-span-4 space-y-6">
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
                            <div className="text-gray-600">{dummyProducts.length} products</div>
                        </div>
                    </div>

                    {viewMode === "grid" ? (
                        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 px-1">
                            {dummyProducts.map((product) => (
                                <ProductCard key={product.id} product={product} />
                            ))}
                        </div>
                    ) : (
                        <div className="space-y-4 px-2">
                            {dummyProducts.map((product) => (
                                <ProductListCard key={product.id} product={product} />
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* <Footer /> */}
        </div>
    );
}
