import fc from "fast-check";
import {
  GiftPreparation,
  MAX_GIFTS_FOR_ELVES,
  Preparation,
} from "../src/christmas/preparation";
import { ToyType } from "../src/christmas/toyType";

describe("Preparation", () => {
  describe("when preparing", () => {
    it("no one needs to do anything when there are no gifts", () => {
      fc.assert(
        fc.property(fc.integer({ max: 0 }), (numberOfGifts) => {
          expect(Preparation.prepareGifts(numberOfGifts)).toBe(
            GiftPreparation.NO_ONE
          );
        })
      );
    });

    it(`elves need to prepare when number of gifts is below ${MAX_GIFTS_FOR_ELVES}`, () => {
      fc.assert(
        fc.property(
          fc.integer({ min: 1, max: MAX_GIFTS_FOR_ELVES - 1 }),
          (numberOfGifts) => {
            expect(Preparation.prepareGifts(numberOfGifts)).toBe(
              GiftPreparation.ELVES
            );
          }
        )
      );
    });

    it(`santa need to prepare the gifts when more than ${MAX_GIFTS_FOR_ELVES}`, () => {
      fc.assert(
        fc.property(
          fc.integer({ min: MAX_GIFTS_FOR_ELVES }),
          (numberOfGifts) => {
            expect(Preparation.prepareGifts(numberOfGifts)).toBe(
              GiftPreparation.SANTA
            );
          }
        )
      );
    });
  });

  test.each([
    [1, "Baby"],
    [3, "Toddler"],
    [6, "Child"],
    [13, "Teen"],
  ])(
    "categorizeGift should return the correct category for age %d",
    (age, expectedCategory) => {
      expect(Preparation.categorizeGift(age)).toBe(expectedCategory);
    }
  );

  test.each([
    [ToyType.EDUCATIONAL, 25, 100, true],
    [ToyType.FUN, 30, 100, true],
    [ToyType.CREATIVE, 20, 100, true],
    [ToyType.EDUCATIONAL, 20, 100, false],
    [ToyType.FUN, 29, 100, false],
    [ToyType.CREATIVE, 15, 100, false],
  ])(
    "ensureToyBalance should return %s for toy type %s with %d toys out of %d total toys",
    (toyType, toysCount, totalToys, expected) => {
      expect(Preparation.ensureToyBalance(toyType, toysCount, totalToys)).toBe(
        expected
      );
    }
  );
});
