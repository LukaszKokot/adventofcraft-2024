import { ToyRepository } from "../domain/toyRepository";

export class ToyProductionService {
  private repository: ToyRepository;

  constructor(repository: ToyRepository) {
    this.repository = repository;
  }

  assignToyToElf(toyName: string, elfName: string): void {
    const toy = this.repository.findByName(toyName);
    toy.assignToyToElf(elfName);
    this.repository.save(toy);
  }

  completeAssignment(toyName: string): void {
    const toy = this.repository.findByName(toyName);
    toy.completeAssignment();
    this.repository.save(toy);
  }
}
