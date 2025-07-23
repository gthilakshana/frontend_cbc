import { useState } from "react";
import { Link } from "react-router-dom";
import {
    HiOutlineUser,
    HiOutlineShoppingCart,
} from "react-icons/hi2";
import { PiTiktokLogoBold } from "react-icons/pi";
import {
    FiInstagram,
    FiFacebook,
    FiYoutube,
} from "react-icons/fi";
import { BsPinterest } from "react-icons/bs";
import { FaChevronDown } from "react-icons/fa6";

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const categories = [
        "Women",
        "Men",
        "Mother & Baby",
        "Brands",
        "Gifts & Deals",
    ];

    const navLinks = [
        { path: "/", label: "Home" },
        { path: "/product", label: "Product" },
        { path: "/about", label: "About" },
        { path: "/contact", label: "Contact" },
    ];

    const hasDropdown = (item) =>
        ["Women", "Men", "Mother & Baby", "Brands", "Gifts & Deals"].includes(item);

    return (
        <header className="w-full sticky top-0 z-50 bg-white shadow-md">

            <div className="bg-black text-white text-sm px-4 py-2 flex justify-between items-center">
                <div className="flex space-x-3 text-lg cursor-pointer">
                    <FiFacebook className="hover:text-orange-400 transition" />
                    <BsPinterest className="hover:text-orange-400 transition" />
                    <PiTiktokLogoBold className="hover:text-orange-400 transition" />
                    <FiInstagram className="hover:text-orange-400 transition" />
                    <FiYoutube className="hover:text-orange-400 transition" />

                </div>
                <div className="hidden md:flex space-x-6 text-xs font-semibold tracking-wide uppercase">
                    {navLinks.map(({ path, label }) => (
                        <Link
                            key={path}
                            to={path}
                            className="hover:underline hover:text-orange-400 transition"
                        >
                            {label}
                        </Link>
                    ))}
                </div>
            </div>


            {/* Main Header */}
            <div className="w-full px-4 md:px-10 py-4 flex flex-col md:flex-row md:items-center md:justify-between">
                {/* Logo (Left) */}
                <div className="flex items-center justify-between md:justify-start w-full md:w-auto">
                    {/* Hamburger (mobile only) */}
                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="md:hidden text-gray-700 mr-2"
                    >
                        <svg
                            className="w-6 h-6"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M4 6h16M4 12h16M4 18h16"
                            />
                        </svg>
                    </button>
                    <Link to="/" className="flex flex-col items-center md:items-start text-orange-400 w-full">
                        <span className="text-xl font-bold uppercase">Mahee Fashion</span>
                        <span className="text-xs text-orange-300 -mt-1">
                            Your Style, Our Passion
                        </span>
                    </Link>
                </div>

                {/* Search Bar (Center on Desktop) */}
                <div className="hidden md:flex flex-1 justify-center mt-4 md:mt-0 px-6">
                    <div className="flex w-full max-w-xl">
                        <input
                            type="text"
                            placeholder="Search"
                            className="w-full border border-gray-300 px-4 py-2  focus:outline-none"
                        />
                        <button className="bg-orange-400 text-white px-5 ">
                            Search
                        </button>
                    </div>
                </div>

                {/* Icons (Right) */}
                <div className="flex items-center space-x-6 mt-4 md:mt-0">
                    {/* User */}
                    <Link to="/login" className="flex items-center gap-2 text-sm text-gray-800">
                        <HiOutlineUser className="text-2xl" />
                        <div className="flex flex-col leading-tight">
                            <span className="font-semibold">My Account</span>
                            <span className="text-xs text-gray-500">Log In</span>
                        </div>
                    </Link>

                    {/* Cart */}
                    <Link to="/cart" className="flex items-center gap-2 text-sm text-gray-800">
                        <HiOutlineShoppingCart className="text-2xl" />
                        <span className="font-semibold">Cart (0)</span>
                    </Link>
                </div>
            </div>

            {/* Desktop Category Bar */}
            <nav className="hidden md:flex bg-gray-100 px-10 py-3 border-t border-gray-200">
                <ul className="flex flex-wrap space-x-6 text-sm font-medium text-gray-800">
                    {categories.map((item) => (
                        <li
                            key={item}
                            className="flex items-center gap-1 cursor-pointer hover:text-orange-400 transition"
                        >
                            <span>{item}</span>
                            {hasDropdown(item) && (
                                <FaChevronDown className="text-xs mt-0.5" />
                            )}
                        </li>
                    ))}
                </ul>
            </nav>

            {/* Mobile Menu */}
            {isMenuOpen && (
                <div className="md:hidden bg-white border-t border-gray-200 shadow-md">
                    {/* Category List */}
                    <div className="flex flex-col divide-y divide-gray-100">
                        {categories.map((item) => (
                            <button
                                key={item}
                                className="flex items-center justify-between px-5 py-3 text-gray-800 font-medium hover:bg-orange-100"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                <span>{item}</span>
                                {hasDropdown(item) && (
                                    <FaChevronDown className="text-xs text-gray-500" />
                                )}
                            </button>
                        ))}
                    </div>

                    {/* Divider */}
                    <div className="my-2 border-t border-gray-100" />

                    {/* Navigation Links */}
                    <nav className="flex flex-col space-y-1 px-5 pb-4">
                        {navLinks.map(({ path, label }) => (
                            <Link
                                key={path}
                                to={path}
                                onClick={() => setIsMenuOpen(false)}
                                className="block py-2 text-gray-700 font-semibold rounded hover:bg-gray-100 transition"
                            >
                                {label}
                            </Link>
                        ))}
                    </nav>
                </div>
            )}
        </header>
    );
}
