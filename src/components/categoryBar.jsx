import { useState } from "react";
import { FaChevronDown } from "react-icons/fa";
import { Link } from "react-router-dom";

const categories = [
    {
        title: "Women",
        megaMenu: [
            {
                section: "Clothing",
                items: [
                    "Dresses", "Tops", "Sarees", "Kurtis", "Tunics", "Lehengas", "Skirts", "Jeans",
                    "Trousers", "Shorts", "T-Shirts", "Jackets", "Sweaters", "Blouses", "Coats"
                ],
            },
            {
                section: "Lingerie & Sleepwear",
                items: [
                    "Bras", "Panties", "Sleepwear", "Shapewear", "Camisoles & Slips",
                    "Lingerie Sets", "Nightgowns", "Robes", "Babydolls", "Thermal Wear",
                    "Lounge Pants", "Maternity Lingerie", "Chemises", "Tank Tops", "Boyshorts"
                ],
            },
            {
                section: "Footwear",
                items: [
                    "Flats", "Heels", "Sneakers", "Sandals", "Boots", "Wedges", "Mules",
                    "Loafers", "Slippers", "Ballet Flats", "Block Heels", "Peep Toes",
                    "Platform Heels", "Sports Shoes", "Ethnic Footwear"
                ],
            },
            {
                section: "Accessories",
                items: [
                    "Bags", "Jewelry", "Watches", "Scarves", "Belts", "Hats & Caps",
                    "Hair Accessories", "Sunglasses", "Wallets", "Gloves", "Earrings",
                    "Necklaces", "Bracelets", "Rings", "Anklets"
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
                    "Shirts", "T-Shirts", "Trousers", "Jeans", "Shorts", "Suits", "Blazers",
                    "Sweatshirts", "Hoodies", "Jackets", "Vests", "Coats", "Ethnic Wear",
                    "Track Pants", "Polo Shirts"
                ],
            },
            {
                section: "Grooming & Skin Care",
                items: [
                    "Face Wash", "Shaving Cream", "Beard Oil", "Moisturizer", "Aftershave",
                    "Face Scrub", "Hair Wax", "Hair Gel", "Hair Cream", "Body Wash",
                    "Deodorants", "Colognes", "Shampoo", "Conditioner", "Trimmers"
                ],
            },
            {
                section: "Footwear",
                items: [
                    "Sneakers", "Running Shoes", "Loafers", "Boots", "Flip Flops",
                    "Formal Shoes", "Sandals", "Slippers", "Oxfords", "Derby Shoes",
                    "Brogues", "Driving Shoes", "Sports Shoes", "Slip-Ons", "Ethnic Footwear"
                ],
            },
            {
                section: "Accessories",
                items: [
                    "Watches", "Wallets", "Belts", "Ties", "Cufflinks", "Caps",
                    "Sunglasses", "Backpacks", "Duffel Bags", "Messenger Bags",
                    "Gloves", "Keychains", "Hats", "Bracelets", "Chains"
                ],
            },
        ],
    },
    {
        title: "Kids",
        megaMenu: [
            {
                section: "Girls",
                items: [
                    "Frocks", "Tops", "Skirts", "Jeans", "Dresses", "T-Shirts",
                    "Leggings", "Shorts", "Jackets", "Sweaters", "Shoes", "Sandals",
                    "Hair Bands", "Socks", "Nightwear"
                ],
            },
            {
                section: "Boys",
                items: [
                    "T-Shirts", "Shirts", "Pants", "Shorts", "Jeans", "Sweatshirts",
                    "Hoodies", "Track Pants", "Blazers", "Suits", "Shoes", "Sandals",
                    "Caps", "Socks", "Nightwear"
                ],
            },
            {
                section: "Infants",
                items: [
                    "Rompers", "Bodysuits", "Tops", "Bottoms", "Sets", "Socks",
                    "Bibs", "Onesies", "Caps", "Mittens", "Blankets", "Towels",
                    "Shoes", "Sweaters", "Thermals"
                ],
            },
        ],
    },
    {
        title: "Footwear",
        megaMenu: [
            {
                section: "All Footwear",
                items: [
                    "Sneakers", "Running Shoes", "Sandals", "Heels", "Boots", "Flip Flops",
                    "Slippers", "Loafers", "Wedges", "Mules", "Clogs", "Oxfords",
                    "Formal Shoes", "Ethnic Footwear", "Sports Shoes"
                ],
            },
        ],
    },
    {
        title: "Mother & Baby",
        megaMenu: [
            {
                section: "Essentials",
                items: [
                    "Maternity Dresses", "Nursing Bras", "Breast Pumps", "Baby Carriers", "Cribs",
                    "Diapers", "Wipes", "Baby Lotions", "Feeding Bottles", "Swaddles",
                    "Rattles", "Pacifiers", "Strollers", "Blankets", "Changing Mats"
                ],
            },
        ],
    },
    {
        title: "Accessories",
        megaMenu: [
            {
                section: "Fashion & Utility",
                items: [
                    "Bags", "Jewelry", "Watches", "Belts", "Scarves", "Hats", "Hair Accessories",
                    "Sunglasses", "Wallets", "Gloves", "Earrings", "Necklaces", "Bracelets",
                    "Rings", "Anklets"
                ],
            },
        ],
    },
    {
        title: "Brands",
        megaMenu: [
            {
                section: "Top Brands",
                items: [
                    "Nike", "Adidas", "Puma", "Reebok", "Zara", "H&M", "Levi's",
                    "Gucci", "Calvin Klein", "Tommy Hilfiger", "Louis Vuitton",
                    "Fila", "New Balance", "Under Armour", "Uniqlo"
                ],
            },
        ],
    },
    {
        title: "Gifts & Deals",

    },
    {
        title: "Sale",

    }
];


