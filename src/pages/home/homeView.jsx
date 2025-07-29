import Footer from "../../components/footer";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";

import {
    SiAfterpay,
    SiVisa,
    SiMastercard,

} from "react-icons/si";



export default function HomeView() {


    const [products, setProducts] = useState([]);
    const navigate = useNavigate();


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





    return (
        <div className="w-full bg-gray-100 text-gray-800 font-body ">

            <section className="relative w-full h-[70vh] overflow-hidden">

                <img
                    src={heroBanners[index].image}
                    alt={heroBanners[index].title}
                    className="absolute inset-0 w-full h-full object-cover z-0 transition-all duration-700"
                />


                <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-center text-white px-6 z-10">
                    <h1 className="text-4xl sm:text-6xl font-semibold tracking-wide uppercase mb-4 leading-tight drop-shadow-md">
                        {heroBanners[index].title}
                    </h1>
                    <p className="text-lg sm:text-xl max-w-2xl mb-8 opacity-90 font-light">
                        {heroBanners[index].subtitle}
                    </p>
                    <button
                        className="px-8 py-3 bg-white text-gray-900 hover:bg-gray-100 font-medium text-base rounded-full shadow-md hover:shadow-lg transition-all duration-300"
                        onClick={() => (window.location.href = "/product")}
                    >
                        Shop Now
                    </button>
                </div>


                <button
                    onClick={prevSlide}
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 z-20  text-white p-3 rounded-full shadow-lg transition"
                >
                    <HiChevronLeft size={26} />
                </button>
                <button
                    onClick={nextSlide}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 z-20  text-white p-3 rounded-full shadow-lg transition"
                >
                    <HiChevronRight size={26} />
                </button>


                <div className="absolute bottom-6 right-6 flex gap-2 z-20">
                    {heroBanners.map((_, i) => (
                        <div
                            key={i}
                            className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${i === index ? "bg-white" : "bg-white/50"
                                }`}
                        />
                    ))}
                </div>
            </section>









            <section className="py-20 px-6 lg:px-24 bg-white text-center">
                <h2 className="text-3xl sm:text-4xl text-gray-800 mb-4">
                    NEW <span className="text-orange-600">ARRIVALS</span>
                </h2>
                <p className="text-gray-600 max-w-2xl mx-auto mb-12 font-sans">
                    Be the first to wear the trend. Explore our newest collection crafted with style and comfort.
                </p>

                <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
                    {products
                        .filter((p) => p.images?.[2])
                        .slice(0, 30)
                        .map((product, i) => {
                            const isInStock = product.stock > 0;

                            return (
                                <div
                                    key={i}
                                    className={`w-full h-full rounded-lg bg-white border shadow overflow-hidden flex flex-col relative transition duration-300
                                    ${!isInStock ? "opacity-60 grayscale" : "hover:shadow-lg hover:-translate-y-1"}`}

                                >

                                    <div
                                        className={`absolute top-2 left-2 text-xs px-2 py-1 rounded-md z-10 font-semibold ${isInStock ? "bg-gray-800 text-white" : "bg-orange-600 text-white"
                                            }`}
                                    >
                                        {isInStock ? "In Stock" : "Out of Stock"}
                                    </div>


                                    <Link to={`/productInfo/${product.productId}`}>
                                        <div className="h-[300px] w-full overflow-hidden ">
                                            <img
                                                src={product.images?.[1] || "/fallback.jpg"}
                                                alt={product.productName}
                                                className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                                            />
                                        </div>
                                    </Link>


                                    <div className="p-3 border-t text-center">
                                        <h3 className="text-sm font-semibold text-gray-800 uppercase tracking-wide truncate">
                                            {product.productName}
                                        </h3>
                                        <p className="text-xs text-gray-500 mb-2">
                                            {product.brands || "Brand"}
                                        </p>

                                        <Link
                                            to={`/productInfo/${product.productId}`}
                                            className="inline-block text-sm rounded-md text-white bg-orange-600 hover:bg-orange-500 px-4 py-1.5 transition"
                                        >
                                            View Details
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

                        <button
                            className="mt-6 px-6 py-3 bg-white text-black font-bold uppercase tracking-wide hover:bg-gray-200 transition"
                            onClick={() => navigate("/category/Men")}
                        >
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

                <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
                    {products
                        .filter((p) => p.images?.[2])
                        .slice(0, 30)
                        .map((product, i) => (
                            <div
                                key={i}
                                className="bg-white rounded-lg  shadow-md hover:shadow-xl transition-transform transform hover:-translate-y-1"
                            >
                                <Link to={`/productInfo/${product.productId}`}>
                                    <div className="h-[300px] w-full overflow-hidden ">
                                        <img
                                            src={product.images?.[2] || "/fallback.jpg"}
                                            alt={product.productName}
                                            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                                        />
                                    </div>
                                </Link>
                                <div className="p-3 border-t text-center">
                                    <h3 className="text-sm font-semibold text-gray-800 uppercase tracking-wide truncate">
                                        {product.productName}
                                    </h3>
                                    <p className="text-xs text-gray-500 mb-2">{product.brands || "Brand"}</p>

                                    <Link
                                        to={`/productInfo/${product.productId}`}
                                        className="inline-block text-sm rounded-md text-white bg-orange-600 hover:bg-orange-400 px-4 py-1.5 transition"
                                    >
                                        View Details
                                    </Link>

                                </div>
                            </div>
                        ))}
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
