import { Routes } from "react-router-dom";
import Header from "../components/header";
import Footer from "../components/footer";
import HomeText from "../components/hometext";

export default function HomePage() {
    return (
        <div className="h-screen w-full flex flex-col bg-gray-50 ">
            {/* Sticky Header */}
            <Header />


            <HomeText />




            <Footer />


            <Routes path="/*">

            </Routes>
        </div>



    );
}
