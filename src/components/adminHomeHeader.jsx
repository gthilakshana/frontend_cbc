import React, { useState } from "react";
import { Link } from "react-router-dom";
import { GoGraph } from "react-icons/go";
import { FaUsers } from "react-icons/fa";
import { MdInventory } from "react-icons/md";
import { BsCartCheckFill } from "react-icons/bs";
import { HiOutlineMenu, HiOutlineX } from "react-icons/hi";

export default function AdminHomeHeader() {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <>
            {/* Header */}
            <header className="bg-gray-900 shadow-md w-full px-6 md:px-10 h-[80px] flex items-center justify-between sticky top-0 z-50">

                <div className="text-white">
                    <button onClick={() => setSidebarOpen(true)}>
                        <HiOutlineMenu size={28} />
                    </button>
                </div>

                {/* Logo */}
                <h1 className="text-2xl  font-extrabold text-white hover:text-blue-400 transition duration-300 tracking-wide font-sans">
                    Mahee Fashion
                </h1>


                <div className="w-8"></div>
            </header>

            {/* Sidebar (Overlay) */}
            <div
                className={`fixed top-0 left-0 h-full w-64 bg-gradient-to-b from-gray-900 to-gray-800 text-white shadow-xl px-6 py-8 z-40 transform transition-transform duration-300 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"
                    }`}
            >
                {/* Close button */}
                <div className="flex justify-end mb-6">
                    <button onClick={() => setSidebarOpen(false)}>
                        <HiOutlineX size={26} className="text-white" />
                    </button>
                </div>

                <h2 className="text-2xl font-bold tracking-wide mb-6">⚙️ Admin Panel</h2>

                <nav className="flex flex-col space-y-4 text-sm">
                    <Link to="/admin/dashboard" onClick={() => setSidebarOpen(false)} className="flex items-center space-x-3 hover:text-blue-300 transition duration-200">
                        <GoGraph size={20} />
                        <span>Dashboard</span>
                    </Link>
                    <Link to="/admin/users" onClick={() => setSidebarOpen(false)} className="flex items-center space-x-3 hover:text-blue-300 transition duration-200">
                        <FaUsers size={20} />
                        <span>Users</span>
                    </Link>
                    <Link to="/admin/products" onClick={() => setSidebarOpen(false)} className="flex items-center space-x-3 hover:text-blue-300 transition duration-200">
                        <MdInventory size={20} />
                        <span>Products</span>
                    </Link>
                    <Link to="/admin/orders" onClick={() => setSidebarOpen(false)} className="flex items-center space-x-3 hover:text-blue-300 transition duration-200">
                        <BsCartCheckFill size={20} />
                        <span>Orders</span>
                    </Link>
                </nav>
            </div>


            {sidebarOpen && (
                <div
                    onClick={() => setSidebarOpen(false)}
                    className="fixed inset-0 bg-black opacity-40 z-30 md:hidden"
                />
            )}
        </>
    );
}
