import {Logger} from "./logger";

export class SantaCommunicator {
    private readonly numberOfDaysToRest: number;

    constructor(numberOfDaysToRest: number) {
        this.numberOfDaysToRest = numberOfDaysToRest;
    }

    public composeMessage(reindeerName: string, currentLocation: string, numbersOfDaysForComingBack: number, numberOfDaysBeforeChristmas: number): string {
        const daysBeforeReturn = this.daysBeforeReturn(numbersOfDaysForComingBack, numberOfDaysBeforeChristmas);
        return `Dear ${reindeerName}, please return from ${currentLocation} in ${daysBeforeReturn} day(s) to be ready and rest before Christmas.`;
    }

    public isOverdue(reindeerName: string, currentLocation: string, numbersOfDaysForComingBack: number, numberOfDaysBeforeChristmas: number, logger: Logger): boolean {
        if (this.daysBeforeReturn(numbersOfDaysForComingBack, numberOfDaysBeforeChristmas) <= 0) {
            logger.log(`Overdue for ${reindeerName} located ${currentLocation}.`);
            return true;
        }
        return false;
    }

    private daysBeforeReturn(numbersOfDaysForComingBack: number, numberOfDaysBeforeChristmas: number): number {
        return numberOfDaysBeforeChristmas - numbersOfDaysForComingBack - this.numberOfDaysToRest;
    }
}

export class Reindeer {
    private readonly name: string;
    private readonly location: string;
    private readonly daysToReturn: number;
    private readonly daysBeforeChristmas: number;

    constructor(name: string, location: string, daysToReturn: number, daysBeforeChristmas: number) {
        this.name = name;
        this.location = location;
        this.daysToReturn = daysToReturn;
        this.daysBeforeChristmas = daysBeforeChristmas;
    }

    public composeMessage(communicator: SantaCommunicator): string {
        return communicator.composeMessage(this.name, this.location, this.daysToReturn, this.daysBeforeChristmas);
    }

    public isOverdue(communicator: SantaCommunicator, logger: Logger): boolean {
        return communicator.isOverdue(this.name, this.location, this.daysToReturn, this.daysBeforeChristmas, logger);
    }
}