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

    const filteredProducts = useMemo(() => {
        return allProducts;
    }, [allProducts]);

    const uniqueBrands = useMemo(() => {
        return [...new Set(filteredProducts.flatMap(p => p.brands || []))];
    }, [filteredProducts]);

    const uniqueColors = useMemo(() => {
        return [...new Set(filteredProducts.flatMap(p => p.colors || []))];
    }, [filteredProducts]);

    const uniqueSizes = useMemo(() => {
        return [...new Set(filteredProducts.flatMap(p => p.sizes || []))];
    }, [filteredProducts]);

    const handlePriceChange = (e) => {
        const { name, value } = e.target;
        setPriceRange((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleChange = (item, list, setList) => {
        if (list.includes(item)) {
            setList(list.filter(i => i !== item));
        } else {
            setList([...list, item]);
        }
    };

    const handleStockChange = (e) => {
        const { value } = e.target;
        setStockFilter((prev) => (prev === value ? "" : value));
    };

    return (
        <aside className={`bg-white p-4 border rounded space-y-6 ${showFilters || !isMobile ? "block" : "hidden"} md:block md:col-span-1`}>
            <h2 className="text-base font-semibold uppercase mb-4">Filters</h2>

            {/* Stock */}
            <div>
                <h3 className="text-xs font-semibold uppercase mb-2">Availability</h3>
                <label className="block text-sm mb-1">
                    <input
                        type="checkbox"
                        value="in"
                        checked={stockFilter === "in"}
                        onChange={handleStockChange}
                        className="mr-2 accent-orange-600"
                    />
                    In Stock
                </label>
                <label className="block text-sm mb-1">
                    <input
                        type="checkbox"
                        value="out"
                        checked={stockFilter === "out"}
                        onChange={handleStockChange}
                        className="mr-2 accent-orange-600"
                    />
                    Out Of Stock
                </label>
            </div>

            {/* Price */}
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

            {/* Brands */}
            {uniqueBrands.length > 0 && (
                <div>
                    <h3 className="text-xs font-semibold uppercase mb-2">Brands</h3>
                    {uniqueBrands.map((brand) => (
                        <label key={brand} className="block text-sm mb-1">
                            <input
                                type="checkbox"
                                checked={selectedBrands.includes(brand)}
                                onChange={() => handleChange(brand, selectedBrands, setSelectedBrands)}
                                className="mr-2 accent-orange-600"
                            />
                            {brand}
                        </label>
                    ))}
                </div>
            )}

            {/* Colors */}
            {uniqueColors.length > 0 && (
                <div>
                    <h3 className="text-xs font-semibold uppercase mb-2">Colors</h3>
                    {uniqueColors.map((color) => (
                        <label key={color} className="block text-sm mb-1">
                            <input
                                type="checkbox"
                                checked={selectedColors.includes(color)}
                                onChange={() => handleChange(color, selectedColors, setSelectedColors)}
                                className="mr-2 accent-orange-600"
                            />
                            {color}
                        </label>
                    ))}
                </div>
            )}

            {/* Sizes */}
            {uniqueSizes.length > 0 && (
                <div>
                    <h3 className="text-xs font-semibold uppercase mb-2">Sizes</h3>
                    {uniqueSizes.map((size) => (
                        <label key={size} className="block text-sm mb-1">
                            <input
                                type="checkbox"
                                checked={selectedSizes.includes(size)}
                                onChange={() => handleChange(size, selectedSizes, setSelectedSizes)}
                                className="mr-2 accent-orange-600"
                            />
                            {size}
                        </label>
                    ))}
                </div>
            )}
        </aside>
    );
}
