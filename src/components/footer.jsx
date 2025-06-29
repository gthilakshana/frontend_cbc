import { FaFacebookF, FaInstagram, FaTwitter, FaEnvelope, FaPhoneAlt, FaMapMarkerAlt } from "react-icons/fa";

export default function Footer() {
    return (
        <footer className="dark:bg-gray-900 text-gray-200 px-6 sm:px-10 lg:px-20 py-10 w-full">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10">
                {/* Brand Info */}
                <div>
                    <h2 className="text-xl font-bold text-white mb-4">Mahee Fashion</h2>
                    <p className="text-gray-400">
                        Elevating your style with elegance and authenticity. Discover the latest trends and timeless classics.
                    </p>
                    <div className="flex gap-4 mt-4 text-xl">
                        <a href="https://facebook.com" target="_blank" className="hover:text-blue-400 transition">
                            <FaFacebookF />
                        </a>
                        <a href="https://instagram.com" target="_blank" className="hover:text-pink-400 transition">
                            <FaInstagram />
                        </a>
                        <a href="https://twitter.com" target="_blank" className="hover:text-sky-400 transition">
                            <FaTwitter />
                        </a>
                    </div>
                </div>

                {/* Quick Links */}
                <div>
                    <h2 className="text-lg font-semibold mb-4 text-white">Quick Links</h2>
                    <ul className="space-y-2 text-gray-400">
                        <li><a href="/" className="hover:text-white transition">Home</a></li>
                        <li><a href="/product" className="hover:text-white transition">Products</a></li>
                        <li><a href="/about" className="hover:text-white transition">About Us</a></li>
                        <li><a href="/contact" className="hover:text-white transition">Contact</a></li>
                    </ul>
                </div>

                {/* Contact Info */}
                <div>
                    <h2 className="text-lg font-semibold mb-4 text-white">Contact</h2>
                    <ul className="space-y-3 text-gray-400 text-sm">
                        <li className="flex items-center gap-2">
                            <FaMapMarkerAlt /> 123 Fashion Street, Colombo, Sri Lanka
                        </li>
                        <li className="flex items-center gap-2">
                            <FaPhoneAlt /> +94 76 123 4567
                        </li>
                        <li className="flex items-center gap-2">
                            <FaEnvelope /> support@maheefashion.lk
                        </li>
                    </ul>
                </div>

                {/* Newsletter (Optional) */}
                <div>
                    <h2 className="text-lg font-semibold mb-4 text-white">Subscribe</h2>
                    <p className="text-gray-400 mb-4">Get the latest updates and offers.</p>
                    <form className="flex flex-col sm:flex-row gap-2">
                        <input
                            type="email"
                            placeholder="Email address"
                            className="px-4 py-2 rounded-md w-full sm:w-auto text-black"
                        />
                        <button
                            type="submit"
                            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
                        >
                            Subscribe
                        </button>
                    </form>
                </div>
            </div>

            {/* Bottom Note */}
            <div className="mt-10 border-t border-gray-700 pt-6 text-center text-sm text-gray-500">
                © {new Date().getFullYear()} Mahee Fashion. All rights reserved.
            </div>
        </footer>
    );
}
