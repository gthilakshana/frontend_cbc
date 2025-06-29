import { FaShoppingCart, FaUserCircle, FaBars } from "react-icons/fa";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function Header() {
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <header className=" bg-gray-900 shadow-md w-full px-6 md:px-10 h-[80px] flex items-center justify-between sticky top-0 z-50 transition duration-300">

            <div className="flex items-center space-x-3">
                <h1 className="text-2xl font-extrabold text-white hover:text-blue-400 transition duration-300 tracking-wide font-sans">
                    Mahee Fashion
                </h1>
            </div>


            <div className="hidden md:flex items-center space-x-6">

                <nav className="flex space-x-6">
                    {[
                        { path: "/", label: "Home" },
                        { path: "/product", label: "Products" },
                        { path: "/about", label: "About Us" },
                        { path: "/contact", label: "Contact" },
                    ].map(({ path, label }) => (
                        <Link
                            key={path}
                            to={path}
                            className="text-gray-700 dark:text-gray-300 text-lg font-medium hover:text-white transition border-b-2 border-transparent hover:border-blue-600"
                        >
                            {label}
                        </Link>
                    ))}
                </nav>


                <Link
                    to="/cart"
                    className="text-gray-600 dark:text-gray-300 hover:text-white transition text-xl"
                    title="Cart"
                >
                    <FaShoppingCart />
                </Link>
                <Link
                    to="/login"
                    className="text-gray-600 dark:text-gray-300 hover:text-white transition text-xl"
                    title="Login"
                >
                    <FaUserCircle />
                </Link>
            </div>

            {/* Mobile Menu Toggle */}
            <div className="bg-gray-900 md:hidden text-xl flex items-center space-x-4">
                <Link
                    to="/cart"
                    className="text-gray-600 dark:text-gray-300 hover:text-white transition"
                    title="Cart"
                >
                    <FaShoppingCart />
                </Link>
                <Link
                    to="/login"
                    className="text-gray-600 dark:text-gray-300 hover:text-white transition"
                    title="Login"
                >
                    <FaUserCircle />
                </Link>
                <button
                    className="text-gray-600 dark:text-gray-300 hover:text-white transition"
                    onClick={() => setMenuOpen(!menuOpen)}
                >
                    <FaBars />
                </button>
            </div>

            {/* Mobile Dropdown */}
            {menuOpen && (
                <div className="absolute top-[80px] right-0 w-60 h-screen bg-gray-900 border-l  border-gray-300 flex flex-col items-start md:hidden shadow-lg z-50">
                    {[
                        { path: "/", label: "Home" },
                        { path: "/product", label: "Products" },
                        { path: "/about", label: "About Us" },
                        { path: "/contact", label: "Contact" },
                    ].map(({ path, label }) => (
                        <Link
                            key={path}
                            to={path}
                            onClick={() => setMenuOpen(false)}
                            className="w-full px-6 py-4 text-white hover:bg-gray-100 dark:hover:bg-gray-700 transition"
                        >
                            {label}
                        </Link>
                    ))}
                </div>
            )}
        </header>


    );
}