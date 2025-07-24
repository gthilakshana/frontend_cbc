import Footer from "../../components/footer";
import { Link } from "react-router-dom";
import { useRef } from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";
import { HiOutlineScissors } from "react-icons/hi";
import { MdLocalShipping } from "react-icons/md";
import { GiSpinningRibbons } from "react-icons/gi";
import {
    SiAfterpay,
    SiVisa,
    SiMastercard,

} from "react-icons/si";



export default function HomeView() {


    const [products, setProducts] = useState([]);
    const galleryRef = useRef(null);

    //slider code
    const heroBanners = [
        {
            image: "/banner2.jpg",
            title: "BOLD. BEAUTIFUL. YOU.",
            subtitle: "Stand out in styles that speak confidence."
        },
        {
            image: "/men-banner.jpg",
            title: "REFINED EVERYDAY WEAR",
            subtitle: "Comfort meets luxury in every outfit."
        }, {
            image: "/Banner1.jpg",
            title: "ELEGANCE IN EVERY THREAD",
            subtitle: "Modern fashion infused with timeless design."
        },
    ];

    const [index, setIndex] = useState(0);

    const nextSlide = () => {
        setIndex((prev) => (prev + 1) % heroBanners.length);
    };

    const prevSlide = () => {
        setIndex((prev) => (prev === 0 ? heroBanners.length - 1 : prev - 1));
    };
    useEffect(() => {
        const interval = setInterval(nextSlide, 8000);
        return () => clearInterval(interval);
    }, []);

    //slider code 

    useEffect(() => {
        axios
            .get(import.meta.env.VITE_BACKEND_URL + "/api/products")
            .then((res) => {
                console.log("API response:", res.data);
                setProducts(res.data);
            })
            .catch((err) => console.error("Error fetching products:", err));
    }, []);

    const scrollGallery = (direction) => {
        const scrollAmount = 400;
        if (galleryRef.current) {
            galleryRef.current.scrollBy({
                left: direction * scrollAmount,
                behavior: "smooth",
            });
        }
    };



    return (
        <div className="w-full bg-gray-100 text-gray-800 font-body ">

            <section
                className="relative w-full h-[90vh] bg-cover bg-center bg-no-repeat transition-all duration-700"
                style={{ backgroundImage: `url(${heroBanners[index].image})` }}
            >
                {/* Overlay */}
                <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center text-center text-white px-4">
                    <h1 className="text-5xl sm:text-6xl font-heading mb-6 leading-tight uppercase">
                        {heroBanners[index].title}
                    </h1>
                    <p className="text-xl mb-8 max-w-2xl font-sans">
                        {heroBanners[index].subtitle}
                    </p>
                    <button
                        className="px-8 py-3 bg-blue-400 hover:bg-blue-500 text-white font-semibold text-lg shadow-md hover:shadow-lg transition-all"
                        onClick={() => (window.location.href = "/product")}
                    >
                        Shop Now
                    </button>
                </div>

                {/* Arrows */}
                <button
                    onClick={prevSlide}
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 z-20 bg-white border border-gray-300 shadow hover:shadow-lg p-2 text-gray-600"
                >
                    <HiChevronLeft size={28} />
                </button>

                <button
                    onClick={nextSlide}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 z-20 bg-white border border-gray-300 shadow hover:shadow-lg p-2 text-gray-600"
                >
                    <HiChevronRight size={28} />
                </button>

                {/* Dots */}
                <div className="absolute bottom-6 right-6 flex gap-2 z-20">
                    {heroBanners.map((_, i) => (
                        <div
                            key={i}
                            className={`w-2 h-2  transition-all duration-300 ${i === index ? "bg-white" : "bg-white"
                                }`}
                        />
                    ))}
                </div>
            </section>


            <section className="py-20 px-6 lg:px-24 bg-white text-center">
                <h2 className="text-3xl sm:text-4xl  text-gray-800 mb-4">
                    BEST WOMEN'S CLOTHING IN <span className="text-blue-600 ">SRI LANKA.</span>
                </h2>
                <p className="text-gray-600 max-w-2xl mx-auto mb-12 font-sans">
                    Create a WOW effect wherever you go with our range of designs. It's the perfect combination of comfort & sleek. Let's explore.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
                    {[
                        { title: "TOPS", image: "./top.jpg" },
                        { title: "TROUSERS", image: "./trousers.jpg" },
                        { title: "MIDI DRESSES", image: "./midi.jpg" },
                        { title: "MAXI DRESSES", image: "./maxi.jpg" },
                    ].map((item, i) => (
                        <div key={i} className="bg-white border border-gray-200  overflow-hidden shadow hover:shadow-lg transition cursor-pointer">
                            <img
                                src={item.image}
                                alt={item.title}
                                className="w-full h-90 object-cover"
                            />
                            <div className="p-4 border-t">
                                <h3 className="text-sm font-semibold text-gray-800 tracking-wide">{item.title}</h3>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            <section className="py-20 px-6 lg:px-24 bg-white text-center">
                <h2 className="text-3xl sm:text-4xl text-gray-800 mb-4">
                    NEW <span className="text-blue-600">ARRIVALS</span>
                </h2>
                <p className="text-gray-600 max-w-2xl mx-auto mb-12 font-sans">
                    Be the first to wear the trend. Explore our newest collection crafted with style and comfort.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {products
                        .filter((p) => p.stock > 0)
                        .slice(0, 12)
                        .map((product) => {
                            const isInStock = product.stock > 0;

                            return (
                                <div
                                    key={product.productId}
                                    className="bg-white border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition rounded-sm flex flex-col relative"
                                >
                                    {/* Stock Badge */}
                                    <div
                                        className={`absolute top-2 left-2 text-xs px-2 py-1 rounded-md z-10 font-semibold ${isInStock ? "bg-gray-800 text-white" : "bg-orange-600 text-white"
                                            }`}
                                    >
                                        {isInStock ? "In Stock" : "Out of Stock"}
                                    </div>

                                    {/* Product Image (wrapped with Link) */}
                                    <Link
                                        to={`/productInfo/${product.productId}`}
                                        className="w-full h-[350px] bg-white flex items-center justify-center p-2 cursor-pointer"
                                    >
                                        <img
                                            src={product.images?.[0] || "/fallback.jpg"}
                                            alt={product.productName}
                                            className="max-h-full max-w-full object-contain"
                                        />
                                    </Link>

                                    {/* Product Info */}
                                    <div className="p-3 border-t text-center">
                                        <h3 className="text-sm font-semibold text-gray-800 uppercase tracking-wide truncate">
                                            {product.productName}
                                        </h3>

                                        {/* View Product link (optional) */}
                                        <Link
                                            to={`/productInfo/${product.productId}`}
                                            className="mt-2 inline-block text-xs text-gray-600 hover:underline"
                                        >
                                            View Product
                                        </Link>
                                    </div>
                                </div>
                            );
                        })}
                </div>
            </section>





            <section
                className="relative w-full h-[63vh] bg-cover bg-center flex items-center justify-center text-white"

                style={{
                    backgroundImage: "url('/menfa.png')",
                }}
            >
                <div className="absolute inset-0 bg-black/20" />

                <div className="relative z-10 max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between w-full">

                    <div className="text-left max-w-xl space-y-4">
                        <p className="text-sm font-bold tracking-widest text-white">MAHEE FASHION</p>
                        <p className="text-xs tracking-widest text-gray-300">NOW IN SRI LANKA</p>

                        <h1 className="text-4xl sm:text-6xl  leading-tight uppercase">
                            Shop Now <br />
                            <span className="text-blue-400 inline-flex items-center gap-2">
                                with <SiAfterpay className="inline text-4xl" />
                            </span>
                        </h1>

                        <button className="mt-6 px-6 py-3 bg-white text-black font-bold uppercase tracking-wide hover:bg-gray-200 transition">
                            Visit MAHEEFASHION.LK
                        </button>


                        <div className="mt-6 flex items-center gap-4 text-gray-200">
                            <span className="text-sm">Also Available</span>
                            <SiVisa className="text-2xl" />
                            <SiMastercard className="text-2xl" />

                        </div>
                    </div>


                    {/* <div className="hidden md:block">
                        <img
                            src="/maxi.jpg"
                            alt="Model"
                            className="h-[500px] object-contain"
                        />
                    </div> */}
                </div>
            </section>



            <section className="bg-white py-20 px-6 lg:px-24 text-center">
                <h2 className="text-3xl sm:text-4xl font-heading text-gray-800 mb-2 font-semibold">
                    #MAHEEFASHION
                </h2>
                <p className="text-gray-500 mb-10 font-sans">
                    Feel. Gorgeous. Love. Mahee fashion.
                </p>

                <div className="relative">
                    {/* Left Arrow */}
                    <button
                        onClick={() => scrollGallery(-1)}
                        className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-white border border-gray-100 shadow hover:shadow-lg p-2 text-orange-600"
                    >
                        <HiChevronLeft size={24} />
                    </button>

                    {/* Scrollable Gallery */}
                    <div
                        ref={galleryRef}
                        className="flex overflow-x-auto gap-6 px-6 scrollbar-hide"
                    >
                        {Array.isArray(products) &&
                            products
                                .filter((p) => p.images?.[2])
                                .map((product, i) => (
                                    <div
                                        key={i}
                                        className="flex-shrink-0 w-[320px] text-left bg-white shadow-md cursor-pointer"
                                    >
                                        <Link to={`/productInfo/${product.productId}`}>
                                            <img
                                                src={product.images?.[2] || "/fallback.jpg"}
                                                alt={product.productName}
                                                className="w-full h-[390px] object-cover"
                                            />
                                        </Link>
                                        <div className="p-4 border-t">
                                            <h3 className="text-sm font-semibold text-gray-800 tracking-wide text-center uppercase">
                                                {product.brands}
                                            </h3>
                                        </div>
                                    </div>
                                ))}
                    </div>

                    {/* Right Arrow */}
                    <button
                        onClick={() => scrollGallery(1)}
                        className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-white border border-gray-300 shadow hover:shadow-lg p-2 text-gray-600"
                    >
                        <HiChevronRight size={24} />
                    </button>
                </div>
            </section>






            <section className="py-20 px-6 lg:px-24 bg-gradient-to-b from-white via-gray-50 to-white text-center">
                <h2 className="text-4xl text-gray-800 mb-6 font-heading tracking-wide leading-tight">
                    WHY CHOOSE <span className="text-blue-600">MAHEE FASHION?</span>
                </h2>
                <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-12 font-body leading-relaxed">
                    At <strong className="text-gray-800 font-sans">Mahee Fashion</strong>, we blend cultural heritage with modern elegance to craft clothing that helps you express your identity beautifully.
                    Whether it's daily wear or statement pieces, we promise quality, comfort, and confidence.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-6">
                    {/* Card 1 */}
                    <div
                        className="bg-white border p-6 rounded-xl shadow-sm hover:shadow-lg transition duration-300 text-center"
                        data-aos="fade-up"
                    >
                        <div className="text-pink-500 text-6xl mb-4 transition-transform duration-300 hover:scale-110">
                            <HiOutlineScissors />
                        </div>
                        <h3 className="text-lg font-semibold text-gray-800 mb-2 uppercase">Exquisite Craftsmanship</h3>
                        <p className="text-sm text-gray-600 font-sans">
                            Each piece is designed with attention to detail, tailored by expert hands to ensure a perfect fit and timeless appeal.
                        </p>
                    </div>

                    {/* Card 2 */}
                    <div
                        className="bg-white border p-6 rounded-xl shadow-sm hover:shadow-lg transition duration-300 text-center"
                        data-aos="fade-up"
                        data-aos-delay="100"
                    >
                        <div className="text-blue-500 text-6xl mb-4 transition-transform duration-300 hover:scale-110">
                            <MdLocalShipping />
                        </div>
                        <h3 className="text-lg font-semibold text-gray-800 mb-2 uppercase">Nationwide Fast Delivery</h3>
                        <p className="text-sm text-gray-600 font-sans">
                            Get your order delivered quickly to any location in Sri Lanka with our reliable shipping service.
                        </p>
                    </div>

                    {/* Card 3 */}
                    <div
                        className="bg-white border p-6 rounded-xl shadow-sm hover:shadow-lg transition duration-300 text-center"
                        data-aos="fade-up"
                        data-aos-delay="200"
                    >
                        <div className="text-yellow-500 text-6xl mb-4 transition-transform duration-300 hover:scale-110">
                            <GiSpinningRibbons />
                        </div>
                        <h3 className="text-lg font-semibold text-gray-800 mb-2 uppercase">Modern Meets Traditional</h3>
                        <p className="text-sm text-gray-600 font-sans">
                            Our designs balance tradition and innovation — from ethnic elegance to contemporary minimalism.
                        </p>
                    </div>
                </div>
            </section>




            <section className="bg-gray-200 py-16 text-gray-800 text-center px-6">
                <h2 className="text-3xl md:text-4xl font-heading mb-4">JOIN OUR STYLE CIRCLE</h2>
                <p className="mb-6 max-w-xl mx-auto font-sans">
                    Sign up for early access to our newest collections, special discounts, and exclusive events.
                </p>
                <form className="flex flex-col sm:flex-row justify-center items-center gap-4 max-w-lg mx-auto">
                    <input
                        type="email"
                        placeholder="Enter your email"
                        className="w-full px-4 py-3  text-gray-800 focus:outline-none"
                    />
                    <button className="bg-white text-gray-600 font-semibold px-6 py-3  hover:bg-gray-100 transition-all">
                        SUBSCRIBE
                    </button>
                </form>
            </section>

            {/* Footer */}
            <Footer />
        </div>

    );
}
