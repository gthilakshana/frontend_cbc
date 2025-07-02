import React, { useState } from "react";
import { Link } from "react-router-dom";
import { GoGraph } from "react-icons/go";
import { FaUsers } from "react-icons/fa";
import { MdInventory } from "react-icons/md";
import { BsCartCheckFill } from "react-icons/bs";
import { HiOutlineMenu, HiOutlineX } from "react-icons/hi";
import { AiOutlineHome } from "react-icons/ai"; // 🏠 Home Icon

export default function AdminSidebar() {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <>
            {/* Sidebar Toggle Button */}
            <button
                onClick={() => setSidebarOpen(true)}
                className="fixed top-4 right-4 z-50 rounded-lg bg-blue-500 text-white p-2 shadow-md hover:bg-blue-600 transition"
            >
                <HiOutlineMenu size={24} />
            </button>



            {/* Sidebar Panel */}
            <div
                className={`fixed top-0 left-0 h-full w-64 bg-gradient-to-b from-gray-900 to-gray-800 text-white shadow-xl transform transition-transform duration-300 z-40 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"
                    }`}
            >
                {/* Header */}
                <div className="flex justify-between items-center px-5 py-4 border-b border-gray-700">
                    <h2 className="text-2xl font-bold tracking-wide text-white">Admin Panel</h2>
                    <button
                        onClick={() => setSidebarOpen(false)}
                        className="text-gray-400 hover:text-white transition"
                    >
                        <HiOutlineX size={24} />
                    </button>
                </div>

                {/* Navigation */}
                <div className="flex flex-col justify-between h-full">
                    <nav className="flex flex-col gap-3 px-5 py-6 text-sm font-medium">
                        <SidebarLink to="/admin/dashboard" icon={<GoGraph />} label="Dashboard" setSidebarOpen={setSidebarOpen} />
                        <SidebarLink to="/admin/users" icon={<FaUsers />} label="Customers" setSidebarOpen={setSidebarOpen} />
                        <SidebarLink to="/admin/adminDetails" icon={<FaUsers />} label="Admins" setSidebarOpen={setSidebarOpen} />
                        <SidebarLink to="/admin/products" icon={<MdInventory />} label="Products" setSidebarOpen={setSidebarOpen} />
                        <SidebarLink to="/admin/orders" icon={<BsCartCheckFill />} label="Orders" setSidebarOpen={setSidebarOpen} />
                    </nav>

                    <button
                        onClick={() => {
                            setSidebarOpen(false);
                            window.location.href = "https://frontend-cbc.vercel.app/";
                        }}
                        className="fixed bottom-4 left-4 z-50 rounded-lg bg-orange-400 text-white p-2 shadow-md hover:bg-orange-600 transition"
                    >
                        <AiOutlineHome size={24} />
                    </button>
                </div>
            </div>

            {/* Backdrop */}
            {sidebarOpen && (
                <div
                    onClick={() => setSidebarOpen(false)}
                    className="fixed inset-0 bg-black bg-opacity-40 z-30 transition-opacity"
                />
            )}
        </>
    );
}

// Reusable Sidebar Link Component
function SidebarLink({ to, icon, label, setSidebarOpen }) {
    return (
        <Link
            to={to}
            onClick={() => setSidebarOpen(false)}
            className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-gray-700 hover:text-blue-300 transition"
        >
            <span className="text-lg">{icon}</span>
            <span>{label}</span>
        </Link>
    );
}
