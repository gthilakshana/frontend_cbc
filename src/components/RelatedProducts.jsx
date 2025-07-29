import React from "react";
import ProductCard from "./productCard";


export default function RelatedProducts({ relatedProducts, currentProduct }) {
    if (!relatedProducts || relatedProducts.length === 0 || !currentProduct) {
        return null;
    }

    const currentCategory = currentProduct.categories?.[0]?.title;

    const filteredProducts = relatedProducts.filter(
        (product) =>
            product.productId !== currentProduct.productId &&
            product.categories?.[0]?.title === currentCategory
    );

    if (filteredProducts.length === 0) {
        return null;
    }

    return (
        <div className="mt-10">

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-5 gap-4">
                {filteredProducts.map((product) => (
                    <ProductCard key={product.productId} product={product} />
                ))}
            </div>
        </div>
    );
}
