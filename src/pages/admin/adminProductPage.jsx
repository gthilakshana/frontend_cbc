import axios from "axios"
import { useEffect, useState } from "react"




export default function AdminProductPage() {

    const [products, setProducts] = useState([


        {
            "_id": "6857f1c324cce8e0b5137f41",
            "productId": "BEAUTY001",
            "productName": "Hydrating Face Serum",
            "altNames": [
                "Moisturizing Serum",
                "Face Glow Serum",
                "Vitamin C Serum"
            ],
            "images": [
                "https://example.com/images/beauty-product1.jpg",
                "https://example.com/images/beauty-product1-2.jpg"
            ],
            "price": 25.99,
            "lastPrice": 39.99,
            "stock": 50,
            "description": "A lightweight, fast-absorbing face serum enriched with Vitamin C and Hyaluronic Acid to deeply hydrate, brighten, and smooth skin.",
            "__v": 0
        },
        {
            "_id": "685a344c027693edc59c26c2",
            "productId": "BEAUTY002",
            "productName": "Hydrating",
            "altNames": [
                "Moisturizing Serum",
                "Face Glow Serum",
                "Vitamin C Serum"
            ],
            "images": [
                "https://example.com/images/beauty-product1.jpg",
                "https://example.com/images/beauty-product1-2.jpg"
            ],
            "price": 35.99,
            "lastPrice": 49.99,
            "stock": 50,
            "description": "A lightweight, fast-absorbing face serum enriched with Vitamin C and Hyaluronic Acid to deeply hydrate, brighten, and smooth skin.",
            "__v": 0
        }

    ])

    useEffect(() => {
        axios.get("http://localhost:5000/api/products").then((Response) => {
            console.log(Response.data)
            setProducts(Response.data)
        })

    }, [])


    return (
        <div>
            <h1 className="mb-10 text-2xl">Admin Product Page</h1>
            {
                products.map(
                    (product, index) => {
                        return (
                            <div className="mt-2" key={product._id}>
                                {index}
                                {product.productName}
                            </div>
                        )
                    })
            }
        </div>
    )
}

