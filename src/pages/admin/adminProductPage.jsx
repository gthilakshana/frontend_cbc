import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaPlus, FaTrash } from "react-icons/fa";
import { FaPencil } from "react-icons/fa6";
import { Link } from "react-router-dom";

export default function AdminProductPage() {
    const [products, setProducts] = useState([]);
    const [productLoaded, setProductLoaded] = useState(false);

    useEffect(() => {
        if (!productLoaded) {
            axios.get("http://localhost:5000/api/products").then((response) => {
                console.log(response.data);
                setProducts(response.data);
                setProductLoaded(true);
            });
        }

    }, [productLoaded]);

    return (
        <div className="w-full  bg-white rounded-lg overflow-hidden  lg:p-1  flex flex-col items-center relative">
            <Link to="/admin/products/addProduct"><button className="absolute right-3 bottom-0 text-2xl bg-blue-500 text-white p-2 rounded-xl hover:bg-[#a6ddff] hover:text-600">
                <FaPlus />
            </button>
            </Link>
            {/* Scrollable Container */}
            <div className="w-full  bg-white shadow-lg rounded-lg overflow-y-auto ">
                <h1 className="text-2xl font-bold text-gray-800 mb-5 text-center ">Admin Product Page</h1>
                <div className="w-full h-full flex justify-center items-center">
                    <div className="w-[40px] h-[40px] border-gray-300 border-[3px] animate-spin border-b-blue-500 rounded-full ">

                    </div>
                </div>
            </div>
        </div>
    );
}

//   <table className="w-full text-sm text-left text-gray-700">
//                         <thead className="text-xs uppercase bg-blue-200 text-gray-600 sticky top-0">
//                             <tr>
//                                 <th className="px-6 py-4">Product ID</th>
//                                 <th className="px-6 py-4">Product Name</th>
//                                 <th className="px-6 py-4">Price</th>
//                                 <th className="px-6 py-4">Last Price</th>
//                                 <th className="px-6 py-4">Stock</th>
//                                 <th className="px-6 py-4">Description</th>
//                                 <th className="px-6 py-4 text-center">Actions</th>
//                             </tr>
//                         </thead>
//                         <tbody>
//                             {products.map((product, index) => (
//                                 <tr key={index} className="border-b hover:bg-blue-50 transition duration-300">
//                                     <td className="px-6 py-4">{product.productId}</td>
//                                     <td className="px-6 py-4">{product.productName}</td>
//                                     <td className="px-6 py-4">Rs. {product.price}</td>
//                                     <td className="px-6 py-4">Rs. {product.lastPrice}</td>
//                                     <td className="px-6 py-4">{product.stock}</td>
//                                     <td className="px-6 py-4">{product.description}</td>
//                                     <td className="px-6 py-4 text-center flex gap-4 justify-center">
//                                         <button className="text-red-600 hover:text-red-800"
//                                             title="Delete"
//                                             onClick={() => {
//                                                 const token = localStorage.getItem('token');
//                                                 axios.delete(`http://localhost:5000/api/products/${product.productId}`, {
//                                                     headers: {
//                                                         Authorization: `Bearer ${token}`,
//                                                     },
//                                                 }).then(() => {

//                                                     toast.success("Product deleted successfully");
//                                                     setProductLoaded(false);
//                                                 });
//                                             }}
//                                         >
//                                             <FaTrash />
//                                         </button>
//                                         <button className="text-blue-600 hover:text-blue-800">
//                                             <FaPencil />
//                                         </button>
//                                     </td>
//                                 </tr>
//                             ))}
//                         </tbody>
//                     </table>
