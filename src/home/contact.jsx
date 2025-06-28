import {
    FaMapMarkerAlt,
    FaPhoneAlt,
    FaEnvelope,
    FaClock,
} from "react-icons/fa";

export default function ContactPage() {
    return (
        <div className="w-full min-h-screen bg-gradient-to-b from-white via-gray-50 to-white text-gray-800 px-4 py-16 sm:px-6 lg:px-24 font-body">
            {/* Heading */}
            <div className="text-center mb-16">
                <h1 className="text-5xl font-heading text-gray-800 mb-4">
                    Let's <span className="text-blue-600">Get in Touch</span>
                </h1>
                <p className="text-gray-600 text-lg max-w-xl mx-auto">
                    Whether you have a question, want styling help, or just want to say hi — we’re here for you.
                </p>
            </div>


        </div>
    );
}
