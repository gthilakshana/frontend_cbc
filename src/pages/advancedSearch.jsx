import { Routes, Route } from "react-router-dom";
import Trousers from "./home/categoriesList/women/trousers";


export default function AdvancedSearch() {
    return (
        <div className="px-6 py-10">
            <h1 className="text-3xl font-semibold mb-6 text-center">Fairness</h1>

            <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
                {/* Sidebar Filter */}
                <aside className="md:col-span-1 space-y-6">
                    <div>
                        <h2 className="font-bold text-lg mb-2">Filter:</h2>
                        {/* Availability */}
                        <div>
                            <h3 className="font-semibold mb-1">AVAILABILITY</h3>
                            <label className="block"><input type="checkbox" /> In Stock (11)</label>
                            <label className="block"><input type="checkbox" /> Out Of Stock (1)</label>
                        </div>

                        {/* Price */}
                        <div className="mt-4">
                            <h3 className="font-semibold mb-1">PRICE</h3>
                            <p className="text-sm mb-2">The highest price is Rs 31,815.00</p>
                            <div className="flex gap-2">
                                <input placeholder="From" className="border px-2 py-1 w-full" />
                                <input placeholder="To" className="border px-2 py-1 w-full" />
                            </div>
                        </div>

                        {/* Brands */}
                        <div className="mt-4">
                            <h3 className="font-semibold mb-1">BRAND</h3>
                            <label className="block"><input type="checkbox" /> Cetaphil (1)</label>
                            <label className="block"><input type="checkbox" /> Dr. Rashel (3)</label>
                            <label className="block"><input type="checkbox" /> Egyptian Magic (2)</label>
                            <label className="block"><input type="checkbox" /> Fadeout (2)</label>
                        </div>
                    </div>
                </aside>

                {/* Products Grid */}
                <main className="md:col-span-4">
                    {/* Header Controls */}
                    <div className="flex items-center justify-between mb-6">
                        <div className="flex gap-2">
                            <button className="border p-2"><i className="fas fa-th"></i></button>
                            <button className="border p-2"><i className="fas fa-list"></i></button>
                        </div>
                        <div className="flex items-center gap-2">
                            <span>Sort by:</span>
                            <select className="border px-2 py-1">
                                <option>Featured</option>
                                <option>Lowest Price</option>
                                <option>Highest Price</option>
                            </select>
                        </div>
                    </div>

                    {/* Products */}
                    <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
                        {[...Array(4)].map((_, idx) => (
                            <div key={idx} className="border rounded-md p-4 hover:shadow-lg transition">
                                <img src="/path-to-image.jpg" alt="product" className="h-40 mx-auto mb-4 object-contain" />
                                <p className="text-sm text-gray-500">Egyptian Magic</p>
                                <h3 className="font-medium text-sm mb-2">Product Name Here</h3>
                                <p className="text-orange-600 font-bold mb-2">Rs 6,000.00</p>
                                <button className="bg-orange-500 text-white w-full py-2 rounded hover:bg-orange-600 transition">Add To Cart</button>
                            </div>
                        ))}
                    </div>
                </main>
            </div>
        </div>
    );
}