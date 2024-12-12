export class Building {
  static whichFloor(instructions: string): number {
    let val: Array<[string, number]> = [];

    for (let i = 0; i < instructions.length; i++) {
      const c = instructions[i];

      if (instructions.includes("🧝")) {
        const j = c === ")" ? 3 : c === "(" ? -2 : 0;
        val.push([c, j]);
      } else if (!instructions.includes("🧝")) {
        val.push([c, c === "(" ? 1 : -1]);
      } else {
        val.push([c, c === "(" ? 42 : -1]);
      }
    }

    let result = 0;
    for (const kp of val) {
      result += kp[1];
    }

    return result;
  }
}
