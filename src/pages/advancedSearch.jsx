import { useParams } from "react-router-dom";
import ProductCard from "../components/productCard";
import Footer from "../components/footer";

export default function AdvancedSearch() {
    const { sub } = useParams();

    // const categoryName = main?.charAt(0).toUpperCase() + main?.slice(1);
    const subCategoryName = sub
        ?.replace(/-/g, " ")
        .replace(/\b\w/g, (c) => c.toUpperCase());

    const dummyProducts = [...Array(8)].map((_, idx) => ({
        id: idx,
        productId: idx + 1,
        productName: `${subCategoryName} Product ${idx + 1}`,
        lastPrice: 3000 + idx * 500,
        stock: idx % 2 === 0 ? 5 : 0,
        sizes: ["S", "M", "L"],
        images: ["/path-to-image.jpg"],
    }));

    return (
        <div className="min-h-screen flex flex-col bg-gray-50">
            {/* Main Content */}
            <div className="flex-1 px-6 py-10">
                <h1 className="text-3xl font-semibold mb-6 text-center uppercase">
                    {subCategoryName}
                </h1>

                <div className="grid grid-cols-1 md:grid-cols-5 gap-8">

                    <aside className="md:col-span-1 space-y-6">
                        <div>
                            <h2 className="font-bold text-lg mb-2">Filter:</h2>


                            <div>
                                <h3 className="font-semibold mb-1">AVAILABILITY</h3>
                                <label className="block">
                                    <input type="checkbox" className="mr-2" /> In Stock (11)
                                </label>
                                <label className="block">
                                    <input type="checkbox" className="mr-2" /> Out Of Stock (1)
                                </label>
                            </div>

                            {/* Price */}
                            <div className="mt-4">
                                <h3 className="font-semibold mb-1">PRICE</h3>
                                <p className="text-sm mb-2">The highest price is Rs 31,815.00</p>
                                <div className="flex gap-2">
                                    <input
                                        placeholder="From"
                                        className="border px-2 py-1 w-full"
                                        type="number"
                                    />
                                    <input
                                        placeholder="To"
                                        className="border px-2 py-1 w-full"
                                        type="number"
                                    />
                                </div>
                            </div>

                            {/* Brands */}
                            <div className="mt-4">
                                <h3 className="font-semibold mb-1">BRAND</h3>
                                <label className="block">
                                    <input type="checkbox" className="mr-2" /> Cetaphil (1)
                                </label>
                                <label className="block">
                                    <input type="checkbox" className="mr-2" /> Dr. Rashel (3)
                                </label>
                                <label className="block">
                                    <input type="checkbox" className="mr-2" /> Egyptian Magic (2)
                                </label>
                                <label className="block">
                                    <input type="checkbox" className="mr-2" /> Fadeout (2)
                                </label>
                            </div>
                        </div>
                    </aside>

                    {/* Product Grid */}
                    <main className="md:col-span-4">
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

                        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
                            {dummyProducts.map((product) => (
                                <ProductCard key={product.id} product={product} />
                            ))}
                        </div>
                    </main>
                </div>
            </div>


            <Footer />
        </div>
    );
}
