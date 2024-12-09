export class ElfWorkshop {
  // We should make that private, and add a method to return the list of tasks.
  // That method should ensure the list is not mutable by the caller.
  taskList: string[] = [];

  addTask(task: string): void {
    // Should we check more in depth and ensure the task does not contain only whitespaces?
    if (task !== "") {
      this.taskList.push(task);
    }
  }

  // We could change the signature to indicate the method can return null in case there
  // are no tasks left.
  completeTask(): string {
    // Looks like we could just return the result of the shift operation, and change the
    // signature to indicate it can return the completed task or undefined.
    if (this.taskList.length > 0) {
      return this.taskList.shift();
    }
    return null;
  }
}
