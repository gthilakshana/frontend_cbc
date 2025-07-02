import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Route, Routes } from "react-router-dom";
import AdminProductPage from "./admin/adminProductPage";
import AdminUserPage from "./admin/adminUserPage";
import AdminHomeHeader from "../components/adminHomeHeader";
import AddProductForm from "./admin/addProductForm";
import AddAdminForm from "./admin/addAdminForm";

import AdminDashboard from "./admin/adminDashboard";
import AdminDetailsPage from "./admin/adminDetailsPage";
import EditProductForm from "./admin/editProductForm";

export default function AdminHomePage() {
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");

        if (!token) {
            navigate("/login");
        }

    }, []);

    return (
        <div className="w-full min-h-screen flex flex-col bg-gray-100">
            {/* Header */}
            <header className="w-full">
                <AdminHomeHeader />
            </header>


            <main className="flex-1 overflow-y-auto">
                <div className="bg-white shadow-md h-full border border-gray-200">
                    <Routes path="/dashboard" >
                        {/* <Route path="/dashboard" element={<h1 className="text-2xl font-semibold text-gray-700">📊 Dashboard</h1>} /> */}

                        {/* <Route path="/home" element={<HomeView />} /> */}
                        <Route path="/users" element={<AdminUserPage />} />
                        <Route path="/adminDetails" element={<AdminDetailsPage />} />
                        <Route path="/products" element={<AdminProductPage />} />
                        <Route path="/products/editProduct" element={<EditProductForm />} />
                        <Route path="/products/addProduct" element={<AddProductForm />} />
                        <Route path="/users/addAdmin" element={<AddAdminForm />} />
                        <Route path="/orders" element={<h1 className="text-2xl font-semibold text-gray-700">🛒 Orders</h1>} />
                        <Route path="/*" element={<AdminDashboard />} />
                    </Routes>
                </div>
            </main>
        </div>
    );
}
