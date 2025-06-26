import { Link } from "react-router-dom";


export default function Header() {
    return (
        <header className="bg-white shadow-md w-full h-[80px] px-6 flex items-center justify-between sticky top-0 z-50">
            {/* Logo */}
            <div className="flex items-center space-x-3">
                <img
                    src="/logo.jpg"
                    alt="Logo"
                    className="h-[50px] w-[50px] rounded-full object-cover border border-gray-300 shadow-sm"
                />
                <h1 className="text-2xl font-bold text-red-600 tracking-wide ">Mahee Fashion</h1>
            </div>

            {/* Navigation */}
            <nav className="hidden md:flex space-x-8">
                <Link
                    to="/"
                    className="text-gray-700 text-lg font-medium hover:text-blue-500 transition duration-200"
                >
                    Home
                </Link>
                <Link
                    to="/product"
                    className="text-gray-700 text-lg font-medium hover:text-blue-500 transition duration-200"
                >
                    Products
                </Link>
                <Link
                    to="/about"
                    className="text-gray-700 text-lg font-medium hover:text-blue-500 transition duration-200"
                >
                    About Us
                </Link>
                <Link
                    to="/contact"
                    className="text-gray-700 text-lg font-medium hover:text-blue-500 transition duration-200"
                >
                    Contact
                </Link>
            </nav>

            {/* Cart / Profile (optional) */}
            <div className="flex items-center space-x-4">
                <Link to="/cart" className="text-gray-600 hover:text-blue-500">
                    🛒
                </Link>
                <Link to="/login" className="text-gray-600 hover:text-blue-500">
                    👤
                </Link>
            </div>
        </header>


    )
}