import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaPlus, FaTrash } from "react-icons/fa";
import { FaPencil } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";

export default function AdminUserPage() {
    const [users, setUsers] = useState([]);
    const [userLoaded, setUserLoaded] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (!userLoaded) {
            axios.get(import.meta.env.VITE_BACKEND_URL + "/api/users").then((response) => {
                setUsers(response.data);
                setUserLoaded(true);
            });
        }
    }, [userLoaded]);

    return (
        <div className="w-full min-h-screen bg-gray-50 py-6 px-4 sm:px-6 lg:px-10 flex flex-col gap-6 overflow-y-auto">
            {/* Header */}
            <div className="relative w-full bg-white rounded-2xl shadow-md p-6 flex flex-col sm:flex-row items-center sm:justify-between">
                <h1 className="text-2xl font-bold text-gray-800 animate-bounce">Admin User Page</h1>
                <Link to="/admin/users/addAdmin">
                    <button className="mt-4 sm:mt-0 flex items-center gap-2 bg-blue-400 text-white px-4 py-2 hover:bg-blue-500 transition">
                        <FaPlus />
                        <span className="hidden sm:inline">Add Admin</span>
                    </button>
                </Link>
            </div>

            {/* Table */}
            <div className="bg-white shadow-md  overflow-hidden w-full">
                <div className=" h-full overflow-y-auto">
                    <table className="min-w-full  text-sm text-left text-gray-800">
                        <thead className="text-xs uppercase bg-blue-100 text-gray-700 sticky top-0 z-10">
                            <tr>
                                <th className="px-6 py-4">User ID</th>
                                <th className="px-6 py-4">Email</th>
                                <th className="px-6 py-4">First Name</th>
                                <th className="px-6 py-4">Last Name</th>
                                <th className="px-6 py-4">Is Blocked</th>
                                <th className="px-6 py-4">Type</th>
                                <th className="px-6 py-4">Profile</th>
                                <th className="px-6 py-4 text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user, index) => (
                                <tr
                                    key={index}
                                    className="border-b border-gray-200 hover:bg-blue-50 transition"
                                >
                                    <td className="px-6 py-4">{user._id.slice(-6)}</td>
                                    <td className="px-6 py-4">{user.email}</td>
                                    <td className="px-6 py-4">{user.firstName}</td>
                                    <td className="px-6 py-4">{user.lastName}</td>
                                    <td className="px-6 py-4">
                                        <span
                                            className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${user.isBlocked
                                                ? "bg-red-100 text-red-600"
                                                : "bg-green-100 text-green-600"
                                                }`}
                                        >
                                            {user.isBlocked ? "Blocked" : "Active"}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 capitalize">{user.type}</td>
                                    <td className="px-6 py-4">
                                        <img
                                            src={user.profilePicture}
                                            alt="Profile"
                                            className="w-10 h-10 rounded-full object-cover border"
                                        />
                                    </td>
                                    <td className="px-6 py-4 flex justify-center gap-4">
                                        <button
                                            title="Delete"
                                            className="text-red-600 hover:text-red-800 transition"
                                            onClick={() => {
                                                const token = localStorage.getItem("token");
                                                axios
                                                    .delete(`${import.meta.env.VITE_BACKEND_URL}/api/users/${user._id}`, {
                                                        headers: {
                                                            Authorization: `Bearer ${token}`,
                                                        },
                                                    })
                                                    .then(() => {
                                                        toast.success("User deleted successfully");
                                                        setUserLoaded(false);
                                                    });
                                            }}
                                        >
                                            <FaTrash />
                                        </button>

                                        <button
                                            title="Edit"
                                            className="text-blue-600 hover:text-blue-800 transition"
                                            onClick={() =>
                                                navigate(`/admin/products/editUser`, {
                                                    state: { user: user },
                                                })
                                            }
                                        >
                                            <FaPencil />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
