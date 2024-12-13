import { Product } from "./Product";
import { SpecialOfferType } from "./SpecialOfferType";

export class Offer {
  constructor(
    public offerType: SpecialOfferType,
    public product: Product,
    public argument: number
  ) {}
}
