import { ToyType } from "./toyType";

export enum GiftPreparation {
  NO_ONE = "No gifts to prepare.",
  ELVES = "Elves will prepare the gifts.",
  SANTA = "Santa will prepare the gifts.",
}

export const MAX_GIFTS_FOR_ELVES = 50;

export class Preparation {
  static prepareGifts(numberOfGifts: number): GiftPreparation {
    if (numberOfGifts <= 0) {
      return GiftPreparation.NO_ONE;
    } else if (numberOfGifts < MAX_GIFTS_FOR_ELVES) {
      return GiftPreparation.ELVES;
    }
    return GiftPreparation.SANTA;
  }

  static categorizeGift(age: number): string {
    if (age <= 2) {
      return "Baby";
    } else if (age <= 5) {
      return "Toddler";
    } else if (age <= 12) {
      return "Child";
    }
    return "Teen";
  }

  static ensureToyBalance(
    toyType: ToyType,
    toysCount: number,
    totalToys: number
  ): boolean {
    const typePercentage = toysCount / totalToys;

    switch (toyType) {
      case ToyType.EDUCATIONAL:
        return typePercentage >= 0.25;
      case ToyType.FUN:
        return typePercentage >= 0.3;
      case ToyType.CREATIVE:
        return typePercentage >= 0.2;
      default:
        return false;
    }
  }
}
