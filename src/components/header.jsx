import { FaShoppingCart, FaUserCircle, FaBars } from "react-icons/fa";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function Header() {
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <header className=" bg-white shadow-md w-full px-6 md:px-10 h-[80px] flex items-center justify-between sticky top-0 z-50 transition duration-300">

            <div className="flex items-center space-x-3">

                <Link
                    to="/"
                    className="text-2xl font-extralight text-gray-600 hover:text-gray-500 transition duration-300 tracking-wide"

                >
                    MAHEE FASHION
                </Link>

            </div>


            <div className="hidden md:flex items-center space-x-6">

                <nav className="flex space-x-6 font-extralight">
                    {[
                        { path: "/", label: "HOME" },
                        { path: "/product", label: "PRODUCT" },
                        { path: "/about", label: "ABOUT" },
                        { path: "/contact", label: "CONTACT" },
                    ].map(({ path, label }) => (
                        <Link
                            key={path}
                            to={path}
                            className="text-gray-800 font-sans   hover:text-gray-600 transition border-b-2 border-transparent hover:border-gray-600"
                        >
                            {label}
                        </Link>
                    ))}
                </nav>


                <Link
                    to="/cart"
                    className="text-gray-400  hover:text-gray-600 transition text-xl"
                    title="Cart"
                >

                    <FaShoppingCart />
                </Link>
                <Link
                    to="/login"
                    className="text-gray-400  hover:text-gray-600 transition text-xl"
                    title="Login"
                >
                    <FaUserCircle />
                </Link>
            </div>

            {/* Mobile Menu Toggle */}
            <div className="bg-white md:hidden text-xl flex items-center space-x-4">
                <Link
                    to="/cart"
                    className=" dark:text-gray-400 hover:text-gray-600 transition"
                    title="Cart"
                >
                    <FaShoppingCart />
                </Link>

                <button
                    className=" dark:text-gray-400 hover:text-gray-600 transition"
                    onClick={() => setMenuOpen(!menuOpen)}
                >
                    <FaBars />
                </button>
            </div>

            {/* Mobile Menu */}
            {menuOpen && (
                <div className="absolute font-extralight top-[80px]  right-0 w-60 h-[calc(100vh-80px)]  bg-white flex flex-col items-start md:hidden shadow-lg z-50 overflow-y-auto">
                    {[
                        { path: "/", label: "HOME" },
                        { path: "/product", label: "PRODUCT" },
                        { path: "/about", label: "ABOUT" },
                        { path: "/contact", label: "CONTACT" },
                    ].map(({ path, label }) => (
                        <Link
                            key={path}
                            to={path}
                            onClick={() => setMenuOpen(false)}
                            className="w-full px-6 py-4 text-gray-800 hover:bg-gray-100 bg-white transition"
                        >
                            {label}
                        </Link>
                    ))}


                    <Link
                        to="/login"
                        onClick={() => setMenuOpen(false)}
                        className="w-[90%] mx-auto my-4 text-center bg-black hover:bg-gray-900 text-white font-extralight py-2 px-4  transition"
                    >
                        Login
                    </Link>
                </div>
            )}



        </header>


    );
}