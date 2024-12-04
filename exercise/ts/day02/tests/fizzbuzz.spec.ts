import * as fc from "fast-check";
import { pipe } from "fp-ts/function";
import * as O from "fp-ts/Option";
import { isNone, isSome } from "fp-ts/Option";
import { game, MAX, MIN } from "../src/fizzbuzz";

describe("FizzBuzz should return", () => {
  const fizzbuzzGame = game({
    mapping: new Map([
      [3, "Fizz"],
      [5, "Buzz"],
      [7, "Whizz"],
      [11, "Bang"],
    ]),
  });

  const isConvertValid = (input: number): boolean =>
    pipe(
      fizzbuzzGame.fizzbuzz(input),
      O.exists((result) => validStringsFor(input).includes(result))
    );

  const validStringsFor = (x: number): string[] => [
    "Fizz",
    "Buzz",
    "FizzBuzz",
    "Bang",
    "Whizz",
    "WhizzBang",
    "FizzWhizz",
    "FizzBang",
    x.toString(),
  ];

  test.each([
    [1, "1"],
    [67, "67"],
    [82, "82"],
    [3, "Fizz"],
    [66, "FizzBang"],
    [99, "FizzBang"],
    [5, "Buzz"],
    [50, "Buzz"],
    [85, "Buzz"],
    [15, "FizzBuzz"],
    [30, "FizzBuzz"],
    [45, "FizzBuzz"],
    [7, "Whizz"],
    [11, "Bang"],
    [77, "WhizzBang"],
  ])("its representation %s -> %s", (input, expectedResult) => {
    const conversionResult = fizzbuzzGame.fizzbuzz(input);
    expect(isSome(conversionResult)).toBeTruthy();

    if (isSome(conversionResult)) {
      expect(conversionResult.value).toBe(expectedResult);
    }
  });

  test("valid strings for numbers between 1 and 100", () => {
    fc.assert(
      fc.property(
        fc.integer().filter((n) => n >= MIN && n <= MAX),
        (n) => isConvertValid(n)
      )
    );
  });

  test("none for numbers out of range", () => {
    fc.assert(
      fc.property(
        fc.integer().filter((n) => n < MIN || n > MAX),
        (n) => isNone(fizzbuzzGame.fizzbuzz(n))
      )
    );
  });
});
