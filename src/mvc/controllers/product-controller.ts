import { ProductModel } from "../models/product-model";
import { ProductView } from "../views/product-view";
import { CartController } from "./cart-controller";

export class ProductController {
  private model = new ProductModel();
  private view = new ProductView();
  private cartController = new CartController();

  async init(): Promise<void> {
    const products = await this.model.loadProducts();
    this.view.renderProducts(products, (product) => {
      this.cartController.addToCart(product);
    });
    this.cartController.init();
  }
}
