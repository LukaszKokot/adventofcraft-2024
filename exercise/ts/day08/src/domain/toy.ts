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

  assignToyToElf(elf?: string): void {
    this.setAssignedElf(elf);
    this.setState(Toy.State.IN_PRODUCTION);
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

  private setAssignedElf(elf?: string): void {
    this.elf = elf;
  }

  private setState(state: string): void {
    this.state = state;
  }
}
