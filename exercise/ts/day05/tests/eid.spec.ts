import fc from "fast-check";
import eid, { Gender } from "../src/eid";

describe("EID", () => {
  const defaultEid = eid("Sloubi", 42, 456);

  test("is always exactly 8 characters long", () => {
    expect(defaultEid).toHaveLength(8);
  });

  test("is composed of numerical characters only", () => {
    expect(defaultEid).toMatch(/^\d+$/);
  });

  test("has 1st character matching gender", () => {
    fc.assert(
      fc.property(
        fc.oneof(
          fc.constant<Gender>("Sloubi"),
          fc.constant<Gender>("Gagna"),
          fc.constant<Gender>("Catact")
        ),
        (gender) =>
          eid(gender, 42, 456)[0] ===
          (gender === "Sloubi" ? "1" : gender === "Gagna" ? "2" : "3")
      )
    );
  });

  test("has 2nd and 3rd characters matching birth", () => {
    const isValidConvertedBirth = (eid: string, birth: number) => {
      const codedBirth = parseInt(eid.substring(1, 3));
      return 0 <= codedBirth && codedBirth <= 99 && birth % 100 === codedBirth;
    };

    fc.assert(
      fc.property(fc.integer({ min: 0, max: 999 }), (birth) =>
        isValidConvertedBirth(eid("Sloubi", birth, 456), birth)
      )
    );
  });

  test("has 4th, 5th and 6th characters matching birth order", () => {
    const isValidBirthOrder = (eid: string, birthOrder: number) => {
      const codedBirthOrder = parseInt(eid.substring(3, 6));
      return (
        0 <= codedBirthOrder &&
        codedBirthOrder <= 999 &&
        birthOrder === codedBirthOrder
      );
    };

    fc.assert(
      fc.property(fc.integer({ min: 1, max: 999 }), (birthOrder) =>
        isValidBirthOrder(eid("Sloubi", 42, birthOrder), birthOrder)
      )
    );
  });
});
