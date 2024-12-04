import { none, Option, some } from "fp-ts/Option";

export const MIN = 1;
export const MAX = 100;

export interface GameRules {
  mapping: Map<number, string>;
  min?: number;
  max?: number;
}

export const game = ({ mapping, min = MIN, max = MAX }: GameRules) => {
  const convertSafely = (input: number): string => {
    let result = "";
    for (const [divisor, value] of mapping) {
      if (is(divisor, input)) {
        result += value;
      }
    }

    return result === "" ? input.toString() : result;
  };

  const is = (divisor: number, input: number): boolean => input % divisor === 0;

  const isOutOfRange = (input: number): boolean => input < min || input > max;

  return {
    fizzbuzz: (input: number): Option<string> =>
      isOutOfRange(input) ? none : some(convertSafely(input)),
  };
};
