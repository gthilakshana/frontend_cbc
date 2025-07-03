import axios from 'axios';
import React, { useState } from 'react';
import uploadMediaToSupabase from '../../utils/mediaUpload';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { FiUploadCloud } from 'react-icons/fi';

export default function AddAdminForm() {
    const [email, setEmail] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [password, setPassword] = useState("");
    const [isBlocked, setIsBlocked] = useState(false);
    const [imageFile, setImageFile] = useState(null);

    const navigate = useNavigate();

    async function handleSubmit(e) {
        e.preventDefault();

        let imgUrl = "";
        if (imageFile) {
            try {
                imgUrl = await uploadMediaToSupabase(imageFile);
            } catch (err) {
                console.error(err);
                toast.error("Image upload failed");
            }
        }

        const adminData = {
            email,
            firstName,
            lastName,
            password,
            isBlocked,
            type: "admin",
            profilePicture: imgUrl,
        };

        const token = localStorage.getItem('token');
        try {
            await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/users/signup`, adminData, {
                headers: { Authorization: `Bearer ${token}` }
            });
            toast.success("Admin added successfully");
            navigate('/admin/adminDetails');
        } catch (err) {
            const msg = err.response?.data?.message || "Error adding admin";
            toast.error(msg);
        }
    }

    return (
        <div className="w-full min-h-screen bg-gray-100 flex justify-center items-center p-4">
            <div className="w-full max-w-4xl bg-white p-8 rounded-xl shadow-lg border">
                <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">Add New Admin</h2>

                <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                        <label className="block mb-1 text-sm font-medium text-gray-700">Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter email"
                            required
                            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div>

                    <div>
                        <label className="block mb-1 text-sm font-medium text-gray-700">First Name</label>
                        <input
                            type="text"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            placeholder="Enter first name"
                            required
                            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div>

                    <div>
                        <label className="block mb-1 text-sm font-medium text-gray-700">Last Name</label>
                        <input
                            type="text"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            placeholder="Enter last name"
                            required
                            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div>

                    <div>
                        <label className="block mb-1 text-sm font-medium text-gray-700">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter password"
                            required
                            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div>

                    <div>
                        <label className="block mb-1 text-sm font-medium text-gray-700">Status</label>
                        <select
                            value={isBlocked ? "true" : "false"}
                            onChange={(e) => setIsBlocked(e.target.value === "true")}
                            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                        >
                            <option value="false">Active</option>
                            <option value="true">Blocked</option>
                        </select>
                    </div>

                    <div>
                        <label className="block mb-1 text-sm font-medium text-gray-700">Profile Picture</label>
                        <div className="flex items-center gap-3 border border-gray-300 p-2 rounded-md">
                            <FiUploadCloud className="text-gray-500 text-xl" />
                            <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => setImageFile(e.target.files[0])}
                                className="w-full text-sm text-gray-600"
                            />
                        </div>
                    </div>

                    <div className="sm:col-span-2 flex justify-center mt-4">
                        <button
                            type="submit"
                            className="bg-orange-400 hover:bg-orange-500 text-white font-semibold px-6 py-2 rounded-md transition"
                        >
                            Add Admin
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
