import { Behaviour } from "./Behaviour";
import { Toy } from "./Toy";

export class Child {
  public wishlist: Toy[] = [];

  constructor(public name: string, public behavior: Behaviour) {}

  setWishlist(firstChoice: Toy, secondChoice: Toy, thirdChoice: Toy): void {
    this.wishlist = [firstChoice, secondChoice, thirdChoice];
  }
}
