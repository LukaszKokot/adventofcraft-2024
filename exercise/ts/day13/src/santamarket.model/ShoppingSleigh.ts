import { Discount } from "./Discount";
import { Offer } from "./Offer";
import { Product } from "./Product";
import { Receipt } from "./Receipt";
import { SantamarketCatalog } from "./SantamarketCatalog";
import { SpecialOfferType } from "./SpecialOfferType";

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
        let discount: Discount | null = null;
        let x = 1;

        if (offer.offerType === SpecialOfferType.THREE_FOR_TWO) {
          discount = this.buildThreeForTwoProductDiscount(
            product,
            quantityAsInt,
            unitPrice
          );
        }

        if (offer.offerType === SpecialOfferType.TWO_FOR_AMOUNT) {
          discount = this.buildXQuantityForAmountDiscount(
            product,
            quantityAsInt,
            unitPrice,
            2,
            offer.argument
          );
        }

        if (offer.offerType === SpecialOfferType.FIVE_FOR_AMOUNT) {
          discount = this.buildXQuantityForAmountDiscount(
            product,
            quantityAsInt,
            unitPrice,
            5,
            offer.argument
          );
        }

        if (offer.offerType === SpecialOfferType.TEN_PERCENT_DISCOUNT) {
          discount = this.buildPercentageDiscount(
            product,
            quantityAsInt,
            unitPrice,
            offer.argument
          );
        }

        if (discount) {
          receipt.addDiscount(discount);
        }
      });
  }

  buildThreeForTwoProductDiscount(
    product: Product,
    quantity: number,
    unitPrice: number
  ): Discount | undefined {
    const x = 3;
    if (quantity < x) {
      return;
    }

    const y = 2;
    const numberOfXs = Math.floor(quantity / x);
    const discountAmount =
      quantity * unitPrice -
      (numberOfXs * y * unitPrice + (quantity % x) * unitPrice);
    return new Discount(product, `${x} for ${y}`, -discountAmount);
  }

  buildXQuantityForAmountDiscount(
    product: Product,
    quantity: number,
    unitPrice: number,
    discountedQuantity: number,
    discountedAmount: number
  ): Discount | undefined {
    if (quantity < discountedQuantity) {
      return;
    }

    const total =
      discountedAmount * Math.floor(quantity / discountedQuantity) +
      (quantity % discountedQuantity) * unitPrice;
    const discountN = unitPrice * quantity - total;
    return new Discount(
      product,
      `${discountedQuantity} for ${discountedAmount}`,
      -discountN
    );
  }

  buildPercentageDiscount(
    product: Product,
    quantity: number,
    unitPrice: number,
    discountedPercentage: number
  ): Discount | undefined {
    const discountedAmount =
      -quantity * unitPrice * (discountedPercentage / 100);
    return new Discount(
      product,
      `${discountedPercentage}% off`,
      discountedAmount
    );
  }
}
