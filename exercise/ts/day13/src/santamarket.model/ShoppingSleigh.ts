import { Discount } from "./Discount";
import { Offer } from "./Offer";
import { Product } from "./Product";
import { Receipt } from "./Receipt";
import { SantamarketCatalog } from "./SantamarketCatalog";

export class ShoppingSleigh {
  private items: { product: Product; quantity: number }[] = [];
  private productQuantities: Map<Product, number> = new Map();

  getItems(): { product: Product; quantity: number }[] {
    return [...this.items];
  }

  addItem(product: Product): void {
    this.addItemQuantity(product, 1.0);
  }

  addItemQuantity(product: Product, quantity: number): void {
    this.items.push({ product, quantity });
    const currentQuantity = this.productQuantities.get(product) || 0;
    this.productQuantities.set(product, currentQuantity + quantity);
  }

  handleOffers(
    receipt: Receipt,
    offers: Map<Product, Offer>,
    catalog: SantamarketCatalog
  ): void {
    Array.from(this.productQuantities.entries())
      .filter(([product]) => offers.has(product))
      .forEach(([product, quantity]) => {
        const offer = offers.get(product);
        const unitPrice = catalog.getUnitPrice(product);
        const quantityAsInt = Math.floor(quantity);
        const discount: Discount = offer.computeDiscount(
          quantityAsInt,
          unitPrice
        );

        if (discount) {
          receipt.addDiscount(discount);
        }
      });
  }
}
