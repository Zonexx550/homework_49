import type { CartItem } from "../../types";

export class CartModel {
  loadCart(): CartItem[] {
    const raw = localStorage.getItem("cart");
    return raw ? JSON.parse(raw) : [];
  }

  saveCart(cart: CartItem[]): void {
    localStorage.setItem("cart", JSON.stringify(cart));
  }
}
