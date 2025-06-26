import { Routes } from "react-router-dom";
import Header from "../components/header";
import Footer from "../components/footer";

export default function HomePage() {
    return (
        <div className="h-screen w-full bg-gray-50 ">
            <Header />



            <Footer />
            <Routes path="/*">


            </Routes>
        </div>


    );
}
