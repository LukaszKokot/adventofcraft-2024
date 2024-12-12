export type Instruction = "(" | ")" | "🧝";
export type InstructionList = Instruction[];

const stringToInstructions = (instructions: string): InstructionList => {
  if (!/^[()🧝]+$/.test(instructions)) {
    throw new Error("Invalid set of instructions");
  }

  return Array.from(instructions) as InstructionList;
};

export class Building {
  private static santaMapping = { "(": -2, ")": 3, "🧝": 0 };
  private static noSantaMapping = { "(": 1, ")": -1 };
  private static mapping = [this.santaMapping, this.noSantaMapping];

  static whichFloor(instructions: string): number {
    const instructionList = stringToInstructions(instructions);
    const hasSanta = instructions.includes("🧝") ? 0 : 1;

    return instructionList.reduce(
      (acc, instruction) => acc + this.mapping[hasSanta][instruction],
      0
    );
  }
}
