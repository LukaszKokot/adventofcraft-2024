import * as fc from "fast-check";
import { Gift } from "../src/gift";
import { SantaWorkshopService } from "../src/santaWorkshopService";
import { neverFailingPredicate } from "./failureReporter";

describe("SantaWorkshopService", () => {
  const maxWeight = 20;
  let service: SantaWorkshopService;

  beforeAll(() => {
    fc.configureGlobal({ numRuns: 100 });
  });

  beforeEach(() => {
    service = new SantaWorkshopService({ maxWeight });
  });

  it("should fuzz prepare a gift with valid parameters", () => {
    fc.assert(
      fc.property(
        fc.record({
          giftName: fc.string(),
          weight: fc.integer({ min: 0, max: maxWeight }),
          color: fc.string(),
          material: fc.string(),
        }),
        neverFailingPredicate(
          ({ giftName, weight, color, material }) =>
            service.prepareGift(giftName, weight, color, material) instanceof
            Gift
        )
      )
    );
  });

  it("should fuzz throw an error if gift is too heavy", () => {
    fc.assert(
      fc.property(
        fc.record({
          giftName: fc.string(),
          weight: fc.oneof(fc.integer({ min: maxWeight + 1 })),
          color: fc.string(),
          material: fc.string(),
        }),
        neverFailingPredicate(({ giftName, weight, color, material }) => {
          try {
            service.prepareGift(giftName, weight, color, material);
          } catch (error) {
            return (
              error instanceof Error &&
              error.message === "Gift is too heavy for Santa's sleigh"
            );
          }
        })
      )
    );
  });

  it("should fuzzy add an attribute to a gift", () => {
    const gift = () => new Gift("Furby", 1, "Multi", "Cotton");

    fc.assert(
      fc.property(
        fc.integer({ min: 0 }),
        neverFailingPredicate((age) => {
          const g = gift();
          g.addAttribute("recommendedAge", age.toString());
          return g.getRecommendedAge() === age;
        })
      )
    );
  });

  it("should fuzzy assign a gift to a child", () => {
    const gift = () => new Gift("Furby", 1, "Multi", "Cotton");

    fc.assert(
      fc.property(
        fc.string({ minLength: 1 }),
        neverFailingPredicate((childName) => {
          const g = gift();
          g.assignToChild(childName);
          return g.toString().includes(`FOR ${childName}`);
        })
      )
    );
  });
});
