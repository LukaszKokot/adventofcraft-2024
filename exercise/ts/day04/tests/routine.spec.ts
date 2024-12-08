import { Routine } from "../src/routine/routine";

describe("Routine", () => {
  test("start routine with Jest", () => {
    const fakeTasks = ["task1", "task2", "task3"];
    const fakeSchedule = { tasks: fakeTasks };
    const positions = [] as string[];

    const positionSaver = (position: string) => {
      positions.push(position);
    };
    const fakePositionSaver = (position: string) =>
      jest.fn().mockImplementation(() => positionSaver(position));

    const emailService = {
      readNewEmails: fakePositionSaver("readNewEmails"),
    };
    const scheduleService = {
      todaySchedule: jest.fn().mockReturnValue(fakeSchedule),
      continueDay: fakePositionSaver("continueDay"),
      organizeMyDay: fakePositionSaver("organizeMyDay"),
    };
    const feeder = {
      feedReindeers: fakePositionSaver("feedReindeers"),
    };

    const routine = new Routine(emailService, scheduleService, feeder);
    routine.start();

    expect(positions).toMatchInlineSnapshot(`
[
  "organizeMyDay",
  "feedReindeers",
  "readNewEmails",
  "continueDay",
]
`);
    expect(scheduleService.organizeMyDay).toHaveBeenCalledTimes(1);
    expect(scheduleService.organizeMyDay.mock.calls[0][0]).toBe(fakeSchedule);
  });

  test("start routine with manual test doubles", () => {});
});
