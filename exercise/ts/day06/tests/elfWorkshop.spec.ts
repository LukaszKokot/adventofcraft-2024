import { ElfWorkshop } from "../src/elfWorkshop";

describe("ElfWorkshop Tasks", () => {
  // More general comments:
  //
  // 1. We rely a lot on an internal property of the class, "taskList", to check the
  // list of tasks. This is not ideal, as it couples the test to the implementation.
  // We could add a method to the class to return the task list, and use it in the tests,
  // maybe in the form of an Iterator, to avoid exposing the internal list.
  //
  // 2. We could also add a method that returns the number of tasks remaining, to avoid
  // actually needing the list in the tests.

  // 1. We should avoid using the function name in the test description, otherwise
  // we risk forgetting to update it we change the function name.
  // 2. "removeTask" is not the function we are testing here.
  test("removeTask should add a task", () => {
    const workshop = new ElfWorkshop();
    workshop.addTask("Build toy train");
    expect(workshop.taskList).toContain("Build toy train");
  });

  // 1. We should avoid using an incremented test name in the description. What happens
  // if we decide to add more tests before this one?
  // 2. We could combine this test and the next one, using randomized task names generated
  // with the "fast-check" library.
  test("test2 checks for task addition", () => {
    const workshop = new ElfWorkshop();
    workshop.addTask("Craft dollhouse");
    expect(workshop.taskList.includes("Craft dollhouse")).toBeTruthy();
  });

  test("test2 checks for task addition", () => {
    const workshop = new ElfWorkshop();
    workshop.addTask("Paint bicycle");
    expect(workshop.taskList.includes("Paint bicycle")).toBeTruthy();
  });

  // Looks good!
  // Come to think of it, we could also change the behavior of the "addTask" method to
  // ensure it propetly handles "null" tasks. This would make the test and the code
  // more complete.
  test("Should handle empty tasks correctly", () => {
    const workshop = new ElfWorkshop();
    workshop.addTask("");
    expect(workshop.taskList.length).toBe(0);
  });

  // 1. Maybe a better name could be: "should complete a task by removing if from the tasks and returning it".
  // 2. A few more interesting tests that could be added:
  //    - adding duplicate tasks, and checking only one gets removed
  //    - adding several different tasks, and checking we only remove the first task (FIFO)
  test("Task removal functionality", () => {
    const workshop = new ElfWorkshop();
    workshop.addTask("Wrap gifts");
    const removedTask = workshop.completeTask();
    expect(removedTask).toBe("Wrap gifts");
    expect(workshop.taskList.length).toBe(0);
  });
});
