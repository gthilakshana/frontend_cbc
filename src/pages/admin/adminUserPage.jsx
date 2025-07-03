import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaTrash } from "react-icons/fa";

export default function AdminUserPage() {
    const [users, setUsers] = useState([]);
    const [userLoaded, setUserLoaded] = useState(false);
    const [searchText, setSearchText] = useState("");

    useEffect(() => {
        if (!userLoaded) {
            axios
                .get(import.meta.env.VITE_BACKEND_URL + "/api/users")
                .then((res) => {
                    setUsers(res.data);
                    setUserLoaded(true);
                })
                .catch(() => toast.error("Failed to load users"));
        }
    }, [userLoaded]);

    const filteredUsers = users.filter(
        (user) =>
            user.type === "customer" &&
            (user.firstName?.toLowerCase().includes(searchText.toLowerCase()) ||
                user.lastName?.toLowerCase().includes(searchText.toLowerCase()) ||
                user.email?.toLowerCase().includes(searchText.toLowerCase()))
    );

    const handleDelete = async (email) => {
        try {
            const token = localStorage.getItem("token");

            await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/api/users/${email}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            toast.success("Customer deleted");
            setUserLoaded(false);
        } catch (error) {
            console.error("Delete failed:", error.response?.data || error.message);
            toast.error("Delete failed");
        }
    };


    return (
        <div className="w-full min-h-screen bg-gray-50 py-6 px-4 sm:px-6 lg:px-10 flex flex-col gap-6">

            {/* Header */}
            <div className="bg-white rounded-2xl shadow-md p-6 flex flex-col sm:flex-row items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800">Customer Management</h1>
                    <p className="text-sm text-gray-500">Manage your store customers</p>
                </div>
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
                <p className="text-sm text-gray-500">{filteredUsers.length} customers found</p>
            </div>

            {/* Table */}
            <div className="bg-white rounded-xl shadow overflow-x-auto">
                <table className="min-w-full text-sm text-left text-gray-800">
                    <thead className="bg-gray-100 text-xs uppercase text-gray-600">
                        <tr>
                            <th className="px-6 py-4">Customer</th>
                            <th className="px-6 py-4">Email</th>
                            <th className="px-6 py-4">Status</th>
                            <th className="px-6 py-4 text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredUsers.map((user) => (
                            <tr key={user._id} className="border-b hover:bg-gray-50">
                                {/* Customer Info */}
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

                                {/* Status */}
                                <td className="px-6 py-4">
                                    <span className={`inline-block text-xs font-medium px-2 py-1 rounded-full ${user.isBlocked
                                        ? "bg-red-100 text-red-600"
                                        : "bg-green-100 text-green-600"
                                        }`}>
                                        {user.isBlocked ? "Blocked" : "Active"}
                                    </span>
                                </td>

                                {/* Actions */}
                                <td className="px-6 py-4 text-center">
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
