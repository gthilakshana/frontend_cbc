import React from 'react';
import { useState } from 'react';

export default function AddProductForm() {

    const [productId, setProductId] = useState("");
    const [productName, setProductName] = useState("");
    const [alterNativeNames, setAlterNativeNames] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const [price, setPrice] = useState("");
    const [lastPrice, setLastPrice] = useState("");
    const [stock, setStock] = useState("");
    const [description, setDescription] = useState("");

    function handleSubmit() {
        console.log({
            productId,
            productName,
            alterNativeNames,
            imageUrl,
            price,
            lastPrice,
            stock,
            description

        });
    }

    return (
        <div className="w-full flex items-start justify-start bg-gray-100 p-4">
            <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md">
                <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
                    Add Product Form
                </h1>

                <form className="flex flex-col gap-4">
                    <div className="flex flex-col">
                        <label className="mb-1 text-sm font-medium">Product ID</label>
                        <input type="text" placeholder='Enter Product ID' value={productId} onChange={(e) => setProductId(e.target.value)} className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400" />
                    </div>

                    <div className="flex flex-col">
                        <label className="mb-1 text-sm font-medium">Product Name</label>
                        <input type="text" placeholder='Enter Product Name' value={productName} onChange={(e) => setProductName(e.target.value)} className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400" />
                    </div>

                    <div className="flex flex-col">
                        <label className="mb-1 text-sm font-medium">Alternative Names</label>
                        <input type="text" placeholder='Enter Alternative Names' value={alterNativeNames} onChange={(e) => setAlterNativeNames(e.target.value)} className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400" />
                    </div>

                    <div className="flex flex-col">
                        <label className="mb-1 text-sm font-medium">Image URL</label>
                        <input type="text" placeholder='Enter Image URL' value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400" />
                    </div>

                    <div className="flex flex-col">
                        <label className="mb-1 text-sm font-medium">Price</label>
                        <input type="number" placeholder='Enter Price' value={price} onChange={(e) => setPrice(e.target.value)} className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400" />
                    </div>

                    <div className="flex flex-col">
                        <label className="mb-1 text-sm font-medium">Last Price</label>
                        <input type="number" placeholder='Enter Last Price' value={lastPrice} onChange={(e) => setLastPrice(e.target.value)} className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400" />
                    </div>

                    <div className="flex flex-col">
                        <label className="mb-1 text-sm font-medium">Stock</label>
                        <input type="number" placeholder='Enter Stock' value={stock} onChange={(e) => setStock(e.target.value)} className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400" />
                    </div>

                    <div className="flex flex-col">
                        <label className="mb-1 text-sm font-medium">Description</label>
                        <textarea placeholder='Enter Description' value={description} onChange={(e) => setDescription(e.target.value)} className="p-2 border rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-blue-400" rows="3" />
                    </div>

                    <button
                        type="button"
                        onClick={handleSubmit}
                        className="mt-4 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-300"

                    >
                        Add Product
                    </button>
                </form>
            </div>
        </div>
    );
}


