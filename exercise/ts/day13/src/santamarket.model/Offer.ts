import { Discount } from "./Discount";
import { Product } from "./Product";
import { SpecialOfferType } from "./SpecialOfferType";

export class Offer {
  private readonly discountComputationMap = new Map<
    SpecialOfferType,
    (quantity: number, unitPrice: number) => DiscountCalculator
  >([
    [
      SpecialOfferType.THREE_FOR_TWO,
      (quantity: number, unitPrice: number) =>
        new XForYDiscountCalculator(this.product, quantity, unitPrice, 3, 2),
    ],
    [
      SpecialOfferType.TWO_FOR_ONE,
      (quantity: number, unitPrice: number) =>
        new XForYDiscountCalculator(this.product, quantity, unitPrice, 2, 1),
    ],
    [
      SpecialOfferType.TWO_FOR_AMOUNT,
      (quantity: number, unitPrice: number) =>
        new XQuantityForYAmountDiscountCalculator(
          this.product,
          quantity,
          unitPrice,
          2,
          this.argument
        ),
    ],
    [
      SpecialOfferType.FIVE_FOR_AMOUNT,
      (quantity: number, unitPrice: number) =>
        new XQuantityForYAmountDiscountCalculator(
          this.product,
          quantity,
          unitPrice,
          5,
          this.argument
        ),
    ],
    [
      SpecialOfferType.TEN_PERCENT_DISCOUNT,
      (quantity: number, unitPrice: number) =>
        new XPercentageDiscountCalculator(
          this.product,
          quantity,
          unitPrice,
          this.argument
        ),
    ],
  ]);

  constructor(
    public offerType: SpecialOfferType,
    public product: Product,
    public argument: number
  ) {}

  computeDiscount(quantity: number, unitPrice: number): Discount {
    if (!this.discountComputationMap.has(this.offerType)) {
      throw new Error("Unsupported offer type: missing implementation!");
    }

    return this.discountComputationMap
      .get(this.offerType)(quantity, unitPrice)
      .calculate();
  }
}

interface DiscountCalculator {
  calculate(): Discount | undefined;
}

class XForYDiscountCalculator implements DiscountCalculator {
  constructor(
    private readonly product: Product,
    private readonly quantity: number,
    private readonly unitPrice: number,
    private readonly x: number,
    private readonly y: number
  ) {}

  calculate(): Discount | undefined {
    if (this.quantity < this.x) {
      return;
    }

    const numberOfXs = Math.floor(this.quantity / this.x);
    const discountAmount =
      this.quantity * this.unitPrice -
      (numberOfXs * this.y * this.unitPrice +
        (this.quantity % this.x) * this.unitPrice);
    return new Discount(
      this.product,
      `${this.x} for ${this.y}`,
      -discountAmount
    );
  }
}

class XQuantityForYAmountDiscountCalculator implements DiscountCalculator {
  constructor(
    private readonly product: Product,
    private readonly quantity: number,
    private readonly unitPrice: number,
    private readonly requiredQuantity: number,
    private readonly discountedAmount: number
  ) {}

  calculate(): Discount | undefined {
    if (this.quantity < this.requiredQuantity) {
      return;
    }

    const total =
      this.discountedAmount *
        Math.floor(this.quantity / this.requiredQuantity) +
      (this.quantity % this.requiredQuantity) * this.unitPrice;
    const discountN = this.unitPrice * this.quantity - total;
    return new Discount(
      this.product,
      `${this.requiredQuantity} for ${this.discountedAmount}`,
      -discountN
    );
  }
}

class XPercentageDiscountCalculator implements DiscountCalculator {
  constructor(
    private readonly product: Product,
    private readonly quantity: number,
    private readonly unitPrice: number,
    private readonly discountedPercentage: number
  ) {}

  calculate(): Discount | undefined {
    const discountedAmount =
      -this.quantity * this.unitPrice * (this.discountedPercentage / 100);
    return new Discount(
      this.product,
      `${this.discountedPercentage}% off`,
      discountedAmount
    );
  }
}