export default function CategoryBar({ isMobileOpen }) {
    const [openCategory, setOpenCategory] = useState(null);

    const toggleCategory = (title) => {
        setOpenCategory(openCategory === title ? null : title);
    };

    const formatPath = (category, sub = null) => {
        const cat = category.toLowerCase().replace(/\s+/g, "-");
        if (sub) {
            const subcat = sub.toLowerCase().replace(/\s+/g, "-");
            return `/category/${cat}/${subcat}`;
        }
        return `/category/${cat}`;
    };

    return (
        <>
            {/* Desktop Category Bar */}
            <nav className="hidden md:flex bg-gray-100 px-10 py-3 border-t border-gray-200 relative z-40">
                <ul className="flex flex-wrap space-x-6 text-sm font-medium text-gray-800 uppercase">
                    {categories.map((cat) => (
                        <li key={cat.title} className="relative group cursor-pointer">
                            <div className="flex items-center gap-1 hover:text-orange-400 transition">
                                <Link to={formatPath(cat.title)}>{cat.title}</Link>
                                {cat.megaMenu && (
                                    <FaChevronDown className="text-xs mt-0.5 transition-transform duration-300 group-hover:rotate-180" />
                                )}
                            </div>

                            {/* Mega Menu */}
                            {cat.megaMenu && (
                                <div className="absolute top-full left-0 right-0 mt-3 bg-white shadow-lg border border-gray-200 p-6 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 w-screen">
                                    <div className="w-full max-w-none mx-auto overflow-y-auto max-h-[80vh] px-10">
                                        <div className="grid grid-cols-2 xl:grid-cols-4 gap-6">
                                            {cat.megaMenu.map((section) => (
                                                <div key={section.section}>
                                                    <h4 className="text-sm font-semibold mb-3 text-gray-800">{section.section}</h4>
                                                    <ul className="space-y-2 text-sm text-gray-600">
                                                        {section.items.map((item) => (
                                                            <li key={item}>
                                                                <Link to={formatPath(cat.title, item)} className="hover:text-orange-500">
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
                                        <Link to={formatPath(cat.title)}>{cat.title}</Link>
                                        {cat.megaMenu && (
                                            <FaChevronDown
                                                className={`text-sm transition-transform duration-300 ${openCategory === cat.title ? "rotate-180" : ""
                                                    }`}
                                            />
                                        )}
                                    </div>

                                    {openCategory === cat.title && cat.megaMenu && (
                                        <div className="mt-2 ml-2 border-l border-gray-200 pl-3">
                                            {cat.megaMenu.map((section) => (
                                                <div key={section.section} className="mb-3">
                                                    <div className="text-sm font-medium text-gray-700 mb-1">{section.section}</div>
                                                    <ul className="ml-3 space-y-1 text-sm text-gray-600">
                                                        {section.items.map((item) => (
                                                            <li key={item}>
                                                                <Link
                                                                    to={formatPath(cat.title, item)}
                                                                    className="hover:text-orange-500 block"
                                                                    onClick={() => setOpenCategory(null)}
                                                                >
                                                                    {item}
                                                                </Link>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            ))}
                                        </div>
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
