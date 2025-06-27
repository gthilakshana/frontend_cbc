export default function HomeText() {
    return (
        <div className="w-full px-4 sm:px-6 lg:px-20 py-12 bg-gray-50">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center text-center md:text-left">

                {/* Left Column - Text */}
                <div>
                    <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                        Welcome to Mahee Fashion Home
                    </h1>
                    <p className="text-base sm:text-lg text-gray-600 mb-6 max-w-xl mx-auto md:mx-0">
                        🚧 This website is currently under construction. Please check back soon for the latest updates and features.
                    </p>
                    <button className="mt-2 px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-xl transition font-semibold">
                        Shop Now
                    </button>
                </div>


            </div>
        </div>
    );
}
