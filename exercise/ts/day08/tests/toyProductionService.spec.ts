import {
  Toy,
  ToyNotInProductionError,
  ToyUnassignableError,
} from "../src/domain/toy";
import { ToyProductionService } from "../src/services/toyProductionService";
import {
  InMemoryToyRepository,
  ToyNotFoundError,
} from "./doubles/inMemoryToyRepository";

describe("ToyProductionService", () => {
  const ELF_NAME = "Elf";
  const TOY_NAME = "Train";

  describe("assigning a toy to an elf", () => {
    describe("when the toy exists", () => {
      describe("and the toy is unassigned", () => {
        it("should pass the item to production", () => {
          const repository = new InMemoryToyRepository();
          const service = new ToyProductionService(repository);
          repository.save(new Toy(TOY_NAME, Toy.State.UNASSIGNED));

          service.assignToyToElf(TOY_NAME, ELF_NAME);

          const toy = repository.findByName(TOY_NAME);
          expect(toy?.getAssignedElf()).toBe(ELF_NAME);
          expect(toy?.getState()).toBe(Toy.State.IN_PRODUCTION);
        });
      });

      describe("and the toy is already unassigned", () => {
        it("should throw an error", () => {
          const repository = new InMemoryToyRepository();
          const service = new ToyProductionService(repository);
          repository.save(new Toy(TOY_NAME, Toy.State.UNASSIGNED));

          service.assignToyToElf(TOY_NAME, ELF_NAME);
          try {
            service.assignToyToElf(TOY_NAME, ELF_NAME);
          } catch (error) {
            expect(error).toBeInstanceOf(ToyUnassignableError);
          }
        });
      });
    });

    describe("when the toy does not exist", () => {
      it("should throw an error", () => {
        const repository = new InMemoryToyRepository();
        const service = new ToyProductionService(repository);

        try {
          service.assignToyToElf(TOY_NAME, ELF_NAME);
          fail("It should have thrown an error");
        } catch (error) {
          expect(error).toBeInstanceOf(ToyNotFoundError);
        }
      });
    });
  });

  describe("completing an assignment", () => {
    describe("of an toy in-production", () => {
      it("should succeed", () => {
        const repository = new InMemoryToyRepository();
        const service = new ToyProductionService(repository);
        repository.save(new Toy(TOY_NAME, Toy.State.UNASSIGNED));

        service.assignToyToElf(TOY_NAME, ELF_NAME);
        service.completeAssignment(TOY_NAME);

        const toy = repository.findByName(TOY_NAME);
        expect(toy?.getAssignedElf()).toBeUndefined();
        expect(toy?.getState()).toBe(Toy.State.COMPLETED);
      });
    });

    describe("of an unassigned toy", () => {
      it("should throw an error", () => {
        const repository = new InMemoryToyRepository();
        const service = new ToyProductionService(repository);
        repository.save(new Toy(TOY_NAME, Toy.State.UNASSIGNED));

        service.assignToyToElf(TOY_NAME, ELF_NAME);
        service.completeAssignment(TOY_NAME);

        try {
          service.completeAssignment(TOY_NAME);
          fail("It should have thrown an error");
        } catch (error) {
          expect(error).toBeInstanceOf(ToyNotInProductionError);
        }
      });
    });
  });
});
