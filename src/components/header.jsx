import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
    HiOutlineUser,
    HiOutlineShoppingCart,
} from "react-icons/hi2";
import CategoryBar from "./categoryBar";
import TopBar from "./TopBar";

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [showScrollTop, setShowScrollTop] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setShowScrollTop(window.scrollY > 100);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (
        <header className="w-full">
            {showScrollTop && (
                <button
                    onClick={scrollToTop}
                    className="fixed bottom-5 right-5 bg-orange-700 text-white px-4 py-2 rounded-full shadow-md transition z-50"
                >
                    ↑ Top
                </button>
            )}

            <div className="sticky top-0 z-50 bg-white shadow-md">
                <div className="w-full px-4 md:px-10 py-4 flex flex-col md:flex-row md:items-center md:justify-between">
                    {/* Logo & Hamburger */}
                    <div className="flex items-center justify-between w-full md:w-auto">
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="md:hidden text-gray-700 mr-2"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        </button>
                        <Link to="/" className="flex flex-col items-center md:items-start text-orange-400 w-full">
                            <span className="text-xl font-bold uppercase">Mahee Fashion.lk</span>
                            <span className="text-xs text-orange-300 -mt-1">
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
                        <div className="flex w-full max-w-xl">
                            <input
                                type="text"
                                placeholder="Search"
                                className="w-full border border-gray-300 px-4 py-2 rounded-none"
                            />
                            <button className="bg-orange-400 text-white px-5">Search</button>
                        </div>
                    </div>

                    {/* Desktop Icons */}
                    <div className="hidden md:flex items-center space-x-6">
                        <Link to="/login" className="flex items-center gap-2 text-sm text-gray-800">
                            <HiOutlineUser className="text-2xl" />
                            <div className="flex flex-col leading-tight">
                                <span className="font-semibold">My Account</span>
                                <span className="text-xs text-gray-500">Log In</span>
                            </div>
                        </Link>
                        <Link to="/cart" className="flex items-center gap-2 text-sm text-gray-800">
                            <HiOutlineShoppingCart className="text-2xl" />
                            <span className="font-semibold">Cart (0)</span>
                        </Link>
                    </div>
                </div>

                {/* CategoryBar: Handles both mobile & desktop */}
                <CategoryBar isMobileOpen={isMenuOpen} />
            </div>
        </header>
    );
}
