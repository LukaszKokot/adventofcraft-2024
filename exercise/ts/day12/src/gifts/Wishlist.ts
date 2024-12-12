import { Behaviour } from "./Behaviour";
import { Toy } from "./Toy";

export class Wishlist {
  private wishlist: Toy[] = [];
  private choiceMap = new Map<Behaviour, number>([
    ["naughty", 2],
    ["nice", 1],
    ["very nice", 0],
  ]);

  constructor(private choices: Toy[]) {
    if (choices.length !== 3) {
      throw new Error("A wishlist must have exactly 3 choices");
    }

    this.choices = choices;
  }

  forBehaviour(behaviour: Behaviour): Toy {
    if (!this.choiceMap.has(behaviour)) {
      throw new Error(`Unknown behaviour: ${behaviour}`);
    }

    return this.choices[this.choiceMap.get(behaviour)];
  }
}
