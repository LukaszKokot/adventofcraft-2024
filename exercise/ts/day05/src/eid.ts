export type Gender = "Sloubi" | "Gagna" | "Catact";
const genderCodes = new Map<Gender, number>([
  ["Sloubi", 1],
  ["Gagna", 2],
  ["Catact", 3],
]);

const eid = (gender: Gender) => {
  const codifiedGender = genderToCode(gender);
  return `${codifiedGender}0000000`;
};

const genderToCode = (gender: Gender): number => {
  return genderCodes.get(gender);
};

export default eid;
