import { FaInstagram, FaFacebookF, FaTiktok, FaTwitter } from "react-icons/fa";
import {
    FaEnvelope,
    FaPhoneAlt,
    FaInfoCircle,
    FaLink,
    FaUserFriends,
} from "react-icons/fa";



export default function Footer() {
    return (
        <footer className="bg-neutral-900 text-gray-200 px-6 sm:px-10 lg:px-20 py-10 fixed bottom-0 w-full">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 text-sm">

                {/* About Section */}
                {/* <div>
                    <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                        <FaInfoCircle className="text-blue-300" /> About Mahee Fashion
                    </h3>
                    <p className="leading-relaxed text-gray-400">
                        Mahee Fashion brings the finest collections of modern and elegant clothing.
                        Feel confident, bold, and beautiful in every piece.
                    </p>
                </div> */}

                {/* Quick Links */}
                {/* <div>
                    <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                        <FaLink className="text-blue-300" /> Quick Links
                    </h3>
                    <ul className="space-y-2">
                        <li><a href="/" className="hover:text-blue-300 flex items-center gap-2"><FaUserFriends /> Home</a></li>
                        <li><a href="/product" className="hover:text-blue-300 flex items-center gap-2"><FaUserFriends /> Products</a></li>
                        <li><a href="/about" className="hover:text-blue-300 flex items-center gap-2"><FaUserFriends /> About Us</a></li>
                        <li><a href="/contact" className="hover:text-blue-300 flex items-center gap-2"><FaUserFriends /> Contact</a></li>
                    </ul>
                </div> */}

                {/* Social & Contact */}
                {/* <div>
                    <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                        <FaUserFriends className="text-blue-300" /> Stay Connected
                    </h3>
                    <div className="flex space-x-4 text-xl mb-4">
                        <a href="#" className="hover:text-blue-300 transition" title="Instagram"><FaInstagram /></a>
                        <a href="#" className="hover:text-blue-300 transition" title="Facebook"><FaFacebookF /></a>
                        <a href="#" className="hover:text-blue-300 transition" title="TikTok"><FaTiktok /></a>
                        <a href="#" className="hover:text-blue-300 transition" title="Twitter"><FaTwitter /></a>
                    </div>
                    <p className="text-gray-400 flex items-center gap-2">
                        <FaEnvelope /> <a href="mailto:contact@maheefashion.com" className="hover:text-blue-300">contact@maheefashion.com</a>
                    </p>
                    <p className="text-gray-400 flex items-center gap-2">
                        <FaPhoneAlt /> <a href="tel:+94771134567" className="hover:text-blue-300">+94 77 113 4567</a>
                    </p>
                </div> */}
            </div>

            {/* Footer Bottom */}
            <div className="border-t border-gray-700 mt-10 pt-4 text-center text-gray-500 text-xs sm:text-sm">
                &copy; {new Date().getFullYear()} <span className="text-white font-medium">Mahee Fashion</span>. All rights reserved.
            </div>
        </footer>



    );
}