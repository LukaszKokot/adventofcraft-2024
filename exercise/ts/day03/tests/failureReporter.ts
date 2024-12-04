import fc from "fast-check";
import * as fs from "node:fs";

let failureId = 0;
const reportFailure = (inputs: object[], error: unknown) => {
  const fileName = `failure-pid${process.pid}-${++failureId}.log`;
  const fileContent = `Counterexample: ${fc.stringify(
    inputs
  )}\n\nError: ${error}`;
  fs.writeFileSync(fileName, fileContent);
};

export const reportingFailurePredicate = <T extends (...args: any[]) => boolean>(
  predicate: T
) => {
  return (...inputs: Parameters<T>): void => {
    try {
      const out = predicate(...inputs);
      if (out === false) {
        reportFailure(inputs, undefined);
      }
    } catch (err) {
      reportFailure(inputs, err);
      return err;
    }
  };
};
