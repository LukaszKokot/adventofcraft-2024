import fc from "fast-check";
import {
  GiftCategory,
  GiftPreparation,
  MAX_AGE_FOR_BABY,
  MAX_AGE_FOR_CHILD,
  MAX_AGE_FOR_TODDLER,
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

  describe.each([
    [0, MAX_AGE_FOR_BABY, GiftCategory.BABY],
    [MAX_AGE_FOR_BABY + 1, MAX_AGE_FOR_TODDLER, GiftCategory.TODDLER],
    [MAX_AGE_FOR_TODDLER + 1, MAX_AGE_FOR_CHILD, GiftCategory.CHILD],
    [MAX_AGE_FOR_CHILD + 1, undefined, GiftCategory.TEEN],
  ])("when categorizing", (min, max, expected) => {
    describe(`and age is above ${min} but below or equal to ${
      max ?? "infinity"
    }`, () => {
      it(`should categorize for ${expected}`, () => {
        fc.assert(
          fc.property(fc.integer({ min, max }), (age) => {
            expect(Preparation.categorizeGift(age)).toBe(expected);
          })
        );
      });
    });
  });

  test.each([
    [ToyType.EDUCATIONAL, 25, 100, true],
    [ToyType.FUN, 30, 100, true],
    [ToyType.CREATIVE, 20, 100, true],
    [ToyType.EDUCATIONAL, 20, 100, false],
    [ToyType.FUN, 29, 100, false],
    [ToyType.CREATIVE, 15, 100, false],
    [undefined, 15, 100, false],
    [null, 15, 100, false],
  ])(
    "ensureToyBalance should return %s for toy type %s with %d toys out of %d total toys",
    (toyType, toysCount, totalToys, expected) => {
      expect(Preparation.ensureToyBalance(toyType, toysCount, totalToys)).toBe(
        expected
      );
    }
  );
});
