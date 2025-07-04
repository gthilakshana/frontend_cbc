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
        <div className="w-full min-h-screen bg-white px-4 sm:px-6 md:px-10 lg:px-20 py-10 text-gray-800">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                {/* Left: Image preview */}
                <div>
                    <ImageSlider img={product.images} />
                </div>

                {/* Right: Info */}
                <div className="space-y-6">
                    <div>
                        <h1 className="text-2xl font-bold uppercase">{product.productName}</h1>
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
                        <div className="flex flex-wrap gap-3 mt-2">
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


                    <div className="flex items-center border px-2 py-1 gap-2 w-24 sm:w-[20%] justify-between rounded">
                        <button onClick={decreaseQty} className="text-sm sm:text-base">
                            <AiOutlineMinus size={14} />
                        </button>
                        <span className="text-sm sm:text-base">{quantity}</span>
                        <button onClick={increaseQty} className="text-sm sm:text-base">
                            <AiOutlinePlus size={14} />
                        </button>
                    </div>


                    {/* Quantity + Buttons */}
                    <div className="flex flex-col sm:flex-row sm:items-center gap-4 mt-6">




                        <button
                            onClick={handleAddToCart}
                            className="bg-gray-800 text-white px-6 py-2 rounded hover:bg-black w-full sm:w-auto"
                        >
                            Add To Cart
                        </button>
                        <button className="border border-gray-300 px-6 py-2 rounded hover:bg-gray-100 w-full sm:w-auto">
                            Buy Now
                        </button>
                    </div>

                    {/* Accordion */}
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

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 border p-4">
                    {products
                        .filter(
                            (p) =>
                                p.productId !== productId &&
                                p.brands?.[0] === product?.brands?.[0]
                        )
                        .slice(0, 4)
                        .map((item) => {
                            const isInStock = item.stock > 0;

                            return (
                                <div
                                    key={item.productId}
                                    className={`w-[270px] h-[470px] bg-white border shadow overflow-hidden flex flex-col relative transition duration-300 
                                    ${!isInStock
                                            ? "opacity-60 grayscale pointer-events-none"
                                            : "hover:shadow-lg"
                                        }`}
                                >
                                    {/* Stock Badge */}
                                    <div
                                        className={`absolute top-2 left-2 text-xs px-2 py-1 rounded-md z-10 font-semibold 
                                    ${isInStock
                                                ? "bg-gray-800 text-white"
                                                : "bg-orange-600 text-white"
                                            }`}
                                    >
                                        {isInStock ? "In Stock" : "Out of Stock"}
                                    </div>

                                    {/* Product Image */}
                                    <img
                                        src={item.images?.[0]}
                                        alt={item.productName}
                                        className="w-full h-64 object-cover cursor-pointer"
                                    />

                                    {/* Product Info */}
                                    <div className="p-4 flex-1 flex flex-col justify-between">
                                        <div>
                                            <h3 className="text-lg font-semibold text-gray-800 truncate uppercase">
                                                {item.productName}
                                            </h3>
                                            <p className="text-sm text-gray-500">
                                                {item.altNames?.join(" | ")}
                                            </p>
                                            <div className="text-lg font-semibold text-gray-800 mt-2">
                                                <span className="text-gray-600 text-[16px] line-through mr-2">
                                                    Rs. {item.price}
                                                </span>
                                                <span className="text-gray-600 text-[16px]">
                                                    Rs. {item.lastPrice}
                                                </span>
                                            </div>
                                        </div>

                                        {/* Actions */}
                                        <div className="mt-4 flex justify-between items-center">
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
                            );
                        })}

                    {/* Optional Fallback if no related products */}
                    {products.filter(
                        (p) =>
                            p.productId !== productId &&
                            p.brands?.[0] === product?.brands?.[0]
                    ).length === 0 && (
                            <div className="col-span-full text-center text-gray-500 text-sm py-4">
                                No related products found.
                            </div>
                        )}
                </div>
            </div>




            <Footer />
        </div>
    );
}
