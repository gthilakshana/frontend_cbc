// components/TopBar.jsx
import { Link } from "react-router-dom";
import {
    FaFacebookF,
    FaPinterestP,
    FaInstagram,
    FaTiktok,
    FaYoutube,
    FaThreads,
} from "react-icons/fa6";

const navLinks = [
    { path: "/", label: "Home" },
    { path: "/product", label: "Product" },
    { path: "/about", label: "About" },
    { path: "/contact", label: "Contact" },
];

export default function TopBar() {
    return (
        <div className="hidden md:flex bg-red-500 text-white text-sm px-4 py-3 justify-between items-center">
            {/* Social Icons */}
            <div className="flex space-x-4 text-lg">
                <FaFacebookF className="cursor-pointer hover:text-white transition" />
                <FaPinterestP className="cursor-pointer hover:text-white transition" />
                <FaInstagram className="cursor-pointer hover:text-white transition" />
                <FaTiktok className="cursor-pointer hover:text-white transition" />
                <FaYoutube className="cursor-pointer hover:text-white transition" />
                <FaThreads className="cursor-pointer hover:text-white transition" />
            </div>

            {/* Navigation Links */}
            <div className="flex space-x-6 text-xs font-semibold tracking-wide uppercase">
                {navLinks.map(({ path, label }) => (
                    <Link
                        key={path}
                        to={path}
                        className="hover:underline hover:text-white transition"
                    >
                        {label}
                    </Link>
                ))}
            </div>
        </div>
    );
}
