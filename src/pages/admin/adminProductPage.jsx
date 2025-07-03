import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaPlus, FaTrash } from "react-icons/fa";
import { FaPencil } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";

export default function AdminProductPage() {
    const [products, setProducts] = useState([]);
    const [productLoaded, setProductLoaded] = useState(false);
    const [searchText, setSearchText] = useState("");

    const navigate = useNavigate();

    useEffect(() => {
        if (!productLoaded) {
            axios.get(import.meta.env.VITE_BACKEND_URL + "/api/products").then((response) => {
                setProducts(response.data);
                setProductLoaded(true);
            });
        }
    }, [productLoaded]);

    const filteredProducts = products.filter((p) =>
        p.productName?.toLowerCase().includes(searchText.toLowerCase())
    );

    const handleDelete = async (id) => {
        try {
            const token = localStorage.getItem("token");

            if (!id) throw new Error("Missing product ID");

            await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/api/products/${id}`, {
                headers: { Authorization: `Bearer ${token}` },
            });

            toast.success("Product deleted successfully");
            setProductLoaded(false);
        } catch (err) {
            console.error("Delete error:", err.response?.data || err.message);
            toast.error("Error deleting product");
        }
    };


    return (
        <div className="w-full h-full bg-gray-50 py-6 px-4 sm:px-6 lg:px-10 flex flex-col gap-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row items-center justify-between bg-white p-6 rounded-xl shadow-md">
                <div>
                    <h2 className="text-2xl font-bold text-gray-800">Product Management</h2>
                    <p className="text-sm text-gray-500">Manage your product inventory</p>
                </div>
                <Link to="/admin/products/addProduct">
                    <button className="mt-4 sm:mt-0 flex items-center gap-2 bg-orange-400 text-white px-4 py-2 rounded hover:bg-orange-500 transition">
                        <FaPlus />
                        Add Product
                    </button>
                </Link>
            </div>

            {/* Search & Count */}
            <div className="bg-white p-4 rounded-lg shadow-sm flex flex-col sm:flex-row justify-between items-center">
                <input
                    type="text"
                    placeholder="Search products..."
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                    className="w-full sm:w-[300px] border px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-3 sm:mb-0"
                />
                <p className="text-sm text-gray-500">{filteredProducts.length} Products found</p>
            </div>

            {/* Table */}
            <div className="bg-white shadow-md overflow-x-auto rounded-xl">
                <table className="min-w-full text-sm text-left text-gray-800">
                    <thead className="bg-gray-100 text-xs uppercase text-gray-600">
                        <tr>
                            <th className="px-6 py-4">Product</th>
                            <th className="px-6 py-4">ID</th>
                            <th className="px-6 py-4">Price</th>
                            <th className="px-6 py-4">Stock</th>
                            <th className="px-6 py-4 text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredProducts.map((product, index) => (
                            <tr key={index} className="border-b hover:bg-gray-50">
                                {/* Product image and name */}
                                <td className="px-6 py-4">
                                    <div className="flex items-start gap-3">
                                        <img
                                            src={product.images?.[0]}
                                            alt="product"
                                            className="w-10 h-10 rounded object-cover border"
                                        />
                                        <div>
                                            <p className="font-semibold text-gray-800">{product.productName}</p>
                                            <p className="text-xs text-gray-500 line-clamp-1">{product.description}</p>
                                        </div>
                                    </div>
                                </td>

                                <td className="px-6 py-4">{product.productId}</td>

                                <td className="px-6 py-4">
                                    <div className="flex flex-col">
                                        <span className="font-semibold text-gray-800">Rs{product.lastPrice}</span>
                                        <span className="text-xs text-gray-400 line-through">Rs{product.price}</span>
                                    </div>
                                </td>

                                {/* Stock badge */}
                                <td className="px-6 py-4">
                                    <span
                                        className={`inline-block text-xs font-medium px-5 py-2 rounded-full ${product.stock > 0
                                            ? "bg-blue-100 text-green-700"
                                            : "bg-red-100 text-red-600"
                                            }`}
                                    >
                                        {product.stock}
                                    </span>
                                </td>

                                {/* Actions */}
                                <td className="px-6 py-4 flex justify-center gap-4">
                                    <button
                                        title="Edit"
                                        className="text-blue-600 hover:text-blue-800 transition"
                                        onClick={() =>
                                            navigate("/admin/products/editProduct", {
                                                state: { product },
                                            })
                                        }
                                    >
                                        <FaPencil />
                                    </button>
                                    <button
                                        title="Delete"
                                        className="text-red-600 hover:text-red-800 transition"
                                        onClick={() => handleDelete(product.productId)}
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
