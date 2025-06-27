import axios from "axios";
import ImageSlider from "../components/imageSlider";
import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

export default function ProductOverview() {

    const params = useParams();
    const productId = params.id;
    const [product, setProduct] = useState(null);
    const [status, setStatus] = useState("loading");//not found,found

    useEffect(
        () => {

            axios.get(import.meta.env.VITE_BACKEND_URL + "/api/products/" + productId).then((res) => {

                if (res.data == null) {
                    setStatus("not-found");
                } else {
                    setProduct(res.data);
                    setStatus("found");
                }
            })
                .catch((err) => {
                    console.error(err);
                    setStatus("not-found");
                });
        }, [productId]);





    return (
        <div className="w-full h-screen bg-white text-gray-800">
            {status === "loading" && (
                <div className="w-full h-full flex justify-center items-center">
                    <div className="animate-spin rounded-full h-24 w-24 border-4 border-gray-300 border-t-blue-500"></div>
                </div>
            )}

            {status === "not-found" && (
                <div className="w-full h-full flex flex-col justify-center items-center bg-gray-100 text-center px-4">
                    <h1 className="text-6xl font-extrabold text-blue-600 mb-4">404</h1>
                    <h2 className="text-2xl font-semibold mb-2">Product Not Found</h2>
                    <p className="text-gray-600 mb-6 max-w-md">
                        Sorry, the product you’re looking for doesn’t seem to exist or may have been removed.
                    </p>
                    <a
                        href="/"
                        className="px-6 py-3 bg-blue-600 text-white text-lg rounded-lg hover:bg-blue-700 transition"
                    >
                        Go Back Home
                    </a>
                </div>
            )}

            {status === "found" && (
                <div className="w-full h-full flex items-center justify-center px-10 py-6 bg-gray-50 ">
                    <div className="w-[30%] h-full ">
                        {/* <img
                            src={product.images[0]}
                            alt={product.productName}
                            className="w-[400px] h-[400px] object-cover rounded-xl shadow-md"
                        /> */}
                        <ImageSlider img={product.images} />
                    </div>
                    <div className="w-[70%] h-full p-2">
                        <h1 className="text-4xl font-bold mb-2 text-gray-800">{product.productName}</h1>
                        <h2 className="text-xl text-gray-400 mb-4">{product.altNames.join(" | ")}</h2>
                        <div className="mb-4 text-xl font-semibold text-gray-700">
                            {product.price > product.lastPrice && (
                                <span className="line-through text-red-600 mr-2">LKR. {product.price}</span>
                            )}
                            <span className="text-green-600">LKR. {product.lastPrice}</span>
                        </div>
                        <p className="text-lg text-gray-600">{product.description}</p>
                    </div>
                </div>
            )}
        </div>
    );
}