import { useEffect, useState } from "react";
import { loadCart, deleteItem } from "../../utils/cartFunction";
import CartCard from "../../components/cartCard";

export default function Cart() {
    const [cart, setCart] = useState([]);

    useEffect(() => {
        setCart(loadCart());
    }, []);

    const handleDelete = (productId) => {
        deleteItem(productId);
        setCart(loadCart());
    };

    return (
        <div className="min-h-screen bg-gray-100 p-6 flex flex-col lg:flex-row gap-6">

            <div className="flex-1 bg-white rounded-lg shadow">
                <div className="p-4 border-b">
                    <input type="checkbox" className="mr-2" />
                    <span className="font-semibold text-gray-700">
                        SELECT ALL ({cart.length} ITEM{cart.length !== 1 && "S"})
                    </span>
                </div>

                {cart.length === 0 ? (
                    <p className="p-4 text-gray-600">Your cart is empty.</p>
                ) : (
                    cart.map((item, index) => (
                        <CartCard
                            key={item.productId + "-" + index}
                            productId={item.productId}
                            qty={item.qty}
                            onDelete={handleDelete}
                        />
                    ))
                )}
            </div>

            {/* Right - Summary */}
            <div className="w-full lg:w-[300px] bg-white rounded-lg shadow p-4 h-fit">
                <h2 className="text-lg font-bold mb-4">Order Summary</h2>
                <div className="text-sm text-gray-700 space-y-2">
                    <p className="flex justify-between">
                        <span>Subtotal ({cart.length} items)</span>
                        <span>Rs. 0</span>
                    </p>
                    <p className="flex justify-between">
                        <span>Shipping Fee</span>
                        <span>Rs. 0</span>
                    </p>
                    <input
                        type="text"
                        placeholder="Enter Voucher Code"
                        className="border w-full p-2 mt-2 rounded text-sm"
                    />
                    <button className="bg-blue-500 text-white w-full mt-2 py-2 rounded">
                        APPLY
                    </button>
                </div>
                <hr className="my-4" />
                <p className="flex justify-between font-semibold text-lg">
                    <span>Total</span>
                    <span>Rs. 0</span>
                </p>
                <button className="bg-orange-500 text-white w-full mt-4 py-2 rounded font-semibold">
                    PROCEED TO CHECKOUT({cart.length})
                </button>
            </div>
        </div>
    );
}
