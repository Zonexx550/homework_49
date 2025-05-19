import axios from "axios";
import type { Product } from "./types";

export class ApiService {
  async getProducts(): Promise<Product[]> {
    const response = await axios.get<Product[]>(
      "https://fakestoreapi.com/products"
    );
    return response.data;
  }
}
