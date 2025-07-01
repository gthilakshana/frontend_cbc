import { Link, Route, Routes } from "react-router-dom";
import { GoGraph } from "react-icons/go";
import { FaUsers } from "react-icons/fa";
import { MdInventory } from "react-icons/md";
import { BsCartCheckFill } from "react-icons/bs";
import AdminProductPage from "./admin/adminProductPage";
import AdminUserPage from "./admin/adminUserPage";
import AdminHomeHeader from "../components/adminHomeHeader";
import AddProductForm from "./admin/addProductForm";
import AddAdminForm from "./admin/addAdminForm";
import EditProductForm from "./admin/editProductForm";


export default function AdminHomePage() {
    return (

        <div className="w-full min-h-screen flex flex-col bg-gray-100">

            {/* Header */}
            <header className="w-full">
                <AdminHomeHeader />
            </header>



            {/* Main Content */}
            <main className="flex-1  overflow-y-auto">
                <div className="bg-white  shadow-md h-full border border-gray-200">
                    <Routes path="/*">
                        <Route path="/dashboard" element={<h1 className="text-2xl font-semibold text-gray-700">📊 Dashboard</h1>} />
                        <Route path="/users" element={<AdminUserPage />} />
                        <Route path="/products" element={<AdminProductPage />} />
                        <Route path="/products/editProduct" element={<EditProductForm />} />
                        <Route path="/products/addProduct" element={<AddProductForm />} />
                        <Route path="/users/addAdmin" element={<AddAdminForm />} />
                        <Route path="/orders" element={<h1 className="text-2xl font-semibold text-gray-700">🛒 Orders</h1>} />
                        <Route path="*" element={<h1 className="text-2xl text-red-600">🚫 404 - Page Not Found</h1>} />
                    </Routes>
                </div>
            </main>
        </div>




    );
}
