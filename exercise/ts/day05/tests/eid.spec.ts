import eid from "../src/eid";

describe("EID", () => {
  const result = eid();

  test("is always exactly 8 characters long", () => {
    expect(result).toHaveLength(8);
  });

describe('EID', () => {
    test('implement your tests here', () => {
        expect(43).toBe(42);
    });
});
