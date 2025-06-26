import { Link } from "react-router-dom";


export default function Header() {
    return (
        <header className="bg-blue-200 w-full h-[80px] relative flex justify-center items-center ">
            <img src="/logo.jpg" className="h-[55px] rounded-full cursor-pointer absolute left-[10px]" />


            <div className="h-full flex items-center w-[500px] justify-evenly ">
                <Link to="/" className="text-arial text-1xl font-bold text-white hover:border-b-2 border-blue-500">Home</Link>
                <Link to="/product" className="text-arial text-1xl font-bold text-white hover:border-b-2 border-blue-500">Product</Link>
                <Link to="/about" className="text-arial text-1xl font-bold text-white hover:border-b-2 border-blue-500">About Us</Link>
                <Link to="/contact" className="text-arial text-1xl font-bold text-white hover:border-b-2 border-blue-500">Contact Us</Link>
            </div>


        </header>
    )
}