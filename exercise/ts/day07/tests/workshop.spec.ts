import { Gift } from "../src/workshop/gift";
import { Status } from "../src/workshop/status";
import { Workshop } from "../src/workshop/workshop";

interface CustomMatchers<R = unknown> {
  toHaveBeenProduced(): R;
}

declare global {
  namespace jest {
    interface Expect extends CustomMatchers {}
    interface Matchers<R> extends CustomMatchers<R> {}
    interface InverseAsymmetricMatchers extends CustomMatchers {}
  }
}

describe("Workshop", () => {
  const TOY_NAME = "1 Super Nintendo";
  expect.extend({
    toHaveBeenProduced(gift: Pick<Gift, "getStatus">) {
      const pass = gift.getStatus() === Status.Produced;
      return {
        message: () =>
          pass
            ? `expected gift to not have been produced`
            : `expected gift to have been produced`,
        pass,
      };
    },
  });

  describe("attempting to complete production of a gift", () => {
    describe("that was added to production line", () => {
      it("succeeds and returns the gift with a status indicating successful production", () => {
        const workshop = new Workshop();
        workshop.addGift(new Gift(TOY_NAME));

        const completedGift = workshop.completeGift(TOY_NAME);
        if (completedGift === null) {
          fail("gift should not be null");
        }
        expect(completedGift).toBeInstanceOf(Gift);
        expect(completedGift).toHaveBeenProduced();
      });
    });

    describe("that was not added to the production line", () => {
      it("fails and returns a falsy value", () => {
        const workshop = new Workshop();
        const completedGift = workshop.completeGift(TOY_NAME);

        expect(completedGift).toBeNull();
      });
    });
  });
});
