import { useState } from "react";
import { FaChevronDown } from "react-icons/fa";
import { Link } from "react-router-dom";

const categories = [
    {
        title: "Women",
        megaMenu: [
            {
                section: "Clothing",
                items: ["Dresses", "Tops & Tees", "Blouses & Shirts", "Skirts", "Jeans", "Trousers", "Ethnic Wear"],
            },
            {
                section: "Lingerie & Sleepwear",
                items: ["Bras", "Panties", "Sleepwear", "Shapewear", "Camisoles & Slips"],
            },
            {
                section: "Footwear",
                items: ["Flats", "Heels", "Sneakers", "Sandals", "Boots"],
            },
            {
                section: "Accessories",
                items: ["Bags", "Jewelry", "Watches", "Scarves", "Belts", "Hats & Caps"],
            },
        ],
    },
    {
        title: "Men",
        megaMenu: [
            {
                section: "Men Skin Care",
                items: [
                    "Men Face Wash & Scrub",
                    "Men Face Cream",
                    "Men Fairness",
                    "Men Moisturizers",
                    "Men Exfoliators",
                    "Men Body Care",
                    "Men Hand & Foot Care",
                ],
            },
            {
                section: "Men Hair Care",
                items: [
                    "Men Shampoo",
                    "Men Conditioner",
                    "Men Hair Cream & Lotion",
                    "Men Hair Styling",
                    "Men Hair Colors",
                    "Men Treatments & Oils",
                    "Beard Care",
                ],
            },
            {
                section: "Men Toiletries",
                items: ["Men Bath & Shower", "Men Soap", "Men Shaving", "Men Dental"],
            },
            {
                section: "Men Fragrance",
                items: ["Men Perfume", "Men Perfumed Lotions & Creams", "Men Body Sprays & Mist", "Men Deodorant"],
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
    const [openCategory, setOpenCategory] = useState(null);

    const toggleCategory = (title) => {
        setOpenCategory(openCategory === title ? null : title);
    };

    const formatPath = (category, item) =>
        `/category/${category.toLowerCase()}/${item.toLowerCase().replace(/\s+/g, "-")}`;

    return (
        <>
            {/* Desktop Category Bar */}
            <nav className="hidden md:flex bg-gray-100 px-10 py-3 border-t border-gray-200 relative z-40">
                <ul className="flex flex-wrap space-x-6 text-sm font-medium text-gray-800 uppercase">
                    {categories.map((category) => (
                        <li key={category.title} className="relative group cursor-pointer">
                            <div className="flex items-center gap-1 hover:text-orange-400 transition">
                                <span>{category.title}</span>
                                {category.megaMenu && category.megaMenu.length > 0 && (
                                    <FaChevronDown className="text-xs mt-0.5 transition-transform duration-300 group-hover:rotate-180" />
                                )}
                            </div>

                            {category.megaMenu && category.megaMenu.length > 0 && (
                                <div className="absolute top-full left-0 right-0 mt-3 bg-white shadow-lg border border-gray-200 p-6 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 w-screen">
                                    <div className="w-full max-w-none mx-auto overflow-y-auto max-h-[80vh] px-10">
                                        <div className="grid grid-cols-2 xl:grid-cols-4 gap-6">
                                            {category.megaMenu.map((section) => (
                                                <div key={section.section}>
                                                    <h4 className="text-sm font-semibold mb-3 text-gray-800">
                                                        {section.section}
                                                    </h4>
                                                    <ul className="space-y-2 text-sm text-gray-600">
                                                        {section.items.map((item) => (
                                                            <li key={item}>
                                                                <Link
                                                                    to={formatPath(category.title, item)}
                                                                    className="hover:text-orange-500 cursor-pointer"
                                                                >
                                                                    {item}
                                                                </Link>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            ))}
                                        </div>
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
                    <div className="max-h-[80vh] overflow-y-auto pr-2">
                        <ul className="space-y-4">
                            {categories.map((cat) => (
                                <li key={cat.title}>
                                    <div
                                        className="flex justify-between items-center font-semibold text-gray-800 cursor-pointer"
                                        onClick={() => toggleCategory(cat.title)}
                                    >
                                        <span>{cat.title}</span>
                                        {cat.megaMenu && (
                                            <FaChevronDown
                                                className={`text-sm transition-transform duration-300 ${openCategory === cat.title ? "rotate-180" : ""
                                                    }`}
                                            />
                                        )}
                                    </div>

                                    {openCategory === cat.title && cat.megaMenu?.length > 0 && (
                                        <ul className="ml-4 mt-2 space-y-3">
                                            {cat.megaMenu.map((section) => (
                                                <li key={section.section}>
                                                    <div className="text-sm font-medium text-gray-700 mb-1">
                                                        {section.section}
                                                    </div>
                                                    <ul className="ml-3 space-y-1 text-sm text-gray-600">
                                                        {section.items.map((item) => (
                                                            <li key={item}>
                                                                <Link
                                                                    to={formatPath(cat.title, item)}
                                                                    className="hover:text-orange-500 cursor-pointer"
                                                                >
                                                                    {item}
                                                                </Link>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            )}
        </>
    );
}
