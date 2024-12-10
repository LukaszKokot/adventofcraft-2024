import { Toy } from "../src/domain/toy";
import { ToyProductionService } from "../src/services/toyProductionService";
import { InMemoryToyRepository } from "./doubles/inMemoryToyRepository";

describe("ToyProductionService", () => {
  const ELF_NAME = "Elf";
  const TOY_NAME = "Train";

  it("assignToyToElfShouldPassTheItemInProduction", () => {
    const repository = new InMemoryToyRepository();
    const service = new ToyProductionService(repository);
    repository.save(new Toy(TOY_NAME, Toy.State.UNASSIGNED));

    service.assignToyToElf(TOY_NAME, ELF_NAME);

    const toy = repository.findByName(TOY_NAME);
    expect(toy?.getAssignedElf()).toBe(ELF_NAME);
    expect(toy?.getState()).toBe(Toy.State.IN_PRODUCTION);
  });
});
