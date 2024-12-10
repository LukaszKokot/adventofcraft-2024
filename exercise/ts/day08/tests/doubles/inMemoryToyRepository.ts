import { Toy } from "../../src/domain/toy";
import { ToyRepository } from "../../src/domain/toyRepository";

export class InMemoryToyRepository implements ToyRepository {
  private toys: Toy[] = [];

  findByName(name: string): Toy {
    const toy = this.toys.find((t) => t.getName() === name) || null;
    if (!toy) {
      throw new ToyNotFoundError();
    }
    return toy;
  }

  save(toy: Toy): void {
    this.toys = this.toys.filter((t) => t.getName() !== toy.getName());
    this.toys.push(toy);
  }
}

export class ToyNotFoundError extends Error {
  constructor() {
    super("Toy not found");
  }
}
