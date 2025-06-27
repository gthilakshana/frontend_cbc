import axios from 'axios';
import React from 'react';
import uploadMediaToSupabase from '../../utils/mediaUpload';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate, useLocation } from 'react-router-dom';

export default function EditProductForm() {

    //navigate hook
    const navigate = useNavigate();


    //location hook
    const location = useLocation();
    const product = location.state.product

    const altNames = product.altNames.join(', ');

    if (product == null) {
        navigate('/admin/products');
    }


    const [productId, setProductId] = useState(product.productId);
    const [productName, setProductName] = useState(product.productName);
    const [alterNativeNames, setAlterNativeNames] = useState(altNames);
    const [imageFiles, setImageFiles] = useState([]);
    const [price, setPrice] = useState(product.price);
    const [lastPrice, setLastPrice] = useState(product.lastPrice);
    const [stock, setStock] = useState(product.stock);
    const [description, setDescription] = useState(product.description);





    async function handleSubmit() {
        const altNames = alterNativeNames.split(',');

        const promisesArray = []
        let imgUrls = product.images
        if (imageFiles.length > 0) {

            for (let i = 0; i < imageFiles.length; i++) {
                promisesArray[i] = uploadMediaToSupabase(imageFiles[i]);

            }
            imgUrls = await Promise.all(promisesArray)
        }

        const productData = {
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

            await axios.put(import.meta.env.VITE_BACKEND_URL + "/api/products/" + product.productId, productData, {
                headers: {
                    'Authorization': "Bearer " + token
                }
            })
            navigate('/admin/products');
            toast.success('Product Updated successfully');
        } catch (err) {
            toast.error("Failed to Update product: " + err.response.data.message);
        }

    }

    return (
        <div className="min-h-screen w-full bg-gradient-to-br from-gray-100 to-blue-50 p-4 sm:p-6">
            <div className="max-w-4xl mx-auto bg-white p-6 sm:p-10 rounded-2xl shadow-lg border border-gray-200">
                <h1 className="text-3xl sm:text-4xl font-bold text-center text-gray-800 mb-8">✏️ Edit Product</h1>

                <form className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {/* Product ID */}
                    <div className="flex flex-col">
                        <label className="mb-2 text-sm font-semibold text-gray-600">Product ID</label>
                        <input
                            disabled
                            type="text"
                            value={productId}
                            onChange={(e) => setProductId(e.target.value)}
                            className="p-3 border border-gray-300 rounded-lg bg-gray-100 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div>

                    {/* Stock */}
                    <div className="flex flex-col">
                        <label className="mb-2 text-sm font-semibold text-gray-600">Stock</label>
                        <input
                            type="number"
                            value={stock}
                            onChange={(e) => setStock(e.target.value)}
                            placeholder="e.g. 50"
                            className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div>

                    {/* Product Name */}
                    <div className="flex flex-col">
                        <label className="mb-2 text-sm font-semibold text-gray-600">Product Name</label>
                        <input
                            type="text"
                            value={productName}
                            onChange={(e) => setProductName(e.target.value)}
                            placeholder="e.g. Apple iPhone 14"
                            className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div>

                    {/* Alternative Names */}
                    <div className="flex flex-col">
                        <label className="mb-2 text-sm font-semibold text-gray-600">Alternative Names</label>
                        <input
                            type="text"
                            value={alterNativeNames}
                            onChange={(e) => setAlterNativeNames(e.target.value)}
                            placeholder="e.g. iPhone 14, A2649"
                            className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div>

                    {/* Price */}
                    <div className="flex flex-col">
                        <label className="mb-2 text-sm font-semibold text-gray-600">Price</label>
                        <input
                            type="number"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            placeholder="e.g. 999.99"
                            className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div>

                    {/* Last Price */}
                    <div className="flex flex-col">
                        <label className="mb-2 text-sm font-semibold text-gray-600">Last Price</label>
                        <input
                            type="number"
                            value={lastPrice}
                            onChange={(e) => setLastPrice(e.target.value)}
                            placeholder="e.g. 1099.99"
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
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Enter a short product description..."
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
                        ✅ Update Product
                    </button>
                </div>
            </div>
        </div>


    );
}


