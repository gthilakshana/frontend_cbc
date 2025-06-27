import { Link, Route, Routes } from "react-router-dom";
import { GoGraph } from "react-icons/go";
import { FaUsers } from "react-icons/fa";
import { MdInventory } from "react-icons/md";
import { BsCartCheckFill } from "react-icons/bs";
import AdminProductPage from "./admin/adminProductPage";
import AddProductForm from "./admin/addProductForm";
import EditProductForm from "./admin/editProductForm";

export default function AdminHomePage() {
    return (
        <div className="w-full min-h-screen flex bg-gray-100">

            {/* Sidebar */}
            <div className="w-64 min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white shadow-xl px-6 py-8 hidden md:flex flex-col space-y-6">
                <h2 className="text-2xl font-bold tracking-wide">⚙️ Admin Panel</h2>

                <nav className="flex flex-col space-y-4 text-sm">
                    <Link
                        to="/admin/dashboard"
                        className="flex items-center space-x-3 hover:text-blue-300 transition duration-200"
                    >
                        <GoGraph size={20} />
                        <span>Dashboard</span>
                    </Link>

                    <Link
                        to="/admin/users"
                        className="flex items-center space-x-3 hover:text-blue-300 transition duration-200"
                    >
                        <FaUsers size={20} />
                        <span>Users</span>
                    </Link>

                    <Link
                        to="/admin/products"
                        className="flex items-center space-x-3 hover:text-blue-300 transition duration-200"
                    >
                        <MdInventory size={20} />
                        <span>Products</span>
                    </Link>

                    <Link
                        to="/admin/orders"
                        className="flex items-center space-x-3 hover:text-blue-300 transition duration-200"
                    >
                        <BsCartCheckFill size={20} />
                        <span>Orders</span>
                    </Link>
                </nav>
            </div>

            {/* Main Content */}
            <div className="flex-1 p-6 overflow-y-auto">
                <div className="bg-white rounded-xl shadow-md p-6 min-h-full border border-gray-200">
                    <Routes path="/*">
                        <Route path="/dashboard" element={<h1 className="text-2xl font-semibold text-gray-700">📊 Dashboard</h1>} />
                        <Route path="/users" element={<h1 className="text-2xl font-semibold text-gray-700">👥 Users</h1>} />
                        <Route path="/products" element={<AdminProductPage />} />
                        <Route path="/products/editProduct" element={<EditProductForm />} />
                        <Route path="/products/addProduct" element={<AddProductForm />} />
                        <Route path="/orders" element={<h1 className="text-2xl font-semibold text-gray-700">🛒 Orders</h1>} />
                        <Route path="*" element={<h1 className="text-2xl text-red-600">🚫 404 - Page Not Found</h1>} />
                    </Routes>
                </div>
            </div>

        </div>

    );
}
