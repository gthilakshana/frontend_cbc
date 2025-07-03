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
        <div className="w-full h-full flex bg-gray-100 p-4">
            <div className="w-full h-[800px] bg-white p-6 rounded-lg shadow-md border">
                <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
                    Add Admin
                </h1>

                <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                    <div className="flex flex-col">
                        <label className="mb-1 text-sm font-medium">Email</label>
                        <input
                            type="email"
                            placeholder='Enter Email'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div>

                    <div className="flex flex-col">
                        <label className="mb-1 text-sm font-medium">First Name</label>
                        <input
                            type="text"
                            placeholder='Enter First Name'
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            required
                            className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div>

                    <div className="flex flex-col">
                        <label className="mb-1 text-sm font-medium">Last Name</label>
                        <input
                            type="text"
                            placeholder='Enter Last Name'
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            required
                            className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div>

                    <div className="flex flex-col">
                        <label className="mb-1 text-sm font-medium">Password</label>
                        <input
                            type="password"
                            placeholder='Enter Password'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div>

                    <div className="flex flex-col">
                        <label className="mb-1 text-sm font-medium">Status</label>
                        <select
                            value={isBlocked ? "true" : "false"}
                            onChange={(e) => setIsBlocked(e.target.value === "true")}
                            className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                        >
                            <option value="false">Active</option>
                            <option value="true">Blocked</option>
                        </select>
                    </div>

                    <div className="flex flex-col">
                        <label className="mb-1 text-sm font-medium">Profile Picture</label>
                        <div className="relative flex items-center gap-2 border rounded-md p-2">

                            <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => setImageFile(e.target.files[0])}
                                className="w-full focus:outline-none"
                            />
                        </div>
                    </div>

                    <div className="md:col-span-2 mt-4 flex justify-center bottom-7">
                        <button
                            type="submit"
                            className="bg-orange-400 text-white py-2 px-6  hover:bg-orange-500 transition duration-300"
                        >
                            Add Admin
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
