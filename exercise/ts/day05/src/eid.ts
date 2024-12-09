export type Gender = "Sloubi" | "Gagna" | "Catact";
const genderCodes = new Map<Gender, number>([
  ["Sloubi", 1],
  ["Gagna", 2],
  ["Catact", 3],
]);

const eid = (gender: Gender, birthYear: number, birthOrder: number) => {
  const codifiedGender = genderToCode(gender);
  const codifiedBirthYear = birthYearToCode(birthYear);
  const codifiedBirthOrder = birthOrderToCode(birthOrder);

  return `${codifiedGender}${codifiedBirthYear}${codifiedBirthOrder}00`;
};

const genderToCode = (gender: Gender): string =>
  genderCodes.get(gender).toString();

const birthYearToCode = (birth: number): string =>
  (birth % 100).toString().padStart(2, "0");

const birthOrderToCode = (birth: number): string =>
  birth.toString().padStart(3, "0");

export default eid;
