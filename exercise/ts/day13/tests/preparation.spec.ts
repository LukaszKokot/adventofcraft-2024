import { ChristmasElf } from "../src/santamarket.model/ChristmasElf";
import { Discount } from "../src/santamarket.model/Discount";
import { Product } from "../src/santamarket.model/Product";
import { ProductUnit } from "../src/santamarket.model/ProductUnit";
import { ReceiptItem } from "../src/santamarket.model/ReceiptItem";
import { ShoppingSleigh } from "../src/santamarket.model/ShoppingSleigh";
import { SpecialOfferType } from "../src/santamarket.model/SpecialOfferType";
import { FakeCatalog } from "./FakeCatalog";

describe("Santamarket Tests", () => {
  const teddyBear = new Product("teddyBear", ProductUnit.EACH);
  const turkey = new Product("turkey", ProductUnit.KILO);

  describe("calculates a total without discounts", () => {
    it("for an empty sleigh", () => {
      const catalog = new FakeCatalog().withProduct(teddyBear, 1.0);

      const sleigh = new ShoppingSleigh();

      const elf = new ChristmasElf(catalog);
      const receipt = elf.checksOutArticlesFrom(sleigh);

      expect(receipt.getTotalPrice()).toBe(0);
      expect(receipt.getItems()).toHaveLength(0);
    });

    it("when the sleigh is empty", () => {
      const catalog = new FakeCatalog().withProduct(teddyBear, 1.0);

      const sleigh = new ShoppingSleigh();
      sleigh.addItemQuantity(teddyBear, 3);

      const elf = new ChristmasElf(catalog);
      const receipt = elf.checksOutArticlesFrom(sleigh);

      const expectedTotalPrice = 3.0;
      const expectedReceiptItem = new ReceiptItem(
        teddyBear,
        3,
        1.0,
        expectedTotalPrice
      );

      expect(receipt.getTotalPrice()).toBeCloseTo(expectedTotalPrice, 0.001);
      expect(receipt.getItems()[0].equals(expectedReceiptItem)).toBe(true);
    });
  });

  it("applies ten percent discount", () => {
    const catalog = new FakeCatalog().withProduct(turkey, 2.0);

    const sleigh = new ShoppingSleigh();
    sleigh.addItemQuantity(turkey, 2);

    const elf = new ChristmasElf(catalog);
    elf.addSpecialOffer(SpecialOfferType.TEN_PERCENT_DISCOUNT, turkey, 10);
    const receipt = elf.checksOutArticlesFrom(sleigh);

    const expectedNonDiscountedPrice = 4.0;
    const expectedTotalPrice = expectedNonDiscountedPrice * 0.9;
    const expectedReceiptItem = new ReceiptItem(
      turkey,
      2,
      2.0,
      expectedNonDiscountedPrice
    );
    const expectedDiscount = new Discount(turkey, "10% off", -0.4);

    expect(receipt.getTotalPrice()).toBeCloseTo(expectedTotalPrice, 0.001);
    expect(receipt.getDiscounts()[0]).toStrictEqual(expectedDiscount);
    expect(receipt.getItems()[0]).toStrictEqual(expectedReceiptItem);
  });

  it("applies three for two discount", () => {
    const catalog = new FakeCatalog().withProduct(teddyBear, 1.0);

    const elf = new ChristmasElf(catalog);
    elf.addSpecialOffer(SpecialOfferType.THREE_FOR_TWO, teddyBear, 0);

    const sleigh = new ShoppingSleigh();
    sleigh.addItemQuantity(teddyBear, 3);

    const receipt = elf.checksOutArticlesFrom(sleigh);

    const expectedNonDiscountedPrice = 3.0;
    const expectedTotalPrice = 2.0;
    const expectedReceiptItem = new ReceiptItem(
      teddyBear,
      3,
      1.0,
      expectedNonDiscountedPrice
    );
    const expectedDiscount = new Discount(teddyBear, "3 for 2", -1.0);

    expect(receipt.getTotalPrice()).toBeCloseTo(expectedTotalPrice, 0.001);
    expect(receipt.getDiscounts()[0]).toStrictEqual(expectedDiscount);
    expect(receipt.getItems()[0]).toStrictEqual(expectedReceiptItem);
  });

  it("applies two for one discount", () => {
    const catalog = new FakeCatalog().withProduct(teddyBear, 1.0);

    const elf = new ChristmasElf(catalog);
    elf.addSpecialOffer(SpecialOfferType.TWO_FOR_ONE, teddyBear, 0);

    const sleigh = new ShoppingSleigh();
    sleigh.addItemQuantity(teddyBear, 2);

    const receipt = elf.checksOutArticlesFrom(sleigh);

    const expectedNonDiscountedPrice = 2.0;
    const expectedTotalPrice = 1.0;
    const expectedReceiptItem = new ReceiptItem(
      teddyBear,
      2,
      1.0,
      expectedNonDiscountedPrice
    );
    const expectedDiscount = new Discount(teddyBear, "2 for 1", -1.0);

    expect(receipt.getTotalPrice()).toBeCloseTo(expectedTotalPrice, 0.001);
    expect(receipt.getDiscounts()[0]).toStrictEqual(expectedDiscount);
    expect(receipt.getItems()[0]).toStrictEqual(expectedReceiptItem);
  });

  it("applies two for amount discount", () => {
    const catalog = new FakeCatalog().withProduct(teddyBear, 1.0);

    const elf = new ChristmasElf(catalog);
    const discountedPriceForTwoTeddyBears = 1.6;
    elf.addSpecialOffer(
      SpecialOfferType.TWO_FOR_AMOUNT,
      teddyBear,
      discountedPriceForTwoTeddyBears
    );

    const sleigh = new ShoppingSleigh();
    sleigh.addItemQuantity(teddyBear, 2);

    const receipt = elf.checksOutArticlesFrom(sleigh);

    const expectedNonDiscountedPrice = 2.0;
    const expectedTotalPrice = discountedPriceForTwoTeddyBears;
    const expectedReceiptItem = new ReceiptItem(
      teddyBear,
      2,
      1.0,
      expectedNonDiscountedPrice
    );
    const expectedDiscount = new Discount(teddyBear, "2 for 1.6", -0.4);

    expect(receipt.getTotalPrice()).toBeCloseTo(expectedTotalPrice, 0.001);
    expect(receipt.getDiscounts()[0].equals(expectedDiscount)).toBeTruthy();
    expect(receipt.getItems()[0]).toStrictEqual(expectedReceiptItem);
  });

  it("applies five for amount discount", () => {
    const catalog = new FakeCatalog().withProduct(teddyBear, 1.0);

    const elf = new ChristmasElf(catalog);
    const discountedPriceForFiveTeddyBears = 4.0;
    elf.addSpecialOffer(
      SpecialOfferType.FIVE_FOR_AMOUNT,
      teddyBear,
      discountedPriceForFiveTeddyBears
    );

    const sleigh = new ShoppingSleigh();
    sleigh.addItemQuantity(teddyBear, 6);

    const receipt = elf.checksOutArticlesFrom(sleigh);

    const expectedNonDiscountedPrice = 6.0;
    const expectedTotalPrice = discountedPriceForFiveTeddyBears + 1.0;
    const expectedReceiptItem = new ReceiptItem(
      teddyBear,
      6,
      1.0,
      expectedNonDiscountedPrice
    );
    const expectedDiscount = new Discount(teddyBear, "5 for 4", -1.0);

    expect(receipt.getTotalPrice()).toBeCloseTo(expectedTotalPrice, 0.001);
    expect(receipt.getDiscounts()[0]).toStrictEqual(expectedDiscount);
    expect(receipt.getItems()[0]).toStrictEqual(expectedReceiptItem);
  });

  it("applies discount for one of two different items in sleigh", () => {
    const catalog = new FakeCatalog()
      .withProduct(teddyBear, 1.0)
      .withProduct(turkey, 2.0);

    const elf = new ChristmasElf(catalog);
    elf.addSpecialOffer(SpecialOfferType.TEN_PERCENT_DISCOUNT, teddyBear, 10);

    const sleigh = new ShoppingSleigh();
    sleigh.addItemQuantity(teddyBear, 3);
    sleigh.addItemQuantity(turkey, 1.5);

    const receipt = elf.checksOutArticlesFrom(sleigh);

    const expectedNonDiscountedTeddyBearPrice = 3.0;
    const expectedTotalTeddyBearPrice =
      expectedNonDiscountedTeddyBearPrice * 0.9;
    const totalTurkeyPrice = 1.5 * 2.0;
    const expectedTotalPrice = expectedTotalTeddyBearPrice + totalTurkeyPrice;
    const expectedDiscount = new Discount(teddyBear, "10% off", -0.3);

    expect(receipt.getTotalPrice()).toBeCloseTo(expectedTotalPrice, 0.001);
    expect(receipt.getDiscounts()[0].equals(expectedDiscount)).toBeTruthy();
  });
});
