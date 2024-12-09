import eid from "../src/eid";

describe("EID", () => {
  const result = eid();

  test("is always exactly 8 characters long", () => {
    expect(result).toHaveLength(8);
  });

  test("is composed of numerical characters only", () => {
    expect(result).toMatch(/^\d+$/);
  });
});
