import { Link, Route, Routes } from "react-router-dom";
import { GoGraph } from "react-icons/go";
import { FaUsers } from "react-icons/fa";
import { MdInventory } from "react-icons/md";
import { BsCartCheckFill } from "react-icons/bs";
import AdminProductPage from "./admin/adminProductPage";

export default function AdminHomePage() {
    return (
        <div className=" w-full h-screen flex">
            {/* Sidebar */}
            <div className="w-[15%] h-full bg-gray-200  flex flex-col items-start py-10 px-5 space-y-6 ">
                <h2 className="text-xl font-bold mb-6 text-gray-700">Admin Panel</h2>
                <Link
                    to="/admin/dashboard"
                    className="flex items-center space-x-3 text-gray-700  hover:text-indigo-600 transition"
                >
                    <GoGraph size={20} />
                    <span>Dashboard</span>
                </Link>
                <Link
                    to="/admin/users"
                    className="flex items-center space-x-3 text-gray-700 hover:text-indigo-600 transition"
                >
                    <FaUsers size={20} />
                    <span>Users</span>
                </Link>
                <Link
                    to="/admin/products"
                    className="flex items-center space-x-3 text-gray-700 hover:text-indigo-600 transition"
                >
                    <MdInventory size={20} />
                    <span>Products</span>
                </Link>
                <Link
                    to="/admin/orders"
                    className="flex items-center space-x-3 text-gray-700 hover:text-indigo-600 transition"
                >
                    <BsCartCheckFill size={20} />
                    <span>Orders</span>
                </Link>
            </div>

            {/* Main Content */}
            <div className="w-[85%] h-screen bg-gray-100 p-10">
                <h1 className="text-2xl font-semibold text-gray-800">Welcome to Admin Dashboard</h1>
                {/* Add content here */}
                <div className="border border-gray-300  flex h-full p-10">
                    <Routes path="/*">
                        <Route path="/dashboard" element={<h1>Dashboard</h1>} />
                        <Route path="/users" element={<AdminProductPage />} />
                        <Route path="/products" element={<h1>Products</h1>} />
                        <Route path="/orders" element={<h1>Orders</h1>} />
                        <Route path='/*' element={<h1>404 Not Found the page</h1>} />

                    </Routes>
                </div>

            </div>

        </div>
    );
}
