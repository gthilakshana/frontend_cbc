import React from "react";

export default function FilterSidebar({
    priceRange = { min: "", max: "" },
    setPriceRange = () => { },
    selectedBrands = [],
    setSelectedBrands = () => { },
    stockFilter = "",
    setStockFilter = () => { },
    isMobile = false,
    showFilters = false,
}) {
    const brands = ["Puma", "Adidas", "Nike"];

    const handlePriceChange = (e) => {
        const { name, value } = e.target;
        setPriceRange((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleBrandChange = (brand) => {
        if (selectedBrands.includes(brand)) {
            setSelectedBrands(selectedBrands.filter((b) => b !== brand));
        } else {
            setSelectedBrands([...selectedBrands, brand]);
        }
    };

    const handleStockChange = (e) => {
        const { value } = e.target;
        setStockFilter((prev) => (prev === value ? "" : value));
    };

    return (
        <aside
            className={`bg-white p-4 border rounded space-y-6 ${showFilters || !isMobile ? "block" : "hidden"
                } md:block md:col-span-1`}
        >
            <h2 className="text-base font-semibold uppercase mb-4">Filters</h2>

            {/* Availability Filter */}
            <div>
                <h3 className="text-xs font-semibold uppercase mb-2">Availability</h3>
                <label className="block text-sm mb-1">
                    <input
                        type="checkbox"
                        value="in"
                        checked={stockFilter === "in"}
                        onChange={handleStockChange}
                        className="mr-2"
                    />
                    In Stock
                </label>
                <label className="block text-sm mb-1">
                    <input
                        type="checkbox"
                        value="out"
                        checked={stockFilter === "out"}
                        onChange={handleStockChange}
                        className="mr-2"
                    />
                    Out Of Stock
                </label>
            </div>

            {/* Price Filter */}
            <div>
                <h3 className="text-xs font-semibold uppercase mb-2">Price</h3>
                <div className="flex gap-2">
                    <input
                        type="number"
                        name="min"
                        placeholder="From"
                        className="w-full border px-2 py-1 text-sm"
                        value={priceRange?.min ?? ""}
                        onChange={handlePriceChange}
                    />
                    <input
                        type="number"
                        name="max"
                        placeholder="To"
                        className="w-full border px-2 py-1 text-sm"
                        value={priceRange?.max ?? ""}
                        onChange={handlePriceChange}
                    />
                </div>
            </div>

            {/* Brand Filter */}
            <div>
                <h3 className="text-xs font-semibold uppercase mb-2">Brand</h3>
                {brands.map((brand) => (
                    <label key={brand} className="block text-sm mb-1">
                        <input
                            type="checkbox"
                            checked={selectedBrands.includes(brand)}
                            onChange={() => handleBrandChange(brand)}
                            className="mr-2"
                        />
                        {brand}
                    </label>
                ))}
            </div>
        </aside>
    );
}
