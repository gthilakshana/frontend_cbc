import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { HiOutlineUser, HiOutlineShoppingCart } from "react-icons/hi2";
import CategoryBar from "./categoryBar";
import categories from "../data/categories";

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const navigate = useNavigate();


    const flatCategories = [];

    categories.forEach(category => {
        const main = category.title;
        if (!main) return;


        flatCategories.push({ category: main, subCategory: null });


        if (category.megaMenu && Array.isArray(category.megaMenu)) {
            category.megaMenu.forEach(section => {
                section.items?.forEach(item => {
                    flatCategories.push({ category: main, subCategory: item });
                });
            });
        }
    });

    const handleSearch = () => {
        const term = searchTerm.trim().toLowerCase();
        if (!term) return;

        const match = flatCategories.find(entry => {
            if (entry.subCategory) {
                return entry.subCategory.toLowerCase() === term;
            }
            return entry.category.toLowerCase() === term;
        });

        if (match) {
            if (match.subCategory) {
                navigate(`/category/${match.category}/${match.subCategory}`);
            } else {
                navigate(`/category/${match.category}`);
            }
        } else {
            navigate(`/search/${term}`);
        }

        setSearchTerm("");
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter") handleSearch();
    };

    return (
        <header className="w-full">
            <div className="bg-white shadow-md w-full px-4 md:px-10 py-4 flex flex-col md:flex-row md:items-center md:justify-between">

                <div className="flex items-center justify-between w-full md:w-auto">
                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="md:hidden text-gray-700 mr-2"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    </button>

                    <Link to="/" className="flex flex-col items-center md:items-start text-orange-500 w-full">
                        <span className="text-xl font-bold uppercase">Mahee Fashion</span>
                        <span className="text-xs text-orange-400 -mt-1">
                            Your Style, Our Passion
                        </span>
                    </Link>

                    {/* Mobile Icons */}
                    <div className="flex items-center space-x-4 md:hidden">
                        <Link to="/login" className="text-gray-800">
                            <HiOutlineUser className="text-2xl" />
                        </Link>
                        <Link to="/cart" className="text-gray-800">
                            <HiOutlineShoppingCart className="text-2xl" />
                        </Link>
                    </div>
                </div>

                {/* Search Bar */}
                <div className="mt-4 md:mt-0 w-full md:flex-1 flex justify-center">
                    <div className="flex w-full max-w-xl overflow-hidden border border-orange-500 rounded-md">
                        <input
                            type="text"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            onKeyDown={handleKeyDown}
                            placeholder="Search by category or subcategory..."
                            className="flex-1 px-5 py-2 text-[16px] md:text-sm focus:outline-none bg-white"
                            inputMode="search"
                        />
                        <button
                            className="bg-orange-500 hover:bg-orange-600 text-white px-6 text-sm font-medium transition"
                            onClick={handleSearch}
                        >
                            Search
                        </button>
                    </div>
                </div>

                {/* Desktop Icons */}
                <div className="hidden md:flex items-center space-x-6">
                    <Link
                        to="/login"
                        className="flex items-center gap-2 text-sm text-gray-800 hover:text-orange-600 transition-colors duration-200"
                    >
                        <HiOutlineUser className="text-2xl" />
                        <div className="flex flex-col leading-tight">
                            <span className="font-semibold">My Account</span>
                            <span className="text-xs text-gray-500">Log In</span>
                        </div>
                    </Link>

                    <Link
                        to="/cart"
                        className="flex items-center gap-2 text-sm text-gray-800 hover:text-orange-600 transition-colors duration-200"
                    >
                        <HiOutlineShoppingCart className="text-2xl" />
                        <span className="font-semibold">Cart (0)</span>
                    </Link>
                </div>
            </div>

            {/* CategoryBar */}
            <CategoryBar isMobileOpen={isMenuOpen} />
        </header>
    );
}