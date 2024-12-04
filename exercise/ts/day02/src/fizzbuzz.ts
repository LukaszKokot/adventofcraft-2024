import { none, Option, some } from "fp-ts/Option";

export const min = 1;
export const max = 100;

export const game = ({ mapping }: { mapping: Map<number, string> }) => {
  const convertSafely = (input: number): string => {
    let result = "";
    for (const [divisor, value] of mapping) {
      if (is(divisor, input)) {
        result += value;
      }
    }

    return result === '' ? input.toString() : result;
  };

  return {
    fizzbuzz: (input: number): Option<string> =>
      isOutOfRange(input) ? none : some(convertSafely(input)),
  };
};

const is = (divisor: number, input: number): boolean => input % divisor === 0;
const isOutOfRange = (input: number): boolean => input < min || input > max;
