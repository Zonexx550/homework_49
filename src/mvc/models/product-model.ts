import type { Product } from "../../types";
import { ApiService } from "../../services";

export class ProductModel {
  private products: Product[] = [];
  private apiService = new ApiService();

  async loadProducts(): Promise<Product[]> {
    this.products = await this.apiService.getProducts();
    return this.products;
  }

  getProducts(): Product[] {
    return this.products;
  }
}
