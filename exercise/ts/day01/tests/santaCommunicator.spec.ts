import {Reindeer, SantaCommunicator} from "../src/santaCommunicator";
import {TestLogger} from "./doubles/testLogger";

const SantaCommunicatorSpec = 'Dasher';
const NORTH_POLE = 'North Pole';
const numberOfDaysToRest = 2;
const numberOfDayBeforeChristmas = 24;

describe('SantaCommunicator', () => {
    let communicator: SantaCommunicator;
    let logger: TestLogger;

    beforeEach(() => {
        communicator = new SantaCommunicator(numberOfDaysToRest);
        logger = new TestLogger();
    });

    test('composeMessage', () => {
        const message = new Reindeer(SantaCommunicatorSpec, NORTH_POLE, 5, numberOfDayBeforeChristmas).composeMessage(communicator);
        expect(message).toEqual('Dear Dasher, please return from North Pole in 17 day(s) to be ready and rest before Christmas.');
    });

    test('shouldDetectOverdueReindeer', () => {
        const overdue = new Reindeer(SantaCommunicatorSpec, NORTH_POLE, numberOfDayBeforeChristmas, numberOfDayBeforeChristmas).isOverdue(communicator, logger);

        expect(overdue).toBeTruthy();
        expect(logger.getLog()).toEqual('Overdue for Dasher located North Pole.');
    });

    test('shouldReturnFalseWhenNoOverdue', () => {
        const overdue = new Reindeer(SantaCommunicatorSpec, NORTH_POLE, numberOfDayBeforeChristmas - numberOfDaysToRest - 1, numberOfDayBeforeChristmas).isOverdue(communicator, logger);
        expect(overdue).toBeFalsy();
    });
});