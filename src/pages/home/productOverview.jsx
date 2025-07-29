import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import axios from "axios";
import ImageSlider from "../../components/imageSlider";
import toast from "react-hot-toast";
import { addToCart } from "../../utils/cartFunction";
import FooterSmall from "../../components/footerSmall";
import RelatedProducts from "../../components/relatedProducts";

export default function ProductOverview() {
    const { id: productId } = useParams();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedColor, setSelectedColor] = useState("");
    const [selectedSize, setSelectedSize] = useState("");
    const [quantity, setQuantity] = useState(1);
    const [delivery, setDelivery] = useState("");
    const [relatedProducts, setRelatedProducts] = useState([]);

    const product = products.find((p) => p.productId === productId);

    useEffect(() => {
        axios
            .get(import.meta.env.VITE_BACKEND_URL + "/api/products")
            .then((res) => {
                const data = res.data || [];
                setProducts(data);

                const foundProduct = data.find((p) => p.productId === productId);
                if (foundProduct) {
                    setDelivery(foundProduct.delivery || "");


                    const related = data.filter(
                        (item) =>
                            item.subCategory === foundProduct.subCategory &&
                            item.productId !== foundProduct.productId
                    );
                    setRelatedProducts(related);
                }

                setLoading(false);
            })
            .catch((err) => {
                console.error("Failed to load products:", err);
                setLoading(false);
            });
    }, [productId]);

    const increaseQty = () => product.stock > quantity && setQuantity(quantity + 1);
    const decreaseQty = () => quantity > 1 && setQuantity(quantity - 1);

    const handleAddToCart = () => {
        addToCart(product.productId, quantity);
        toast.success("Product added to cart");
    };

    if (loading)
        return <div className="flex justify-center items-center h-screen">Loading...</div>;
    if (!product)
        return <div className="text-center py-20">Product not found</div>;

    return (
        <div className="min-h-screen flex flex-col bg-gray-50">
            <div className="w-full min-h-screen bg-white px-4 sm:px-6 md:px-10 lg:px-20 py-10 text-gray-800">

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                    <div>
                        <ImageSlider img={product.images} />
                    </div>
                    <div className="space-y-4">
                        <h1 className="text-2xl font-bold uppercase">{product.productName}</h1>
                        <p className="text-gray-500 text-[16px] uppercase">{product.altNames?.join(" | ")}</p>
                        <p className="text-[22px] text-gray-900 font-semibold">
                            LKR {product.lastPrice.toLocaleString()}

                        </p>


                        <div>
                            <p className="text-sm font-medium">Color(s):</p>
                            <div className="flex flex-wrap gap-2 mt-2">
                                {product.colors?.map((color, index) => (
                                    <button
                                        key={index}
                                        onClick={() => setSelectedColor(color)}
                                        className={`px-4 py-2 border rounded text-sm ${selectedColor === color
                                            ? "bg-orange-600 text-white"
                                            : "bg-white text-gray-700 hover:bg-gray-100"
                                            }`}
                                    >
                                        {color}
                                    </button>
                                ))}
                            </div>
                        </div>


                        <div>
                            <p className="text-sm font-medium">Size(s):</p>
                            <div className="flex flex-wrap gap-3 mt-2">
                                {product.sizes?.map((size, i) => (
                                    <button
                                        key={i}
                                        onClick={() => setSelectedSize(size)}
                                        className={`px-5 py-2 border rounded text-sm ${selectedSize === size
                                            ? "bg-orange-600 text-white"
                                            : "bg-white text-gray-700 hover:bg-gray-100"
                                            }`}
                                    >
                                        {size}
                                    </button>
                                ))}
                            </div>
                        </div>


                        <div className="text-sm text-gray-600 space-y-1">
                            <p>
                                Availability:{" "}
                                {product.stock > 0 ? "In Stock" : "Out of Stock"}
                            </p>
                            <p>Brand: {product.brands?.[0] || "N/A"}</p>
                            <p>Materials: {product.materials?.join(" | ")}</p>
                            <p>
                                Code: {product.productId}
                                {selectedColor && `-${selectedColor}`}
                                {selectedSize && `-${selectedSize}`}
                            </p>
                        </div>


                        <div className="flex items-center border px-2 py-1 gap-2 w-24 sm:w-[20%] justify-between rounded">
                            <button onClick={decreaseQty}>
                                <AiOutlineMinus size={14} />
                            </button>
                            <span>{quantity}</span>
                            <button onClick={increaseQty}>
                                <AiOutlinePlus size={14} />
                            </button>
                        </div>


                        <div className="flex flex-col sm:flex-row gap-4 mt-6">
                            <button
                                onClick={handleAddToCart}
                                className="bg-gray-800 text-white px-6 py-2 rounded hover:bg-black"
                            >
                                Add To Cart
                            </button>
                            <button className="border border-gray-300 px-6 py-2 rounded hover:bg-gray-100">
                                Buy Now
                            </button>
                        </div>


                        <div className="mt-10 border-t pt-6 space-y-4">
                            <details className="border rounded p-4">
                                <summary className="font-semibold cursor-pointer">
                                    PRODUCT INFORMATION
                                </summary>
                                <p className="mt-3 text-sm text-gray-600">
                                    {product.description}
                                </p>
                            </details>
                            <details className="border rounded p-4">
                                <summary className="font-semibold cursor-pointer">
                                    DELIVERY INFORMATION
                                </summary>
                                <p className="mt-3 text-sm text-gray-600">
                                    {delivery ||
                                        "Standard delivery within 3–5 working days."}
                                </p>
                            </details>
                        </div>
                    </div>
                </div>

                {relatedProducts.length > 0 && (
                    <div className="mt-16">
                        <h2 className="text-xl font-semibold mb-6 text-gray-800 uppercase">
                            Related Products
                        </h2>
                        <RelatedProducts relatedProducts={relatedProducts} currentProduct={product} />


                    </div>
                )}

            </div>

            <FooterSmall />
        </div>
    );
}
