import axios from "axios"
import { useEffect } from "react"
import { useState } from "react"
import toast from "react-hot-toast";
import ProductCard from "../components/productCard";

export default function Product() {
    const [products, setProducts] = useState([]);
    const [loadingState, setLoadingState] = useState('loading');




    useEffect(() => {
        if (loadingState === 'loading') {
            axios.get(import.meta.env.VITE_BACKEND_URL + "/api/products")
                .then((response) => {

                    setProducts(response.data);
                    setLoadingState('loaded');

                }).catch(
                    toast.error("Failed to fetch products")
                )
        }

    }, [])

    return (
        <div className="w-full h-full overflow-y-scroll p-6 bg-gray-50">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 place-items-center">
                {products.map((product) => (
                    <ProductCard key={product.productId} product={product} />
                ))}
            </div>
        </div>
    );

}