export function loadCart() {
  const cart = localStorage.getItem("cart");

  if (cart != null) {
    try {
      const parsed = JSON.parse(cart);
      if (Array.isArray(parsed)) {
        return parsed.map((item) => ({
          productId: item.productId,
          qty: typeof item.qty === "number" ? item.qty : (item.quantity || 1),
        }));
      }
    } catch (err) {
      console.error("Error parsing cart:", err);
    }
  }

  return [];
}


export function saveCart(cart) {
  localStorage.setItem("cart", JSON.stringify(cart));
}

export function addToCart(productId, qty) {
  const cart = loadCart();

  const index = cart.findIndex((item) => item.productId == productId);

  if (index == -1) {
    cart.push({ productId, qty });
  } else {
    const newQty = cart[index].qty + qty;
    if (newQty <= 0) {
      cart.splice(index, 1);
    } else {
      cart[index].qty = newQty;
    }
  }

  saveCart(cart); 
}

export function deleteItem(productId) {
  const cart = loadCart();
  const index = cart.findIndex((item) => item.productId === productId);

  if (index !== -1) {
    cart.splice(index, 1);
    saveCart(cart);
  }
}
