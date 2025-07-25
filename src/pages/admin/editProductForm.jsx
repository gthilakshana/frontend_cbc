import axios from 'axios';
import React from 'react';
import { useState } from 'react';
import uploadMediaToSupabase from '../../utils/mediaUpload';

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

    const categoryOptions = {
        Women: [
            "Dresses", "Tops", "Sarees", "Kurtis", "Tunics", "Lehengas",
            "Skirts", "Jeans", "Trousers", "Shorts", "T-Shirts", "Jackets",
            "Sweaters", "Blouses", "Coats"
        ],
        Men: [
            "Shirts", "T-Shirts", "Trousers", "Jeans", "Shorts", "Suits",
            "Blazers", "Sweatshirts", "Hoodies", "Jackets", "Vests", "Coats",
            "Ethnic Wear", "Track Pants", "Polo Shirts"
        ],
        Kids: [
            "Boys T-Shirts", "Boys Shirts", "Boys Pants", "Boys Shorts", "Boys Jackets",
            "Girls Frocks", "Girls Tops", "Girls Skirts", "Girls Leggings", "Girls Dresses",
            "Infant Sets", "Baby Rompers", "Baby Pajamas", "Baby Sweaters", "Baby Shoes"
        ],
        Footwear: [
            "Sneakers", "Running Shoes", "Loafers", "Boots", "Flats", "Heels",
            "Sandals", "Flip Flops", "Slippers", "Oxfords", "Derby Shoes",
            "Clogs", "Wedges", "Mules", "Sports Shoes"
        ],
        MotherAndBaby: [
            "Maternity Dresses", "Nursing Bras", "Breast Pumps", "Baby Carriers",
            "Diapers", "Wipes", "Baby Lotions", "Feeding Bottles", "Cribs",
            "Baby Monitors", "Onesies", "Swaddles", "Baby Powder", "Rattles",
            "Pacifiers"
        ],
        Accessories: [
            "Bags", "Jewelry", "Watches", "Belts", "Scarves", "Hair Accessories",
            "Sunglasses", "Wallets", "Gloves", "Hats", "Earrings", "Necklaces",
            "Bracelets", "Rings", "Anklets"
        ],
        Brands: [
            "Nike", "Adidas", "Puma", "Reebok", "Zara", "H&M", "Levi's",
            "Gucci", "Calvin Klein", "Tommy Hilfiger", "Louis Vuitton", "Fila",
            "New Balance", "Under Armour", "Uniqlo"
        ],
        GiftsAndDeals: [
            "Gift Cards", "Gift Boxes", "Holiday Bundles", "Discount Packs",
            "Fashion Combos", "Fragrance Sets", "Jewelry Sets", "Accessory Kits",
            "For Her", "For Him", "Birthday Deals", "Wedding Gifts",
            "Anniversary Sets", "Kids Toys", "Baby Hampers"
        ],
        Sale: [
            "Clearance", "Flash Deals", "BOGO Offers", "50% Off", "Flat Discounts",
            "Buy More Save More", "Weekend Sale", "Mega Sale", "Daily Deals",
            "Hot Picks", "Exclusive Offers", "Combo Deals", "Time-Limited",
            "Coupon Codes", "Festive Offers"
        ]
    };


    const [productId, setProductId] = useState(product.productId);
    const [productName, setProductName] = useState(product.productName);
    const [alterNativeNames, setAlterNativeNames] = useState(altNames);
    const [imageFiles, setImageFiles] = useState([]);
    const [price, setPrice] = useState(product.price);
    const [colors, setColors] = useState(product.colors || []);
    const [selectedColor, setSelectedColor] = useState("");
    const [sizes, setSizes] = useState(product.sizes || []);
    const [selectedSize, setSelectedSize] = useState("");
    const [brands, setBrands] = useState(product.brands);
    const [lastPrice, setLastPrice] = useState(product.lastPrice);
    const [stock, setStock] = useState(product.stock);
    const [description, setDescription] = useState(product.description);
    const [delivery, setDelivery] = useState(product.delivery);



    // Example state (assuming you're in a component with product.materials)
    const [materials, setMaterials] = useState(product.materials || []);
    const [newMaterial, setNewMaterial] = useState("");

    const [category, setCategory] = useState(product?.categories?.[0]?.title || '');
    const [subCategory, setSubCategory] = useState(product?.categories?.[0]?.subCategory || '');







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
            colors: colors,
            sizes: sizes,
            brands: brands,
            description: description,
            materials: materials,
            delivery: delivery,
            categories: [
                {
                    title: category,
                    subCategory: subCategory
                }
            ]


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
        <div className="w-full h-full flex  bg-gray-100 p-4">
            <div className="w-full h-full bg-white p-6 rounded-lg shadow-md border uppercase">
                <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
                    Edit Product Form
                </h1>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-7">
                    <div className="flex flex-col">
                        <label className="mb-1 text-sm font-medium">Product ID</label>
                        <input
                            disabled
                            type="text"
                            placeholder="Enter Product ID"
                            value={productId}
                            onChange={(e) => setProductId(e.target.value)}
                            className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div>



                    {/* Category Selector */}
                    <div className="flex flex-col">
                        <label className="mb-1 text-sm font-medium">Category</label>
                        <select
                            value={category}
                            onChange={(e) => {
                                const selectedCat = e.target.value;
                                setCategory(selectedCat);
                                setSubCategory(""); // reset subcategory on change
                            }}
                            className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                        >
                            <option value="">Select a category</option>
                            {Object.keys(categoryOptions).map((cat) => (
                                <option key={cat} value={cat}>{cat}</option>
                            ))}
                        </select>
                    </div>

                    {/* Subcategory Selector */}
                    <div className="flex flex-col">
                        <label className="mb-1 text-sm font-medium">Subcategory</label>
                        <select
                            value={subCategory}
                            onChange={(e) => setSubCategory(e.target.value)}
                            disabled={!category}
                            className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                        >
                            <option value="">Select a subcategory</option>
                            {category && categoryOptions[category].map((sub) => (
                                <option key={sub} value={sub}>{sub}</option>
                            ))}
                        </select>
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




                    {/* Colors Selector & Inputs */}
                    <div className="flex flex-col mb-6">
                        <label className="mb-1 text-sm font-medium">Add Color</label>
                        <div className="flex gap-2">
                            <select
                                value={selectedColor}
                                onChange={(e) => setSelectedColor(e.target.value)}
                                className="p-2 border rounded-md flex-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
                            >
                                <option value="">Select a color</option>
                                {["Black", "White", "Gray", "Red", "Blue", "Green", "Beige", "Brown", "Pink", "Navy"].map((color, i) => (
                                    <option key={i} value={color}>{color}</option>
                                ))}
                            </select>
                            <button
                                type="button"
                                onClick={() => {
                                    if (selectedColor && !colors.includes(selectedColor)) {
                                        setColors([...colors, selectedColor]);
                                        setSelectedColor("");
                                    }
                                }}
                                className="px-4 py-2 bg-blue-400 text-white  hover:bg-blue-400"
                            >
                                Add
                            </button>
                        </div>

                        {/* Editable & Removable color inputs */}
                        <div className="flex flex-wrap gap-2 mt-3">
                            {colors.map((color, index) => (
                                <div key={index} className="flex items-center gap-1">
                                    <input
                                        value={color}
                                        onChange={(e) => {
                                            const updated = [...colors];
                                            updated[index] = e.target.value;
                                            setColors(updated);
                                        }}
                                        className="px-3 py-1 border rounded-md"
                                    />
                                    <button
                                        onClick={() => {
                                            const updated = colors.filter((_, i) => i !== index);
                                            setColors(updated);
                                        }}
                                        className="text-red-500 hover:text-red-700 text-lg"
                                        title="Remove"
                                    >
                                        &times;
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>


                    {/* Sizes Selector & Inputs */}
                    <div className="flex flex-col mb-6">
                        <label className="mb-1 text-sm font-medium">Add Size</label>
                        <div className="flex gap-2">
                            <select
                                value={selectedSize}
                                onChange={(e) => setSelectedSize(e.target.value)}
                                className="p-2 border rounded-md flex-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
                            >
                                <option value="">Select a size</option>
                                {["XS", "S", "M", "L", "XL", "XXL", "XXXL"].map((size, i) => (
                                    <option key={i} value={size}>{size}</option>
                                ))}
                            </select>
                            <button
                                type="button"
                                onClick={() => {
                                    if (selectedSize && !sizes.includes(selectedSize)) {
                                        setSizes([...sizes, selectedSize]);
                                        setSelectedSize("");
                                    }
                                }}
                                className="px-4 py-2 bg-blue-400 text-white  hover:bg-blue-500"
                            >
                                Add
                            </button>
                        </div>

                        {/* Editable & Removable size inputs */}
                        <div className="flex flex-wrap gap-2 mt-3">
                            {sizes.map((size, index) => (
                                <div key={index} className="flex items-center gap-1">
                                    <input
                                        value={size}
                                        onChange={(e) => {
                                            const updated = [...sizes];
                                            updated[index] = e.target.value;
                                            setSizes(updated);
                                        }}
                                        className="px-3 py-1 border rounded-md"
                                    />
                                    <button
                                        onClick={() => {
                                            const updated = sizes.filter((_, i) => i !== index);
                                            setSizes(updated);
                                        }}
                                        className="text-red-500 hover:text-red-700 text-lg"
                                        title="Remove"
                                    >
                                        &times;
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>


                    {/* Materials Input Section */}
                    <div className="flex flex-col mb-6">
                        <label className="mb-1 text-sm font-medium text-gray-700">Add Material</label>

                        <div className="flex gap-2">
                            <input
                                type="text"
                                placeholder="Enter material name"
                                value={newMaterial}
                                onChange={(e) => setNewMaterial(e.target.value)}
                                className="p-2 border rounded-md flex-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
                            />

                            <button
                                type="button"
                                onClick={() => {
                                    const material = newMaterial.trim();
                                    if (material && !materials.includes(material)) {
                                        setMaterials([...materials, material]);
                                        setNewMaterial("");
                                    }
                                }}
                                className="px-4 py-2 bg-blue-400 text-white  hover:bg-blue-400 transition"
                            >
                                Add
                            </button>
                        </div>

                        {/* Editable Material List */}
                        <div className="flex flex-wrap gap-2 mt-3">
                            {materials.map((material, index) => (
                                <div key={index} className="flex items-center gap-1">
                                    <input
                                        value={material}
                                        onChange={(e) => {
                                            const updated = [...materials];
                                            updated[index] = e.target.value;
                                            setMaterials(updated);
                                        }}
                                        className="px-3 py-1 border rounded-md"
                                    />
                                    <button
                                        onClick={() => {
                                            const updated = materials.filter((_, i) => i !== index);
                                            setMaterials(updated);
                                        }}
                                        className="text-red-500 hover:text-red-700 text-lg font-bold"
                                        title="Remove"
                                    >
                                        &times;
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>





                    <div className="flex flex-col">
                        <label className="mb-1 text-sm font-medium">Brands</label>
                        <input
                            type="text"
                            placeholder="Enter Alternative Names"
                            value={brands}
                            onChange={(e) => setBrands(e.target.value)}
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
                            type="file"
                            placeholder="Enter Image URL"
                            className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                            onChange={(e) => {
                                setImageFiles(e.target.files);

                            }} multiple
                        />
                    </div>

                    <div className="flex flex-col md:col-span-2">
                        <label className="mb-1 text-sm font-medium text-gray-800">
                            Delivery Information
                        </label>

                        <textarea
                            placeholder="Provide delivery details in full sentences. Mention delivery time, shipping method, and any location-specific info."
                            value={delivery}
                            onChange={(e) => setDelivery(e.target.value)}
                            className="p-3 border rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-blue-400 h-[200px] text-sm text-gray-700"
                            rows="3"
                        />

                        <p className="mt-2 text-xs text-gray-500">
                            🚚 Example: “Delivery within 2–5 business days. Free standard shipping available islandwide. Express delivery available on request.”
                        </p>
                    </div>

                    <div className="flex flex-col md:col-span-2">
                        <label className="mb-1 text-sm font-medium text-gray-800">
                            Product Description
                        </label>

                        <textarea
                            placeholder="Write a detailed product description using clear, complete sentences. Mention fabric, fit, style, and ideal usage."
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="p-3 border rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-blue-400 h-[350px] text-sm text-gray-700"
                            rows="3"
                        />

                        <p className="mt-2 text-xs text-gray-500">
                            ✍️ Please write clear, complete sentences. For example: “This elegant cotton saree features a breathable weave, perfect for daily wear or formal occasions.”
                        </p>
                    </div>
                </div>

                <div className="mt-6 flex justify-center">
                    <button
                        type="button"
                        onClick={handleSubmit}
                        className="bg-blue-400 text-white py-2 px-6  hover:bg-blue-700 transition duration-300 "
                    >
                        Update Product
                    </button>
                </div>
            </div>
        </div>

    );
}


