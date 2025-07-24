import { Routes, Route } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { FaArrowUp } from "react-icons/fa";

import Header from "../components/header";
import ContactPage from "./home/contact";
import HomeView from "./home/homeView";
import AboutPage from "./home/about";
import SignupPage from "./signUpPage";
import Cart from "./home/cart";
import ProductOverview from "./home/productOverview";
import Product from "./home/product";
import LoginPage from "./loginPage";
import NotFoundPage from "./notfoundPage";
import TopBar from "../components/TopBar";
import AdvancedSearch from "./advancedSearch";
// import Trousers from "./home/categoriesList/women/trousers";

export default function HomePage() {
    const [showTopBar, setShowTopBar] = useState(true);
    const [showScrollButton, setShowScrollButton] = useState(false);
    const lastScrollY = useRef(0);

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;

            // Show/hide top bar
            if (currentScrollY > lastScrollY.current && currentScrollY > 50) {
                setShowTopBar(false);
            } else {
                setShowTopBar(true);
            }

            // Show scroll-to-top button
            setShowScrollButton(currentScrollY > 200);

            lastScrollY.current = currentScrollY;
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (
        <div className="min-h-screen w-full flex flex-col bg-gray-50">

            <div className="sticky top-0 z-50">
                <div
                    className={`transition-transform duration-300 ease-in-out ${showTopBar ? "translate-y-0" : "-translate-y-10"
                        }`}
                >
                    <div className="h-10 bg-white">
                        <TopBar />
                    </div>
                    <div className="bg-white shadow">
                        <Header />
                    </div>
                </div>
            </div>

            {/* Page content */}
            <div className="flex-1">
                <Routes>
                    <Route path="/" element={<HomeView />} />
                    <Route path="/home" element={<HomeView />} />
                    <Route path="/product" element={<Product />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/signup" element={<SignupPage />} />
                    <Route path="/contact" element={<ContactPage />} />
                    <Route path="/about" element={<AboutPage />} />
                    <Route path="/cart" element={<Cart />} />
                    <Route path="/productInfo/:id" element={<ProductOverview />} />
                    <Route path="/advancedSearch" element={<AdvancedSearch />} />
                    <Route path="/category/:main/:sub" element={<AdvancedSearch />} />

                    {/* <Route path="/advancedSearch" element={<Trousers />} /> */}
                    <Route path="*" element={<NotFoundPage />} />
                </Routes>
            </div>

            {/* Scroll-to-top button */}
            {showScrollButton && (
                <button
                    onClick={scrollToTop}
                    className="fixed bottom-6 right-6 z-50 bg-orange-500 hover:bg-orange-600 text-white p-3 rounded-full shadow-lg transition-opacity duration-300"
                    aria-label="Scroll to top"
                >
                    <FaArrowUp />
                </button>
            )}
        </div>
    );
}
