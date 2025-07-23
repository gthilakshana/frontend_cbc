// components/TopBar.jsx
import { Link } from "react-router-dom";
import { FiFacebook, FiInstagram, FiYoutube } from "react-icons/fi";
import { BsPinterest } from "react-icons/bs";
import { PiTiktokLogoBold } from "react-icons/pi";

const navLinks = [
    { path: "/", label: "Home" },
    { path: "/about", label: "About" },
    { path: "/shop", label: "Shop" },
    { path: "/contact", label: "Contact" },
];

export default function TopBar() {
    return (
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
    );
}
