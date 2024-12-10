export class Toy {
  static State = {
    UNASSIGNED: "UNASSIGNED",
    IN_PRODUCTION: "IN_PRODUCTION",
    COMPLETED: "COMPLETED",
  };

  private elf?: string;
  private readonly name: string;
  private state: string;

  constructor(name: string, state: string) {
    this.name = name;
    this.state = state;
  }

  assignToyToElf(elf: string): void {
    if (this.getState() !== Toy.State.UNASSIGNED) {
      throw new ToyUnassignableError(elf);
    }

    this.setAssignedElf(elf);
    this.setState(Toy.State.IN_PRODUCTION);
  }

  completeAssignment(): void {
    if (this.getState() !== Toy.State.IN_PRODUCTION) {
      throw new ToyNotInProductionError();
    }

    this.setAssignedElf(undefined);
    this.setState(Toy.State.COMPLETED);
  }

  getAssignedElf(): string | undefined {
    return this.elf;
  }

  getName(): string {
    return this.name;
  }

  getState(): string {
    return this.state;
  }

  private setAssignedElf(elf: string): void {
    this.elf = elf;
  }

  private setState(state: string): void {
    this.state = state;
  }
}

abstract class ToyError extends Error {}

export class ToyUnassignableError extends ToyError {
  constructor(elfName: string) {
    super(`Toy already assigned to ${elfName}`);
  }
}

export const ToyNotInProductionError = class extends ToyError {
  constructor() {
    super("Toy not assigned");
  }
};
