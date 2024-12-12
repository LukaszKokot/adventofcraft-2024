import { ToyBalance, ToyType } from "./toyType";

export enum GiftPreparation {
  NO_ONE = "No gifts to prepare.",
  ELVES = "Elves will prepare the gifts.",
  SANTA = "Santa will prepare the gifts.",
}

export enum GiftCategory {
  BABY = "Baby",
  TODDLER = "Toddler",
  CHILD = "Child",
  TEEN = "Teen",
}

export const MAX_GIFTS_FOR_ELVES = 50;
export const MAX_AGE_FOR_BABY = 2;
export const MAX_AGE_FOR_TODDLER = 5;
export const MAX_AGE_FOR_CHILD = 12;

export class Preparation {
  static prepareGifts(numberOfGifts: number): GiftPreparation {
    switch (true) {
      case numberOfGifts <= 0:
        return GiftPreparation.NO_ONE;
      case numberOfGifts < MAX_GIFTS_FOR_ELVES:
        return GiftPreparation.ELVES;
      default:
        return GiftPreparation.SANTA;
    }
  }

  static categorizeGift(age: number): string {
    switch (true) {
      case age <= MAX_AGE_FOR_BABY:
        return GiftCategory.BABY;
      case age <= MAX_AGE_FOR_TODDLER:
        return GiftCategory.TODDLER;
      case age <= MAX_AGE_FOR_CHILD:
        return GiftCategory.CHILD;
      default:
        return GiftCategory.TEEN;
    }
  }

  static ensureToyBalance(
    toyType: ToyType,
    toysCount: number,
    totalToys: number
  ): boolean {
    if (!ToyBalance.has(toyType)) {
      return false;
    }

    const typePercentage = toysCount / totalToys;
    return typePercentage >= ToyBalance.get(toyType);
  }
}
