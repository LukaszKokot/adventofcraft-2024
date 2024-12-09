export type Gender = "Sloubi" | "Gagna" | "Catact";
const genderCodes = new Map<Gender, number>([
  ["Sloubi", 1],
  ["Gagna", 2],
  ["Catact", 3],
]);

abstract class EidError extends Error {}

export class BirthYearOutOfRangeError extends EidError {
  constructor() {
    super("Birth year is out of range, must be between 0 and 999");
    this.name = "BirthYearOutOfRangeError";
  }
}

export class BirthOrderOutOfRangeError extends EidError {
  constructor() {
    super("Birth order is out of range, must be between 1 and 999");
    this.name = "BirthOrderOutOfRangeError";
  }
}

const assertBirthYearIsWithinRange = (birthYear: number): void => {
  if (birthYear < 0 || birthYear > 999) {
    throw new BirthYearOutOfRangeError();
  }
};

const assertBirthOrderIsWithinRange = (birthOrder: number): void => {
  if (birthOrder < 1 || birthOrder > 999) {
    throw new BirthOrderOutOfRangeError();
  }
};

const genderToCode = (gender: Gender): string =>
  genderCodes.get(gender).toString();

const birthYearToCode = (birth: number): string =>
  (birth % 100).toString().padStart(2, "0");

const birthOrderToCode = (birth: number): string =>
  birth.toString().padStart(3, "0");

const createControlKey = (
  gender: string,
  birthYear: string,
  birthOrder: string
): string =>
  (97 - (parseInt(`${gender}${birthYear}${birthOrder}`) % 97))
    .toString()
    .padStart(2, "0");

const eid = ({
  gender,
  birthYear,
  birthOrder,
}: {
  gender: Gender;
  birthYear: number;
  birthOrder: number;
}) => {
  assertBirthYearIsWithinRange(birthYear);
  assertBirthOrderIsWithinRange(birthOrder);

  const codifiedGender = genderToCode(gender);
  const codifiedBirthYear = birthYearToCode(birthYear);
  const codifiedBirthOrder = birthOrderToCode(birthOrder);
  const controlKey = createControlKey(
    codifiedGender,
    codifiedBirthYear,
    codifiedBirthOrder
  );

  return `${codifiedGender}${codifiedBirthYear}${codifiedBirthOrder}${controlKey}`;
};

export default eid;
