import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { FaTimes } from "react-icons/fa";

export default function EditAdminPage() {
    const { state } = useLocation();
    const navigate = useNavigate();

    const [form, setForm] = useState({
        firstName: state?.user?.firstName || "",
        lastName: state?.user?.lastName || "",
        email: state?.user?.email || "",
        password: "",
        confirmPassword: "",
        isBlocked: state?.user?.isBlocked || false,
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setForm((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (form.password && form.password !== form.confirmPassword) {
            toast.error("Passwords do not match");
            return;
        }

        try {
            const token = localStorage.getItem("token");
            const updateData = {
                firstName: form.firstName,
                lastName: form.lastName,
                email: form.email,
                isBlocked: form.isBlocked,
            };

            if (form.password) {
                updateData.password = form.password;
            }

            await axios.put(
                `${import.meta.env.VITE_BACKEND_URL}/api/users/${state.user._id}`,
                updateData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            toast.success("Admin updated successfully");
            navigate("/admin/adminDetails");
        } catch (error) {
            console.error(error);
            toast.error("Failed to update admin");
        }
    };

    return (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center overflow-y-auto">
            <div className="bg-white rounded-xl shadow-lg w-full max-w-2xl mx-auto p-6 relative max-h-[90vh] overflow-y-auto">
                {/* Close Button */}
                <button
                    onClick={() => navigate("/admin/adminDetails")}
                    className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
                >
                    <FaTimes />
                </button>

                <h2 className="text-2xl font-semibold mb-6 text-gray-800">Edit Admin</h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <label className="block mb-1 font-medium">First Name</label>
                            <input
                                type="text"
                                name="firstName"
                                value={form.firstName}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-2 border border-gray-300 rounded-md"
                            />
                        </div>

                        <div>
                            <label className="block mb-1 font-medium">Last Name</label>
                            <input
                                type="text"
                                name="lastName"
                                value={form.lastName}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-2 border border-gray-300 rounded-md"
                            />
                        </div>

                        <div className="sm:col-span-2">
                            <label className="block mb-1 font-medium">Email</label>
                            <input
                                type="email"
                                name="email"
                                value={form.email}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-2 border border-gray-300 rounded-md"
                            />
                        </div>

                        <div className="sm:col-span-2">
                            <label className="block mb-1 font-medium">New Password</label>
                            <input
                                type="password"
                                name="password"
                                value={form.password}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border border-gray-300 rounded-md"
                            />
                        </div>

                        <div className="sm:col-span-2">
                            <label className="block mb-1 font-medium">Confirm New Password</label>
                            <input
                                type="password"
                                name="confirmPassword"
                                value={form.confirmPassword}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border border-gray-300 rounded-md"
                            />
                        </div>

                        <div className="sm:col-span-2">
                            <label className="block mb-1 font-medium">Blocked Status</label>
                            <select
                                name="isBlocked"
                                value={form.isBlocked ? "true" : "false"}
                                onChange={(e) =>
                                    setForm({ ...form, isBlocked: e.target.value === "true" })
                                }
                                className="w-full px-4 py-2 border border-gray-300 rounded-md"
                            >
                                <option value="false">Active</option>
                                <option value="true">Blocked</option>
                            </select>
                        </div>
                    </div>

                    <div className="flex justify-end gap-4 pt-4">
                        <button
                            type="button"
                            onClick={() => navigate("/admin/adminDetails")}
                            className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-100"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                        >
                            Update Admin
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
