import { Routes, Route } from "react-router-dom";
import Header from "../components/header";
import ContactPage from "./home/contact";
import HomeView from "./home/homeView";
import AboutPage from "./home/about";
import SignupPage from "./signUpPage";
import Cart from "./home/cart";
import ProductOverview from "./home/productOverview";
import Product from "./home/product";
import LoginPage from "./loginPage";
// import TopBar from "../../components/TopBar";
import NotFoundPage from "./notfoundPage";
import TopBar from "../components/TopBar";

export default function HomePage() {
    return (
        <div className="h-screen w-full flex flex-col bg-gray-50">

            <div className="sticky top-0 z-50">
                <TopBar />
            </div>

            {/* Scrollable Area */}
            <div className="flex-1 overflow-y-auto">
                {/* Scrolls with page */}
                <Header />

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
                    <Route path="*" element={<NotFoundPage />} />
                </Routes>
            </div>
        </div>
    );
}
