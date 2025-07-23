import {
    FaTshirt,
    FaUsers,
    FaBoxOpen,
    FaDollarSign,
    FaSyncAlt,
} from "react-icons/fa";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    CartesianGrid,
} from "recharts";
import { useEffect, useState } from "react";
import axios from "axios";

// Dummy monthly sales data
const salesData = [
    { month: "Jan", sales: 4000 },
    { month: "Feb", sales: 3000 },
    { month: "Mar", sales: 5000 },
    { month: "Apr", sales: 4780 },
    { month: "May", sales: 5890 },
    { month: "Jun", sales: 6390 },
    { month: "Jul", sales: 7890 },
    { month: "Aug", sales: 5890 },
    { month: "Sep", sales: 6390 },
    { month: "Oct", sales: 7890 },
    { month: "Nov", sales: 5890 },
    { month: "Dec", sales: 6390 },
];

export default function AdminDashboard() {
    const [productCount, setProductCount] = useState(0);
    const [customerCount, setCustomerCount] = useState(0);
    const [refreshing, setRefreshing] = useState(false);

    const fetchStats = async () => {
        try {
            const [productRes, userRes] = await Promise.all([
                axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/products`),
                axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/users`),
            ]);

            setProductCount(productRes.data.length);

            const customers = userRes.data.filter((user) => user.type === "customer");
            setCustomerCount(customers.length);
        } catch (error) {
            console.error("Error fetching stats", error);
        }
    };

    useEffect(() => {
        fetchStats();
    }, []);

    const handleRefresh = () => {
        setRefreshing(true);
        fetchStats().finally(() => setRefreshing(false));
    };

    return (
        <div className="w-full min-h-screen bg-gray-100 p-4 md:p-6">
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-gray-800">Admin Dashboard</h1>
                <button
                    onClick={handleRefresh}
                    className="bg-gray-200 hover:bg-gray-300 text-sm px-4 py-2 rounded-md flex items-center gap-2"
                >
                    <FaSyncAlt className={`${refreshing ? "animate-spin" : ""}`} />
                    Refresh Data
                </button>
            </div>

            {/* Overview Title */}
            <h2 className="text-xl font-semibold text-gray-700 mb-4">
                Dashboard Overview
            </h2>

            {/* Overview Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10 w-full">
                {/* Total Products */}
                <div className="bg-blue-600 text-white rounded-lg shadow p-5 w-full">
                    <div className="flex justify-between items-center">
                        <div>
                            <p className="text-sm font-medium">Total Products</p>
                            <h3 className="text-2xl font-bold">{productCount}</h3>
                        </div>
                        <FaTshirt className="text-3xl opacity-70" />
                    </div>
                    <div className="mt-3 h-2 w-full bg-blue-400 rounded-full">
                        <div className="h-full w-[60%] bg-white/70 rounded-full"></div>
                    </div>
                </div>

                {/* Total Orders */}
                <div className="bg-green-500 text-white rounded-lg shadow p-5 w-full">
                    <div className="flex justify-between items-center">
                        <div>
                            <p className="text-sm font-medium">Total Orders</p>
                            <h3 className="text-2xl font-bold">8</h3> {/* Placeholder */}
                        </div>
                        <FaBoxOpen className="text-3xl opacity-70" />
                    </div>
                    <div className="mt-3 h-2 w-full bg-green-400 rounded-full">
                        <div className="h-full w-[45%] bg-white/70 rounded-full"></div>
                    </div>
                </div>

                {/* Total Customers */}
                <div className="bg-purple-500 text-white rounded-lg shadow p-5 w-full">
                    <div className="flex justify-between items-center">
                        <div>
                            <p className="text-sm font-medium">Total Customers</p>
                            <h3 className="text-2xl font-bold">{customerCount}</h3>
                        </div>
                        <FaUsers className="text-3xl opacity-70" />
                    </div>
                    <div className="mt-3 h-2 w-full bg-purple-400 rounded-full">
                        <div className="h-full w-[30%] bg-white/70 rounded-full"></div>
                    </div>
                </div>

                {/* Total Revenue */}
                <div className="bg-yellow-500 text-white rounded-lg shadow p-5 w-full">
                    <div className="flex justify-between items-center">
                        <div>
                            <p className="text-sm font-medium">Total Revenue</p>
                            <h3 className="text-2xl font-bold">Rs19500.00</h3>
                        </div>
                        <FaDollarSign className="text-3xl opacity-70" />
                    </div>
                    <div className="mt-3 h-2 w-full bg-yellow-400 rounded-full">
                        <div className="h-full w-[80%] bg-white/70 rounded-full"></div>
                    </div>
                </div>
            </div>

            {/* Monthly Sales Chart */}
            <div className="bg-white shadow-md rounded-lg p-6 w-full">
                <h2 className="text-lg font-semibold text-gray-700 mb-4">
                    📊 Monthly Sales Overview
                </h2>
                <div className="w-full h-[400px]">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                            data={salesData}
                            margin={{ top: 10, right: 30, left: 0, bottom: 10 }}
                        >
                            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                            <XAxis
                                dataKey="month"
                                tick={{ fontSize: 13, fill: "#6b7280" }}
                            />
                            <YAxis tick={{ fontSize: 13, fill: "#6b7280" }} />
                            <Tooltip
                                contentStyle={{
                                    backgroundColor: "#f9fafb",
                                    border: "1px solid #e5e7eb",
                                    borderRadius: "10px",
                                    fontSize: "14px",
                                }}
                                labelStyle={{ color: "#374151", fontWeight: "bold" }}
                                itemStyle={{ color: "#4f46e5" }}
                            />
                            <Bar
                                dataKey="sales"
                                fill="#4f46e5"
                                barSize={40}
                                radius={[4, 4, 0, 0]}
                            />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
}
