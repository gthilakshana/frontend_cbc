import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaPlus, FaTrash } from "react-icons/fa";
import { FaPencil } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";

export default function AdminProductPage() {
    const [products, setProducts] = useState([]);
    const [productLoaded, setProductLoaded] = useState(false);

    useEffect(() => {
        if (!productLoaded) {
            axios.get(import.meta.env.VITE_BACKEND_URL + "/api/products").then((response) => {
                console.log(response.data);
                setProducts(response.data);
                setProductLoaded(true);
            });
        }

    }, [productLoaded]);

    //move to editProduct page
    const navigate = useNavigate();
    //move to editProduct page


    return (
        <div className="w-full h-full bg-gray-50 py-6 px-4 sm:px-6 lg:px-10 flex flex-col gap-6">
            {/* Header and Add Button */}
            <div className="relative w-full bg-white rounded-2xl shadow-md p-6 flex flex-col sm:flex-row items-center sm:justify-between">
                <h1 className="text-2xl font-bold text-gray-800">Admin Product Page</h1>
                <Link to="/admin/products/addProduct">
                    <button className="mt-4 sm:mt-0 flex items-center gap-2 bg-blue-400 text-white px-4 py-2 hover:bg-blue-500 transition">
                        <FaPlus />
                        <span className="hidden sm:inline">Add Product</span>
                    </button>
                </Link>
            </div>

            {/* Product Table inside Card */}
            <div className="bg-white shadow-md  overflow-hidden w-full">
                <div className="overflow-x-auto overflow-y-auto max-h-[100vh]">
                    <table className="min-w-full text-sm text-left text-gray-800">
                        <thead className="text-xs uppercase bg-blue-100 text-gray-700 sticky top-0 z-10">
                            <tr>
                                <th className="px-6 py-4">Product ID</th>
                                <th className="px-6 py-4">Product Name</th>
                                <th className="px-6 py-4">Price</th>
                                <th className="px-6 py-4">Last Price</th>
                                <th className="px-6 py-4">Stock</th>
                                <th className="px-6 py-4">Brands</th>
                                <th className="px-6 py-4">Colors</th>
                                <th className="px-6 py-4">Sizes</th>
                                <th className="px-6 py-4">Description</th>
                                <th className="px-6 py-4 text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map((product, index) => (
                                <tr
                                    key={index}
                                    className="border-b border-gray-200 hover:bg-blue-50 transition duration-200"
                                >
                                    <td className="px-6 py-4">{product.productId}</td>
                                    <td className="px-6 py-4">{product.productName}</td>
                                    <td className="px-6 py-4">Rs. {product.price}</td>
                                    <td className="px-6 py-4">Rs. {product.lastPrice}</td>
                                    <td className="px-6 py-4">{product.stock}</td>
                                    <td className="px-6 py-4">{product.brands}</td>

                                    {/* Colors */}
                                    <td className="px-6 py-4">
                                        <div className="flex flex-wrap gap-1">
                                            {product.colors?.map((color, i) => (
                                                <span
                                                    key={i}
                                                    className="bg-blue-100 text-blue-400 text-xs px-2 py-1 rounded"
                                                >
                                                    {color}
                                                </span>
                                            ))}
                                        </div>
                                    </td>

                                    {/* Sizes */}
                                    <td className="px-6 py-4">
                                        <div className="flex flex-wrap gap-1">
                                            {product.sizes?.map((size, i) => (
                                                <span
                                                    key={i}
                                                    className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded"
                                                >
                                                    {size}
                                                </span>
                                            ))}
                                        </div>
                                    </td>

                                    {/* Description */}
                                    <td className="px-6 py-4 truncate max-w-[200px]">
                                        {product.description}
                                    </td>

                                    {/* Actions */}
                                    <td className="px-6 py-4 flex justify-center gap-4">
                                        <button
                                            title="Delete"
                                            className="text-red-600 hover:text-red-800 transition"
                                            onClick={() => {
                                                const token = localStorage.getItem('token');
                                                axios
                                                    .delete(`${import.meta.env.VITE_BACKEND_URL}/api/products/${product.productId}`, {
                                                        headers: {
                                                            Authorization: `Bearer ${token}`,
                                                        },
                                                    })
                                                    .then(() => {
                                                        toast.success("Product deleted successfully");
                                                        setProductLoaded(false); // refresh after delete
                                                    });
                                            }}
                                        >
                                            <FaTrash />
                                        </button>

                                        <button
                                            title="Edit"
                                            className="text-blue-600 hover:text-blue-800 transition"
                                            onClick={() =>
                                                navigate(`/admin/products/editProduct`, {
                                                    state: { product: product },
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