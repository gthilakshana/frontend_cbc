
import { FaChevronDown } from "react-icons/fa";

const categories = [
    {
        title: "Women",
        megaMenu: [
            {
                section: "Clothing",
                items: [
                    "Dresses",
                    "Tops & Tees",
                    "Blouses & Shirts",
                    "Skirts",
                    "Jeans",
                    "Trousers",
                    "Ethnic Wear"
                ],
            },
            {
                section: "Lingerie & Sleepwear",
                items: [
                    "Bras",
                    "Panties",
                    "Sleepwear",
                    "Shapewear",
                    "Camisoles & Slips"
                ],
            },
            {
                section: "Footwear",
                items: [
                    "Flats",
                    "Heels",
                    "Sneakers",
                    "Sandals",
                    "Boots"
                ],
            },
            {
                section: "Accessories",
                items: [
                    "Bags",
                    "Jewelry",
                    "Watches",
                    "Scarves",
                    "Belts",
                    "Hats & Caps"
                ],
            },
        ],
    },
    {
        title: "Men",
        megaMenu: [
            {
                section: "Clothing",
                items: [
                    "Shirts",
                    "T-Shirts",
                    "Jeans",
                    "Trousers",
                    "Blazers",
                    "Ethnic Wear"
                ],
            },
            {
                section: "Footwear",
                items: [
                    "Formal Shoes",
                    "Casual Shoes",
                    "Sneakers",
                    "Sandals",
                    "Loafers"
                ],
            },
            {
                section: "Accessories",
                items: [
                    "Belts",
                    "Wallets",
                    "Caps & Hats",
                    "Sunglasses",
                    "Watches"
                ],
            },
        ],
    },
    {
        title: "Kids",
        megaMenu: [
            {
                section: "Girls",
                items: ["Frocks", "Tops", "Skirts", "Jeans", "Shoes"],
            },
            {
                section: "Boys",
                items: ["T-Shirts", "Shirts", "Pants", "Shorts", "Shoes"],
            },
        ],
    },
    { title: "Footwear" },
    { title: "Mother & Baby" },
    { title: "Accessories" },
    { title: "Brands" },
    { title: "Gifts & Deals" },
    { title: "Sale" },
];



export default function CategoryBar({ isMobileOpen }) {
    return (
        <>
            {/* Desktop Category Bar */}
            <nav className="hidden md:flex bg-gray-100 px-10 py-3 border-t border-gray-200 relative z-40">
                <ul className="flex flex-wrap space-x-6 text-sm font-medium text-gray-800">
                    {categories.map((category) => (
                        <li key={category.title} className="relative group cursor-pointer">
                            <div className="flex items-center gap-1 hover:text-orange-400 transition">
                                <span>{category.title}</span>
                                {category.megaMenu && category.megaMenu.length > 0 && (
                                    <FaChevronDown className="text-xs mt-0.5" />
                                )}
                            </div>
                            {category.megaMenu && category.megaMenu.length > 0 && (
                                <div className="absolute top-full left-0 right-0 mt-3 bg-white shadow-lg border border-gray-200 p-6 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 w-screen">
                                    <div className="max-w-screen-2xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-6">
                                        {category.megaMenu.map((section) => (
                                            <div key={section.section}>
                                                <h4 className="text-sm font-semibold mb-3 text-gray-800">
                                                    {section.section}
                                                </h4>
                                                <ul className="space-y-2 text-sm text-gray-600">
                                                    {section.items.map((item) => (
                                                        <li key={item} className="hover:text-orange-500 cursor-pointer">
                                                            {item}
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                            )}
                        </li>
                    ))}
                </ul>
            </nav>

            {/* Mobile Category Menu */}
            {isMobileOpen && (
                <div className="md:hidden bg-white border-t border-gray-200 px-4 py-3">
                    <ul className="space-y-3">
                        {categories.map((cat) => (
                            <li key={cat.title}>
                                <div className="font-semibold text-gray-800">{cat.title}</div>
                                {cat.megaMenu?.length > 0 && (
                                    <ul className="ml-4 mt-1 text-sm text-gray-600 space-y-1 cursor-pointer">
                                        {cat.megaMenu.flatMap((section) =>
                                            section.items.map((item) => (
                                                <li key={item} className="hover:text-orange-500 ">
                                                    {item}
                                                </li>
                                            ))
                                        )}
                                    </ul>
                                )}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </>
    );
}
