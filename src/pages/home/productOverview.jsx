import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import axios from "axios";
import ImageSlider from "../../components/imageSlider";
import toast from "react-hot-toast";
import { addToCart } from "../../utils/cartFunction";
import Footer from "../../components/footer";

export default function ProductOverview() {
    const { id: productId } = useParams();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedColor, setSelectedColor] = useState("");
    const [selectedSize, setSelectedSize] = useState("");
    const [quantity, setQuantity] = useState(1);

    const product = products.find((p) => p.productId === productId);

    useEffect(() => {
        axios.get(import.meta.env.VITE_BACKEND_URL + "/api/products")
            .then((res) => {
                setProducts(res.data || []);
                setLoading(false);
            }).catch((err) => {
                console.error("Failed to load products:", err);
                setLoading(false);
            });
    }, []);

    const increaseQty = () => product.stock > quantity && setQuantity(quantity + 1);
    const decreaseQty = () => quantity > 1 && setQuantity(quantity - 1);

    const handleAddToCart = () => {
        addToCart(product.productId, quantity);
        toast.success("Product added to cart");
    };

    if (loading) return <div className="flex justify-center items-center h-screen">Loading...</div>;
    if (!product) return <div className="text-center py-20">Product not found</div>;

    return (
        <div className="w-full min-h-screen bg-white px-6 md:px-20 py-10 text-gray-800">
            <div className="flex flex-col md:flex-row gap-12">
                {/* Left: Image preview */}
                <div className="w-full lg:w-1/2">
                    <ImageSlider img={product.images} />
                </div>

                {/* Right: Info */}
                <div className="w-full md:w-2/3 space-y-6">
                    <div>
                        <h1 className="text-2xl font-bold">{product.productName}
                        </h1>
                        <p className="text-gray-500">{product.altNames?.join(" | ")}</p>
                        <p className="text-lg text-gray-700 font-semibold mt-2">LKR {product.lastPrice.toLocaleString()}</p>
                    </div>

                    {/* Color selector */}
                    <div>
                        <p className="text-sm font-medium">Color(s):</p>
                        <div className="flex flex-wrap gap-2 mt-2">
                            {product.colors?.map((color, index) => (
                                <button
                                    key={index}
                                    onClick={() => setSelectedColor(color)}
                                    className={`px-4 py-2 border rounded text-sm ${selectedColor === color ? "bg-black text-white" : "bg-white text-gray-700 hover:bg-gray-100"}`}
                                >
                                    {color}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Size selector */}
                    <div>
                        <p className="text-sm font-medium">Size(s):</p>
                        <div className="flex gap-3 mt-2">
                            {product.sizes?.map((size, i) => (
                                <button
                                    key={i}
                                    onClick={() => setSelectedSize(size)}
                                    className={`px-5 py-2 border rounded text-sm ${selectedSize === size ? "bg-black text-white" : "bg-white text-gray-700 hover:bg-gray-100"}`}
                                >
                                    {size}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Availability & meta */}
                    <div className="text-sm text-gray-600 mt-4 space-y-1">
                        <p>Availability: <span className="text-black">{product.stock > 0 ? "In Stock" : "Out of Stock"}</span></p>
                        <p>Brand: {product.brands?.[0]}</p>
                        <p>Code: {product.productId}-{selectedColor}-{selectedSize}</p>
                    </div>

                    {/* Quantity + Add to Cart */}
                    <div className="flex items-center gap-6 mt-6">
                        <div className="flex items-center border px-4 py-2 rounded gap-4">
                            <button onClick={decreaseQty}><AiOutlineMinus size={16} /></button>
                            <span>{quantity}</span>
                            <button onClick={increaseQty}><AiOutlinePlus size={16} /></button>
                        </div>

                        <button
                            onClick={handleAddToCart}
                            className="bg-gray-800 text-white px-8 py-2 rounded hover:bg-black"
                        >
                            Add To Cart
                        </button>
                        <button className="border border-gray-300 px-8 py-2 rounded hover:bg-gray-100">
                            Buy Now
                        </button>
                    </div>

                    {/* Accordion style */}
                    <div className="mt-10 border-t pt-6 space-y-4">
                        <details className="border rounded p-4">
                            <summary className="font-semibold cursor-pointer">PRODUCT INFORMATION</summary>
                            <p className="mt-3 text-sm text-gray-600">{product.description}</p>
                        </details>

                        <details className="border rounded p-4">
                            <summary className="font-semibold cursor-pointer">DELIVERY INFORMATION</summary>
                            <p className="mt-3 text-sm text-gray-600">Delivery within 3-5 working days. Cash on Delivery available.</p>
                        </details>
                    </div>
                </div>
            </div>


            {/* Related Products Section */}
            <div className="mt-20 mb-10">
                <h2 className="text-2xl font-bold mb-6 text-gray-800 uppercase">Related Products_</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 h-[470px]">
                    {products
                        .filter((p) => p.productId !== productId && p.brands?.[0] === product.brands?.[0])
                        .slice(0, 4) // limit to 4
                        .map((item) => (
                            <div key={item.productId} className="border bg-white shadow-sm hover:shadow-md transition">
                                <img
                                    src={item.images?.[0]}
                                    alt={item.productName}
                                    className="w-full h-64 object-cover rounded-t-md"
                                />
                                <div className="p-4">
                                    <h3 className="text-lg font-semibold text-gray-800 truncate">{item.productName}</h3>
                                    <p className="text-sm text-gray-500">{item.altNames?.join(" | ")}</p>
                                    <div className="text-2xl font-semibold text-gray-800">
                                        {product.price > product.lastPrice && (
                                            <span className="line-through text-orange-300 mr-2 text-[16px]">
                                                Rs. {product.price}
                                            </span>
                                        )}
                                        <span className="text-gray-600 text-[16px]">Rs. {product.lastPrice}</span>
                                    </div>
                                    <div className="mt-6 flex justify-between items-center">
                                        <button
                                            onClick={() => addToCart(item.productId, 1)}
                                            className="bg-gray-800 text-white text-sm px-4 py-2 rounded hover:bg-black"
                                        >
                                            Add to Cart
                                        </button>
                                        <a
                                            href={`/productInfo/${item.productId}`}
                                            className="text-sm text-blue-600 hover:underline"
                                        >
                                            View
                                        </a>
                                    </div>
                                </div>
                            </div>
                        ))}
                </div>
            </div>

            <Footer />
        </div>
    );
}
