import { Behaviour } from "./Behaviour";
import { Toy } from "./Toy";
import { Wishlist } from "./Wishlist";

export class Child {
  public wishlist: Wishlist;

  constructor(public name: string, public behavior: Behaviour) {}

  setWishlist(firstChoice: Toy, secondChoice: Toy, thirdChoice: Toy): void {
    this.wishlist = new Wishlist([firstChoice, secondChoice, thirdChoice]);
  }

  toyToChoose(): Toy {
    return this.wishlist.forBehaviour(this.behavior);
  }
}
