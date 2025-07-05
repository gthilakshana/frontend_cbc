import { Link } from "react-router-dom";
import NotFoundImage from "../assets/NotFoundImage.png";

export default function NotFoundPage() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-white text-center px-4">
            <img
                src={NotFoundImage}
                alt="Not Found"
                className="w-[150px] max-w-full mb-8 opacity-70 animate-bounce"
            />
            <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-2">
                We’re Sorry, an error has occurred
            </h2>
            <p className="text-gray-600 mb-6">
                We seem to have lost this page but we don’t want to lose you.
            </p>
            <Link
                to="/"
                className="border border-orange-500 text-orange-500 px-6 py-2 rounded hover:bg-orange-500 hover:text-white transition-all"
            >
                BACK TO HOMEPAGE
            </Link>
        </div>
    );
}
