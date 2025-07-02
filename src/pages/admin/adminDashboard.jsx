import {
    FaTshirt,
    FaUsers,
    FaBoxOpen,
    FaDollarSign,
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
    return (
        <div className="min-h-screen bg-gray-100 flex flex-col p-6 overflow-y-auto">
            <h1 className="text-2xl font-bold text-gray-800 mb-6 animate-bounce">
                Admin Dashboard
            </h1>

            {/* Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <div className="bg-white rounded-2xl shadow p-6 flex items-center gap-4">
                    <FaTshirt className="text-4xl text-indigo-500" />
                    <div>
                        <p className="text-sm text-gray-500">Total Products</p>
                        <p className="text-xl font-semibold text-gray-700">128</p>
                    </div>
                </div>

                <div className="bg-white rounded-2xl shadow p-6 flex items-center gap-4">
                    <FaBoxOpen className="text-4xl text-green-500" />
                    <div>
                        <p className="text-sm text-gray-500">Orders</p>
                        <p className="text-xl font-semibold text-gray-700">245</p>
                    </div>
                </div>

                <div className="bg-white rounded-2xl shadow p-6 flex items-center gap-4">
                    <FaDollarSign className="text-4xl text-yellow-500" />
                    <div>
                        <p className="text-sm text-gray-500">Revenue</p>
                        <p className="text-xl font-semibold text-gray-700">$12,380</p>
                    </div>
                </div>

                <div className="bg-white rounded-2xl shadow p-6 flex items-center gap-4">
                    <FaUsers className="text-4xl text-pink-500" />
                    <div>
                        <p className="text-sm text-gray-500">Customers</p>
                        <p className="text-xl font-semibold text-gray-700">89</p>
                    </div>
                </div>
            </div>

            {/* Chart */}
            <div className="bg-white rounded-2xl shadow-md p-6">
                <h2 className="text-2xl font-semibold text-gray-700 mb-6">
                    📈 Monthly Sales Overview
                </h2>
                <div className="w-full h-80">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                            data={salesData}
                            margin={{ top: 10, right: 30, left: 0, bottom: 10 }}
                        >
                            <CartesianGrid strokeDasharray="4 4" stroke="#e5e7eb" />
                            <XAxis
                                dataKey="month"
                                tick={{ fontSize: 14, fill: "#6b7280" }}
                                axisLine={false}
                                tickLine={false}
                            />
                            <YAxis
                                tick={{ fontSize: 14, fill: "#6b7280" }}
                                axisLine={false}
                                tickLine={false}
                            />
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
                                fill="#6366f1"
                                radius={[10, 10, 0, 0]}
                                barSize={40}
                            />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
}
