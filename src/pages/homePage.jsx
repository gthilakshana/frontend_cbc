import { Routes, Route } from "react-router-dom";
import Header from "../components/header";
import Footer from "../components/footer";
import ContactPage from "../home/contact";
import HomeText from "../components/hometext";
import Product from "../home/product";
import ProductOverview from "../home/productOverview";
import LoginPage from "./loginPage";

export default function HomePage() {
    return (
        <div className="h-screen w-full flex flex-col bg-gray-50 ">
            {/* Sticky Header */}
            <Header />

            <div className="w-full h-[calc(100vh-80px)] ">
                <Routes path="/*">
                    <Route path="/" element={<HomeText />} />
                    <Route path="/home" element={<HomeText />} />
                    <Route path="/product" element={<Product />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/contact" element={<ContactPage />} />
                    {/* <Route path="/productInfo/:id" element={<ProductOverview />} /> */}
                    <Route path="/contact" element={<h1>Contact Page</h1>} />
                </Routes>

            </div>


            {/* Sticky Footer */}
            {/* <Footer /> */}

        </div>



    );
}
