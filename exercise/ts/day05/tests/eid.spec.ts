import fc from "fast-check";
import eid, {
  BirthOrderOutOfRangeError,
  BirthYearOutOfRangeError,
  Gender,
} from "../src/eid";

describe("EID", () => {
  fc.configureGlobal({ numRuns: 100, verbose: true });

  const validRecord = () =>
    fc.record({
      birthOrder: fc.integer({ min: 1, max: 999 }),
      birthYear: fc.integer({ min: 0, max: 999 }),
      gender: fc.oneof(
        fc.constant<Gender>("Sloubi"),
        fc.constant<Gender>("Gagna"),
        fc.constant<Gender>("Catact")
      ),
    });

  test("is always exactly 8 characters long", () => {
    fc.assert(fc.property(validRecord(), (record) => eid(record).length === 8));
  });

  test("is composed of numerical characters only", () => {
    fc.assert(
      fc.property(validRecord(), (record) => {
        expect(eid(record)).toMatch(/^\d+$/);
        return true;
      })
    );
  });

  test("has 1st character matching gender", () => {
    const isValidConvertedGender = (eid: string, gender: Gender) => {
      return (
        eid[0] === (gender === "Sloubi" ? "1" : gender === "Gagna" ? "2" : "3")
      );
    };

    fc.assert(
      fc.property(validRecord(), (record) =>
        isValidConvertedGender(eid(record), record.gender)
      )
    );
  });

  test("has 2nd and 3rd characters matching birth", () => {
    const isValidConvertedBirth = (eid: string, birthYear: number) => {
      const codedBirth = parseInt(eid.substring(1, 3));
      return (
        0 <= codedBirth && codedBirth <= 99 && birthYear % 100 === codedBirth
      );
    };

    fc.assert(
      fc.property(validRecord(), (record) =>
        isValidConvertedBirth(eid(record), record.birthYear)
      )
    );
  });

  test("returns errors when birth year is outside of ranges", () => {
    fc.assert(
      fc.property(
        fc.record({
          eid: validRecord(),
          birthYear: fc.oneof(
            fc.integer({ max: -1 }),
            fc.integer({ min: 1000 })
          ),
        }),
        (record) => {
          try {
            eid({ ...record.eid, birthYear: record.birthYear });
            fail("Should have thrown an error");
          } catch (error) {
            return error instanceof BirthYearOutOfRangeError;
          }
        }
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
      fc.property(
        fc.record({
          eid: validRecord(),
          birthOrder: fc.integer({ min: 1, max: 999 }),
        }),
        (record) =>
          isValidBirthOrder(
            eid({ ...record.eid, birthOrder: record.birthOrder }),
            record.birthOrder
          )
      )
    );
  });

  test("returns errors when birth order is outside of ranges", () => {
    fc.assert(
      fc.property(
        fc.record({
          eid: validRecord(),
          birthOrder: fc.oneof(
            fc.integer({ max: 0 }),
            fc.integer({ min: 1000 })
          ),
        }),
        (record) => {
          try {
            eid({ ...record.eid, birthOrder: record.birthOrder }),
              fail("Should have thrown an error");
          } catch (error) {
            return error instanceof BirthOrderOutOfRangeError;
          }
        }
      )
    );
  });

  test("has 7th and 8th characters being the control key", () => {
    const isValidControlKey = (eid: string) => {
      const controlKey = eid.substring(6);
      return (
        controlKey ===
        ((parseInt(eid.substring(0, 6)) + 97) % 97).toString().padStart(2, "0")
      );
    };

    fc.assert(
      fc.property(validRecord(), (record) => isValidControlKey(eid(record)))
    );
  });
});
