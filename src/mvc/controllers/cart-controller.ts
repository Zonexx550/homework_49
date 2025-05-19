import type { CartItem, Product } from "../../types";
import { CartModel } from "../models/cart-model";
import { CartView } from "../views/cart-view";

export class CartController {
  private model = new CartModel();
  private view = new CartView();
  private cart: CartItem[] = [];

  init(): void {
    this.cart = this.model.loadCart();
    this.updateCartView();
  }

  addToCart(product: Product): void {
    const existing = this.cart.find((item) => item.id === product.id);
    if (existing) {
      existing.quantity++;
    } else {
      this.cart.push({ ...product, quantity: 1 });
    }
    this.updateCart();
  }

  updateQuantity(id: number, quantity: number): void {
    const item = this.cart.find((item) => item.id === id);
    if (item) {
      item.quantity = quantity;
      this.updateCart();
    }
  }

  removeItem(id: number): void {
    const initialLength = this.cart.length;
    this.cart = this.cart.filter((item) => item.id !== id);
    if (this.cart.length !== initialLength) {
      this.updateCart();
    }
  }

  private updateCart(): void {
    this.model.saveCart(this.cart);
    this.updateCartView();
  }

  private updateCartView(): void {
    this.view.render(
      this.cart,
      this.updateQuantity.bind(this),
      this.removeItem.bind(this)
    );
  }
}
