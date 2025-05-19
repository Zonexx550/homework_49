import type { Product } from "../../types";

export class ProductView {
  private productListElement = document.querySelector(
    "#product-list"
  ) as HTMLElement;

  renderProducts(
    products: Product[],
    onAddToCart: (product: Product) => void
  ): HTMLElement {
    this.productListElement.innerHTML = "";

    products.forEach((product) => {
      const card = document.createElement("div");
      card.className = "product-card";
      card.innerHTML = `
        <img src="${product.image}" alt="${product.title}" />
        <h3>${product.title}</h3>
        <p>${product.price.toFixed(2)} $</p>
        <button>В корзину</button>
      `;
      const button = card.querySelector("button")!;
      button.addEventListener("click", () => onAddToCart(product));
      this.productListElement.appendChild(card);
    });

    return this.productListElement;
  }
}
