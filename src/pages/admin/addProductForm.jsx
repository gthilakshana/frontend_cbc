import axios from 'axios';
import React from 'react';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

export default function AddProductForm() {

    const [productId, setProductId] = useState("");
    const [productName, setProductName] = useState("");
    const [alterNativeNames, setAlterNativeNames] = useState("");
    const [imageUrls, setImageUrl] = useState("");
    const [price, setPrice] = useState("");
    const [lastPrice, setLastPrice] = useState("");
    const [stock, setStock] = useState("");
    const [description, setDescription] = useState("");
    const navigate = useNavigate();

    async function handleSubmit() {
        const altNames = alterNativeNames.split(',');
        const imgUrls = imageUrls.split(',');

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

            await axios.post('http://localhost:5000/api/products', product, {
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
        <div className="w-full h-full flex  bg-gray-100 p-4">
            <div className="w-full h-full bg-white p-6 rounded-lg shadow-md border">
                <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
                    Add Product Form
                </h1>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-7">
                    <div className="flex flex-col">
                        <label className="mb-1 text-sm font-medium">Product ID</label>
                        <input
                            type="text"
                            placeholder="Enter Product ID"
                            value={productId}
                            onChange={(e) => setProductId(e.target.value)}
                            className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div>

                    <div className="flex flex-col">
                        <label className="mb-1 text-sm font-medium">Stock</label>
                        <input
                            type="number"
                            placeholder="Enter Stock"
                            value={stock}
                            onChange={(e) => setStock(e.target.value)}
                            className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div>

                    <div className="flex flex-col">
                        <label className="mb-1 text-sm font-medium">Product Name</label>
                        <input
                            type="text"
                            placeholder="Enter Product Name"
                            value={productName}
                            onChange={(e) => setProductName(e.target.value)}
                            className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div>

                    <div className="flex flex-col">
                        <label className="mb-1 text-sm font-medium">Alternative Names</label>
                        <input
                            type="text"
                            placeholder="Enter Alternative Names"
                            value={alterNativeNames}
                            onChange={(e) => setAlterNativeNames(e.target.value)}
                            className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div>

                    <div className="flex flex-col">
                        <label className="mb-1 text-sm font-medium">Price</label>
                        <input
                            type="number"
                            placeholder="Enter Price"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div>



                    <div className="flex flex-col">
                        <label className="mb-1 text-sm font-medium">Last Price</label>
                        <input
                            type="number"
                            placeholder="Enter Last Price"
                            value={lastPrice}
                            onChange={(e) => setLastPrice(e.target.value)}
                            className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div>

                    <div className="flex flex-col">
                        <label className="mb-1 text-sm font-medium">Image URL</label>
                        <input
                            type="text"
                            placeholder="Enter Image URL"
                            value={imageUrls}
                            onChange={(e) => setImageUrl(e.target.value)}
                            className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div>

                    <div className="flex flex-col md:col-span-2">
                        <label className="mb-1 text-sm font-medium">Description</label>
                        <textarea
                            placeholder="Enter Description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="p-2 border rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-blue-400"
                            rows="3"
                        />
                    </div>
                </div>

                <div className="mt-6 flex justify-center">
                    <button
                        type="button"
                        onClick={handleSubmit}
                        className="bg-blue-600 text-white py-2 px-6 rounded-md hover:bg-blue-700 transition duration-300 "
                    >
                        Add Product
                    </button>
                </div>
            </div>
        </div>

    );
}


