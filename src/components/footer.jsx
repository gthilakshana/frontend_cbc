import { FaInstagram, FaFacebookF, FaTiktok, FaTwitter } from "react-icons/fa";


export default function Footer() {
    return (
        <footer className="bg-gray-900 text-white pt-10 pb-6 px-6 md:px-16 mt-10 fixed bottom-0 w-full z-50">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 text-sm text-gray-300">

                {/* About */}
                <div>
                    <h3 className="text-lg font-semibold text-white mb-4">About Mahee Fashion</h3>
                    <p>
                        Mahee Fashion brings you the latest trends in clothing with elegance and style.
                        Discover quality, comfort, and confidence with every piece.
                    </p>
                </div>

                {/* Quick Links */}
                <div>
                    <h3 className="text-lg font-semibold text-white mb-4">Quick Links</h3>
                    <ul className="space-y-2">
                        <li><a href="/" className="hover:text-blue-400 transition">Home</a></li>
                        <li><a href="/product" className="hover:text-blue-400 transition">Products</a></li>
                        <li><a href="/about" className="hover:text-blue-400 transition">About Us</a></li>
                        <li><a href="/contact" className="hover:text-blue-400 transition">Contact</a></li>
                    </ul>
                </div>

                {/* Social & Contact */}
                <div>
                    <h3 className="text-lg font-semibold text-white mb-4">Follow Us</h3>
                    <div className="flex space-x-4">
                        <div className="flex space-x-6 text-xl mt-4">
                            <a href="#" className="hover:text-blue-400 transition" title="Instagram">
                                <FaInstagram />
                            </a>
                            <a href="#" className="hover:text-blue-400 transition" title="Facebook">
                                <FaFacebookF />
                            </a>
                            <a href="#" className="hover:text-blue-400 transition" title="TikTok">
                                <FaTiktok />
                            </a>
                            <a href="#" className="hover:text-blue-400 transition" title="Twitter">
                                <FaTwitter />
                            </a>
                        </div>
                    </div>
                    <p className="mt-4">Email: contact@maheefashion.com</p>
                    <p>Phone: +94 77 113 4567</p>
                </div>
            </div>

            {/* Bottom */}
            <div className="border-t border-gray-700 mt-8 pt-4 text-center text-gray-500 text-sm">
                &copy; 2023 Mahee Fashion. All rights reserved.
            </div>
        </footer>

    );
}