import React, { useState } from "react";
import { Link } from "react-router-dom";
import { GoGraph } from "react-icons/go";
import { FaUsers } from "react-icons/fa";
import { MdInventory } from "react-icons/md";
import { BsCartCheckFill } from "react-icons/bs";
import { HiOutlineMenu, HiOutlineX } from "react-icons/hi";

export default function AdminSidebar() {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <>

            <button
                onClick={() => setSidebarOpen(true)}
                className="fixed top-4 left-4 z-50 bg-gray-900 text-white p-2  shadow-md hover:bg-gray-500"
            >
                <HiOutlineMenu size={24} />
            </button>

            {/* Sidebar */}
            <div
                className={`fixed top-[70px] left-0 h-full w-64 bg-gray-900 text-white shadow-lg transform transition-transform duration-300 z-40 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"
                    }`}
            >
                <div className="flex justify-between items-center p-4 border-b border-gray-700">
                    <h2 className="text-xl font-semibold">Admin Panel</h2>
                    <button onClick={() => setSidebarOpen(false)} className="text-white">
                        <HiOutlineX size={24} />
                    </button>
                </div>

                <nav className="p-4 flex flex-col gap-4 text-sm">
                    <Link to="/admin/dashboard" onClick={() => setSidebarOpen(false)} className="flex items-center gap-2 hover:text-blue-300">
                        <GoGraph /> Dashboard
                    </Link>
                    <Link to="/admin/users" onClick={() => setSidebarOpen(false)} className="flex items-center gap-2 hover:text-blue-300">
                        <FaUsers /> Users
                    </Link>
                    <Link to="/admin/products" onClick={() => setSidebarOpen(false)} className="flex items-center gap-2 hover:text-blue-300">
                        <MdInventory /> Products
                    </Link>
                    <Link to="/admin/orders" onClick={() => setSidebarOpen(false)} className="flex items-center gap-2 hover:text-blue-300">
                        <BsCartCheckFill /> Orders
                    </Link>
                </nav>
            </div>

            {/* Backdrop */}
            {sidebarOpen && (
                <div
                    onClick={() => setSidebarOpen(false)}
                    className="fixed inset-0 bg-black opacity-40 z-30"
                />
            )}
        </>
    );
}
