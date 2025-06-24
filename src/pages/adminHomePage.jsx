import { Link, Route, Routes } from "react-router-dom";
import { GoGraph } from "react-icons/go";
import { FaUsers } from "react-icons/fa";
import { MdInventory } from "react-icons/md";
import { BsCartCheckFill } from "react-icons/bs";
import AdminProductPage from "./admin/adminProductPage";
import AddProductForm from "./admin/addProductForm";

export default function AdminHomePage() {
    return (
        <div className=" w-full h-screen flex">
            {/* Sidebar */}
            <div className="w-[18%] h-full bg-gray-800  flex flex-col items-start py-10 px-10 space-y-8 ">
                <h2 className="text-xl font-bold mb-6 text-white">Admin Panel</h2>
                <Link
                    to="/admin/dashboard"
                    className="flex items-center space-x-3 text-white  hover:text-blue-200 transition"
                >
                    <GoGraph size={20} />
                    <span>Dashboard</span>
                </Link>
                <Link
                    to="/admin/users"
                    className="flex items-center space-x-3 text-white hover:text-blue-200 transition"
                >
                    <FaUsers size={20} />
                    <span>Users</span>
                </Link>
                <Link
                    to="/admin/products"
                    className="flex items-center space-x-3 text-white hover:text-blue-200 transition"
                >
                    <MdInventory size={20} />
                    <span>Products</span>
                </Link>
                <Link
                    to="/admin/orders"
                    className="flex items-center space-x-3 text-white hover:text-blue-200 transition"
                >
                    <BsCartCheckFill size={20} />
                    <span>Orders</span>
                </Link>
            </div>

            {/* Main Content */}

            {/* Add content here */}
            <div className="border border-gray-300  flex w-full h-full p-5">
                <Routes path="/*">
                    <Route path="/dashboard" element={<h1>Dashboard</h1>} />
                    <Route path="/users" element={<h1>Users</h1>} />
                    <Route path="/products" element={<AdminProductPage />} />
                    <Route path="/products/addProduct" element={<AddProductForm />} />
                    <Route path="/orders" element={<h1>Orders</h1>} />
                    <Route path='/*' element={<h1>404 Not Found the page</h1>} />

                </Routes>
            </div>



        </div>
    );
}
