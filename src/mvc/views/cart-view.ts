import type { CartItem } from "../../types";

export class CartView {
  private cartPanelElement = document.querySelector(
    "#cart-panel"
  ) as HTMLElement;

  render(
    cart: CartItem[],
    onQuantityChange: (id: number, quantity: number) => void,
    onRemove: (id: number) => void
  ): HTMLElement {
    this.cartPanelElement.innerHTML = "<h2>Корзина</h2>";

    const list = document.createElement("ul");
    list.classList.add("cart-list");

    cart.forEach((item) => {
      const li = document.createElement("li");
      li.classList.add("cart-item");
      li.innerHTML = `
        <img src="${item.image}" alt="${item.title}" />
        <div class="cart-item-info">
          <h4>${item.title}</h4>
          <p>${item.price.toFixed(2)} $</p>
          <input type="number" value="${item.quantity}" min="1" data-id="${
        item.id
      }" />
          <button data-id="${item.id}" class="remove">Удалить</button>
        </div>
      `;

      list.appendChild(li);
    });

    this.cartPanelElement.appendChild(list);

    const totalSum = cart.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

    const totalElement = document.createElement("div");
    totalElement.classList.add("cart-total");
    totalElement.textContent = `Итого: ${totalSum.toFixed(2)} $`;

    this.cartPanelElement.appendChild(totalElement);

    this.cartPanelElement
      .querySelectorAll("input[type='number']")
      .forEach((input) => {
        const el = input as HTMLInputElement;
        el.addEventListener("change", () => {
          const id = Number(el.dataset.id);
          const quantity = parseInt(el.value);
          if (!isNaN(quantity) && quantity > 0) {
            onQuantityChange(id, quantity);
          }
        });
      });

    this.cartPanelElement.querySelectorAll("button.remove").forEach((btn) => {
      const el = btn as HTMLButtonElement;
      el.addEventListener("click", () => {
        const id = Number(el.dataset.id);
        onRemove(id);
      });
    });

    return this.cartPanelElement;
  }
}
