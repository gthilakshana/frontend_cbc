import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { FaTh, FaList } from "react-icons/fa";
import ProductListCard from "../components/ProductListCard";
import FooterSmall from "../components/footerSmall";
import FilterSidebar from "../components/FilterSidebar";
import ProductCard from "../components/productCard.jsx";
import axios from "axios";

export default function AdvancedSearch() {
    const { category, subcategory, term } = useParams();
    const navigate = useNavigate();

    const [viewMode, setViewMode] = useState("grid");
    const [showFilters, setShowFilters] = useState(false);
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [sortOption, setSortOption] = useState("Featured");

    // Filters
    const [priceRange, setPriceRange] = useState({ min: "", max: "" });
    const [stockFilter, setStockFilter] = useState("");
    const [selectedBrands, setSelectedBrands] = useState([]);
    const [selectedColors, setSelectedColors] = useState([]);
    const [selectedSizes, setSelectedSizes] = useState([]);

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

                setProducts(allProducts);
            } catch (err) {
                console.error("Error fetching products:", err);
                setProducts([]);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    useEffect(() => {
        let filtered = [];

        // Initial filter by category/term
        if (term) {
            const searchTerm = term.toLowerCase().trim();
            filtered = products.filter(
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

            filtered = products.filter(
                (product) =>
                    Array.isArray(product.categories) &&
                    product.categories.some(
                        (cat) =>
                            cat?.title?.toLowerCase().trim() === catLower &&
                            cat?.subCategory?.toLowerCase().trim() === subLower
                    )
            );
        } else if (category) {
            const catLower = category.toLowerCase().trim();
            filtered = products.filter(
                (product) =>
                    Array.isArray(product.categories) &&
                    product.categories.some(
                        (cat) => cat?.title?.toLowerCase().trim() === catLower
                    )
            );
        } else {
            filtered = [...products];
        }

        // Apply Stock Filter
        if (stockFilter === "in") {
            filtered = filtered.filter((p) => p.stock > 0);
        } else if (stockFilter === "out") {
            filtered = filtered.filter((p) => p.stock === 0);
        }

        // Apply Price Filter
        filtered = filtered.filter((p) => {
            const min = Number(priceRange.min) || 0;
            const max = Number(priceRange.max) || Infinity;
            return p.price >= min && p.price <= max;
        });

        // Apply Brand Filter
        if (selectedBrands.length > 0) {
            filtered = filtered.filter((p) =>
                p.brands?.some((brand) => selectedBrands.includes(brand))
            );
        }

        // Apply Color Filter
        if (selectedColors.length > 0) {
            filtered = filtered.filter((p) =>
                p.colors?.some((color) => selectedColors.includes(color))
            );
        }

        // Apply Size Filter
        if (selectedSizes.length > 0) {
            filtered = filtered.filter((p) =>
                p.sizes?.some((size) => selectedSizes.includes(size))
            );
        }

        // Apply Sorting
        if (sortOption === "Lowest Price") {
            filtered = filtered.sort((a, b) => Number(a.price) - Number(b.price));
        } else if (sortOption === "Highest Price") {
            filtered = filtered.sort((a, b) => Number(b.price) - Number(a.price));
        }

        setFilteredProducts(filtered);
    }, [
        products,
        category,
        subcategory,
        term,
        sortOption,
        stockFilter,
        priceRange,
        selectedBrands,
        selectedColors,
        selectedSizes,
    ]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-white">
                <div className="animate-spin h-12 w-12 border-4 border-gray-300 border-t-orange-500 rounded-full" />
            </div>
        );
    }

    return (
        <div className="min-h-screen flex flex-col bg-gray-50">
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
                <h1 className="text-2xl md:text-4xl  font-bold uppercase text-center mb-8">
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
                    {/* Sidebar Filters */}
                    {(showFilters || !isMobile) && (
                        <FilterSidebar
                            allProducts={products}
                            selectedBrands={selectedBrands}
                            setSelectedBrands={setSelectedBrands}
                            selectedColors={selectedColors}
                            setSelectedColors={setSelectedColors}
                            selectedSizes={selectedSizes}
                            setSelectedSizes={setSelectedSizes}
                            priceRange={priceRange}
                            setPriceRange={setPriceRange}
                            stockFilter={stockFilter}
                            setStockFilter={setStockFilter}
                            isMobile={isMobile}
                            showFilters={showFilters}
                        />
                    )}

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
                                <span className="font-medium text-gray-700">Sort by:</span>

                                <select
                                    className="border px-3 py-1 rounded-md bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-orange-500"
                                    value={sortOption}
                                    onChange={(e) => setSortOption(e.target.value)}
                                >
                                    <option className="bg-white text-gray-700" value="featured">Featured</option>
                                    <option className="bg-white text-gray-700" value="low">Lowest Price</option>
                                    <option className="bg-white text-gray-700" value="high">Highest Price</option>
                                </select>

                                <span className="text-gray-600">
                                    {filteredProducts.length} product{filteredProducts.length !== 1 && "s"}
                                </span>
                            </div>

                        </div>

                        <div className={`${viewMode === "grid"
                            ? "grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6"
                            : "space-y-4"
                            }`}>
                            {filteredProducts.length > 0 ? (
                                filteredProducts.map((product) =>
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
            <FooterSmall />
        </div>
    );
}
