import fc from "fast-check";
import eid, { Gender } from "../src/eid";

describe("EID", () => {
  const defaultEid = eid("Sloubi");

  test("is always exactly 8 characters long", () => {
    expect(defaultEid).toHaveLength(8);
  });

  test("is composed of numerical characters only", () => {
    expect(defaultEid).toMatch(/^\d+$/);
  });

  test("has first character matching gender", () => {
    fc.assert(
      fc.property(
        fc.oneof(
          fc.constant<Gender>("Sloubi"),
          fc.constant<Gender>("Gagna"),
          fc.constant<Gender>("Catact")
        ),
        (gender) =>
          eid(gender)[0] ===
          (gender === "Sloubi" ? "1" : gender === "Gagna" ? "2" : "3")
      )
    );
  });
});
