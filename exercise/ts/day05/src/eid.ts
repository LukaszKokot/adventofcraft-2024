const eid = (gender: string) => {
  let codifiedGender = "";
  if (gender === "Sloubi") {
    codifiedGender = "1";
  } else if (gender === "Gagna") {
    codifiedGender = "2";
  } else if (gender === "Catact") {
    codifiedGender = "3";
  }

  return `${codifiedGender}0000000`;
};

export default eid;
