import { useParams } from "react-router-dom";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { MdCheckCircle, MdCancel } from "react-icons/md";
import { useEffect, useState } from "react";
import axios from "axios";
import ImageSlider from "../../components/imageSlider";
import Footer from "../../components/footer";
import { addToCart } from "../../utils/cartFunction";
import toast from "react-hot-toast";

export default function ProductOverview() {
    const { id: productId } = useParams();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedColor, setSelectedColor] = useState("");
    const [selectedSize, setSelectedSize] = useState("");



    const product = products.find((p) => p.productId === productId);
    const [quantity, setQuantity] = useState(1);
    const decreaseQuantity = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
        }
    };

    const increaseQuantity = () => {
        if (quantity < product.stock) {
            setQuantity(quantity + 1);
        }
    };

    useEffect(() => {
        axios
            .get(import.meta.env.VITE_BACKEND_URL + "/api/products")
            .then((res) => {
                setProducts(res.data || []);
                setLoading(false);
            })
            .catch((err) => {
                console.error("Failed to load products:", err);
                setLoading(false);
            });
    }, []);

    function onAddtoCartClick() {
        addToCart(product.productId, 1);
        toast.success("Product added to cart");
        console.log(product.productName);
    }

    if (loading) {
        return (
            <div className="w-full h-screen flex justify-center items-center">
                <div className="animate-spin rounded-full h-20 w-20 border-4 border-gray-300 border-t-blue-500"></div>
            </div>
        );
    }

    if (!product) {
        return (
            <div className="w-full min-h-screen flex flex-col justify-center items-center text-center px-4 py-12">
                <h1 className="text-6xl font-extrabold text-blue-600 mb-4">404</h1>
                <h2 className="text-2xl font-semibold mb-2">Product Not Found</h2>
                <p className="text-gray-600 mb-6 max-w-md">
                    Sorry, the product you’re looking for doesn’t exist or may have been removed.
                </p>
                <a
                    href="/product"
                    className="px-6 py-3 bg-blue-600 text-white text-lg rounded-lg hover:bg-blue-700 transition"
                >
                    Go Back to Products
                </a>
            </div>
        );
    }




    return (
        <div className="w-full bg-gray-100 text-gray-800 font-body">
            <div className="w-full min-h-screen flex flex-col md:flex-row items-start justify-center px-6 py-12 bg-gradient-to-br from-white via-gray-50 to-white gap-10">
                <div className="w-full md:w-1/2 max-w-xl ">
                    <ImageSlider img={product.images} />
                </div>

                <div className="w-full md:w-1/2 max-w-xl bg-white  p-6 shadow-md">
                    <div className="flex justify-between items-center">
                        <h1 className="text-2xl font-arial font-bold mb-2 text-gray-800">
                            {product.productName}
                        </h1>
                    </div>

                    <h2 className="text-2 text-gray-500 mb-4">
                        {product.altNames?.join(" | ")}
                    </h2>

                    <div className="space-y-6">


                        <div className="text-2xl font-semibold text-gray-800">
                            {product.price > product.lastPrice && (
                                <span className="line-through text-red-500 mr-2 text-xl">
                                    Rs. {product.price}
                                </span>
                            )}
                            <span className="text-gray-600 text-xl">Rs. {product.lastPrice}</span>
                        </div>


                        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 space-y-3 w-full max-w-sm">

                            <h2 className="text-md font-medium flex items-center space-x-2">
                                {product.stock > 0 ? (
                                    <>
                                        <MdCheckCircle className="text-green-600" size={18} />
                                        <span className="text-gray-600">In Stock</span>
                                    </>
                                ) : (
                                    <>
                                        <MdCancel className="text-red-600" size={18} />
                                        <span className="text-red-600">Out of Stock</span>
                                    </>
                                )}
                            </h2>

                            {/* Quantity Controls */}
                            <div className="flex items-center justify-between">
                                <span
                                    className={`text-sm font-medium ${product.stock > 0 ? "text-gray-700" : "text-red-700"
                                        }`}
                                >
                                    Quantity: {quantity}
                                </span>

                                {product.stock > 0 && (
                                    <div className="flex items-center space-x-2">
                                        <button
                                            onClick={decreaseQuantity}
                                            className="p-2 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-[20%] shadow"
                                        >
                                            <AiOutlineMinus size={18} />
                                        </button>
                                        <button
                                            onClick={increaseQuantity}
                                            className="p-2 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-[20%] shadow"
                                        >
                                            <AiOutlinePlus size={18} />
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>



                    <h2 className="text-sm text-gray-600 mb-2 mt-6">
                        <span className="font-medium text-gray-700">Brands :</span>
                        <span className="inline-block bg-blue-100 text-gray-700 px-3 py-1  text-xs font-medium ml-2">
                            {product.brands?.join(" | ")}
                        </span>
                    </h2>







                    {/* Color Selector */}
                    <div className="mt-6">
                        <h3 className="text-sm font-semibold mb-3 flex items-center gap-2 text-gray-700">

                            Color: <span className="font-normal">{selectedColor || "None selected"}</span>
                        </h3>
                        <div className="flex flex-wrap gap-3">
                            {product.colors?.map((color, index) => (
                                <button
                                    key={index}
                                    onClick={() => setSelectedColor(color)}
                                    className={`px-4 w-[80px] py-2 border text-sm shadow-sm  transition 
                                    ${selectedColor === color
                                            ? "border-black text-black bg-gray-100 font-semibold"
                                            : "border-gray-300 bg-white hover:border-black hover:bg-gray-50"
                                        }`}
                                >
                                    {color}
                                </button>

                            ))}
                        </div>
                    </div>

                    {/* Size Selector */}
                    <div className="mt-6">
                        <h3 className="text-sm font-semibold mb-3 flex items-center gap-2 text-gray-700">

                            Size: <span className="font-normal">{selectedSize || "None selected"}</span>
                        </h3>
                        <div className="flex flex-wrap gap-3">
                            {product.sizes?.map((size, index) => (
                                <button
                                    key={index}
                                    onClick={() => setSelectedSize(size)}
                                    className={`px-4 py-2 w-[50px] border text-sm shadow-sm rounded-md transition duration-200
                                    ${selectedSize === size
                                            ? "bg-orange-600 text-white  font-semibold"
                                            : "bg-white text-gray-800 border-gray-300 hover:border-black hover:bg-gray-50"
                                        }`}
                                >
                                    {size}
                                </button>

                            ))}
                        </div>
                    </div>



                    <div className="flex flex-wrap  gap-4 mb-6 mt-[120px] justify-center">
                        <button className="px-5 w-[130px] py-2  bg-orange-600 text-white text-sm font-medium  hover:bg-orange-500 transition duration-300 shadow-md">
                            Buy Now
                        </button>
                        <button
                            onClick={onAddtoCartClick}
                            className="px-5 w-[130px] py-2 bg-blue-400 text-white text-sm font-medium  hover:bg-blue-500 transition duration-300 shadow-md">
                            Add to Cart
                        </button>

                    </div>

                </div>
            </div>

            <div className=" justify-center max-w-5xl mx-auto  px-6 py-10 mt-10 mb-20">
                <h2 className="text-2xl font-bold text-gary-800 mb-4">Product Description</h2>
                <p className="text-gray-700 text-lg leading-relaxed">{product.description}</p>
            </div>




            <Footer />
        </div>
    );
}
