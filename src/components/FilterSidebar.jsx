import React, { useMemo } from "react";

export default function FilterSidebar({
    allProducts = [],
    selectedBrands = [],
    setSelectedBrands = () => { },
    selectedColors = [],
    setSelectedColors = () => { },
    selectedSizes = [],
    setSelectedSizes = () => { },
    priceRange = { min: "", max: "" },
    setPriceRange = () => { },
    stockFilter = "",
    setStockFilter = () => { },
    isMobile = false,
    showFilters = false,
}) {
    // Get unique brands/colors/sizes from products
    const uniqueBrands = useMemo(
        () => [...new Set(allProducts.flatMap(p => p.brands || []))],
        [allProducts]
    );

    const uniqueColors = useMemo(
        () => [...new Set(allProducts.flatMap(p => p.colors || []))],
        [allProducts]
    );

    const uniqueSizes = useMemo(
        () => [...new Set(allProducts.flatMap(p => p.sizes || []))],
        [allProducts]
    );

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

    const handleColorChange = (color) => {
        if (selectedColors.includes(color)) {
            setSelectedColors(selectedColors.filter((c) => c !== color));
        } else {
            setSelectedColors([...selectedColors, color]);
        }
    };

    const handleSizeChange = (size) => {
        if (selectedSizes.includes(size)) {
            setSelectedSizes(selectedSizes.filter((s) => s !== size));
        } else {
            setSelectedSizes([...selectedSizes, size]);
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
                        value={priceRange.min}
                        onChange={handlePriceChange}
                    />
                    <input
                        type="number"
                        name="max"
                        placeholder="To"
                        className="w-full border px-2 py-1 text-sm"
                        value={priceRange.max}
                        onChange={handlePriceChange}
                    />
                </div>
            </div>

            {/* Brand Filter */}
            <div>
                <h3 className="text-xs font-semibold uppercase mb-2">Brands</h3>
                {uniqueBrands.map((brand) => (
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

            {/* Color Filter */}
            <div>
                <h3 className="text-xs font-semibold uppercase mb-2">Colors</h3>
                {uniqueColors.map((color) => (
                    <label key={color} className="block text-sm mb-1">
                        <input
                            type="checkbox"
                            checked={selectedColors.includes(color)}
                            onChange={() => handleColorChange(color)}
                            className="mr-2"
                        />
                        {color}
                    </label>
                ))}
            </div>

            {/* Size Filter */}
            <div>
                <h3 className="text-xs font-semibold uppercase mb-2">Sizes</h3>
                {uniqueSizes.map((size) => (
                    <label key={size} className="block text-sm mb-1">
                        <input
                            type="checkbox"
                            checked={selectedSizes.includes(size)}
                            onChange={() => handleSizeChange(size)}
                            className="mr-2"
                        />
                        {size}
                    </label>
                ))}
            </div>
        </aside>
    );
}
