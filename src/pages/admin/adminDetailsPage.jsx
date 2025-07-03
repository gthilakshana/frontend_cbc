import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaPlus, FaTrash } from "react-icons/fa";
import { FaPencil } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";

export default function AdminDetailsPage() {
    const [users, setUsers] = useState([]);
    const [userLoaded, setUserLoaded] = useState(false);
    const [searchText, setSearchText] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        if (!userLoaded) {
            axios
                .get(`${import.meta.env.VITE_BACKEND_URL}/api/users`)
                .then((response) => {
                    setUsers(response.data);
                    setUserLoaded(true);
                })
                .catch(() => toast.error("Failed to load users"));
        }
    }, [userLoaded]);

    const filteredUsers = users.filter((user) =>
        user.type === "admin" &&
        (
            user.firstName?.toLowerCase().includes(searchText.toLowerCase()) ||
            user.lastName?.toLowerCase().includes(searchText.toLowerCase()) ||
            user.email?.toLowerCase().includes(searchText.toLowerCase())
        )
    );

    const handleDelete = async (_id) => {
        try {
            const token = localStorage.getItem("token");
            await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/api/users/${_id}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            toast.success("User deleted successfully");
            setUserLoaded(false);
        } catch (err) {
            console.error("Delete error:", err.response?.data || err.message);
            toast.error("Failed to delete user");
        }
    };


    return (
        <div className="w-full min-h-screen bg-gray-50 py-6 px-4 sm:px-6 lg:px-10 flex flex-col gap-6">

            {/* Header + Add Button */}
            <div className="bg-white rounded-2xl shadow-md p-6 flex flex-col sm:flex-row items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800">Admin Management</h1>
                    <p className="text-sm text-gray-500">Manage your admin users</p>
                </div>
                <Link to="/admin/users/addAdmin">
                    <button className="mt-4 sm:mt-0 flex items-center gap-2 bg-orange-400 text-white px-4 py-2 rounded hover:bg-orange-500 transition">
                        <FaPlus />
                        Add Admin
                    </button>
                </Link>
            </div>

            {/* Search + Count */}
            <div className="bg-white p-4 rounded-lg shadow-sm flex flex-col sm:flex-row justify-between items-center">
                <input
                    type="text"
                    placeholder="Search by name or email..."
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                    className="w-full sm:w-[300px] border px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-3 sm:mb-0"
                />
                <p className="text-sm text-gray-500">{filteredUsers.length} Admins found</p>
            </div>

            {/* Admin Table */}
            <div className="bg-white shadow-md overflow-x-auto rounded-xl">
                <table className="min-w-full text-sm text-left text-gray-800">
                    <thead className="bg-gray-100 text-xs uppercase text-gray-600">
                        <tr>
                            <th className="px-6 py-4">Admin</th>
                            <th className="px-6 py-4">Email</th>
                            <th className="px-6 py-4">Status</th>
                            <th className="px-6 py-4">ID</th>
                            <th className="px-6 py-4 text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredUsers.map((user) => (
                            <tr key={user._id} className="border-b hover:bg-gray-50">
                                {/* Profile and Name */}
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-3">
                                        <img
                                            src={user.profilePicture}
                                            alt="avatar"
                                            className="w-10 h-10 rounded-full object-cover border"
                                        />
                                        <div>
                                            <p className="font-semibold">{user.firstName} {user.lastName}</p>
                                            <p className="text-xs text-gray-500 capitalize">{user.type}</p>
                                        </div>
                                    </div>
                                </td>

                                {/* Email */}
                                <td className="px-6 py-4">{user.email}</td>

                                {/* Status Badge */}
                                <td className="px-6 py-4">
                                    <span className={`inline-block text-xs font-medium px-2 py-1 rounded-full ${user.isBlocked
                                        ? "bg-red-100 text-red-600"
                                        : "bg-green-100 text-green-600"
                                        }`}>
                                        {user.isBlocked ? "Blocked" : "Active"}
                                    </span>
                                </td>

                                {/* User ID */}
                                <td className="px-6 py-4">{user._id.slice(-6)}</td>

                                {/* Action Buttons */}
                                <td className="px-6 py-4 flex justify-center gap-4">
                                    <button
                                        title="Edit"
                                        className="text-blue-600 hover:text-blue-800 transition"
                                        onClick={() =>
                                            navigate(`/admin/adminDetails/editAdmin`, {
                                                state: { user },
                                            })
                                        }
                                    >
                                        <FaPencil />
                                    </button>
                                    <button
                                        title="Delete"
                                        onClick={() => handleDelete(user.email)}
                                        className="text-red-600 hover:text-red-800 transition"
                                    >
                                        <FaTrash />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
