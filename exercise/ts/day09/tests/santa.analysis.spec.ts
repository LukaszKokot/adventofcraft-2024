import fc from "fast-check";
import { Child } from "../src/child";
import { GiftRequest } from "../src/giftRequest";
import { SantaService } from "../src/santaService";

describe("santa analysis", () => {
  const service = new SantaService();

  fc.configureGlobal({ numRuns: 100 });

  const validRecord = ({
    behavior,
    isFeasible,
  }: {
    behavior?: Behavior;
    isFeasible?: boolean;
  }) =>
    fc.record({
      name: fc.string(),
      firstName: fc.string(),
      behavior: fc.oneof(
        fc.constant(behavior) ??
          (fc.constant<Behavior>("nice"), fc.constant<Behavior>("naughty"))
      ),
      giftRequest: fc.record({
        giftName: fc.string(),
        isFeasible: fc.constant(isFeasible) ?? fc.boolean(),
        priority: fc.oneof(
          fc.constant<Priority>("dream"),
          fc.constant<Priority>("nice to have")
        ),
      }),
    });

  const recordToChild = (record: {
    name: string;
    firstName: string;
    behavior: Behavior;
    giftRequest: {
      giftName: string;
      isFeasible: boolean;
      priority: Priority;
    };
  }): Child =>
    new Child(
      record.name,
      record.firstName,
      10,
      record.behavior,
      new GiftRequest(
        record.giftRequest.giftName,
        record.giftRequest.isFeasible,
        record.giftRequest.priority
      )
    );

  describe("should deny the gift", () => {
    it("when it is not feasible to build it", () => {
      fc.assert(
        fc.property(validRecord({ isFeasible: false }), (record) => {
          const child = recordToChild(record);
          expect(service.evaluateRequest(child)).toBe(false);
        })
      );
    });

    it("when the child has been naughty", () => {
      fc.assert(
        fc.property(validRecord({ behavior: "naughty" }), (record) => {
          const child = recordToChild(record);
          expect(service.evaluateRequest(child)).toBe(false);
        })
      );
    });
  });

  describe("should approve the gift", () => {
    it("when it is feasible to build it and the child has been nice", () => {
      fc.assert(
        fc.property(
          validRecord({ isFeasible: true, behavior: "nice" }),
          (record) => {
            const child = recordToChild(record);
            expect(service.evaluateRequest(child)).toBe(true);
          }
        )
      );
    });
  });
});
