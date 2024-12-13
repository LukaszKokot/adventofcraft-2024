import { Discount } from "./Discount";
import { Product } from "./Product";
import { SpecialOfferType } from "./SpecialOfferType";

export class Offer {
  constructor(
    public offerType: SpecialOfferType,
    public product: Product,
    public argument: number
  ) {}

  computeDiscount(quantity: number, unitPrice: number): Discount {
    let discount: Discount | undefined;

    if (this.offerType === SpecialOfferType.THREE_FOR_TWO) {
      discount = this.buildThreeForTwoProductDiscount(quantity, unitPrice);
    }

    if (this.offerType === SpecialOfferType.TWO_FOR_AMOUNT) {
      discount = this.buildXQuantityForAmountDiscount(
        quantity,
        unitPrice,
        2,
        this.argument
      );
    }

    if (this.offerType === SpecialOfferType.FIVE_FOR_AMOUNT) {
      discount = this.buildXQuantityForAmountDiscount(
        quantity,
        unitPrice,
        5,
        this.argument
      );
    }

    if (this.offerType === SpecialOfferType.TEN_PERCENT_DISCOUNT) {
      discount = this.buildPercentageDiscount(
        quantity,
        unitPrice,
        this.argument
      );
    }

    return discount;
  }

  private buildThreeForTwoProductDiscount(
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
    return new Discount(this.product, `${x} for ${y}`, -discountAmount);
  }

  private buildXQuantityForAmountDiscount(
    quantity: number,
    unitPrice: number,
    requiredQuantity: number,
    discountedAmount: number
  ): Discount | undefined {
    if (quantity < requiredQuantity) {
      return;
    }

    const total =
      discountedAmount * Math.floor(quantity / requiredQuantity) +
      (quantity % requiredQuantity) * unitPrice;
    const discountN = unitPrice * quantity - total;
    return new Discount(
      this.product,
      `${requiredQuantity} for ${discountedAmount}`,
      -discountN
    );
  }

  private buildPercentageDiscount(
    quantity: number,
    unitPrice: number,
    discountedPercentage: number
  ): Discount | undefined {
    const discountedAmount =
      -quantity * unitPrice * (discountedPercentage / 100);
    return new Discount(
      this.product,
      `${discountedPercentage}% off`,
      discountedAmount
    );
  }
}
