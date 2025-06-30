import Footer from "../../components/footer";
import { HiOutlineScissors } from "react-icons/hi";
import { MdLocalShipping } from "react-icons/md";
import { GiSpinningRibbons } from "react-icons/gi";

export default function HomeView() {
    return (
        <div className="w-full bg-gray-100 text-gray-800 font-body">

            {/* Hero Banner */}
            <section
                className="relative h-[90vh] w-full bg-cover bg-top bg-no-repeat"
                style={{ backgroundImage: "url('./banner.jpg')" }}
            >
                <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-white text-center px-4">
                    <h1 className="text-5xl sm:text-6xl font-heading mb-6 leading-tight">
                        Discover Your <span className="text-blue-400">Style</span>
                    </h1>
                    <p className="text-xl mb-8 max-w-2xl">
                        Elevate your wardrobe with trendy, high-quality clothing tailored for elegance and everyday comfort.
                    </p>
                    <button className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-full font-semibold text-lg shadow-md hover:shadow-lg transition-all">
                        ✨ Start Shopping
                    </button>
                </div>
            </section>





            {/* About Section */}
            <section className="py-20 px-6 lg:px-24 bg-gradient-to-b from-white via-gray-50 to-white text-center">
                <h2 className="text-4xl font-extrabold text-gray-800 mb-6 font-heading tracking-wide leading-tight">
                    Why Choose <span className="text-blue-600">Mahee Fashion?</span>
                </h2>
                <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-12 font-body leading-relaxed">
                    At <strong className="text-gray-800 font-medium">Mahee Fashion</strong>, we blend cultural heritage with modern elegance to craft clothing that helps you express your identity beautifully.
                    Whether it's daily wear or statement pieces, we promise quality, comfort, and confidence.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-6">
                    <div className="bg-white border border-gray-200 p-8 rounded-2xl shadow-md hover:shadow-xl transition duration-300">
                        <div className="text-pink-500 text-5xl mb-4">
                            <HiOutlineScissors />
                        </div>
                        <h3 className="text-xl font-semibold mb-2 text-gray-800">Exquisite Craftsmanship</h3>
                        <p className="text-gray-600">
                            Each piece is designed with attention to detail, tailored by expert hands to ensure a perfect fit and timeless appeal.
                        </p>
                    </div>

                    <div className="bg-white border border-gray-200 p-8 rounded-2xl shadow-md hover:shadow-xl transition duration-300">
                        <div className="text-blue-500 text-5xl mb-4">
                            <MdLocalShipping />
                        </div>
                        <h3 className="text-xl font-semibold mb-2 text-gray-800">Nationwide Fast Delivery</h3>
                        <p className="text-gray-600">
                            Get your order delivered quickly to any location in Sri Lanka with our reliable shipping service.
                        </p>
                    </div>

                    <div className="bg-white border border-gray-200 p-8 rounded-2xl shadow-md hover:shadow-xl transition duration-300">
                        <div className="text-yellow-500 text-5xl mb-4">
                            <GiSpinningRibbons />
                        </div>
                        <h3 className="text-xl font-semibold mb-2 text-gray-800">Modern Meets Traditional</h3>
                        <p className="text-gray-600">
                            Our designs balance tradition and innovation — from ethnic elegance to contemporary minimalism.
                        </p>
                    </div>
                </div>
            </section>

            {/* Collections Section */}
            <section className="py-20 px-6 lg:px-20 bg-gradient-to-b from-white to-gray-50">
                <h2 className="text-4xl font-extrabold text-center text-gray-800 mb-4">
                    Explore Our <span className="text-blue-600">Collections</span>
                </h2>
                <p className="text-gray-600 text-center max-w-xl mx-auto mb-12">
                    Dive into our handpicked styles, perfect for every occasion — from elegant evenings to everyday wear.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
                    {/* Collection Cards */}
                    {[
                        { img: "./whomen.jpg", title: "Women's Wear", desc: "Elegant sarees, modern office looks & casual everyday chic." },
                        { img: "./men.jpg", title: "Men's Wear", desc: "Stylish kurtas, formal suits, and everyday comfort essentials." },
                        { img: "./men2.jpg", title: "Traditional Styles", desc: "Celebrate culture with our handwoven classics and heritage designs." }
                    ].map((col, i) => (
                        <div key={i} className="group relative overflow-hidden rounded-2xl shadow hover:shadow-xl transition">
                            <img
                                src={col.img}
                                alt={col.title}
                                className="w-full h-72 object-cover transform group-hover:scale-105 transition duration-500"
                            />
                            <div className="absolute inset-0 bg-black/40 flex flex-col justify-end p-6">
                                <h3 className="text-white text-2xl font-bold mb-1">{col.title}</h3>
                                <p className="text-gray-200 text-sm">{col.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="text-center mt-12">
                    <a
                        href="/categories"
                        className="inline-block px-8 py-3 bg-gray-600 text-white rounded-[10px] text-lg font-semibold hover:bg-blue-700 shadow-lg transition duration-300"
                    >
                        View All Categories
                    </a>
                </div>
            </section>

            {/* ✅ New Featured Styles Section */}
            <section className="py-20 px-6 lg:px-24 bg-blue-50">
                <h2 className="text-4xl font-extrabold text-center text-gray-800 mb-6">
                    Featured <span className="text-blue-600">Styles</span>
                </h2>
                <p className="text-center text-gray-600 max-w-2xl mx-auto mb-12">
                    Handpicked seasonal picks to elevate your style with a blend of class and comfort.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
                    {[1, 2, 3].map((_, i) => (
                        <div
                            key={i}
                            className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 p-6 flex flex-col items-center text-center"
                        >
                            <img
                                src={`./featured${i + 1}.jpg`}
                                alt="Featured"
                                className="w-full h-60 object-cover rounded-xl mb-6"
                            />
                            <h3 className="text-xl font-semibold text-gray-800 mb-2">
                                {i === 0 ? "Elegant Drapes" : i === 1 ? "Urban Classic" : "Fusion Trends"}
                            </h3>
                            <p className="text-gray-600">
                                {i === 0
                                    ? "Chic traditional designs with modern cuts for weddings & events."
                                    : i === 1
                                        ? "Smart looks for professionals who love comfort and charisma."
                                        : "Where cultural grace meets street-ready silhouettes."}
                            </p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Testimonials */}
            <section className="py-20 px-6 lg:px-24 bg-gradient-to-b from-gray-50 to-white">
                <h2 className="text-4xl font-extrabold text-center text-gray-800 mb-6">
                    What Our <span className="text-blue-600">Customers Say</span>
                </h2>
                <p className="text-center text-gray-600 max-w-2xl mx-auto mb-12">
                    Real stories from real people. Here's why thousands trust Mahee Fashion to make their special moments even more stylish.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {[1, 2, 3].map((t, i) => (
                        <div
                            key={i}
                            className={`bg-white p-8 rounded-2xl shadow-md hover:shadow-xl transition duration-300 border-t-4 ${i === 0 ? "border-pink-500" : i === 1 ? "border-indigo-500" : "border-yellow-500"
                                }`}
                        >
                            <p className="text-gray-600 italic mb-4">
                                {i === 0
                                    ? "Absolutely in love with the fabric and stitching. I got compliments all day!"
                                    : i === 1
                                        ? "Very fast delivery and the quality exceeded my expectations."
                                        : "The traditional outfit I ordered looked even better than in the pictures."}
                            </p>
                            <div className="flex items-center gap-4 mt-6">
                                <img
                                    src={`./profile${i + 1}.jpg`}
                                    alt="Customer"
                                    className="w-12 h-12 rounded-full object-cover"
                                />
                                <div>
                                    <p className="font-bold text-gray-800">{i === 0 ? "Dilani S." : i === 1 ? "Nuwan R." : "Sajith M."}</p>
                                    <p className="text-sm text-gray-500">{i === 0 ? "Colombo" : i === 1 ? "Galle" : "Kandy"}, Sri Lanka</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Newsletter */}
            <section className="bg-gray-500 py-16 text-white text-center px-6">
                <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">Join Our Style Circle</h2>
                <p className="mb-6 max-w-xl mx-auto">
                    Sign up for early access to our newest collections, special discounts, and exclusive events.
                </p>
                <form className="flex flex-col sm:flex-row justify-center items-center gap-4 max-w-lg mx-auto">
                    <input
                        type="email"
                        placeholder="Enter your email"
                        className="w-full px-4 py-3 rounded-lg text-gray-800 focus:outline-none"
                    />
                    <button className="bg-white text-blue-600 font-semibold px-6 py-3 rounded-lg hover:bg-blue-100 transition-all">
                        Subscribe
                    </button>
                </form>
            </section>

            {/* Footer */}
            <Footer />
        </div>

    );
}
