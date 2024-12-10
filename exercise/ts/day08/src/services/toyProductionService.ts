import { Toy } from "../domain/toy";
import { ToyRepository } from "../domain/toyRepository";

export class ToyProductionService {
  private repository: ToyRepository;

  constructor(repository: ToyRepository) {
    this.repository = repository;
  }

  assignToyToElf(toyName: string, elfName: string): void {
    const toy = this.repository.findByName(toyName);
    if (toy && toy.getState() === Toy.State.UNASSIGNED) {
      toy.assignToyToElf(elfName);
      this.repository.save(toy);
    }
  }
}
