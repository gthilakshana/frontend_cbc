import { FaShoppingCart, FaUserCircle, FaBars } from "react-icons/fa";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function Header() {
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <header className="bg-white shadow-md w-full px-6 md:px-10 h-[80px] flex items-center justify-between sticky top-0 z-50">
            {/* Logo */}
            <div className="flex items-center space-x-3">
                <img
                    src="/logofb.png"
                    alt="Logo"
                    className="h-12 w-12 rounded-full object-cover border border-gray-300 shadow-sm cursor-pointer"
                />
                <h1 className="text-xl sm:text-2xl font-bold text-blue-500 hover:text-blue-300 transition duration-200 tracking-wide">
                    Mahee Fashion
                </h1>
            </div>

            {/* Desktop Nav */}
            <nav className="hidden md:flex space-x-8">
                {["/", "/product", "/about", "/contact"].map((path, idx) => {
                    const labels = ["Home", "Products", "About Us", "Contact"];
                    return (
                        <Link
                            key={path}
                            to={path}
                            className="text-gray-700 text-lg font-medium hover:text-blue-500 transition border-b-2 border-transparent hover:border-blue-500"
                        >
                            {labels[idx]}
                        </Link>
                    );
                })}
            </nav>

            {/* Right Icons */}
            <div className="flex items-center space-x-4 text-xl">
                <Link
                    to="/cart"
                    className="text-gray-600 hover:text-blue-500 transition"
                    title="Cart"
                >
                    <FaShoppingCart />
                </Link>
                <Link
                    to="/login"
                    className="text-gray-600 hover:text-blue-500 transition"
                    title="Login"
                >
                    <FaUserCircle />
                </Link>

                {/* Mobile Menu Toggle */}
                <button
                    className="md:hidden text-gray-600 hover:text-blue-500 transition"
                    onClick={() => setMenuOpen(!menuOpen)}
                >
                    <FaBars />
                </button>
            </div>

            {/* Mobile Dropdown */}
            {menuOpen && (
                <div className="absolute top-[80px] left-0 w-full bg-white border-t border-gray-200 flex flex-col items-center md:hidden shadow-md z-40">
                    <Link
                        to="/"
                        onClick={() => setMenuOpen(false)}
                        className="w-full text-center py-3 text-gray-700 hover:bg-blue-100 transition"
                    >
                        Home
                    </Link>
                    <Link
                        to="/product"
                        onClick={() => setMenuOpen(false)}
                        className="w-full text-center py-3 text-gray-700 hover:bg-blue-100 transition"
                    >
                        Products
                    </Link>
                    <Link
                        to="/about"
                        onClick={() => setMenuOpen(false)}
                        className="w-full text-center py-3 text-gray-700 hover:bg-blue-100 transition"
                    >
                        About Us
                    </Link>
                    <Link
                        to="/contact"
                        onClick={() => setMenuOpen(false)}
                        className="w-full text-center py-3 text-gray-700 hover:bg-blue-100 transition"
                    >
                        Contact
                    </Link>
                </div>
            )}
        </header>
    );
}
