import {
    FaMapMarkerAlt,
    FaPhoneAlt,
    FaEnvelope,
    FaClock,
} from "react-icons/fa";
import Footer from "../components/footer";

export default function ContactPage() {
    return (
        <div className="min-h-screen bg-white text-gray-800 font-body">
            {/* Header Section */}
            <div className="relative bg-center bg-cover bg-no-repeat py-36 text-center text-white" style={{ backgroundImage: "url('/contact.jpg')" }}>
                <div className="absolute inset-0 bg-black/40"></div>
                <div className="relative z-10 max-w-3xl mx-auto px-4">
                    <h1 className="text-5xl font-extrabold mb-4 drop-shadow-md">Customer Help</h1>
                    <p className="text-lg text-gray-100 max-w-xl mx-auto drop-shadow-sm">
                        If talking to a real-life human is more your thing, you can reach our Customer Happiness Team via email (below).
                    </p>
                </div>
            </div>


            {/* Main Section */}
            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-12 px-6 py-20">
                {/* Left Sidebar */}
                <div className="space-y-4 text-sm font-medium text-gray-600">
                    <h2 className="text-lg font-semibold text-gray-800 mb-3">How Can We Help?</h2>
                    <ul className="space-y-2">
                        {["FAQs", "Ordering", "Shipping", "Returns + Exchanges", "International", "Sustainability", "Contact"].map((item, i) => (
                            <li key={i} className="hover:underline cursor-pointer">{item}</li>
                        ))}
                    </ul>
                </div>

                {/* Contact Form */}
                <div className="lg:col-span-2">
                    <h2 className="text-3xl font-semibold mb-8">Contact Us</h2>
                    <form className="space-y-6">
                        <input
                            type="text"
                            placeholder="Subject"
                            className="w-full border border-gray-300 px-5 py-4 rounded-lg focus:ring-2 focus:ring-gray-800"
                        />
                        <input
                            type="text"
                            placeholder="Name"
                            className="w-full border border-gray-300 px-5 py-4 rounded-lg focus:ring-2 focus:ring-gray-800"
                        />
                        <input
                            type="email"
                            placeholder="Email"
                            className="w-full border border-gray-300 px-5 py-4 rounded-lg focus:ring-2 focus:ring-gray-800"
                        />
                        <textarea
                            rows="5"
                            placeholder="Enter your message here..."
                            className="w-full border border-gray-300 px-5 py-4 rounded-lg focus:ring-2 focus:ring-gray-800 resize-none"
                        />
                        {/* You can integrate reCAPTCHA here if needed */}
                        <button
                            type="submit"
                            className="w-full bg-gray-900 text-white py-4 rounded-lg text-lg hover:bg-gray-700 transition"
                        >
                            Submit
                        </button>
                    </form>
                </div>
            </div>

            {/* Support Section */}
            <div className="bg-gray-50 py-16 text-center">
                <h3 className="text-2xl font-semibold mb-2">Get in Touch</h3>
                <p className="text-gray-600 mb-6">Have questions about your order, or a general inquiry?</p>
                <button className="px-6 py-3 bg-black text-white rounded-md hover:bg-gray-800 transition">
                    Email Us
                </button>
            </div>

            <Footer />
        </div>
    );
}
