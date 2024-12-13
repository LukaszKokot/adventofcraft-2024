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
            quantity,
            unitPrice
          );
        }

        if (offer.offerType === SpecialOfferType.TWO_FOR_AMOUNT) {
          discount = this.buildTwoForAmountDiscount(
            product,
            quantity,
            unitPrice,
            offer.argument
          );
        }

        if (offer.offerType === SpecialOfferType.FIVE_FOR_AMOUNT) {
          discount = this.buildFiveForAmountDiscount(
            product,
            quantity,
            unitPrice,
            offer.argument
          );
        }

        if (offer.offerType === SpecialOfferType.TEN_PERCENT_DISCOUNT) {
          const discountAmount = -quantity * unitPrice * (offer.argument / 100);
          discount = new Discount(
            product,
            `${offer.argument}% off`,
            discountAmount
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

  buildTwoForAmountDiscount(
    product: Product,
    quantity: number,
    unitPrice: number,
    discountedAmount: number
  ): Discount | undefined {
    const x = 2;
    if (quantity < x) {
      return;
    }

    const total =
      discountedAmount * Math.floor(quantity / x) + (quantity % x) * unitPrice;
    const discountN = unitPrice * quantity - total;
    return new Discount(product, `${x} for ${discountedAmount}`, -discountN);
  }

  buildFiveForAmountDiscount(
    product: Product,
    quantity: number,
    unitPrice: number,
    discountedAmount: number
  ): Discount | undefined {
    const x = 5;
    if (quantity < x) {
      return;
    }

    const total =
      discountedAmount * Math.floor(quantity / x) + (quantity % x) * unitPrice;
    const discountN = unitPrice * quantity - total;
    return new Discount(product, `${x} for ${discountedAmount}`, -discountN);
  }
}
