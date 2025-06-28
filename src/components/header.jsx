import { FaShoppingCart, FaUserCircle, FaBars } from "react-icons/fa";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function Header() {
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <header className="bg-white dark:bg-gray-900 shadow-md w-full px-6 md:px-10 h-[80px] flex items-center justify-between sticky top-0 z-50 transition duration-300">
            {/* Logo */}
            <div className="flex items-center space-x-3">
                <img
                    src="/logofb.png"
                    alt="Logo"
                    className="h-12 w-12 rounded-full object-cover shadow-md cursor-pointer "
                />
                <h1 className="text-2xl font-extrabold text-white hover:text-blue-400 transition duration-300 tracking-wide font-sans">
                    Mahee Fashion
                </h1>
            </div>

            {/* Desktop Nav */}
            <nav className="hidden md:flex space-x-8">
                {[
                    { path: "/", label: "Home" },
                    { path: "/product", label: "Products" },
                    { path: "/about", label: "About Us" },
                    { path: "/contact", label: "Contact" }
                ].map(({ path, label }) => (
                    <Link
                        key={path}
                        to={path}
                        className="text-gray-700 dark:text-gray-300 text-lg font-medium hover:text-blue-600 transition border-b-2 border-transparent hover:border-blue-600"
                    >
                        {label}
                    </Link>
                ))}
            </nav>

            {/* Right Icons */}
            <div className="flex items-center space-x-4 text-xl">
                <Link
                    to="/cart"
                    className="text-gray-600 dark:text-gray-300 hover:text-blue-600 transition"
                    title="Cart"
                >
                    <FaShoppingCart />
                </Link>
                <Link
                    to="/login"
                    className="text-gray-600 dark:text-gray-300 hover:text-blue-600 transition"
                    title="Login"
                >
                    <FaUserCircle />
                </Link>

                {/* Mobile Menu Toggle */}
                <button
                    className="md:hidden text-gray-600 dark:text-gray-300 hover:text-blue-600 transition"
                    onClick={() => setMenuOpen(!menuOpen)}
                >
                    <FaBars />
                </button>
            </div>

            {/* Mobile Dropdown */}
            {menuOpen && (
                <div className="absolute top-[80px] left-0 w-full bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 flex flex-col items-center md:hidden shadow-md z-40">
                    {[
                        { path: "/", label: "Home" },
                        { path: "/product", label: "Products" },
                        { path: "/about", label: "About Us" },
                        { path: "/contact", label: "Contact" }
                    ].map(({ path, label }) => (
                        <Link
                            key={path}
                            to={path}
                            onClick={() => setMenuOpen(false)}
                            className="w-full text-center py-3 text-gray-700 dark:text-gray-300 hover:bg-blue-100 dark:hover:bg-blue-700 transition"
                        >
                            {label}
                        </Link>
                    ))}
                </div>
            )}
        </header>
    );
}