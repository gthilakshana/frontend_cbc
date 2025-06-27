import axios from 'axios';
import React from 'react';
import uploadMediaToSupabase from '../../utils/mediaUpload';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

export default function AddProductForm() {

    const [productId, setProductId] = useState("");
    const [productName, setProductName] = useState("");
    const [alterNativeNames, setAlterNativeNames] = useState("");
    const [imageFiles, setImageFiles] = useState([]);
    const [price, setPrice] = useState("");
    const [lastPrice, setLastPrice] = useState("");
    const [stock, setStock] = useState("");
    const [description, setDescription] = useState("");
    const navigate = useNavigate();

    async function handleSubmit() {
        const altNames = alterNativeNames.split(',');

        const promisesArray = []

        for (let i = 0; i < imageFiles.length; i++) {
            promisesArray[i] = uploadMediaToSupabase(imageFiles[i]);

        }
        const imgUrls = await Promise.all(promisesArray)


        const product = {
            productId: productId,
            productName: productName,
            altNames: altNames,
            images: imgUrls,
            price: price,
            lastPrice: lastPrice,
            stock: stock,
            description: description
        };
        const token = localStorage.getItem('token');
        try {

            await axios.post(import.meta.env.VITE_BACKEND_URL + "/api/products", product, {
                headers: {
                    'Authorization': "Bearer " + token
                }
            })
            navigate('/admin/products');
            toast.success('Product added successfully');
        } catch (err) {
            toast.error("Failed to add product: " + err.response.data.message);
        }

    }

    return (
        <div className="min-h-screen w-full bg-gradient-to-br from-gray-100 to-blue-50 p-6">
            <div className="max-w-4xl mx-auto bg-white p-8 sm:p-10 rounded-2xl shadow-xl border border-gray-200">
                <h1 className="text-3xl sm:text-4xl font-bold text-center text-gray-800 mb-10">➕ Add New Product</h1>

                <form className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {/* Product ID */}
                    <div className="flex flex-col">
                        <label className="mb-2 text-sm font-semibold text-gray-600">Product ID</label>
                        <input
                            type="text"
                            placeholder="e.g. PROD1234"
                            value={productId}
                            onChange={(e) => setProductId(e.target.value)}
                            className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div>

                    {/* Stock */}
                    <div className="flex flex-col">
                        <label className="mb-2 text-sm font-semibold text-gray-600">Stock</label>
                        <input
                            type="number"
                            placeholder="e.g. 50"
                            value={stock}
                            onChange={(e) => setStock(e.target.value)}
                            className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div>

                    {/* Product Name */}
                    <div className="flex flex-col">
                        <label className="mb-2 text-sm font-semibold text-gray-600">Product Name</label>
                        <input
                            type="text"
                            placeholder="e.g. Wireless Headphones"
                            value={productName}
                            onChange={(e) => setProductName(e.target.value)}
                            className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div>

                    {/* Alternative Names */}
                    <div className="flex flex-col">
                        <label className="mb-2 text-sm font-semibold text-gray-600">Alternative Names</label>
                        <input
                            type="text"
                            placeholder="e.g. WH-1000XM4, Sony Headphones"
                            value={alterNativeNames}
                            onChange={(e) => setAlterNativeNames(e.target.value)}
                            className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div>

                    {/* Price */}
                    <div className="flex flex-col">
                        <label className="mb-2 text-sm font-semibold text-gray-600">Price (Rs)</label>
                        <input
                            type="number"
                            placeholder="e.g. 8999"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div>

                    {/* Last Price */}
                    <div className="flex flex-col">
                        <label className="mb-2 text-sm font-semibold text-gray-600">Last Price (Rs)</label>
                        <input
                            type="number"
                            placeholder="e.g. 9999"
                            value={lastPrice}
                            onChange={(e) => setLastPrice(e.target.value)}
                            className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div>

                    {/* Image Upload */}
                    <div className="flex flex-col sm:col-span-2">
                        <label className="mb-2 text-sm font-semibold text-gray-600">Product Images</label>
                        <input
                            type="file"
                            multiple
                            className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                            onChange={(e) => setImageFiles(e.target.files)}
                        />
                    </div>

                    {/* Description */}
                    <div className="flex flex-col sm:col-span-2">
                        <label className="mb-2 text-sm font-semibold text-gray-600">Description</label>
                        <textarea
                            rows="4"
                            placeholder="Enter a short description of the product..."
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="p-3 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div>
                </form>

                <div className="mt-10 flex justify-center">
                    <button
                        type="button"
                        onClick={handleSubmit}
                        className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-medium text-lg transition duration-300 shadow-md"
                    >
                        ✅ Add Product
                    </button>
                </div>
            </div>
        </div>



    );
}


