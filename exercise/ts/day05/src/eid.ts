export type Gender = "Sloubi" | "Gagna" | "Catact";
const genderCodes = new Map<Gender, number>([
  ["Sloubi", 1],
  ["Gagna", 2],
  ["Catact", 3],
]);

const eid = (gender: Gender, birth: number) => {
  const codifiedGender = genderToCode(gender);
  const codifiedBirth = birthToCode(birth);
  return `${codifiedGender}${codifiedBirth}00000`;
};

const genderToCode = (gender: Gender): string =>
  genderCodes.get(gender).toString();

const birthToCode = (birth: number): string =>
  (birth % 100).toString().padStart(2, "0");

export default eid;
