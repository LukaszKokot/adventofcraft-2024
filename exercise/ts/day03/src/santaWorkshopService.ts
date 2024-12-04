import { Gift } from "./gift";

export const MAX_WEIGHT = 5;

export class SantaWorkshopService {
  private preparedGifts: Gift[] = [];
  private maxWeight: number;

  constructor({ maxWeight = MAX_WEIGHT }: { maxWeight?: number } = {}) {
    this.maxWeight = maxWeight;
  }

  public prepareGift(
    giftName: string,
    weight: number,
    color: string,
    material: string
  ): Gift {
    if (weight > this.maxWeight) {
      throw new Error("Gift is too heavy for Santa's sleigh");
    }

    const gift = new Gift(giftName, weight, color, material);
    this.preparedGifts.push(gift);

    return gift;
  }
}
