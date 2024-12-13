import { Product } from "../src/santamarket.model/Product";
import { SantamarketCatalog } from "../src/santamarket.model/SantamarketCatalog";

export class FakeCatalog implements SantamarketCatalog {
  private prices: Map<string, number> = new Map();

  addProduct(product: Product, price: number): void {
    this.prices.set(product.name, price);
  }

  getUnitPrice(product: Product): number {
    return this.prices.get(product.name) || 0;
  }

  withProduct(product: Product, price: number): FakeCatalog {
    this.prices.set(product.name, price);
    return this;
  }
}
