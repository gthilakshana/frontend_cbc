import { useState } from "react";
import { Link } from "react-router-dom";
import { FaChevronDown } from "react-icons/fa";
import categories from "../data/categories";

export default function CategoryBar({ isMobileOpen, setIsMobileOpen }) {
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

                            {cat.megaMenu && (
                                <div className="absolute top-full left-0 right-0 mt-3 bg-white shadow-lg border border-gray-200 p-6 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 w-screen">
                                    <div className="w-full max-w-none mx-auto overflow-y-auto max-h-[80vh] px-10">
                                        <div className="grid grid-cols-2 xl:grid-cols-4 gap-6">
                                            {cat.megaMenu.map((section) => (
                                                <div key={section.section}>
                                                    <h4 className="text-sm font-semibold mb-3 text-gray-800">
                                                        {section.section}
                                                    </h4>
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
                <div className="md:hidden bg-white border-t border-gray-200 px-4 py-3 uppercase transition-all duration-300 ease-in-out">
                    <div className="max-h-[80vh] overflow-y-auto pr-2">
                        <ul className="space-y-4">
                            {categories.map((cat) => (
                                <li key={cat.title}>
                                    <div className="flex justify-between items-center font-semibold text-gray-800">
                                        <Link
                                            to={formatPath(cat.title)}
                                            className="hover:text-orange-500"
                                            onClick={() => {
                                                setOpenCategory(null);
                                                setIsMobileOpen(false);
                                            }}
                                        >
                                            {cat.title}
                                        </Link>
                                        {cat.megaMenu && (
                                            <FaChevronDown
                                                className={`text-sm cursor-pointer transition-transform duration-300 ${openCategory === cat.title ? "rotate-180" : ""}`}
                                                onClick={() => toggleCategory(cat.title)}
                                            />
                                        )}
                                    </div>

                                    <div
                                        className={`transition-all duration-300 ease-in-out overflow-hidden ${openCategory === cat.title ? "max-h-[1000px] mt-2" : "max-h-0"
                                            }`}
                                    >
                                        {cat.megaMenu && (
                                            <div className="ml-2 border-l border-gray-200 pl-3">
                                                {cat.megaMenu.map((section) => (
                                                    <div key={section.section} className="mb-3">
                                                        <div className="text-sm font-medium text-gray-700 mb-1">
                                                            {section.section}
                                                        </div>
                                                        <ul className="ml-3 space-y-1 text-sm text-gray-600">
                                                            {section.items.map((item) => (
                                                                <li key={item}>
                                                                    <Link
                                                                        to={formatPath(cat.title, item)}
                                                                        className="hover:text-orange-500 block"
                                                                        onClick={() => {
                                                                            setOpenCategory(null);
                                                                            setIsMobileOpen(false);
                                                                        }}
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
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            )}
        </>
    );
}
